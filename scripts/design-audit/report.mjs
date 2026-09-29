import { join } from 'node:path';
import { escape as e } from './compare.mjs';
const uri = (b) => `data:image/png;base64,${b.toString('base64')}`;

export async function makeReport(page, report, out, options = {}) {
  const visual = await page.evaluate(
    async ({ a, b, threshold, boxes }) => {
      const load = (src) =>
        new Promise((resolve, reject) => {
          const i = new Image();
          i.onload = () => resolve(i);
          i.onerror = () => reject(new Error('Imagen inválida'));
          i.src = src;
        });
      const [left, right] = await Promise.all([load(a), load(b)]);
      const width = Math.max(left.width, right.width),
        height = Math.max(left.height, right.height);
      if (width * height > 16000000)
        throw new Error(
          'El frame supera 16 megapíxeles; selecciona una pieza menor.',
        );
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      const pixels = (image) => {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(image, 0, 0);
        return ctx.getImageData(0, 0, width, height);
      };
      const x = pixels(left),
        y = pixels(right),
        diff = ctx.createImageData(width, height);
      let changed = 0;
      for (let i = 0; i < x.data.length; i += 4) {
        const different = [0, 1, 2].some(
          (k) => Math.abs(x.data[i + k] - y.data[i + k]) > threshold,
        );
        if (different) changed++;
        diff.data.set(
          different
            ? [235, 0, 90, 255]
            : [y.data[i], y.data[i + 1], y.data[i + 2], 100],
          i,
        );
      }
      ctx.putImageData(diff, 0, 0);
      const difference = canvas.toDataURL();
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 0.5;
      ctx.drawImage(left, 0, 0);
      ctx.drawImage(right, 0, 0);
      ctx.globalAlpha = 1;
      const overlay = canvas.toDataURL();
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(right, 0, 0);
      ctx.strokeStyle = '#e00050';
      ctx.fillStyle = '#e00050';
      ctx.lineWidth = 2;
      ctx.font = 'bold 14px Arial';
      boxes.forEach((box, i) => {
        ctx.strokeRect(
          box.x + 1,
          box.y + 1,
          Math.max(1, box.width - 2),
          Math.max(1, box.height - 2),
        );
        ctx.fillText(String(i + 1), box.x + 4, box.y + 16);
      });
      return {
        ratio: changed / (width * height),
        difference,
        overlay,
        annotated: canvas.toDataURL(),
        sizes: [
          [left.width, left.height],
          [right.width, right.height],
        ],
      };
    },
    {
      a: uri(report.expectedImage),
      b: uri(report.actualImage),
      threshold: report.tolerance.channel,
      boxes: report.findings.map((f) => f.box),
    },
  );
  const image = (src, label) =>
    `<figure><figcaption>${e(label)}</figcaption><img src="${src}"></figure>`;
  const html = `<!doctype html><html lang="es"><meta charset="utf-8"><title>Auditoría de diseño</title><style>body{font:12px Arial;color:#16263d;line-height:1.5}h1{font-size:28px}h2{font-size:18px}.pair{display:flex;gap:12px}.pair figure{width:48%}figure{margin:10px 0;break-inside:avoid}img{max-width:100%;max-height:420px;object-fit:contain;border:1px solid #ddd}figcaption{font-weight:bold}table{width:100%;border-collapse:collapse;table-layout:fixed;font-size:10px}td,th{padding:7px;border:1px solid #ccc;overflow-wrap:anywhere}tr{break-inside:avoid}a{color:#005a9c}.page{break-before:page}</style>
  <h1>${e(report.entry.title)} / ${e(report.entry.name)}</h1><p>Figma: ${e(report.node.name)} · ${report.findings.length} diferencias detectadas.</p>
  <p><a href="${e(report.figmaUrl)}">Abrir Figma</a> · <a href="${e(report.storyUrl)}">Abrir Storybook / Chromatic</a></p><p>Versión Figma: ${e(report.version)} · ${new Date().toISOString()} · viewport ${report.viewport.width} × ${report.viewport.height}</p>
  <div class="pair">${image(uri(report.expectedImage), 'Figma · esperado')}${image(uri(report.actualImage), 'Storybook · encontrado')}</div>
  <h2 class="page">Ajustes recomendados</h2>${image(visual.annotated, 'Ubicación de los hallazgos estructurales (números de tabla)')}
  <table><thead><tr><th># / capa / propiedad</th><th>Esperado</th><th>Encontrado</th><th>Ajuste recomendado</th></tr></thead><tbody>${report.findings.map((f, i) => `<tr><td>${i + 1}. ${e(f.layer)}<br>${e(f.property)}</td><td>${e(f.expected)}</td><td>${e(f.actual)}</td><td>${e(f.recommendation)}</td></tr>`).join('')}</tbody></table>
  <p>Tolerancias: ${report.tolerance.numeric} unidades numéricas.</p></html>`;
  if (options.fragment) return { ...visual, html };
  await page.setContent(html, { waitUntil: 'load' });
  await page.pdf({
    path: join(out, 'reporte.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: '12mm', bottom: '12mm', left: '12mm', right: '12mm' },
  });
  return visual;
}

export async function makeBatchReport(page, batch, out) {
  const { sections } = batch;
  if (!sections.length) return false;
  const css =
    sections[0]?.match(/<style>([\s\S]*?)<\/style>/)?.[1] ??
    'body{font:12px Arial}img{max-width:100%}';
  const html = `<!doctype html><html lang="es"><meta charset="utf-8"><title>Auditoría de variantes</title><style>${css} section{break-before:page}td{overflow-wrap:anywhere}</style>
  <h1>Diferencias entre Figma y HTML</h1><p>${sections.length} variantes con diferencias detectadas.</p>
  ${sections.map((html) => `<section>${html.slice(html.indexOf('<h1>')).replace(/<\/html>\s*$/, '')}</section>`).join('')}</html>`;
  await page.setContent(html, { waitUntil: 'load' });
  await page.pdf({
    path: join(out, 'reporte.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: '12mm', bottom: '12mm', left: '12mm', right: '12mm' },
  });
}
