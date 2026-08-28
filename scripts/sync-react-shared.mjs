import { rmSync, mkdirSync, cpSync } from 'node:fs';

const target = 'dist/ui-react/assets/shared';

try {
  rmSync(target, { recursive: true, force: true });
} catch (error) {
  // Ignore errors if directory doesn't exist
}

mkdirSync('dist/ui-react/assets', { recursive: true });
cpSync('shared/assets', target, { recursive: true });
console.log('Successfully synchronized shared assets to ui-react.');
