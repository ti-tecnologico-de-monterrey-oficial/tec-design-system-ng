# Bamboo Copy Nx Workspace

Monorepo Nx con:

- App React: `react-app`
- App Angular: `angular-app`
- Libreria UI React: `ui-react`
- Libreria UI Angular: `ui-angular`
- Carpeta compartida de assets: `shared/assets`
- Carpeta compartida de logica: `shared/logic`
- Storybook configurado para ambas librerias UI
- Playwright configurado para ambas apps

## Requisitos

- Node.js `>= 22.22.3` (Angular 22 lo requiere)
- npm 10+

> En este entorno se detecto Node `22.14.0`, que puede fallar en tareas Angular/Storybook Angular.

## Instalacion

```bash
npm install
```

## Scripts npm (atajos)

```bash
npm run dev:react
npm run dev:angular
npm run dev:apps
npm run storybook:react
npm run storybook:angular
npm run storybook:all
npm run build:lib:react
npm run build:lib:angular
npm run build:libs
npm run e2e:react
npm run e2e:angular
npm run check:ui
```

`dev:apps` levanta React y Angular al mismo tiempo.

`storybook:all` levanta Storybook de las dos librerias UI en paralelo.

`build:libs` compila las dos librerias UI en un solo comando.

`build:lib:react` y `build:lib:angular` incluyen la carpeta compartida `shared/assets` en sus salidas de compilacion.

## Estructura principal

```text
angular-app/
angular-app-e2e/
react-app/
react-app-e2e/
ui-angular/
ui-react/
shared/
  assets/
  logic/
  types/
```

## Arrancar apps

### React app

```bash
npm run dev:react
```

### Angular app

```bash
npm run dev:angular
```

## Storybook (librerias UI)

### Storybook de ui-react

```bash
npm run storybook:react
```

### Storybook de ui-angular

```bash
npm run storybook:angular
```

### Build de Storybook

```bash
npm run storybook:build:react
npm run storybook:build:angular
```

## Playwright (apps)

### Ejecutar e2e de React app

```bash
npm run e2e:react
```

### Ejecutar e2e de Angular app

```bash
npm run e2e:angular
```

## Verificacion rapida

```bash
npm run check:ui
```

## Notas de comparticion

- La logica compartida vive en `shared/logic` y se consume desde ambas UI libs via alias TypeScript `@shared/logic`.
- Los assets compartidos viven en `shared/assets` y se importan en ambas UI libs.
- `shared` no es un proyecto Nx independiente, solo una carpeta comun reutilizable.

## Comando: `nx run ui-angular:sync-shared`

Sincroniza codigo compartido hacia la libreria Angular antes de compilar o probar.

```bash
nx run ui-angular:sync-shared
```

### Que hace

- Borra `ui-angular/src/lib/_shared`.
- Recrea la carpeta destino.
- Copia `shared/logic` a `ui-angular/src/lib/_shared/logic`.
- Copia `shared/types` a `ui-angular/src/lib/_shared/types`.

En `ui-angular/project.json`, este target usa el executor `nx:run-commands` y declara como output `ui-angular/src/lib/_shared`.

### Cuando usarlo

- Cuando cambias algo en `shared/logic` o `shared/types` y quieres refrescar la copia local en `ui-angular`.
- Antes de revisar imports o errores de tipos dentro de la libreria Angular si sospechas que la carpeta `_shared` esta desactualizada.

### Ejecucion automatica

No siempre necesitas correrlo manualmente: en `ui-angular/project.json`, los targets `build` y `test` tienen `dependsOn: ["sync-shared"]`.

Eso significa que al ejecutar:

```bash
nx build ui-angular
nx test ui-angular
```

Nx corre primero `ui-angular:sync-shared` y luego el target solicitado.

## Comando: `nx run ui-react:sync-shared`

Sincroniza los assets compartidos hacia la salida de compilacion de la libreria React.

```bash
nx run ui-react:sync-shared
```

### Que hace

- Borra `dist/ui-react/assets/shared`.
- Recrea la ruta destino en `dist/ui-react/assets`.
- Copia `shared/assets` a `dist/ui-react/assets/shared`.

En `ui-react/project.json`, este target usa el executor `nx:run-commands` y declara como output `dist/ui-react/assets/shared`.

### Cuando usarlo

- Cuando cambias archivos en `shared/assets` y quieres sincronizarlos sin correr todo el build de `ui-react`.

### Relacion con `ui-react:build`

- `nx run ui-react:build` tambien copia `shared/assets` durante la compilacion, mediante el plugin `copy-shared-assets` en `ui-react/vite.config.mts`.
- Este target dedicado te permite ejecutar solo la sincronizacion de assets cuando lo necesites.

### Diferencia contra Angular

- `ui-angular:sync-shared` sincroniza `shared/logic` y `shared/types` a `ui-angular/src/lib/_shared` y se ejecuta automaticamente antes de `build` y `test`.
- `ui-react:sync-shared` sincroniza `shared/assets` hacia `dist/ui-react/assets/shared` como paso dedicado manual.
