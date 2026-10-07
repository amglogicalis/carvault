// Carvault request gateway. Zero dependencies.
// - POST /session  -> issues an ephemeral HMAC-signed token (cannot be forged by client)
// - POST /request  -> verifies token, rate-limits, validates against spam & catalog,
//                     deduplicates against LIVE OPEN issues ONLY, and creates the issue.
import http from 'node:http';
import crypto from 'node:crypto';

const PORT = 8787;
const SECRET = crypto.randomBytes(32);
const REPO = process.env.GITHUB_REPOSITORY;
const GH_TOKEN = process.env.GITHUB_TOKEN;
const ORIGINS = ['https://amglogicalis.github.io', 'http://localhost:4321', 'http://localhost:3000', 'http://127.0.0.1:4321'];
const MAX_PER_TOKEN = 10;
const MAX_PER_IP = 30;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map();
const recentProposals = [];

const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
const mac = (s) => crypto.createHmac('sha256', SECRET).update(s).digest('base64url');

function sign(payload) {
  const body = b64(payload);
  return `${body}.${mac(body)}`;
}

function verify(token) {
  if (!token || !token.includes('.')) return null;
  const [body, sig] = token.split('.');
  const good = mac(body);
  if (sig.length !== good.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good))) return null;
  try {
    const p = JSON.parse(Buffer.from(body, 'base64url').toString());
    return p.exp > Date.now() ? p : null;
  } catch { return null; }
}

function limited(key, max) {
  const now = Date.now();
  const arr = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= max) { hits.set(key, arr); return true; }
  arr.push(now); hits.set(key, arr); return false;
}

function cors(req, res) {
  const o = req.headers.origin || '';
  if (ORIGINS.includes(o) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(o) || o.endsWith('.github.io')) {
    res.setHeader('Access-Control-Allow-Origin', o);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Headers', 'content-type,authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
}

const send = (res, code, obj) => {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(obj));
};

async function readJson(req) {
  let raw = '';
  for await (const c of req) {
    raw += c;
    if (raw.length > 4096) throw new Error('too big');
  }
  return raw ? JSON.parse(raw) : {};
}

