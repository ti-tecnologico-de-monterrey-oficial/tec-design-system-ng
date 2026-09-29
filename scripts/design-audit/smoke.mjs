// Offline integration check: exercises screenshots, diff, annotated evidence and PDF.
import assert from 'node:assert/strict';
import { mkdtemp, readFile, readdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { makeReport, makeBatchReport } from './report.mjs';
import { fingerprint, similarity } from './matching.mjs';
const browser = await chromium.launch(
  process.env.DESIGN_AUDIT_CHROME_PATH
    ? { executablePath: process.env.DESIGN_AUDIT_CHROME_PATH }
    : {},
);
try {
  const page = await browser.newPage();
  await page.setContent(
    '<button style="width:180px;height:48px;background:blue">Continuar</button>',
  );
  const expectedImage = await page.locator('button').screenshot();
  await page.locator('button').evaluate((el) => {
    el.style.background = 'red';
    el.style.width = '200px';
  });
  const actualImage = await page.locator('button').screenshot();
  const featurePage = await browser.newPage();
  const feature = await fingerprint(featurePage, expectedImage);
  assert.equal(feature.width, 180);
  assert.equal(feature.pixels.length, 32 * 32 * 4);
  assert.equal(
    similarity(
      { ...feature, text: 'Continuar' },
      { ...feature, text: 'Continuar' },
    ).score,
    1,
  );
  const out = await mkdtemp('/tmp/design-audit-smoke-');
  const r = await makeReport(
    await browser.newPage(),
    {
      node: { name: 'DEMO LOCAL', componentProperties: {} },
      version: 'demo',
      entry: { title: 'Fixture', name: 'Default' },
      figmaUrl: 'https://www.figma.com',
      storyUrl: 'http://localhost',
      expectedImage,
      actualImage,
      findings: [
        {
          layer: 'Botón',
          property: 'fontSize',
          expected: 16,
          actual: 12,
          recommendation: 'Cambiar fontSize de 12 a 16 px.',
          severity: 'media',
          confidence: 'alta (fixture)',
          box: { x: 0, y: 0, width: 200, height: 48 },
        },
      ],
      pending: [],
      tolerance: { numeric: 1, channel: 24, ratio: 0.01 },
      viewport: { width: 800, height: 600 },
    },
    out,
    { fragment: true },
  );
  assert.ok(r.ratio > 0.1);
  assert.ok(!r.html.includes('Revisar las zonas rosas'));
  assert.ok(!r.html.includes('Apariencia visual'));
  const cases = [
    {
      entry: { title: 'Fixture', name: 'Default' },
      status: 'diferencias',
      storyUrl: 'http://localhost',
      variant: { node: { id: '1' }, label: 'Default' },
    },
    {
      entry: { title: 'Fixture', name: 'Missing' },
      status: 'sin asociación',
      reason: 'Sin diseño equivalente',
      storyUrl: 'http://localhost',
    },
    {
      entry: { title: 'Fixture', name: 'Broken' },
      status: 'error',
      reason: 'Error de render',
      storyUrl: 'http://localhost',
    },
  ];
  const reportPage = await browser.newPage();
  await makeBatchReport(
    reportPage,
    {
      cases,
      unused: [{ node: { id: '2' }, label: 'Sin story' }],
      sections: [r.html],
      figmaUrl: 'https://www.figma.com/design/demo?node-id=1',
      version: 'demo',
    },
    out,
  );
  assert.deepEqual(await readdir(out), ['reporte.pdf']);
  const html = await reportPage.content();
  assert.ok(html.includes('1 variantes con diferencias detectadas'));
  assert.ok(html.includes('Cambiar fontSize de 12 a 16 px.'));
  assert.ok(html.includes('data:image/png;base64,'));
  for (const text of [
    'sin asociación',
    'Posible diseño',
    'Error de render',
    'Missing',
    'Broken',
  ])
    assert.ok(!html.includes(text));
  const emptyOut = await mkdtemp('/tmp/design-audit-empty-');
  await makeBatchReport(reportPage, { cases: [], sections: [] }, emptyOut);
  assert.deepEqual(await readdir(emptyOut), []);

  assert.equal(
    (await readFile(`${out}/reporte.pdf`)).subarray(0, 4).toString(),
    '%PDF',
  );
  console.log('OK: diferencia visual, imágenes y PDF.');
} finally {
  await browser.close();
}
