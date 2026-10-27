import {
  cpSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
import ts from 'typescript';

const root = fileURLToPath(new URL('../', import.meta.url));
mkdirSync(path.join(root, 'tmp'), { recursive: true });
const fixture = mkdtempSync(path.join(root, 'tmp', 'react-consumer-'));
const modules = path.join(fixture, 'node_modules');
const packageRoot = path.join(modules, 'ui-react');
mkdirSync(packageRoot, { recursive: true });
for (const entry of ['index.mjs', 'index.d.ts', 'package.json', 'lib']) {
  cpSync(
    path.join(root, 'dist/ui-react', entry),
    path.join(packageRoot, entry),
    { recursive: true },
  );
}
const manifest = JSON.parse(
  readFileSync(path.join(packageRoot, 'package.json'), 'utf8'),
);
assert.equal(manifest.exports['.'].types, './index.d.ts');
assert.ok(manifest.dependencies['@types/luxon']);
// Only React and declaration dependencies are available to this consumer.
for (const dependency of ['react', '@types/react', '@types/luxon', 'csstype']) {
  cpSync(
    path.join(root, 'node_modules', dependency),
    path.join(modules, dependency),
    { recursive: true },
  );
}
writeFileSync(
  path.join(fixture, 'package.json'),
  JSON.stringify({ private: true, type: 'module' }),
);
const consumer = path.join(fixture, 'consumer.mts');
writeFileSync(
  consumer,
  `
import { BmbCore, BmbSimpleText, BmbBadge } from 'ui-react';
import type { ReactNode } from 'react';
const message: BmbCore.BmbTemplateMessage<ReactNode> = {
  id: 'a', type: 'template', timestamp: new Date(), isUser: false,
  content: { template: 'React content' }
};
const modal: BmbCore.ModalDataConfig<ReactNode> = { content: 'content' };
const column: BmbCore.TableColum<ReactNode> = { label: 'A', def: 'a', dataKey: 'a', cellTemplate: 'cell' };
const normalized: BmbCore.TableColum<ReactNode>[] = BmbCore.normalizeTablesColumns([column]);
BmbCore.getDatepickerValidationResult('15/06/2024', 'dd/MM/yyyy', (value: string) => value ? null : { required: true }, '15/06/2024', '');
void [message, modal, column, normalized, BmbSimpleText, BmbBadge];
`,
);
const options = {
  noEmit: true,
  strict: true,
  skipLibCheck: false,
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.NodeNext,
  moduleResolution: ts.ModuleResolutionKind.NodeNext,
  types: [],
};
const host = ts.createCompilerHost(options);
const originalFileExists = host.fileExists.bind(host);
// Prevent resolution from borrowing any hoisted packages from the workspace.
host.fileExists = (file) => {
  const normalized = file.replaceAll('\\', '/');
  if (
    normalized.includes('/node_modules/') &&
    !normalized.startsWith(fixture.replaceAll('\\', '/') + '/') &&
    !normalized.includes('/node_modules/typescript/lib/')
  )
    return false;
  return originalFileExists(file);
};
const program = ts.createProgram([consumer], options, host);
const diagnostics = ts.getPreEmitDiagnostics(program);
if (diagnostics.length) {
  console.error(
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (name) => name,
      getCurrentDirectory: () => root,
      getNewLine: () => '\n',
    }),
  );
  process.exitCode = 1;
} else {
  const built = await import(
    pathToFileURL(path.join(packageRoot, 'index.mjs')).href
  );
  assert.deepEqual(built.BmbCore.getInitialFieldValue('file', true), [null]);
  assert.equal(
    built.BmbCore.translateDictionary(
      { common: { save: 'Save' } },
      'common.save',
    ),
    'Save',
  );
  assert.equal(typeof built.BmbSimpleText, 'function');
  assert.equal(typeof built.BmbBadge, 'function');
  console.log(
    'React package types and runtime passed in a consumer without Angular or hoisted workspace dependencies.',
  );
}
