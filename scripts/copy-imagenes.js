/**
 * Copia la carpeta imagenes/ (raíz) a public/imagenes/
 * para que Vite las incluya en el build y se sirvan en producción.
 * Ejecutar antes del build (prebuild) o manualmente: node scripts/copy-imagenes.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'imagenes');
const destDir = path.join(root, 'public', 'imagenes');

if (!fs.existsSync(srcDir)) {
  console.warn('No existe la carpeta imagenes/ en la raíz. Coloca ahí las imágenes o en public/imagenes/.');
  process.exit(0);
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

let count = 0;
for (const name of fs.readdirSync(srcDir)) {
  if (name.startsWith('.')) continue;
  const from = path.join(srcDir, name);
  if (!fs.statSync(from).isFile()) continue;
  const to = path.join(destDir, name);
  fs.copyFileSync(from, to);
  count++;
  console.log('  Copiado:', name);
}

console.log(`\nListo: ${count} archivo(s) copiado(s) a public/imagenes/`);
