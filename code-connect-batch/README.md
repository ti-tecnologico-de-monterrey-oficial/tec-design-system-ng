# Bamboo Code Connect — ejemplos Angular

Actualizado: **2026-10-27**.

Esta carpeta contiene los ejemplos Angular asociados con componentes de Figma. Sus datos de ejemplo proceden de **Storybook**. El mapeo de la propiedad Figma `image` a valores de icono está centralizado en [icon-image.ts](icon-image.ts).

Las reglas vigentes están en [CODE_CONNECT_CONVENTION.md](CODE_CONNECT_CONVENTION.md). Las instrucciones anteriores de extracción dinámica, ejecución autónoma y publicación continua quedaron sustituidas por este flujo local. Los registros históricos conservan la evidencia de trabajos anteriores; no describen necesariamente el contenido actual de los ejemplos.

## Estado local y publicación

- El lote contiene **127 archivos `.figma.ts`**.
- Los ejemplos se están revisando contra las stories y la API Angular del checkout local.
- Se corrigieron bindings de propiedades y se completaron objetos solicitados, como `message`, `currentBot`, `headerActions` y `emptyStateData`.
- Las comprobaciones locales realizadas incluyen sintaxis TypeScript, parseo de los ejemplos HTML con Angular, nombres de inputs y uso de bindings según sus tipos. No equivalen a compilar una aplicación consumidora.
- Se agregó preparación TypeScript para los inputs con interfaces o tipos estructurados, reutilizando los tipos públicos de la librería. Los ejemplos muestran los imports de tipos, los datos tipados y sus bindings sin exigir propiedades nuevas en Figma.
- En los ejemplos HTML, `<script lang="ts">` presenta los campos que se deben integrar en la clase del componente consumidor; no se debe pegar ese bloque en un template Angular. Modal conserva una receta TypeScript para `MatDialog`.
- Todavía deben revisarse referencias previas de props escalares, controles y templates sin preparación. La validación de interfaces no equivale a compilar una aplicación consumidora completa.
- El CLI de Code Connect no está instalado en este checkout. **No se ha ejecutado `figma connect parse` ni se han publicado los cambios de esta revisión.**

Los estados y conteos de publicación de [INVENTORY.md](INVENTORY.md), [component-index.json](component-index.json) y los reportes anteriores son registros de sus respectivas fechas. No deben presentarse como verificación de los archivos modificados ahora.

## Fuentes para completar un ejemplo

1. Localizar la story correspondiente en `ui-angular/src/lib/**/*.stories.ts`. Confirmar la clase o la composición utilizada, no solo la similitud del nombre.
2. Revisar `argTypes`, `args`, las stories específicas y su `render`. Cuando el ejemplo por defecto no tenga datos suficientes, revisar las variantes documentadas.
3. Resolver las descripciones compartidas de [parameterDescriptions.ts](../docs/utils/parameterDescriptions.ts) y las utilidades que use la story. Los ejemplos también pueden estar dentro de `table.defaultValue.summary` o `getDefaultValueControl(...)`.
4. Confirmar selector, nombres, tipos y export público en `ui-angular/src/lib/**` y `ui-angular/src/index.ts`.
5. Completar el `.figma.ts` con valores de ejemplo utilizables, aplicando las exclusiones y excepciones de la convención.

Un objeto documentado como texto en una tabla de Storybook sigue siendo un objeto en Angular. No copiarlo como atributo de texto ni convertir sus comillas en `&quot;`.

## Reglas del lote

- Usar ejemplos de Storybook y reutilizar `getIcon` de `./icon-image` en los campos de icono. Mantener la lectura de `image` en ese único helper.
- Conservar los encabezados existentes `url`, `source` y `component`, además del identificador de conexión. No agregar comentarios explicativos ni encabezados `storybook` dentro de los templates.
- No agregar eventos, callbacks, métodos de interacción, propiedades de accesibilidad, miembros internos ni propiedades deprecadas o sin uso, salvo las excepciones expresamente solicitadas.
- No agregar `link`, `target` ni `tooltipText` como inputs nuevos. Dentro de datos estructurados se conservan los campos requeridos por la interfaz, según la convención. Filtrar los callbacks y campos opcionales excluidos al copiar fixtures.
- Mostrar ejemplos de objetos y arrays, no únicamente referencias como `[emptyStateData]="emptyStateData"` sin datos.
- Usar `[]` para objetos, arrays, números, booleanos y expresiones. Los textos literales pueden ir sin corchetes.
- No crear nuevas conexiones de building blocks `BB_*`, cambiar los nodos asociados ni retirar conexiones existentes como parte de una revisión de props.
- No modificar ni publicar la librería de Figma durante esta tarea local.

## Helper compartido de iconos

Los 66 templates con valores de icono importan `getIcon` desde `./icon-image`. El helper lee `image` de Figma y escribe su ruta o URL en la prop Angular existente. Los valores `on/off` y booleanos no contienen una ruta, por lo que conservan el icono de ejemplo. Para esos casos se necesita proporcionar la fuente de la imagen; el helper no inventa un recurso.

```ts
import { getIcon } from './icon-image'
```

```html
icon="${getIcon('home')}"
```

Los formatos `typescript` y `expression` permiten usar el mismo helper dentro de los objetos tipados y las expresiones HTML. Solo serializan el texto para su ubicación; no validan imágenes. El import es del template de Code Connect y no se agrega a los imports del código Angular mostrado.

