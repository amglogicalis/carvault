import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

function run(cmd: string, cwd = process.cwd()) {
  console.log(`> ${cmd}`);
  execSync(cmd, { cwd, stdio: 'inherit' });
}

function main() {
  const rootDir = process.cwd();
  const tempDir = path.join(rootDir, '..', 'carvault-gh-pages-temp');

  console.log('--- DEPLOY TO GH-PAGES ---');
  if (fs.existsSync(tempDir)) {
    try {
      run(`git worktree remove --force "${tempDir}"`, rootDir);
    } catch {}
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }

  // 1. Crear worktree de gh-pages
  run(`git worktree add "${tempDir}" gh-pages`, rootDir);

  // 2. Limpiar contenido previo en tempDir (manteniendo .git)
  const items = fs.readdirSync(tempDir);
  for (const item of items) {
    if (item === '.git') continue;
    fs.rmSync(path.join(tempDir, item), { recursive: true, force: true });
  }

  // 3. Copiar dist/client/* a tempDir
  const distDir = path.join(rootDir, 'dist', 'client');
  const distItems = fs.readdirSync(distDir);
  for (const item of distItems) {
    const src = path.join(distDir, item);
    const dest = path.join(tempDir, item);
    fs.cpSync(src, dest, { recursive: true });
  }

  // Asegurar .nojekyll
  fs.writeFileSync(path.join(tempDir, '.nojekyll'), '', 'utf8');

  // 4. Commit y Push en tempDir
  try {
    run('git add -A', tempDir);
    run('git commit -m "deploy: add Mercedes-Benz brand, catalog, API, engines and tools"', tempDir);
    run('git push origin gh-pages', tempDir);
    console.log('✅ Despliegue en gh-pages exitoso!');
  } catch (e: any) {
    console.log('Notice during commit/push:', e.message);
  } finally {
    // 5. Limpiar worktree
    try {
      run(`git worktree remove --force "${tempDir}"`, rootDir);
    } catch {}
  }
}

main();
