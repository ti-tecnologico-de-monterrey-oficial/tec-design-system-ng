import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Lee el `index.json` que Storybook genera en cada build estático y
 * devuelve la lista de URLs (iframe.html?id=...) a auditar con Lighthouse.
 *
 * @param {string} staticDir carpeta del build estático de Storybook
 * @param {string} baseUrl origen donde ese build está siendo servido (http-server)
 * @param {number} [limit] límite opcional de historias a incluir (para correr más rápido)
 */
export async function resolveStorybookTargets(staticDir, baseUrl, limit) {
  const indexPath = join(staticDir, 'index.json');
  if (!existsSync(indexPath)) {
    throw new Error(
      `No se encontró ${indexPath}. Corre primero el build estático de Storybook ` +
        `(npm run storybook:build:angular / storybook:build:react).`
    );
  }

  const raw = JSON.parse(await readFile(indexPath, 'utf-8'));
  const entries = Object.values(raw.entries ?? raw.stories ?? {});

  const stories = entries.filter((e) => e.type === 'story');
  const limited = limit ? stories.slice(0, limit) : stories;

  return limited.map((story) => ({
    name: story.title ? `${story.title} / ${story.name}` : story.id,
    url: new URL(
      `iframe.html?id=${story.id}&viewMode=story`,
      baseUrl
    ).toString(),
  }));
}
