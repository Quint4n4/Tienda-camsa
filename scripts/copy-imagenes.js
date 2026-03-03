/**
 * Copia la carpeta imagenes/ (raíz) a public/imagenes/
 * y, si está disponible la librería `sharp`, optimiza las imágenes
 * (resize máximo y compresión) para que pesen menos en producción.
 *
 * Ejecutar antes del build (prebuild) o manualmente: node scripts/copy-imagenes.js
 * Para habilitar la optimización instala sharp localmente:
 *   npm install sharp --save-dev
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'imagenes');
const destDir = path.join(root, 'public', 'imagenes');

let sharp;
let sharpAvailable = false;

try {
  // `sharp` es opcional: si no está instalado, simplemente copiamos los archivos.
  const mod = await import('sharp');
  sharp = mod.default ?? mod;
  sharpAvailable = true;
} catch {
  console.warn('[copy-imagenes] sharp no está instalado. Se copiarán las imágenes sin optimizar.');
}

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
  const ext = path.extname(name).toLowerCase();

  if (!sharpAvailable || !['.jpg', '.jpeg', '.png'].includes(ext)) {
    fs.copyFileSync(from, to);
    count++;
    console.log('  Copiado (sin cambios):', name);
    continue;
  }

  try {
    const image = sharp(from);
    const metadata = await image.metadata();

    const MAX_SIZE = 1200;
    let pipeline = image;

    if ((metadata.width ?? 0) > MAX_SIZE || (metadata.height ?? 0) > MAX_SIZE) {
      pipeline = pipeline.resize(MAX_SIZE, MAX_SIZE, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    if (ext === '.png') {
      pipeline = pipeline.png({ quality: 80, compressionLevel: 8 });
    } else {
      pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
    }

    await pipeline.toFile(to);
    count++;
    console.log('  Optimizada:', name);
  } catch (err) {
    console.warn('  No se pudo optimizar, copiando original:', name, err?.message ?? err);
    fs.copyFileSync(from, to);
    count++;
  }
}

console.log(`\nListo: ${count} archivo(s) procesado(s) en public/imagenes/`);
