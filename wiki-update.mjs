import { readdir, readFile, writeFile, mkdir, access } from 'fs/promises';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const parent = dirname(process.cwd());

// Configuración
const LIB_ROOT = join(process.cwd(), 'projects', 'ds-ng', 'src', 'lib');
const WIKI_OUTPUT_DIR = join(process.cwd(), 'tec-design-system-ng.wiki');

async function findReadmes(dir) {
  let readmes = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      readmes = readmes.concat(await findReadmes(fullPath));
    } else if (entry.isFile() && entry.name.toLowerCase() === 'readme.md') {
      readmes.push(fullPath);
    }
  }

  console.log(`🔍 Revisando ${dir}, encontrados hasta ahora: ${readmes.length}`);

  return readmes;
}

/**
 * Asegura que un directorio exista (lo crea si no existe).
 * @param {string} dir
 */
async function ensureDir(dir) {
  try {
    await access(dir);
  } catch {
    await mkdir(dir, { recursive: true });
  }
}

/**
 * Copia un README.md a la wiki con el nombre de su carpeta contenedora.
 * @param {string} readmePath
 */
async function copyReadmeToWiki(readmePath) {
  const componentDir = dirname(readmePath);
  const componentName = basename(componentDir);
  const destPath = join(WIKI_OUTPUT_DIR, `${componentName}.md`);

  console.log(`📄 Copiando ${readmePath} → ${componentName}.md`);

  const content = await readFile(readmePath, 'utf8');

  // Opcional: agregar título automático
  // const outputContent = `# ${componentName}\n\n${content}`;
  const outputContent = content;

  await writeFile(destPath, outputContent, 'utf8');
}

// ✅ Ejecución principal
async function main() {
  console.log('🔍 Buscando README.md en:', LIB_ROOT);

  try {
    await ensureDir(WIKI_OUTPUT_DIR);

    const readmeFiles = await findReadmes(LIB_ROOT);

    if (readmeFiles.length === 0) {
      console.log('⚠️  No se encontraron archivos README.md en la carpeta lib.');
      return;
    }

    console.log(`✅ Encontrados ${readmeFiles.length} archivos README.md`);

    for (const readme of readmeFiles) {
      await copyReadmeToWiki(readme);
    }

    console.log(`🎉 Wiki actualizada en: ${WIKI_OUTPUT_DIR}`);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

main();

// Ejecutar si se llama directamente
// if (typeof require !== 'undefined' && require.main === module) {
//   main();
// }
