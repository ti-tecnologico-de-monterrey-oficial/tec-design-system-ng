# Guía de Desarrollo (Developer Documentation)

Este documento contiene los comandos principales de Nx para trabajar con este monorepo. Todos los comandos listados se ejecutan en la raíz del proyecto.

## 🚀 Correr las Aplicaciones (Modo Desarrollo)

Para iniciar el servidor de desarrollo local de cada aplicación, utiliza los siguientes comandos:

**Aplicación React:**
```bash
npx nx serve app-react
```

**Aplicación Angular:**
```bash
npx nx serve app-angular
```

## 📦 Compilar las Librerías

Puedes compilar las librerías de manera individual usando el comando `build`. Asegúrate de que las librerías compartidas (como `core`) estén compiladas si tienes problemas de resolución al usarlas como paquetes:

**Librería Core (Compartida):**
```bash
npx nx build @ti-tecnologico-de-monterrey-oficial/core
```

**Librería de Componentes de React:**
```bash
npx nx build @ti-tecnologico-de-monterrey-oficial/ui-react
```

**Librería de Componentes de Angular:**
```bash
npx nx build ui-angular
```

## 🧪 Correr Pruebas Unitarias (Tests)

Para ejecutar los tests unitarios configurados (por defecto con Jest):

**Pruebas para las Aplicaciones:**
```bash
npx nx test app-react
npx nx test app-angular
```

**Pruebas para las Librerías:**
```bash
npx nx test @ti-tecnologico-de-monterrey-oficial/ui-react
npx nx test ui-angular
npx nx test @ti-tecnologico-de-monterrey-oficial/core
```

*Tip: Puedes correr todas las pruebas del monorepo a la vez con `npx nx run-many -t test`*

## 🎭 Correr Pruebas E2E con Playwright

Las pruebas End-to-End se manejan en los proyectos con el sufijo `-e2e`. Asegúrate de tener los navegadores de Playwright instalados antes de correr las pruebas (`npx playwright install`).

**E2E para la Aplicación React:**
```bash
npx nx e2e app-react-e2e
```

**E2E para la Aplicación Angular:**
```bash
npx nx e2e app-angular-e2e
```

## 📖 Storybook

Para previsualizar y desarrollar componentes visuales en aislamiento:

**Storybook para React:**
```bash
npx nx storybook @ti-tecnologico-de-monterrey-oficial/ui-react
```

**Storybook para Angular:**
```bash
npx nx storybook ui-angular
```
