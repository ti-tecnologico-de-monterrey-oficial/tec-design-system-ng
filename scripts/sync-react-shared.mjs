import { rmSync, mkdirSync, cpSync } from 'node:fs';

const sharedTarget = 'ui-react/src/lib/_shared';
const sharedLogicTarget = `${sharedTarget}/logic`;
const sharedTypesTarget = `${sharedTarget}/types`;
const sharedAssetsTarget = 'dist/ui-react/assets/shared';

try {
  rmSync(sharedTarget, { recursive: true, force: true });
  rmSync(sharedAssetsTarget, { recursive: true, force: true });
} catch (error) {
  // Ignore errors if directory doesn't exist
}

mkdirSync(sharedTarget, { recursive: true });
mkdirSync('dist/ui-react/assets', { recursive: true });
cpSync('shared/logic', sharedLogicTarget, { recursive: true });
cpSync('shared/types', sharedTypesTarget, { recursive: true });
cpSync('shared/assets', sharedAssetsTarget, { recursive: true });
console.log('Successfully synchronized shared logic, types, and assets to ui-react.');
