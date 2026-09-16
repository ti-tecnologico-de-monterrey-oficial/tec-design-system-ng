#!/usr/bin/env node
/**
 * Corre auditorías de LCP (Largest Contentful Paint) con Lighthouse contra
 * angular-app (build de producción) y/o los stories de Storybook
 * (ui-angular / ui-react), y genera un reporte (JSON + Markdown + HTML).
 *
 * Uso:
 *   node scripts/performance/run-lcp-audit.mjs --target=angular-app
 *   node scripts/performance/run-lcp-audit.mjs --target=storybook-angular --limit=15
 *   node scripts/performance/run-lcp-audit.mjs --target=all --runs=5 --fail-on-budget
 *
 * Flags:
 *   --target=<angular-app|angular-app-dev|storybook-angular|storybook-react|all>  (default: angular-app)
 *   --runs=<n>            número de corridas de Lighthouse por URL, se usa la mediana (default: 3)
 *   --form-factor=<mobile|desktop>  (default: mobile)
 *   --limit=<n>           límite de historias de Storybook a auditar (evita correr cientos)
 *   --skip-build          no reconstruir angular-app antes de auditar (usa el dist/ existente)
 *   --fail-on-budget      exit code 1 si alguna página cae en "poor"
 *
 * Requisitos por suite:
 *   - angular-app: este script hace `nx build angular-app --configuration=performance`
 *     (build optimizado, sin los presupuestos de bundle de "production" que hoy
 *     fallan) y sirve el resultado (representativo de lo que ve un usuario real).
 *   - angular-app-dev: requiere `nx serve angular-app` corriendo ya en localhost:4200
 *     (útil para iterar rápido; el modo dev/HMR infla el LCP, no usar para reportes reales).
 *   - storybook-angular / storybook-react: requieren el build estático ya generado
 *     (`npm run storybook:build:angular` / `storybook:build:react`); este script solo lo sirve.
 */
import { mkdirSync, symlinkSync, existsSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { auditUrl } from './lib/lighthouse-runner.mjs';
import { writeReport } from './lib/report.mjs';
import {
  resolveAngularAppTargets,
  ANGULAR_APP_DEV_URL,
  ANGULAR_APP_BUILD_DIR,
  STORYBOOK_STATIC_DIRS,
} from './targets.config.mjs';
import { resolveStorybookTargets } from './lib/storybook-targets.mjs';
import { startStaticServer } from './lib/static-server.mjs';
import { startSpaStaticServer } from './lib/spa-static-server.mjs';

const rootDir = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const args = parseArgs(process.argv.slice(2));

const target = args.target ?? 'angular-app';
const runs = Number(args.runs ?? 3);
const formFactor = args['form-factor'] ?? 'mobile';
const limit = args.limit ? Number(args.limit) : undefined;
const failOnBudget = 'fail-on-budget' in args;

const skipBuild = 'skip-build' in args;
const suites = target === 'all' ? ['angular-app', 'storybook-angular', 'storybook-react'] : [target];

async function main() {
  const resultsBySuite = {};

  for (const suite of suites) {
    console.log(`\n▶ Auditando LCP: ${suite} (runs=${runs}, formFactor=${formFactor})`);

    let targets;
    let cleanup;
    try {
      ({ targets, cleanup } = await resolveTargets(suite, limit));
    } catch (err) {
      console.error(`  ✘ No se pudo preparar ${suite}: ${err.message}`);
      continue;
    }

    if (targets.length === 0) {
      console.warn(`  (sin targets para ${suite}, se omite)`);
      continue;
    }

    const results = [];
    for (const t of targets) {
      process.stdout.write(`  · ${t.name} ... `);
      try {
        const result = await auditUrl(t, { runs, formFactor });
        console.log(`LCP mediana: ${Math.round(result.lcpMs ?? -1)}ms`);
        results.push(result);
      } catch (err) {
        console.log(`ERROR (${err.message})`);
      }
    }
    resultsBySuite[suite] = results;
    await cleanup?.();
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outDir = join(rootDir, 'tmp', 'performance-reports', stamp);
  const { failing } = writeReport(resultsBySuite, outDir);

  const latestLink = join(rootDir, 'tmp', 'performance-reports', 'latest');
  mkdirSync(dirname(latestLink), { recursive: true });
  if (existsSync(latestLink)) rmSync(latestLink, { force: true });
  symlinkSync(outDir, latestLink, 'dir');

  console.log(`\n✔ Reporte generado en: ${outDir}`);
  console.log(`  Markdown: ${join(outDir, 'report.md')}`);
  console.log(`  HTML:     ${join(outDir, 'report.html')}`);
  console.log(`  (acceso rápido: tmp/performance-reports/latest/report.html)`);

  if (failing.length > 0) {
    console.log(`\n🔴 ${failing.length} página(s) por encima del presupuesto de LCP:`);
    for (const f of failing) console.log(`   - ${f.name}: ${Math.round(f.lcpMs)}ms`);
    if (failOnBudget) process.exit(1);
  }
}

async function resolveTargets(suite, limitOverride) {
  if (suite === 'angular-app-dev') {
    console.warn(
      '  ⚠ auditando el dev server (nx serve): el modo dev/HMR infla el LCP, no uses estos números para reportes reales.'
    );
    return { targets: resolveAngularAppTargets(ANGULAR_APP_DEV_URL) };
  }

  if (suite === 'angular-app') {
    const buildDir = join(rootDir, ANGULAR_APP_BUILD_DIR);
    if (!skipBuild) {
      console.log('  · construyendo build optimizado de angular-app (sin budgets, para medición)...');
      try {
        execSync('npx nx build angular-app --configuration=performance', {
          cwd: rootDir,
          stdio: 'inherit',
        });
      } catch {
        throw new Error(
          'El build de angular-app falló (revisa el log arriba). Usa ' +
            '--target=angular-app-dev con `nx serve angular-app` corriendo como alternativa.'
        );
      }
    }
    const server = await startSpaStaticServer(buildDir, 6299);
    const targets = resolveAngularAppTargets(server.baseUrl);
    return { targets, cleanup: server.stop };
  }

  if (suite === 'storybook-angular' || suite === 'storybook-react') {
    const staticDir = join(rootDir, STORYBOOK_STATIC_DIRS[suite]);
    const port = suite === 'storybook-angular' ? 6300 : 6301;
    const server = await startStaticServer(staticDir, port);
    const targets = await resolveStorybookTargets(staticDir, server.baseUrl, limitOverride);
    return { targets, cleanup: server.stop };
  }

  throw new Error(`Target desconocido: ${suite}`);
}

function parseArgs(argv) {
  const out = {};
  for (const arg of argv) {
    const [key, value] = arg.replace(/^--/, '').split('=');
    out[key] = value ?? true;
  }
  return out;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
