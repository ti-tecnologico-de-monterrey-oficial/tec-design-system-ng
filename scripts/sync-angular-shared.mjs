import {
  cpSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';

const targets = {
  logic: 'ui-angular/src/lib/_shared/logic',
  types: 'ui-angular/src/lib/_shared/types',
  assets: 'ui-angular/src/assets',
};

rmSync('ui-angular/src/lib/_shared', { recursive: true, force: true });
rmSync(targets.assets, { recursive: true, force: true });
mkdirSync('ui-angular/src/lib/_shared', { recursive: true });
cpSync('shared/logic', targets.logic, { recursive: true });
cpSync('shared/types', targets.types, { recursive: true });
cpSync('shared/assets', targets.assets, { recursive: true });

for (const file of [
  `${targets.types}/index.ts`,
  `${targets.logic}/utils.ts`,
  `${targets.logic}/timestreamFilters.ts`,
]) {
  const content = readFileSync(file, 'utf8').replaceAll(
    '../../ui-angular/src/lib/',
    '../../',
  );
  writeFileSync(file, content);
}
