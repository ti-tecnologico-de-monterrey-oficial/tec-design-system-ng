import { waitForStoryReady, componentHandle, renderedComponents, readDom } from './capture.mjs';
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
  await page.setContent('<div id="storybook-root"><demo-unit style="display:block">First</demo-unit><demo-unit style="display:block">Second</demo-unit></div>');
  const units = await renderedComponents(page,{componentPath:'demo-unit.component.ts'});
  assert.equal(units.length,2);
  for (const unit of units) await unit.dispose();
  await page.setContent('<div id="storybook-root"><article style="padding:16px"><h2>Own title</h2><demo-child style="display:block"><span>Internal label</span></demo-child></article></div>');
  const composition = await componentHandle(page,{auditMode:'template'});
  const templateDom = await readDom(composition,'template'), componentDom = await readDom(composition,'component');
  assert.equal(templateDom.filter(n=>n.props.text==='Internal label' && n.tag==='SPAN').length,0);
  assert.equal(componentDom.filter(n=>n.props.text==='Internal label' && n.tag==='SPAN').length,1);
  await composition.dispose();
  // Two open requests reproduce Storybook telemetry/polling that never reaches networkidle.
  let releaseRequests;
  const held = new Promise((resolve) => { releaseRequests = resolve; });
  let requests = 0;
  await page.route('https://audit.test/**', async (route) => {
    if (route.request().url().includes('/poll')) {
      requests++;
      await held;
      await route.fulfill({ body: 'done' });
    } else await route.fulfill({ contentType: 'text/html', body: `
      <div id="storybook-root" style="background:white"><demo-unit style="display:block">Label</demo-unit></div>
      <script>
        fetch('/poll1'); fetch('/poll2');
        setTimeout(() => document.querySelector('#storybook-root').style.background = 'rgb(31,34,46)', 200);
      </script>` });
  });
  try {
    await page.goto('https://audit.test/story', { waitUntil: 'domcontentloaded' });
    await waitForStoryReady(page);
    const openUnits = await renderedComponents(page,{componentPath:'demo-unit.component.ts'});
    assert.equal(requests, 2);
    assert.equal(openUnits.length,1);
    await openUnits[0].dispose();
    // The readiness check is independent of the rendered family.
    await page.locator('#storybook-root').evaluate((root) => {
      root.innerHTML = '<article><h2>Card</h2><p>Content</p></article>';
    });
    await waitForStoryReady(page);
    assert.equal(await page.locator('h2').textContent(), 'Card');
    await page.locator('#storybook-root').evaluate((root) => {
      root.innerHTML = '<demo-panel><header><div class="visual" style="padding:16px;background:gray"><h2>Title</h2><span>Body</span></div></header></demo-panel>';
    });
    const component = await componentHandle(page, {componentPath:'src/demo-panel.component.ts'});
    assert.equal(await component.evaluate((el) => el.className), 'visual');
    await component.dispose();
  } finally {
    const responses = [page.waitForResponse('**/poll1'), page.waitForResponse('**/poll2')];
    releaseRequests();
    await Promise.all(responses);
    await page.unroute('https://audit.test/**');
  }
  console.log('OK: red abierta, estilos estables, componentes, templates, capturas y PDF.');
} finally {
  await browser.close();
}