Los imports locales de helpers requieren Code Connect CLI **1.5.0 o posterior**, que los empaqueta al publicar: [notas oficiales de Figma](https://github.com/figma/code-connect/blob/main/CHANGELOG.md#code-connect-v150-29-july-2026).

## Colores de Box Icon

La lectura de `boxColor` está centralizada en [box-icon-color.ts](box-icon-color.ts). BoxIcon usa su propiedad directamente; InteractiveIcon la escribe como `appearance`, y los encabezados de HomeCard, AI Chat Card y TimestreamCard la escriben como `bgIconAppearance`. Las búsquedas anidadas se limitan a las rutas confirmadas en Figma.

La variante `Alternative` de ContainerButton muestra `BmbContainerButtonComplexAlternativeComponent` y su input `leftIconBoxColor`; las demás variantes conservan el ejemplo existente.

SearchCard queda pendiente: el contrato de `backgroundColorIcon` todavía usa colores antiguos y no admite `black-primary`, presente en su Box Icon de Figma. No se agregó un cast ni una prop inexistente al padre. ActionMenu y HomeCardMobile conservan sus ejemplos de color porque sus contextos consultados no exponen un Box Icon equivalente.

## Configuración

Existen dos archivos de configuración:

| Archivo | Contenido actual |
| --- | --- |
| [figma.config.json](figma.config.json) | Incluye `**/*.figma.ts`; declara `defaultBranch: develop`, `label: Angular` y `language: html`. |
| [../figma.config.json](../figma.config.json) | Declara `parser: html`. |

Cambiar propiedades de los ejemplos no requiere modificar estas configuraciones. Antes de usar el CLI, confirmar qué configuración carga según el directorio y la invocación, y si la versión instalada admite el formato del lote. No asumir que ambos archivos se combinan ni reutilizar rutas a ejecutables de otra máquina.

## Verificación y publicación

La detección de imágenes se mantiene en `ui-angular/src/lib/_shared/logic/utils.ts` (`isImage`) y la lógica de `BmbIconComponent`. El helper de Code Connect solo elige el valor de `image` cuando contiene una fuente de texto y conserva el ejemplo en los demás casos; la detección de imágenes corresponde a Angular.


Si después se solicita publicar, primero debe ejecutarse el parser de un CLI compatible con la configuración elegida. La publicación es una tarea separada: una comprobación local no autoriza publicar. Solo después de publicar y verificar el resultado remoto corresponde actualizar los registros de publicación.

## Documentación y herramientas auxiliares

| Archivo | Uso |
| --- | --- |
| [CODE_CONNECT_CONVENTION.md](CODE_CONNECT_CONVENTION.md) | Reglas actuales de ejemplos, bindings, exclusiones y excepciones. |
| [INVENTORY.md](INVENTORY.md) | Registro de conexiones y verificaciones de publicación anteriores. Actualizar únicamente con evidencia de una publicación nueva. |
| [component-index.json](component-index.json) | Inventario para consultas o automatizaciones. No es una dependencia de los ejemplos ni se actualiza por cada prop. |
| [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md) | Pendientes de diseño/API del flujo anterior; revalidar antes de retomarlos. |
| [DECISIONS.md](DECISIONS.md) | Bitácora histórica. No reescribir sus decisiones antiguas como si describieran esta revisión. |
| [inventory-codebase.mjs](inventory-codebase.mjs) y [CODEBASE_INVENTORY.md](CODEBASE_INVENTORY.md) | Herramienta y documentación del inventario Angular. El script imprime resultados y no modifica templates. |
| [BB_ADAPTERS.md](BB_ADAPTERS.md), [BB_RETROACTIVE_AUDIT.md](BB_RETROACTIVE_AUDIT.md) y [COMPOSITION_REMEDIATION.md](COMPOSITION_REMEDIATION.md) | Antecedentes de adaptadores y composiciones dinámicas. No son instrucciones del flujo estático actual. |
| [LIVE_VS_REPO_AUDIT.md](LIVE_VS_REPO_AUDIT.md), [REMOTE_API_AUDIT.md](REMOTE_API_AUDIT.md), [SOURCE_PATH_MIGRATION.md](SOURCE_PATH_MIGRATION.md) y [V1_6_4_B_MIGRATION.md](V1_6_4_B_MIGRATION.md) | Reportes históricos de auditoría y migración. |
| [HANDOFF.md](HANDOFF.md), [REMAINING_COMPONENTS.md](REMAINING_COMPONENTS.md), [CONTRACT_IMPLEMENTATION_BACKLOG.md](CONTRACT_IMPLEMENTATION_BACKLOG.md), [CONTRACT_STATE.md](CONTRACT_STATE.md) y [DOCUMENTATION_WORKLIST.md](DOCUMENTATION_WORKLIST.md) | Referencias de compatibilidad e instrucciones de etapas anteriores. Para el trabajo actual prevalecen este README y la convención. |

Los scripts de migración y auditoría no forman parte de la edición cotidiana de props. Algunos consultan commits fijos de GitHub y pueden sobrescribir reportes o rutas al ejecutarlos; revisar su alcance antes de usarlos. La actualización de estos dos documentos no modifica los estados de publicación, la configuración ni los registros históricos.
