import { readdir, readFile, writeFile, mkdir, access } from 'fs/promises';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const parent = dirname(process.cwd());

// Configuración
const LIB_ROOT = join(process.cwd(), 'projects', 'ds-ng', 'src', 'lib');
const WIKI_OUTPUT_DIR = join(parent, 'tec-design-system-ng.wiki');

console.log(WIKI_OUTPUT_DIR);

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

  console.log(
    `🔍 Revisando ${dir}, encontrados hasta ahora: ${readmes.length}`,
  );

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
async function copyReadmeToWiki(readmePath, type) {
  const componentDir = dirname(readmePath);
  const componentName = basename(componentDir);
  const destPath = join(WIKI_OUTPUT_DIR, `${type}-${componentName}.md`);

  console.log(`📄 Copiando ${readmePath} → ${type}-${componentName}.md`);

  const content = await readFile(readmePath, 'utf8');

  // Opcional: agregar título automático
  // const outputContent = `# ${componentName}\n\n${content}`;
  const outputContent = content;

  await writeFile(destPath, outputContent, 'utf8');
}

function linkGenerator(files) {
  return files.map((file) => {
    const title = file.folderName
      .replace(/^bmb-/, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
    return `- [${title}](${file.type}-${file.folderName})`;
  }).join('\n');
}

async function generateSidebar(componentNames) {
  if (componentNames.length === 0) {
    console.log('ℹ️  No hay componentes para incluir en el sidebar.');
    return;
  }

  const sortedNames = [...componentNames].sort((a, b) =>
    a.folderName.toLowerCase().localeCompare(b.folderName.toLowerCase()),
  );

  const sidebarContent = `# 📋 Índice

- [[Home]]
- [[Bienvenido]]
- [[Migración del Notification card a la versión 1.5.0]]
- [[What's new]]

## 📦 Componentes de Bamboo

${linkGenerator(sortedNames.filter((item) => item.type === 'Component'))}

## 📐 Directivas de Bamboo
${linkGenerator(sortedNames.filter((item) => item.type === 'Directive'))}

## 🛠️ Servicios de Bamboo
${linkGenerator(sortedNames.filter((item) => item.type === 'Service'))}
`;

  const sidebarPath = join(WIKI_OUTPUT_DIR, '_Sidebar.md');
  await writeFile(sidebarPath, sidebarContent, 'utf8');
  console.log('✅ Sidebar generado: _Sidebar.md');
}

// ✅ Ejecución principal
async function main() {
  console.log('🔍 Buscando README.md en:', LIB_ROOT);

  try {
    await ensureDir(WIKI_OUTPUT_DIR);

    const readmeFiles = await findReadmes(LIB_ROOT);

    if (readmeFiles.length === 0) {
      console.log(
        '⚠️  No se encontraron archivos README.md en la carpeta lib.',
      );
      return;
    }

    console.log(`✅ Encontrados ${readmeFiles.length} archivos README.md`);

    const componentNames = [];
    for (const readme of readmeFiles) {
      const componentDir = dirname(readme);
      const folderName = basename(componentDir);
      let type = 'Component';
      if (componentDir.includes('directives')) type = 'Directive';
      else if (componentDir.includes('services')) type = 'Service';

      componentNames.push({ folderName, type });

      await copyReadmeToWiki(readme, type);
    }

    await generateSidebar(componentNames);

    // for (const readme of readmeFiles) {

    // }

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
