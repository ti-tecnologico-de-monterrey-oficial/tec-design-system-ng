/**
 * Definición de los targets (URLs) a auditar por cada "suite" de LCP.
 *
 * - "angular-app": build de producción de angular-app, servido estáticamente
 *   por este mismo script (representativo de lo que ve un usuario real).
 * - "angular-app-dev": apunta al servidor de desarrollo (`nx serve angular-app`,
 *   localhost:4200). Útil para iterar rápido, pero el modo dev de Vite/HMR
 *   infla artificialmente el LCP: no uses estos números para reportes reales.
 * - "storybook-angular" / "storybook-react": se resuelven dinámicamente leyendo
 *   el `index.json` generado por `build-storybook`, no se listan a mano.
 *
 * Es una lista curada; agrega rutas nuevas aquí si quieres cubrirlas
 * (todas las rutas disponibles están en angular-app/src/app/app.routes.ts).
 */
export const angularAppPaths = [
  { name: 'home', path: '/home' },
  { name: 'my-page', path: '/my-page' },
  { name: 'component-test', path: '/component-test' },
  { name: 'table-main', path: '/table-main' },
  { name: 'table-lite', path: '/table-lite' },
  { name: 'calendar', path: '/calendar' },
  { name: 'colors', path: '/colors' },
  { name: 'modals', path: '/modals' },
  { name: 'dashboard-indicators', path: '/dashboard-indicators' },
  { name: 'identity', path: '/identity' },
  { name: 'pages/carousel', path: '/pages/carousel' },
  { name: 'pages/card', path: '/pages/card' },
  { name: 'pages/balance-overview', path: '/pages/balance-overview' },
];

export function resolveAngularAppTargets(baseUrl) {
  return angularAppPaths.map((t) => ({
    ...t,
    url: new URL(t.path, baseUrl).toString(),
  }));
}

export const ANGULAR_APP_DEV_URL =
  process.env.ANGULAR_APP_URL || 'http://localhost:4200';

export const ANGULAR_APP_BUILD_DIR = 'dist/angular-app/browser';

export const STORYBOOK_STATIC_DIRS = {
  'storybook-angular': 'dist/storybook/ui-angular',
  'storybook-react': 'ui-react/storybook-static',
};

