import { associateByContent, associateByProperties, contentFeatures } from './content-matching.mjs';
import { auditMode } from './scope.mjs';
import { componentHandle, waitForStoryReady, renderedComponents, readDom } from './capture.mjs';
import { requestFigma } from './figma-client.mjs';
import {
  fingerprint,
  matchByAppearance,
  captureForMatching,
} from './matching.mjs';
import 'dotenv/config';
import { createInterface } from 'node:readline/promises';
import { Writable } from 'node:stream';
import { mkdir, access } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { chromium } from '@playwright/test';
import { figmaLink, storyLink, flatten, compareInterior } from './compare.mjs';
import { makeReport, makeBatchReport } from './report.mjs';
import {
  discoverStories,
  isSharedReference,
  collapseIdenticalVariants,
  selectedFigmaNode,
  discoverScopeVariants,
  associateVariants,
} from './discovery.mjs';

// Suppress terminal echo for credentials; never put them in command arguments/files.
let muted = false;
const output = new Writable({
  write(chunk, encoding, done) {
    if (!muted) process.stdout.write(chunk, encoding);
    done();
  },
});
const rl = createInterface({
  input: process.stdin,
  output,
  terminal: !!process.stdin.isTTY,
});
rl.on('SIGINT', () => {
  rl.close();
  process.exit(130);
});
async function ask(label, secret = false) {
  if (!process.stdin.isTTY)
    throw new Error(
      'Ejecuta npm run audit:design en una terminal interactiva.',
    );
  // Keep the label on its own line: readline redraws the input line.
  process.stdout.write(label + '\n');
  if (secret) process.stdout.write('> ');
  muted = secret;
  try {
    return (await rl.question(secret ? '' : '> ')).trim();
  } finally {
    muted = false;
    if (secret) process.stdout.write('\n');
  }
}
async function link(label, parser) {
  if (!process.stdin.isTTY)
    throw new Error(
      'Ejecuta npm run audit:design en una terminal interactiva.',
    );
  while (true) {
    try {
      return parser(await ask(label));
    } catch (e) {
      console.log(e.message);
    }
  }
}
const api = requestFigma;
async function browserOptions() {
  if (process.env.DESIGN_AUDIT_CHROME_PATH)
    return { executablePath: process.env.DESIGN_AUDIT_CHROME_PATH };
  try {
    await access(chromium.executablePath());
    return {};
  } catch {}
  const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  try {
    await access(chrome);
    return { executablePath: chrome };
  } catch {
    throw new Error(
      'Instala el navegador una vez: npm exec playwright install chromium',
    );
  }
}
const numeric = (name, fallback, max) => {
  const value = Number(process.env[name] ?? fallback);
  if (!Number.isFinite(value) || value < 0 || value > max)
    throw new Error(`${name} inválido.`);
  return value;
};

function storyFrame(story, id) {
  const url = new URL('iframe.html', story.base);
  for (const [key, value] of Object.entries({ id, viewMode: 'story', args: story.args, globals: story.globals })) {
    if (value) url.searchParams.set(key, value);
  }
  return url;
}

