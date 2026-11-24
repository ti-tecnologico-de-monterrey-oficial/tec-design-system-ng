# Configuración de Bamboo en una aplicación Angular

Rutas relativas a la raíz del proyecto consumidor. Edita la sección `projects.<app>.architect.build.options` de `angular.json`. Si el proyecto usa Nx, edita `targets.build.options` en `project.json`.

## Assets

Bamboo carga fuentes, imágenes, SVG, diccionarios e iconos en tiempo de ejecución desde `/assets/...`. Agrega estas entradas a `assets`.

**Global (recomendada):**

```json
{
  "glob": "**/*",
  "input": "./node_modules/@ti-tecnologico-de-monterrey-oficial/ds-ng/assets/",
  "output": "/assets/"
},
{
  "glob": "**/*.svg",
  "input": "node_modules/@material-symbols/svg-400/rounded/",
  "output": "/assets/icons/material-rounded/"
}
```

**Individual** (si `/assets/` ya contiene archivos de la aplicación y quieres evitar colisiones):

```json
{ "glob": "**/*", "input": "./node_modules/@ti-tecnologico-de-monterrey-oficial/ds-ng/assets/fonts/", "output": "/assets/fonts/" },
{ "glob": "**/*", "input": "./node_modules/@ti-tecnologico-de-monterrey-oficial/ds-ng/assets/images/", "output": "/assets/images/" },
{ "glob": "**/*", "input": "./node_modules/@ti-tecnologico-de-monterrey-oficial/ds-ng/assets/svg/", "output": "/assets/svg/" },
{ "glob": "**/*", "input": "./node_modules/@ti-tecnologico-de-monterrey-oficial/ds-ng/assets/i18n/", "output": "/assets/i18n/" },
{ "glob": "**/*.svg", "input": "node_modules/@material-symbols/svg-400/rounded/", "output": "/assets/icons/material-rounded/" }
```

`bmb-icon` solicita `/assets/icons/material-rounded/<nombre>.svg` (o `<nombre>-fill.svg`). El destino debe ser exactamente esa ruta. Si la app se sirve con un `baseHref` distinto de `/`, comprueba que esa URL siga respondiendo.

## Estilos

Elige **una** marca y agrégala a `styles`:

| Marca                    | Archivo             |
| ------------------------ | ------------------- |
| Tecnológico de Monterrey | `mainTEC.min.css`   |
| Grupo Educativo          | `mainGED.min.css`   |
| Tecmilenio               | `mainTECMI.min.css` |

```json
"styles": [
  "src/styles.scss",
  "node_modules/@ti-tecnologico-de-monterrey-oficial/ds-ng/assets/styles/mainTEC.min.css"
]
```

Si la ruta no existe en la versión instalada, lista `node_modules/@ti-tecnologico-de-monterrey-oficial/ds-ng/assets/styles/` y usa el archivo `main<MARCA>` disponible.

Reinicia `ng serve` después de cambiar `assets` o `styles`.

## Servicios

Los servicios usan `providedIn: 'root'`, pero se recomienda declararlos explícitamente para evitar inconsistencias entre componentes:

```typescript
// src/app/app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  BmbProjectionContentService,
  BmbTranslationsService,
  ThemeService,
} from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

export const appConfig: ApplicationConfig = {
  providers: [
    // ...providers existentes
    importProvidersFrom([
      BmbProjectionContentService,
      BmbTranslationsService,
      ThemeService,
    ]),
  ],
};
```

Otros servicios públicos (`ToastService`, `BmbNativeModalService`, `BmbAlertCenterService`, etc.) se inyectan con `inject()` donde se necesitan. Revisa `index.d.ts` para ver la lista completa de la versión instalada.

## Tema y traducciones

```typescript
import { Component, inject, OnInit } from '@angular/core';
import {
  BmbTranslationsService,
  ThemeService,
  TranslatePipe,
} from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'app-root',
  imports: [TranslatePipe],
  template: `
    <button type="button" (click)="toggleTheme()">
      Tema actual: {{ themeService.theme() }}
    </button>
    <button type="button" (click)="translations.setLanguage('en')">
      English
    </button>
    <h1>{{ 'app.title' | translate }}</h1>
  `,
})
export class AppComponent implements OnInit {
  readonly themeService = inject(ThemeService);
  readonly translations = inject(BmbTranslationsService);

  async ngOnInit(): Promise<void> {
    // Usa el tema guardado en localStorage o 'light' si no existe.
    this.themeService.setInitialTheme('light');

    // Espera la carga de /assets/i18n; si no, addDictionary reemplazaría estas claves.
    await Promise.all([
      this.translations.loadDictionaryFromAssets('es'),
      this.translations.loadDictionaryFromAssets('en'),
    ]);
    this.translations.updateDictionary('es', {
      app: { title: 'Mi aplicación' },
    });
    this.translations.updateDictionary('en', {
      app: { title: 'My application' },
    });
  }

  toggleTheme(): void {
    const next = this.themeService.theme() === 'dark' ? 'light' : 'dark';
    this.themeService.setThemeAndSaveInLocal(next);
  }
}
```

Notas:

- Los diccionarios admiten hasta tres niveles de anidación y se consultan con notación de puntos.
- Al crearse, el servicio descarga `es` y `en` desde `/assets/i18n/<lang>.json` (requiere el asset `i18n`). Esa carga usa `addDictionary`, que **reemplaza** el diccionario completo del idioma.
- `updateDictionary` fusiona solo el primer nivel: si sobrescribes `account_statement`, reemplazas toda esa sección. Copia la sección original y modifica solo las claves necesarias.
- `setLanguage` ignora (con advertencia) idiomas sin diccionario; registra primero el diccionario con `addDictionary`.
- `translate()` devuelve la clave original cuando no encuentra una traducción.
- Para persistir el idioma, guarda la preferencia (por ejemplo, en `localStorage`) y llama a `setLanguage` al iniciar.

## Lista de verificación

- [ ] Tag `aNN` coincide con la major de `@angular/core`.
- [ ] `@angular/cdk` y `@angular/material` están instalados en la misma major.
- [ ] Assets de Bamboo y de Material Symbols configurados.
- [ ] Una sola hoja de estilos de marca en `styles`.
- [ ] Servicios globales registrados en `app.config.ts`.
- [ ] `ng build` sin errores y sin advertencias `Icon not found` en la consola.
