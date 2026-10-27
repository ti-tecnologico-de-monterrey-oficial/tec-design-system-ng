import ts from 'typescript';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const configPath = fileURLToPath(
  new URL('../ui-angular/tsconfig.lib.json', import.meta.url),
);
const config = ts.readConfigFile(configPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(
  config.config,
  ts.sys,
  fileURLToPath(new URL('../ui-angular/', import.meta.url)),
);
const program = ts.createProgram(
  [
    fileURLToPath(
      new URL(
        '../ui-angular/src/compatibility-contracts.spec.ts',
        import.meta.url,
      ),
    ),
  ],
  {
    ...parsed.options,
    noEmit: true,
    types: ['jest', 'node'],
  },
);
const diagnostics = [...parsed.errors, ...ts.getPreEmitDiagnostics(program)];
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
  console.log(
    'Existing Angular template, modal, table, notice, projection and message contracts type-checked.',
  );
}
