import ts from 'typescript';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const files = ts.sys.readDirectory(
  path.join(root, 'shared'),
  ['.ts'],
  ['**/*.spec.ts', '**/*.test.ts'],
  ['logic/**/*.ts', 'types/**/*.ts'],
);
const options = {
  noEmit: true,
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  types: [],
  skipLibCheck: true,
  esModuleInterop: true,
};
const host = ts.createCompilerHost(options);
// Reject framework resolution even when dependencies happen to be hoisted here.
host.resolveModuleNames = (names, containingFile) =>
  names.map((name) => {
    if (/^(?:@angular\/|react(?:\/|$)|react-dom(?:\/|$))/.test(name)) {
      throw new Error(
        `Framework dependency in neutral graph: ${containingFile} -> ${name}`,
      );
    }
    return ts.resolveModuleName(name, containingFile, options, host)
      .resolvedModule;
  });
const program = ts.createProgram(files, options, host);
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
  console.log(
    `Neutral production graph type-checked (${files.length} source files) with framework resolution disabled.`,
  );
}
