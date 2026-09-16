import { createServer } from 'http-server';

/**
 * Levanta un http-server estático simple para servir un build de Storybook
 * (u otro directorio estático) y lo detiene con `stop()`.
 */
export async function startStaticServer(root, port) {
  const server = createServer({ root, cache: -1 });
  await new Promise((resolve, reject) => {
    server.listen(port, (err) => (err ? reject(err) : resolve()));
  });
  return {
    baseUrl: `http://127.0.0.1:${port}/`,
    stop: () => new Promise((resolve) => server.close(resolve)),
  };
}
