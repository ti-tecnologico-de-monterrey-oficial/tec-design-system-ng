#!/usr/bin/env node
/**
 * Manual fallback sync for the shared `docs/` folder.
 *
 * Under normal conditions, `ui-angular/src/lib/_docs` and `ui-react/src/lib/_docs`
 * are symlinks pointing at the root `docs/` folder, so changes are reflected live.
 *
 * This script is a fallback for environments where symlinks aren't usable
 * (e.g. Windows without symlink privileges, some CI runners, npm pack/publish).
 * It replaces `_docs` (symlink or real folder) in each target with a real,
 * up-to-date copy of `docs/`.
 *
 * Usage: node scripts/sync-docs.mjs
 */
import { cpSync, existsSync, lstatSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const sourceDir = join(rootDir, 'docs');

const targets = [
  join(rootDir, 'ui-angular/_docs'),
  join(rootDir, 'ui-react/_docs'),
];

if (!existsSync(sourceDir)) {
  console.error(`No se encontró la carpeta fuente: ${sourceDir}`);
  process.exit(1);
}

for (const target of targets) {
  if (existsSync(target) || lstatSync(target, { throwIfNoEntry: false })) {
    rmSync(target, { recursive: true, force: true });
  }
  cpSync(sourceDir, target, { recursive: true });
  console.log(`✔ Sincronizado: ${sourceDir} -> ${target}`);
}