async function main() {
  console.log('\nAuditor de diseño · Figma ↔ Storybook\n');
  const design = await link('Enlace de Figma:', figmaLink);
  let story = await link('Enlace de Storybook / Chromatic:', storyLink);
  if (process.env.FIGMA_ACCESS_TOKEN)
    console.log('Usando FIGMA_ACCESS_TOKEN del entorno o .env.');
  let token =
    process.env.FIGMA_ACCESS_TOKEN ||
    (await ask('Token de Figma (entrada oculta, no se guarda):', true));
  console.log('Consultando Figma…');
  let data;
  while (!data) {
    try {
      data = await api(
        `files/${design.fileKey}/nodes`,
        { ids: design.nodeId },
        token,
      );
    } catch (e) {
      if (![401, 403].includes(e.status)) throw e;
      console.log(e.message);
      token = await ask('Token vigente de Figma (oculto):', true);
    }
  }
  const selectedNode = selectedFigmaNode(data, design.nodeId);
  const selectedName = selectedNode.name;
  console.log(
    `Alcance Figma: “${selectedName}” (${design.nodeId}). Solo se revisará este nodo y su contenido.`,
  );
  let variants = collapseIdenticalVariants(
    discoverScopeVariants(selectedNode, selectedName),
  );
  if (!variants.length)
    throw new Error(
      'No se encontraron componentes o frames en la selección de Figma.',
    );
  const browser = await chromium.launch({
    ...(await browserOptions()),
    headless: false,
  });
  try {
    const context = await browser.newContext({
      deviceScaleFactor: 1,
      viewport: {
        width: 1280,
        height: 800,
      },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    page.setDefaultTimeout(30000);
    let index;
    while (!index) {
      await page.goto(story.base, { waitUntil: 'domcontentloaded' });
      const readIndex = async () => {
        try {
          const response = await context.request.get(
            new URL('index.json', story.base).href,
          );
          if (!response.ok()) return null;
          return (await response.json()).entries;
        } catch {
          return null;
        }
      };
      index = await readIndex();
      if (!index) {
        console.log(
          'No pude leer Storybook. Si es privado, inicia sesión tú en la ventana abierta; la sesión solo vive durante esta ejecución.',
        );
        story = await link(
          'Después del acceso, pega el enlace de la historia publicada:',
          storyLink,
        );
        continue;
      }
    }
    // Read explicit embedded story IDs too, for MDX docs whose titles differ.
    const referencedIds = [];
    if (index[story.id]?.type === 'docs') {
      const docsUrl = new URL('iframe.html', story.base);
      docsUrl.searchParams.set('id', story.id);
      docsUrl.searchParams.set('viewMode', 'docs');
      try {
        await page.goto(docsUrl.href, {
          waitUntil: 'domcontentloaded',
          timeout: 30000,
        });
        await page.locator('#storybook-docs').waitFor({ state: 'visible' });
        referencedIds.push(
          ...(await page.evaluate(() => {
            const ids = [
              ...document.querySelectorAll('[data-story-block]'),
            ].map((el) => el.getAttribute('data-story-block'));
            for (const el of document.querySelectorAll('iframe[src],a[href]')) {
              const u = new URL(
                el.getAttribute('src') ?? el.getAttribute('href'),
                location.href,
              );
              const id =
                u.searchParams.get('id') ??
                u.searchParams.get('path')?.replace(/^\/story\//, '');
              if (id) ids.push(id);
            }
            return ids;
          })),
        );
      } catch {
        console.log(
          'La documentación no terminó de cargar; se usarán las entradas de su índice.',
        );
      }
    }
    const entries = discoverStories(index, story, referencedIds);
    if (!entries.length)
      throw new Error(
        'No se encontraron historias asociadas a esta documentación.',
      );
    const cases = [], features = new Map();
    for (const source of entries) {
      const entry = { ...source, auditMode: auditMode(source, selectedNode) };
      console.log(`Cargando ${entry.title} / ${entry.name} (${entry.auditMode})…`);
      try {
        await page.goto(storyFrame(story, entry.id).href, { waitUntil: 'domcontentloaded' });
        await waitForStoryReady(page);
        const roots = await renderedComponents(page, entry);
        if (!roots.length) throw new Error('No se encontraron instancias visibles.');
        for (let i = 0; i < roots.length; i++) {
          const unit = { ...entry, unitIndex: i, caseId: entry.id + ':' + i,
            name: roots.length > 1 ? `${entry.name} / instancia ${i + 1}` : entry.name };
          features.set(unit.caseId, await contentFeatures(page, unit, componentHandle));
          const uniqueRequestedPair = entries.length === 1 && roots.length === 1;
          cases.push(...(variants.length === 1 && !uniqueRequestedPair
            ? [{entry:unit,reason:'Falta confirmar las propiedades de esta instancia.'}]
            : associateVariants(variants, [unit])).map((c) => ({...c,entry:unit})));
          await roots[i].dispose();
        }
      } catch (error) {
        cases.push({entry, loadError:true, semanticOnly:true, reason:'No se pudo leer la historia: '+error.message.split('\n')[0]});
      }
    }
    associateByProperties(cases, variants, features, selectedName);
    associateByContent(cases, variants, features, selectedName);
    console.log(
      `Encontradas ${entries.length} historias y ${variants.length} referencias candidatas dentro del nodo Figma seleccionado. No se requieren enlaces individuales.`,
    );
    const out = resolve(
      'dist/design-audit',
      new Date().toISOString().replace(/[:.]/g, '-'),
    );
    await mkdir(out, { recursive: true });
    const printer = await chromium.launch(await browserOptions());
    const reportPage = await printer.newPage();
    const sections = [];
    const neededIds = new Set(cases.filter((c) => c.variant).map((c) => c.variant.node.id));
    for (const item of cases.filter((c) => !c.variant && !c.semanticOnly)) {
      for (const id of item.candidateIds?.length ? item.candidateIds : variants.map((v) => v.node.id)) neededIds.add(id);
    }
    const renderVariants = variants.filter((v) => neededIds.has(v.node.id));
    const renderCache = new Map();
    const renderUrls = new Map();
    let preparedRenders = false;
    async function getRender(node) {
      if (renderCache.has(node.id)) return renderCache.get(node.id);
      if (!preparedRenders) {
        console.log('Preparando imágenes de las plantillas…');
        preparedRenders = true;
        for (let offset = 0; offset < renderVariants.length; offset += 40) {
          const renders = await api(
            `images/${design.fileKey}`,
            {
              ids: renderVariants
                .slice(offset, offset + 40)
                .map((v) => v.node.id)
                .join(','),
              ...(data.version ? { version: data.version } : {}),
              format: 'png',
              scale: '1',
              use_absolute_bounds: 'true',
            },
            token,
          );
          for (const [id, url] of Object.entries(renders.images ?? {}))
            renderUrls.set(id, url);
        }
        preparedRenders = true;
      }
      const url = renderUrls.get(node.id);
      if (!url || new URL(url).protocol !== 'https:')
        throw new Error('Figma no pudo renderizar esta variante.');
      const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
      if (!response.ok)
        throw new Error(`Render Figma HTTP ${response.status}.`);
      const buffer = Buffer.from(await response.arrayBuffer());
      renderCache.set(node.id, buffer);
      return buffer;
    }
    try {
      if (variants.length === 1 && entries.length > 1)
        console.log(
          'El enlace de Figma contiene una sola pieza. Para revisar la familia completa, usa el enlace del conjunto o sección que la contiene.',
        );
      if (cases.some((c) => !c.variant && !c.semanticOnly)) {
        console.log(
          'Buscando correspondencias por imagen, texto y dimensiones, aunque los nombres sean distintos…',
        );
        const figmaFeatures = new Map(),
          storyFeatures = new Map();
        for (const v of variants.filter(
          (v) => !cases.some((c) => c.variant?.node.id === v.node.id),
        )) {
          try {
            figmaFeatures.set(v.node.id, {
              ...(await fingerprint(reportPage, await getRender(v.node))),
              text: flatten(v.node)
                .filter((n) => n.type === 'TEXT')
                .map((n) => n.characters)
                .join(' '),
            });
          } catch {
            console.log(
              `No se pudo obtener la imagen de ${v.label}; quedará pendiente.`,
            );
          }
        }
        for (const item of cases.filter((c) => !c.variant && !c.semanticOnly)) {
          const url = storyFrame(story, item.entry.id);
          try {
            await page.setViewportSize({ width: 1280, height: 800 });
            const capture = await captureForMatching(page, url.href, item.entry);
            storyFeatures.set(item.entry.caseId ?? item.entry.id, {
              ...(await fingerprint(reportPage, capture.image)),
              text: capture.text,
              theme: capture.theme,
            });
          } catch {
            item.reason =
              'No pude cargar esta historia para buscar su diseño correspondiente.';
          }
        }
        matchByAppearance(cases, variants, storyFeatures, figmaFeatures);
      }

      for (const item of cases) {
        const { entry } = item;
        const url = storyFrame(story, entry.id);
        item.storyUrl = url.href;
        if (!item.variant) {
          console.log(`${entry.title} / ${entry.name}: ${item.reason}`);
          continue;
        }
        try {
          const node = item.variant.node;
          const bounds = node.absoluteBoundingBox;
          if (
            !bounds ||
            bounds.width <= 0 ||
            bounds.height <= 0 ||
            bounds.width > 8000 ||
            bounds.height > 8000
          )
            throw new Error('Dimensiones de Figma no soportadas.');
          await page.setViewportSize({
            width: entry.auditMode === 'component' ? 1280 : isSharedReference(node, entry)
              ? (entry.name.toLowerCase() === 'desktop' ? 1280 : 390)
              : Math.max(320, Math.ceil(bounds.width)),
            height: Math.max(600, Math.ceil(bounds.height)),
          });
          const expectedImage = await getRender(node);
          console.log(
            `Comparando ${node.name} con ${entry.title} / ${entry.name}…`,
          );
          await page.goto(url.href, { waitUntil: 'domcontentloaded' });
          await page
            .locator('#storybook-root > *')
            .first()
            .waitFor({ state: 'visible' });
          await waitForStoryReady(page);
          await page.addStyleTag({
            content:
              '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}',
          });
          const root = await componentHandle(page, entry);
          await root.scrollIntoViewIfNeeded();
          const dom = await readDom(root, entry.auditMode);
          const actualImage = await root.screenshot({ animations: 'disabled' });
          const tolerance = {
            numeric: numeric('AUDIT_TOLERANCE_PX', 1, 100),
            channel: numeric('AUDIT_COLOR_THRESHOLD', 24, 255),
            ratio: numeric('AUDIT_MAX_DIFF_RATIO', 0.01, 1),
          };
          const { findings, pending, checkedProperties } = compareInterior(
            node,
            dom,
            tolerance.numeric,
            { mode: entry.auditMode },
          );
          if (!checkedProperties) {
            item.status = 'sin mediciones';
            console.log(`${entry.name}: pareja identificada, pero no se pudieron medir propiedades internas.`);
            continue;
          }
          if (item.partialContent?.length) console.log(`${entry.name}: ${item.partialContent.length} textos personalizados sin referencia; solo se evalúa la parte común.`);
          if (pending.length) console.log(`${entry.name}: comparación parcial; ${pending.length} capas sin asociar.`);
          const result = await makeReport(
            reportPage,
            {
              matchMethod: item.matchMethod,
              partialContent: item.partialContent,
              node,
              version: data.version,
              entry,
              figmaUrl: `https://www.figma.com/design/${design.fileKey}?node-id=${encodeURIComponent(node.id)}`,
              storyUrl: url.href,
              expectedImage,
              actualImage,
              findings,
              pending,
              tolerance,
              viewport: page.viewportSize(),
            },
            out,
            { fragment: true },
          );
          if (findings.length) sections.push(result.html);
          item.status = findings.length
            ? 'diferencias'
            : 'sin diferencias detectadas';
          item.findings = findings.length;
        } catch (error) {
          item.status = 'error';
          item.reason = error.message
            .split('\n')[0]
            .replace(/https?:\/\/\S+/g, '[URL]');
          console.log(`${entry.name}: ${item.reason}`);
        }
      }
      const unused = variants.filter(
        (v) => !cases.some((c) => c.variant?.node.id === v.node.id || c.referenceIds?.includes(v.node.id)),
      );
      const compared = cases.filter((c) =>
        ['diferencias', 'sin diferencias detectadas'].includes(c.status),
      ).length;
      console.log(
        `Comparadas: ${compared}/${cases.length}. Casos sin evaluar: ${cases.length - compared}. Diseños sin pareja: ${unused.length}.`,
      );
      if (!sections.length) {
        console.log(
          compared
            ? 'No se detectaron diferencias en las propiedades internas que se pudieron medir. Esto no valida las historias ni las capas pendientes. No se generó PDF.'
            : cases.every((item) => item.loadError)
              ? 'No se pudieron cargar las historias de Storybook. No se llegó a comparar con Figma; revisa los errores de carga anteriores. No se generó PDF.'
              : 'No se pudo comparar ninguna pareja con seguridad. No se generó PDF de resultados.',
        );
        return;
      }
      await makeBatchReport(
        reportPage,
        {
          cases,
          unused,
          sections,
          figmaUrl: design.url,
          version: data.version,
        },
        out,
      );
    } finally {
      token = undefined;
      await printer.close();
    }
    console.log(`\nPDF generado: ${join(out, 'reporte.pdf')}`);
  } finally {
    await browser.close();
  }
}
main()
  .catch((e) => {
    console.error(
      `No se completó la auditoría: ${e.message.split('\n')[0].replace(/https?:\/\/\S+/g, '[URL]')}`,
    );
    process.exitCode = 1;
  })
  .finally(() => rl.close());
