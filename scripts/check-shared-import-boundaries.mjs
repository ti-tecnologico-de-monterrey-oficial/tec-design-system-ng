import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const workspaceRoot = fileURLToPath(new URL('../', import.meta.url));
const ignoredDirectories = new Set([
  '.git',
  '.nx',
  'coverage',
  'dist',
  'node_modules',
  'outputs',
  'tmp',
]);
const sourceExtensions = new Set(['.cjs', '.js', '.jsx', '.mjs', '.ts', '.tsx']);
const forbiddenImport = new RegExp('@shared/' + '(?:logic|types)/');
const violations = [];

function scanDirectory(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) {
        scanDirectory(entryPath);
      }
      continue;
    }

      if (
        !entry.isFile() ||
        entry.name.endsWith('.stories.ts') ||
        !sourceExtensions.has(entry.name.slice(entry.name.lastIndexOf('.')))
      ) {
      continue;
    }

    const contents = readFileSync(entryPath, 'utf8');
    for (const [lineIndex, line] of contents.split(/\r?\n/).entries()) {
      if (forbiddenImport.test(line)) {
        violations.push(`${relative(workspaceRoot, entryPath)}:${lineIndex + 1}: ${line.trim()}`);
      }
    }
  }
}

scanDirectory(workspaceRoot);

if (violations.length > 0) {
  console.error('Forbidden shared imports were found:');
  console.error(violations.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Shared import boundary check passed.');
}