// ----------------------------------------------------
// Smart Normalizer & Duplicate Matching Engine
// ----------------------------------------------------
function normalize(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanTitle(title) {
  return (title || '')
    .replace(/^\[.*?\]:?\s*/i, '')
    .replace(/^solicitud.*?:?\s*/i, '')
    .trim();
}

const STOP_WORDS = new Set([
  'el', 'la', 'los', 'las', 'un', 'una', 'de', 'del', 'con', 'por', 'para',
  'en', 'ano', 'anos', 'model', 'modelo', 'coche', 'car', 'falta', 'queria', 'pedir',
  'nuevo', 'nueva', 'por', 'favor', 'the'
]);

function tokenize(str) {
  return normalize(str)
    .split(' ')
    .filter(t => t.length >= 2 && !STOP_WORDS.has(t));
}

const SPEC_OR_BODY = /^(19\d\d|20\d\d|v[68]|v10|v12|manual|auto|coupe|cabrio|sedan|berlina|avant|touring|suv|roadster|spider|sportback|gt|edition)$/;

function isDuplicate(candidate, existingTitle) {
  const normCand = normalize(candidate);
  const normExist = normalize(cleanTitle(existingTitle));
  if (normCand === normExist) return true;

  const tokensCand = tokenize(candidate);
  const tokensExist = tokenize(cleanTitle(existingTitle));
  if (tokensCand.length === 0 || tokensExist.length === 0) return false;

  const joinedCand = tokensCand.join(' ');
  const joinedExist = tokensExist.join(' ');
  if (joinedCand === joinedExist) return true;

  // Si ambos son marca pura o término idéntico (ej: 'aston martin' vs 'aston martin')
  if (tokensCand.length <= 2 && tokensExist.length <= 2 && joinedCand === joinedExist) return true;

  // Filtrar años / carrocerías / especificaciones que no definen un modelo distinto
  const coreCand = tokensCand.filter(t => !SPEC_OR_BODY.test(t));
  const coreExist = tokensExist.filter(t => !SPEC_OR_BODY.test(t));

  const coreJoinedCand = coreCand.join(' ');
  const coreJoinedExist = coreExist.join(' ');
  if (coreJoinedCand && coreJoinedExist && coreJoinedCand === coreJoinedExist) return true;

  const setExist = new Set(tokensExist);
  const setCand = new Set(tokensCand);
  const common = tokensCand.filter(t => setExist.has(t));

  const diffCand = tokensCand.filter(t => !setExist.has(t) && !SPEC_OR_BODY.test(t));
  const diffExist = tokensExist.filter(t => !setCand.has(t) && !SPEC_OR_BODY.test(t));

  // Si comparten los tokens principales del modelo y las únicas diferencias son variantes de año/carrocería
  if (common.length >= 2 && diffCand.length === 0 && diffExist.length === 0) {
    return true;
  }

  return false;
}

function validateInput(text) {
  const clean = String(text || '').trim();
  if (clean.length < 3) {
    return { valid: false, reason: 'El texto es demasiado corto (mínimo 3 caracteres).' };
  }
  if (clean.length > 250) {
    return { valid: false, reason: 'El texto excede el límite permitido de 250 caracteres.' };
  }

  const norm = normalize(clean);
  const tokens = tokenize(clean);

  // Repetición excesiva de caracteres (ej: "aaaaaa", "111111")
  if (/^(.)\1{4,}$/.test(norm) || /(.)\1{5,}/.test(norm)) {
    return { valid: false, reason: 'Por favor, introduce un nombre de modelo o fabricante automotriz válido.' };
  }

  if (tokens.length === 0) {
    return { valid: false, reason: 'Por favor, introduce un nombre reconocible de marca o vehículo.' };
  }

  if (norm === 'bmw' || norm === 'bayerische motoren werke') {
    return { valid: false, reason: 'BMW ya cuenta con un catálogo completo de 200 modelos y 279 chasis activo en Carvault.' };
  }

  return { valid: true, clean };
}

// ----------------------------------------------------
// HTTP Server
// ----------------------------------------------------
http.createServer(async (req, res) => {
  cors(req, res);
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
  const pathname = (req.url || '').split('?')[0];
  const ip = req.headers['cf-connecting-ip'] || req.socket.remoteAddress;

  try {
    if (req.method === 'GET' && pathname === '/health') {
      return send(res, 200, { ok: true, repo: REPO });
    }

    if (req.method === 'GET' && pathname === '/open-issues') {
      try {
        const issuesRes = await fetch(`https://api.github.com/repos/${REPO}/issues?state=open&per_page=100`, {
          headers: {
            Authorization: `Bearer ${GH_TOKEN}`,
            Accept: 'application/vnd.github+json',
            'User-Agent': 'carvault-gateway'
          }
        });
        if (issuesRes.ok) {
          const list = await issuesRes.json();
          return send(res, 200, list.map(i => ({ number: i.number, title: i.title })));
        }
      } catch (e) {}
      return send(res, 200, []);
    }

    if (req.method === 'POST' && pathname === '/session') {
      if (limited('s:' + ip, 20)) return send(res, 429, { error: 'rate', reason: 'Límite de solicitudes de sesión superado. Espera un momento.' });
      return send(res, 200, { token: sign({ id: crypto.randomUUID(), exp: Date.now() + WINDOW_MS }) });
    }

    if (req.method === 'POST' && pathname === '/request') {
      const tok = verify((req.headers.authorization || '').replace(/^Bearer /, ''));
      if (!tok) return send(res, 401, { error: 'token', reason: 'Token de sesión expirado o inválido.' });

      const { text } = await readJson(req);
      const val = validateInput(text);
      if (!val.valid) {
        return send(res, 400, { error: 'validation', reason: val.reason });
      }

      if (limited('t:' + tok.id, MAX_PER_TOKEN) || limited('i:' + ip, MAX_PER_IP)) {
        return send(res, 429, { error: 'rate', reason: 'Has alcanzado el límite de propuestas para esta sesión.' });
      }

      // 1. Comprobar propuestas recientes en memoria (elimina condiciones de carrera y lag de réplica de GitHub)
      const now = Date.now();
      for (let i = recentProposals.length - 1; i >= 0; i--) {
        const item = recentProposals[i];
        if (now - item.createdAt > 45 * 1000) {
          recentProposals.splice(i, 1);
          continue;
        }
        if (isDuplicate(val.clean, item.title)) {
          return send(res, 409, {
            error: 'duplicate',
            issue: item.number,
            title: item.title,
            reason: `Ya existe una solicitud abierta para este modelo (Issue #${item.number}). Nuestro equipo ya está trabajando en ella.`
          });
        }
      }

      // 2. Consultar únicamente issues ABIERTAS en GitHub (state=open)
      // Las issues cerradas, resueltas o descartadas NO se leen ni bloquean.
      try {
        const issuesRes = await fetch(`https://api.github.com/repos/${REPO}/issues?state=open&per_page=100`, {
          headers: {
            Authorization: `Bearer ${GH_TOKEN}`,
            Accept: 'application/vnd.github+json',
            'User-Agent': 'carvault-gateway'
          }
        });

        if (issuesRes.ok) {
          const openIssues = await issuesRes.json();
          if (Array.isArray(openIssues)) {
            for (const issue of openIssues) {
              if (isDuplicate(val.clean, issue.title)) {
                return send(res, 409, {
                  error: 'duplicate',
                  issue: issue.number,
                  title: issue.title,
                  reason: `Ya existe una solicitud abierta para este modelo (Issue #${issue.number}). Nuestro equipo ya está trabajando en ella.`
                });
              }
            }
          }
        }
      } catch (err) {
        console.error('Error verificando issues abiertas:', err);
      }

      // Si no existe ninguna issue abierta para ese modelo/marca, la creamos
      const r = await fetch(`https://api.github.com/repos/${REPO}/issues`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GH_TOKEN}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
          'User-Agent': 'carvault-gateway'
        },
        body: JSON.stringify({
          title: `[Propuesta de Vehículo]: ${val.clean.slice(0, 60)}`,
          body: `### 🚗 Solicitud de Modelo / Marca en Carvault\n\n**Descripción solicitada por el usuario:**\n> ${val.clean}\n\n---\n*Filtro Middleware de Carvault: Verificado (aprobado contra catálogo y solicitudes activas)*\n- **Fecha:** ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}\n- **Estado:** Pendiente de revisión y catalogación`,
          labels: ['enhancement']
        })
      });

      const j = await r.json();
      if (!r.ok) {
        return send(res, 502, { error: 'github', reason: 'Error al contactar con GitHub para registrar la solicitud.' });
      }

      // Registrar en el buffer inmediato para bloquear cualquier duplicado instantáneo
      recentProposals.push({ number: j.number, title: val.clean, createdAt: Date.now() });

      return send(res, 200, { success: true, issue: j.number, url: j.html_url });
    }

    send(res, 404, { error: 'not found' });
  } catch (err) {
    send(res, 400, { error: 'bad request', reason: 'Error en la estructura de la petición.' });
  }
}).listen(PORT, () => console.log('gateway on', PORT));
