---
name: implementing-bamboo-angular
description: 'Instala, configura y usa Bamboo Design System (@ti-tecnologico-de-monterrey-oficial/ds-ng) en aplicaciones Angular. Úsala cuando se pida instalar o actualizar Bamboo, configurar angular.json (assets, iconos, estilos TEC/GED/TECMI), registrar servicios (tema, traducciones, proyección), usar componentes bmb-*, directivas o el pipe translate, o depurar iconos que no cargan, estilos faltantes o inputs requeridos.'
---

# Implementar Bamboo Design System en Angular

Guía para personas que **consumen** la librería `@ti-tecnologico-de-monterrey-oficial/ds-ng` en sus aplicaciones Angular. No modifica la librería: la instala, la configura y usa sus componentes.

## Regla principal: la fuente de verdad es el paquete instalado

Antes de escribir código con un componente, **consulta sus tipos en `node_modules`**; no supongas inputs:

1. Confirma la versión instalada: `npm ls @ti-tecnologico-de-monterrey-oficial/ds-ng`.
2. Revisa la API pública en `node_modules/@ti-tecnologico-de-monterrey-oficial/ds-ng/index.d.ts`.
3. Busca el componente por selector:
   `grep -rl "bmb-evaluation-rubric" node_modules/@ti-tecnologico-de-monterrey-oficial/ds-ng --include=*.d.ts`
4. Interpreta el `.d.ts`: `InputSignal` = input, `input.required` = input obligatorio, `OutputEmitterRef` = output, `ModelSignal` = two-way binding (`[(x)]`).
5. Para ejemplos visuales y combinaciones válidas consulta Storybook (https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/) y la documentación oficial (https://bamboo.tec.mx/).

Si un input está marcado como deprecated en los tipos o la documentación, usa su reemplazo.

## Flujo de implementación

1. **Verifica requisitos**: Node 22.19+ y npm 10.3+ para Angular 20–22. Lee la versión de `@angular/core` en el `package.json` del proyecto.
2. **Instala el tag correspondiente a la major de Angular**:

   | Angular | Comando                                                |
   | ------- | ------------------------------------------------------ |
   | 20      | `npm i @ti-tecnologico-de-monterrey-oficial/ds-ng@a20` |
   | 21      | `npm i @ti-tecnologico-de-monterrey-oficial/ds-ng@a21` |
   | 22      | `npm i @ti-tecnologico-de-monterrey-oficial/ds-ng@a22` |

   La versión codifica la major de Angular (por ejemplo, `1.6.421-s` es Bamboo 1.6.4 para Angular 21). No instales el tag de otra major. Las peer dependencies `@angular/cdk` y `@angular/material` deben estar en la misma major que `@angular/core`.

3. **Configura assets e iconos** en `angular.json` → [setup.md#assets](./references/setup.md#assets).
4. **Elige una marca y agrega su hoja de estilos** (`mainTEC`, `mainGED` o `mainTECMI`) → [setup.md#estilos](./references/setup.md#estilos). La marca no cambia en tiempo de ejecución.
5. **Registra los servicios globales** en `app.config.ts` → [setup.md#servicios](./references/setup.md#servicios).
6. **Usa los componentes** como standalone (ver la siguiente sección).
7. **Valida** con `ng build` y `ng serve`, y revisa la consola del navegador (ver [Diagnóstico](#diagnóstico)).

## Uso de componentes

Los componentes, directivas y pipes son **standalone** y se importan desde la raíz del paquete:

```typescript
import { Component } from '@angular/core';
import {
  BmbIconComponent,
  BmbButtonDirective,
  TranslatePipe,
} from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'app-example',
  imports: [BmbIconComponent, BmbButtonDirective, TranslatePipe],
  template: `
    <bmb-icon icon="home" [size]="24" />
    <p>{{ 'common.save' | translate }}</p>
  `,
})
export class ExampleComponent {}
```

Reglas:

- Importa **solo** desde `@ti-tecnologico-de-monterrey-oficial/ds-ng`; nunca desde rutas internas del paquete (por ejemplo, `/lib/...`).
- Enlaza inputs con `[input]="valor"` y escucha outputs con `(output)="handler($event)"`.
- Proporciona todos los `input.required`; si faltan, la compilación falla o el componente registra un error en consola.
- Tipa los datos con las interfaces exportadas (`IBmb...`, `Bmb...Type`) en lugar de `any`.
- En pruebas E2E usa el input `testId` cuando exista; se refleja como `data-testid`.
- Los iconos usan nombres de Material Symbols Rounded en `snake_case` (por ejemplo, `arrow_forward`): https://fonts.google.com/icons.

## Tema y traducciones

- **Tema**: `ThemeService` expone el signal `theme`, `setInitialTheme(tema?)` para inicializar y `setThemeAndSaveInLocal(tema)` para cambiarlo. Aplica `data-theme` en `<html>` y persiste en `localStorage`.
- **Idioma**: `BmbTranslationsService` inicia en `'es'` y descarga `es`/`en` de forma asíncrona desde `/assets/i18n`. Usa `setLanguage('en')`, `addDictionary(lang, dict)` para nuevos idiomas y `updateDictionary(lang, dict)` para sobrescribir textos (fusión de primer nivel). Llama a `updateDictionary` **después** de `await loadDictionaryFromAssets(lang)`, porque la carga reemplaza el diccionario. El idioma no se persiste.
- En plantillas usa `TranslatePipe` (`{{ 'seccion.clave' | translate }}`).

Ejemplos completos: [setup.md#tema-y-traducciones](./references/setup.md#tema-y-traducciones).

## Diagnóstico

| Síntoma                                                                 | Causa probable                                                             | Solución                                                                    |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Iconos vacíos y `Icon not found ... /assets/icons/material-rounded/...` | Falta el asset de Material Symbols                                         | Agrega el glob de `@material-symbols/svg-400/rounded` y reinicia `ng serve` |
| Componentes sin estilos o con tipografía incorrecta                     | Falta `main<MARCA>.min.css` o `assets/fonts`                               | Revisa `styles` y los assets                                                |
| Imágenes o SVG rotos                                                    | Faltan `assets/images` o `assets/svg`                                      | Usa la configuración global de assets                                       |
| Se muestra la clave (`account_statement.title`) en lugar del texto      | Falta el asset `i18n`, clave inexistente o idioma no registrado            | Verifica `/assets/i18n/<lang>.json`, el diccionario y `setLanguage`         |
| Textos personalizados desaparecen al iniciar                            | `updateDictionary` se ejecutó antes de la carga de `/assets/i18n`          | Espera `loadDictionaryFromAssets(lang)` antes de actualizar                 |
| `ERESOLVE` al instalar                                                  | Tag de Bamboo distinto de la major de Angular, o CDK/Material desalineados | Instala el tag `aNN` correcto y alinea `@angular/cdk` y `@angular/material` |
| `'bmb-x' is not a known element`                                        | El componente no está en `imports`                                         | Importa la clase standalone donde se usa                                    |

## Qué no hacer

- No copies SCSS ni código fuente de Bamboo al proyecto; personaliza con clases propias o variables CSS.
- No combines hojas de estilo de varias marcas.
- No uses inputs deprecated en código nuevo.
- No dependas de APIs que no estén exportadas en `index.d.ts`.
