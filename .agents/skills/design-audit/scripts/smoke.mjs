// Offline integration check: exercises screenshots, annotated evidence and PDF.
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
    '<div style="width:180px;height:48px;background:blue">Continuar</div>',
  );
  const expectedImage = await page.locator('div').screenshot();
  await page.locator('div').evaluate((el) => {
    el.style.background = 'red';
    el.style.width = '200px';
  });
  const actualImage = await page.locator('div').screenshot();
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
          layer: 'Texto',
          property: 'fontSize',
          expected: 16,
          actual: 12,
          recommendation: 'Cambiar fontSize de 12 a 16 px.',
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
  assert.match(r.annotated, /^data:image\/png;base64,/);
  assert.deepEqual(r.sizes, [[180,48],[200,48]]);
  assert.ok(!r.html.includes('Severidad:'));
  assert.ok(!r.html.includes('Confianza:'));
  assert.ok(!r.html.includes('Revisar las zonas rosas'));
  assert.ok(!r.html.includes('Apariencia visual'));
  const reportPage = await browser.newPage();
  await makeBatchReport(
    reportPage,
    { sections: [r.html] },
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
  console.log('OK: capturas, hallazgos numerados y PDF.');
} finally {
  await browser.close();
}
