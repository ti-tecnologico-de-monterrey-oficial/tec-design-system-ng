import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const tsPath = join(process.cwd(), 'node_modules/typescript/lib/typescript.js');

if (!existsSync(tsPath)) {
  console.warn('[patch-typescript] typescript.js not found, skipping');
  process.exit(0);
}

const source = readFileSync(tsPath, 'utf8');

const replacements = [
  {
    from: "({ pos, end } = file.referencedFiles[index]);",
    to: "if (!file.referencedFiles[index]) return { file, pos: 0, end: 0, packageId };\n      ({ pos, end } = file.referencedFiles[index]);",
  },
  {
    from: "({ pos, end } = file.typeReferenceDirectives[index]);",
    to: "if (!file.typeReferenceDirectives[index]) return { file, pos: 0, end: 0, packageId };\n      ({ pos, end } = file.typeReferenceDirectives[index]);",
  },
  {
    from: "({ pos, end } = file.libReferenceDirectives[index]);",
    to: "if (!file.libReferenceDirectives[index]) return { file, pos: 0, end: 0, packageId };\n      ({ pos, end } = file.libReferenceDirectives[index]);",
  },
];

let updated = source;
let changed = false;

for (const { from, to } of replacements) {
  if (updated.includes(to)) continue;
  if (updated.includes(from)) {
    updated = updated.replace(from, to);
    changed = true;
  }
}

if (!changed) {
  console.log('[patch-typescript] already patched or pattern not found');
  process.exit(0);
}

writeFileSync(tsPath, updated, 'utf8');
console.log('[patch-typescript] applied');
