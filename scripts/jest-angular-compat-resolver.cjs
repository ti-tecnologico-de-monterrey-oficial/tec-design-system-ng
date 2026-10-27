const { existsSync } = require('node:fs');
const path = require('node:path');

const angularRoot = path.resolve(__dirname, '../ui-angular');
const generatedRoot = path.join(angularRoot, 'src/lib/_shared');
const compatibilityRoot = path.join(angularRoot, 'compat');

function isWithin(root, file) {
  const relative = path.relative(root, file);
  return (
    relative === '' ||
    (!relative.startsWith('..') && !path.isAbsolute(relative))
  );
}

module.exports = (request, options) => {
  // Compatibility sources use the same relative imports as their generated copies.
  const basedir = isWithin(compatibilityRoot, options.basedir)
    ? path.join(
        generatedRoot,
        path.relative(compatibilityRoot, options.basedir),
      )
    : options.basedir;
  const resolved = options.defaultResolver(request, { ...options, basedir });

  // Instrument the maintained source so LCOV matches the path analyzed by Sonar.
  // Shared core modules and test files continue to use their generated locations.
  if (
    isWithin(generatedRoot, resolved) &&
    !/\.(spec|test)\.ts$/.test(resolved)
  ) {
    const original = path.join(
      compatibilityRoot,
      path.relative(generatedRoot, resolved),
    );
    if (existsSync(original)) return original;
  }

  return resolved;
};
