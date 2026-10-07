// Carvault request gateway (spike). Zero dependencies.
// - POST /session  -> issues a short-lived HMAC-signed token (cannot be forged by the client)
// - POST /request  -> verifies token, rate-limits, validates text, creates the GitHub issue
import http from 'node:http';
import crypto from 'node:crypto';

const PORT = 8787;
const SECRET = crypto.randomBytes(32);
const REPO = process.env.GITHUB_REPOSITORY;
const GH_TOKEN = process.env.GITHUB_TOKEN;
const ORIGINS = ['https://amglogicalis.github.io', 'http://localhost:4321'];
const MAX_PER_TOKEN = 3;
const MAX_PER_IP = 5;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map();

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
  const o = req.headers.origin;
  if (ORIGINS.includes(o)) { res.setHeader('Access-Control-Allow-Origin', o); res.setHeader('Vary', 'Origin'); }
  res.setHeader('Access-Control-Allow-Headers', 'content-type,authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
}

const send = (res, code, obj) => { res.writeHead(code, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(obj)); };

async function readJson(req) {
  let raw = '';
  for await (const c of req) { raw += c; if (raw.length > 4096) throw new Error('too big'); }
  return raw ? JSON.parse(raw) : {};
}

http.createServer(async (req, res) => {
  cors(req, res);
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
  const pathname = (req.url || '').split('?')[0];
  const ip = req.headers['cf-connecting-ip'] || req.socket.remoteAddress;
  try {
    if (req.method === 'GET' && pathname === '/health') return send(res, 200, { ok: true });
    if (req.method === 'POST' && pathname === '/session') {
      if (limited('s:' + ip, 20)) return send(res, 429, { error: 'rate' });
      return send(res, 200, { token: sign({ id: crypto.randomUUID(), exp: Date.now() + WINDOW_MS }) });
    }
    if (req.method === 'POST' && pathname === '/request') {
      const tok = verify((req.headers.authorization || '').replace(/^Bearer /, ''));
      if (!tok) return send(res, 401, { error: 'token' });
      if (limited('t:' + tok.id, MAX_PER_TOKEN) || limited('i:' + ip, MAX_PER_IP)) return send(res, 429, { error: 'rate' });
      const { text } = await readJson(req);
      const clean = String(text || '').trim();
      if (clean.length < 3 || clean.length > 250) return send(res, 400, { error: 'invalid' });
      const r = await fetch(`https://api.github.com/repos/${REPO}/issues`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${GH_TOKEN}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json', 'User-Agent': 'carvault-gateway' },
        body: JSON.stringify({
          title: `[Propuesta de Vehículo]: ${clean.slice(0, 60)}`,
          body: `### 🚗 Solicitud de Modelo / Marca en Carvault\n\n**Descripción solicitada por el usuario:**\n> ${clean}\n\n---\n*Filtro Middleware de Carvault: Verificado (aprobado contra catálogo de vehículos y solicitudes activas)*\n- **Fecha:** ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}\n- **Estado:** Pendiente de revisión y catalogación`,
          labels: ['enhancement']
        })
      });
      const j = await r.json();
      return send(res, r.ok ? 200 : 502, r.ok ? { success: true, issue: j.number, url: j.html_url } : { error: 'github' });
    }
    send(res, 404, { error: 'not found' });
  } catch { send(res, 400, { error: 'bad request' }); }
}).listen(PORT, () => console.log('gateway on', PORT));
