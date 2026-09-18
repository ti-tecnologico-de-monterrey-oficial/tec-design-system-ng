import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createGzip } from 'node:zlib';
import { extname, join } from 'node:path';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

// Solo comprime texto: los binarios (imágenes/fuentes) ya vienen comprimidos.
const COMPRESSIBLE = new Set(['.html', '.js', '.mjs', '.css', '.json', '.svg']);

/**
 * Servidor estático mínimo con fallback a index.html para rutas de un SPA
 * (Angular Router usa rutas del lado del cliente, no existen como archivos)
 * y con gzip para assets de texto — sin esto, Lighthouse mide contra bytes
 * sin comprimir y el LCP queda artificialmente inflado vs. un servidor real
 * (Nginx/CDN) que siempre sirve JS/CSS comprimidos.
 */
export function startSpaStaticServer(root, port) {
  if (!existsSync(join(root, 'index.html'))) {
    throw new Error(
      `No se encontró index.html en ${root}. Corre primero el build de producción.`
    );
  }

  const server = createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    let filePath = join(root, urlPath);
    if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
      filePath = join(root, 'index.html');
    }

    const ext = extname(filePath);
    res.setHeader('Content-Type', MIME[ext] ?? 'application/octet-stream');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

    const acceptsGzip = (req.headers['accept-encoding'] ?? '').includes('gzip');
    if (acceptsGzip && COMPRESSIBLE.has(ext)) {
      res.setHeader('Content-Encoding', 'gzip');
      createReadStream(filePath).pipe(createGzip()).pipe(res);
    } else {
      createReadStream(filePath).pipe(res);
    }
  });

  return new Promise((resolve) => {
    server.listen(port, () => {
      resolve({
        baseUrl: `http://127.0.0.1:${port}/`,
        stop: () => new Promise((res) => server.close(res)),
      });
    });
  });
}
