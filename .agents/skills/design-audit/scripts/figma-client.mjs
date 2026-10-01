import { figmaError } from './compare.mjs';

export async function requestFigma(
  path,
  params,
  token,
  {
    fetchImpl = fetch,
    log = () => {},
    timeoutMs = null,
    attempts = 2,
    heartbeatMs = 15000,
    sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    oauth = process.env.FIGMA_AUTH_TYPE === 'oauth',
  } = {},
) {
  const stage = path.startsWith('images/')
    ? 'generar imágenes'
    : path.endsWith('/nodes')
      ? 'leer componentes'
      : 'localizar la sección de variantes';
  for (let attempt = 1; attempt <= attempts; attempt++) {
    log(
      `Figma: ${stage} (intento ${attempt}/${attempts}, máximo ${timeoutMs / 1000} s).`,
    );
    const start = Date.now();
    const timer = setInterval(
      () =>
        log(
          `Figma sigue procesando: ${stage} (${Math.round((Date.now() - start) / 1000)} s).`,
        ),
      heartbeatMs,
    );
    try {
      const response = await fetchImpl(
        `https://api.figma.com/v1/${path}?${new URLSearchParams(params)}`,
        {
          headers: oauth
            ? { Authorization: `Bearer ${token}` }
            : { 'X-Figma-Token': token },
          ...(timeoutMs ? { signal: AbortSignal.timeout(timeoutMs) } : {}),
          redirect: 'error',
        },
      );
      if (!response.ok) {
        const body = await response.json().catch((error) => {
          if (['TimeoutError', 'AbortError'].includes(error.name)) throw error;
          return {};
        });
        const error = new Error(figmaError(response.status, body));
        error.status = response.status;
        if (response.status === 429)
          error.message += ` Espera ${response.headers.get('retry-after') ?? 'el plazo indicado por Figma'} segundos antes de volver a ejecutar.`;
        throw error;
      }
      const data = await response.json();
      log(`Figma: ${stage}, listo.`);
      return data;
    } catch (error) {
      const timedOut = ['TimeoutError', 'AbortError'].includes(error.name);
      const transient =
        timedOut || error instanceof TypeError || error.status >= 500;
      if (!transient) throw error;
      if (attempt === attempts)
        throw new Error(
          `Figma no pudo completar «${stage}» después de ${attempts} intentos${timedOut ? ` de hasta ${timeoutMs / 1000} s` : ''}. ${timedOut ? 'Se agotó el tiempo de respuesta.' : 'Falló la conexión o el servicio.'} Vuelve a intentarlo más tarde; este error no indica que el token sea inválido.`,
        );
      log(
        `Figma: ${timedOut ? 'respuesta demasiado lenta' : 'fallo temporal'}; reintentando en 2 segundos…`,
      );
    } finally {
      clearInterval(timer);
    }
    await sleep(2000);
  }
}
