import fs from 'fs';
import path from 'path';
import { evaluateFrontPerspective } from './image-guard';

/**
 * Generador de Auditoría Visual en Cuadrícula HTML (Gallery Audit)
 * Permite auditar visualmente en segundos el 100% de las imágenes de una marca
 */
function main() {
  const args = process.argv.slice(2);
  const brandArg = args.find(a => a.startsWith('--brand='))?.split('=')[1] || 'bmw';

  const catalogPath = path.resolve(process.cwd(), `data/${brandArg}/catalog-clean-front.json`);
  if (!fs.existsSync(catalogPath)) {
    console.error(`❌ Catálogo no encontrado: ${catalogPath}`);
    process.exit(1);
  }

  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  const generations = catalog.generations || catalog;

  let warningsCount = 0;
  const cardsHtml = generations.map((gen: any, idx: number) => {
    const img = gen.frontImage || {};
    const evalResult = evaluateFrontPerspective(img);
    if (!evalResult.valid || evalResult.score < 50) {
      warningsCount++;
    }

    const badgeColor = evalResult.valid && evalResult.score >= 50 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    const borderCard = evalResult.valid && evalResult.score >= 50 ? 'border-slate-800' : 'border-amber-500/50';

    return `
      <div class="card bg-slate-900 border ${borderCard} rounded-2xl overflow-hidden p-3 flex flex-col justify-between shadow-lg hover:border-cyan-500/60 transition-all">
        <div>
          <div class="relative w-full h-48 bg-slate-950 rounded-xl overflow-hidden mb-3 border border-slate-850 flex items-center justify-center">
            <img src="${img.url || ''}" alt="${gen.label}" class="w-full h-full object-cover" loading="lazy" onerror="this.parentElement.innerHTML='<span class=\"text-red-400 text-xs font-mono\">Error de carga</span>'"/>
            <div class="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono border ${badgeColor}">
              Score: ${evalResult.score}/100
            </div>
          </div>
          <div class="flex items-center justify-between text-[11px] font-mono text-cyan-400 mb-1">
            <span>#${idx + 1} • ${gen.years?.display || ''}</span>
            <span class="text-slate-400">${gen.series || ''}</span>
          </div>
          <h3 class="text-sm font-bold text-white leading-tight mb-1">${gen.label}</h3>
          <p class="text-[11px] text-slate-400 line-clamp-2">${gen.class || ''}</p>
        </div>
        <div class="mt-3 pt-2.5 border-t border-slate-800/80 text-[10px] font-mono flex items-center justify-between text-slate-400">
          <span title="${img.file || ''}" class="truncate max-w-[180px]">${img.file ? img.file.replace(/^File:/, '') : 'Sin archivo'}</span>
          ${img.sourceUrl ? `<a href="${img.sourceUrl}" target="_blank" class="text-cyan-400 hover:underline">Commons ↗</a>` : ''}
        </div>
      </div>
    `;
  }).join('\n');

  const html = `<!DOCTYPE html>
<html lang="es" class="dark">
<head>
  <meta charset="UTF-8">
  <title>Auditoría Visual de Imágenes — ${brandArg.toUpperCase()} (${generations.length} modelos)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <meta name="referrer" content="no-referrer">
  <style>
    body { background-color: #020617; font-family: system-ui, -apple-system, sans-serif; }
  </style>
</head>
<body class="p-6 text-slate-100 max-w-7xl mx-auto">
  <header class="mb-8 border-b border-slate-800 pb-6 flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-extrabold text-white">Auditoría Visual de Imágenes: <span class="text-cyan-400">${brandArg.toUpperCase()}</span></h1>
      <p class="text-slate-400 text-sm mt-1">Revisión de ángulos frontales, perspectivas y resolución de catálogo (${generations.length} modelos).</p>
    </div>
    <div class="text-right">
      <div class="text-2xl font-black font-mono ${warningsCount === 0 ? 'text-emerald-400' : 'text-amber-400'}">${generations.length - warningsCount} / ${generations.length}</div>
      <div class="text-xs text-slate-400 font-mono">Puntuación de perspectiva óptima</div>
    </div>
  </header>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    ${cardsHtml}
  </div>
</body>
</html>`;

  const outputPath = path.resolve(process.cwd(), `gallery-audit-${brandArg}.html`);
  fs.writeFileSync(outputPath, html, 'utf8');
  console.log(`✅ Auditoría visual generada con éxito: gallery-audit-${brandArg}.html (${generations.length} modelos, ${warningsCount} avisos léxicos).`);
}

main();
