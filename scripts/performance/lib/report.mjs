import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { classifyLcp, STATUS_EMOJI, LCP_BUDGET } from './budgets.mjs';

/**
 * Genera summary.json, report.md y report.html a partir de los resultados
 * de `auditUrl` para uno o varios suites (angular-app, storybook-*).
 *
 * `resultsBySuite`: { [suiteName]: Array<{ name, url, lcpMs, samples }> }
 */
export function writeReport(resultsBySuite, outDir) {
  mkdirSync(outDir, { recursive: true });

  const enriched = Object.fromEntries(
    Object.entries(resultsBySuite).map(([suite, results]) => [
      suite,
      results
        .map((r) => ({ ...r, status: classifyLcp(r.lcpMs) }))
        .sort((a, b) => (b.lcpMs ?? 0) - (a.lcpMs ?? 0)),
    ])
  );

  const generatedAt = new Date().toISOString();
  writeFileSync(
    join(outDir, 'summary.json'),
    JSON.stringify({ generatedAt, budget: LCP_BUDGET, results: enriched }, null, 2)
  );

  writeFileSync(join(outDir, 'report.md'), buildMarkdown(enriched, generatedAt));
  writeFileSync(join(outDir, 'report.html'), buildHtml(enriched, generatedAt));

  const allResults = Object.values(enriched).flat();
  const failing = allResults.filter((r) => r.status === 'poor');
  return { outDir, allResults, failing };
}

function buildMarkdown(enriched, generatedAt) {
  let md = `# Reporte de LCP\n\nGenerado: ${generatedAt}\n\n`;
  md += `Umbrales (Core Web Vitals): 🟢 bueno ≤ ${LCP_BUDGET.good}ms · 🟡 mejorable ≤ ${LCP_BUDGET.needsImprovement}ms · 🔴 pobre > ${LCP_BUDGET.needsImprovement}ms\n\n`;

  for (const [suite, results] of Object.entries(enriched)) {
    md += `## ${suite}\n\n`;
    md += `| Estado | Página | LCP (mediana) | FCP | CLS | TBT | Score |\n`;
    md += `|---|---|---|---|---|---|---|\n`;
    for (const r of results) {
      const last = r.samples?.at(-1) ?? {};
      md += `| ${STATUS_EMOJI[r.status]} | [${r.name}](${r.url}) | ${fmt(r.lcpMs)} ms | ${fmt(last.fcpMs)} ms | ${fmt(last.clsScore, 3)} | ${fmt(last.tbtMs)} ms | ${fmt(last.performanceScore)} |\n`;
    }
    md += `\n`;
  }
  return md;
}

function buildHtml(enriched, generatedAt) {
  const rows = Object.entries(enriched)
    .map(
      ([suite, results]) => `
      <h2>${suite}</h2>
      <table>
        <thead><tr><th>Estado</th><th>Página</th><th>LCP</th><th>FCP</th><th>CLS</th><th>TBT</th><th>Score</th></tr></thead>
        <tbody>
          ${results
            .map(
              (r) => `<tr class="${r.status}">
                <td>${STATUS_EMOJI[r.status]} ${r.status}</td>
                <td><a href="${r.url}" target="_blank" rel="noopener">${r.name}</a></td>
                <td>${fmt(r.lcpMs)} ms</td>
                <td>${fmt(r.samples?.at(-1)?.fcpMs)} ms</td>
                <td>${fmt(r.samples?.at(-1)?.clsScore, 3)}</td>
                <td>${fmt(r.samples?.at(-1)?.tbtMs)} ms</td>
                <td>${fmt(r.samples?.at(-1)?.performanceScore)}</td>
              </tr>`
            )
            .join('')}
        </tbody>
      </table>`
    )
    .join('');

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>Reporte de LCP</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 2rem; color: #1a1a1a; }
  table { border-collapse: collapse; width: 100%; margin-bottom: 2rem; }
  th, td { border: 1px solid #ddd; padding: 0.5rem 0.75rem; text-align: left; font-size: 14px; }
  th { background: #f5f5f5; }
  tr.poor { background: #fde8e8; }
  tr.needs-improvement { background: #fff8e1; }
  tr.good { background: #e8f7ed; }
</style>
</head>
<body>
  <h1>Reporte de LCP (Largest Contentful Paint)</h1>
  <p>Generado: ${generatedAt}</p>
  <p>🟢 bueno ≤ ${LCP_BUDGET.good}ms · 🟡 mejorable ≤ ${LCP_BUDGET.needsImprovement}ms · 🔴 pobre &gt; ${LCP_BUDGET.needsImprovement}ms</p>
  ${rows}
</body>
</html>`;
}

function fmt(v, decimals = 0) {
  return typeof v === 'number' ? v.toFixed(decimals) : '—';
}
