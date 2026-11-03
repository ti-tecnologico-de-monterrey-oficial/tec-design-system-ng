# Convención de ejemplos Angular para Code Connect

Actualizada: **2026-10-27**.

Esta convención define cómo mantener los `.figma.ts` del lote actual: ejemplos estáticos con las propiedades y los valores documentados en **Storybook**. Sustituye las instrucciones anteriores de extracción dinámica del diseño y publicación automática. [README.md](README.md) describe el flujo local y el estado de validación.

## Fuentes y alcance

| Fuente | Qué confirma |
| --- | --- |
| Story correspondiente y sus variantes | Propiedades documentadas, valores de ejemplo, estados y composición de uso. |
| `docs/utils/parameterDescriptions.ts` y utilidades de documentación | Descripciones compartidas, tipos, categorías y ejemplos que la story importa. |
| Implementación Angular y `ui-angular/src/index.ts` | Selector, nombres, tipos, estructura de objetos y export público. |
| Encabezado `url` del `.figma.ts` | Nodo de Figma al que ya está asociado el ejemplo. |
| CLI y verificación remota, cuando se soliciten | Compatibilidad del formato, publicación y estado remoto. |

Storybook determina qué ejemplo escribir. La implementación valida su contrato; no se deben agregar indiscriminadamente todos los campos encontrados en una clase.

Revisar la story principal y las variantes pertinentes. No elegir una demostración de servidor o un wrapper solo porque su nombre coincide. No interpretar la categoría de una tabla como prueba suficiente del tipo: hay inputs de texto agrupados bajo “Events” y campos de un wrapper que no son inputs del componente público.

Cuando no exista una story correspondiente, no inventar ejemplos ni completar la API únicamente desde la clase. Dejar identificado el pendiente en la revisión, fuera del archivo de código.

## Formato del archivo

Conservar:

- Los encabezados existentes `url`, `source` y `component`; corregir una ruta únicamente si ya no apunta a la ubicación real.
- `import figma from 'figma'`, el ejemplo con `figma.code`, los imports de uso, `id` y la metadata existente que corresponda.
- La identidad del componente y su variante específica, como Skeleton `type`, la versión móvil o una tarjeta pequeña.

No agregar comentarios explicativos ni líneas `// storybook=...` a los `.figma.ts`. La documentación del proceso pertenece a los archivos Markdown.

Los ejemplos usan datos de Storybook. La excepción solicitada para iconos usa únicamente `getIcon`, exportado por `./icon-image`: ese helper centraliza la lectura de `image` y el formato del valor. Cada `.figma.ts` lo importa y lo aplica al campo de icono existente. No duplicar esa lógica, agregar base64 ni crear validaciones adicionales. Si `image` no contiene una fuente de texto, conservar el valor de ejemplo.

## Datos de ejemplo

Preferir, en este orden:

1. Un valor utilizable de `args` en la story correspondiente.
2. Una fixture de una variante de esa misma familia.
3. El ejemplo documentado en `argTypes`, `table.defaultValue.summary` o una descripción compartida.

No copiar un valor vacío de `args` si contradice el tipo. Por ejemplo, `emptyStateData: ''` no es un objeto `IBmbAlertEmptyState`; usar el objeto documentado por su variante de estado vacío.

Incluir objetos y arrays con una estructura representativa y sus campos requeridos. No dejar referencias como `[currentBot]="currentBot"`, `[message]="message"` o `[emptyStateData]="emptyStateData"` como sustituto del ejemplo.

Ejemplos válidos:

```html
[currentBot]="{ name: 'TecBot', icon: 'bot_tecStandar' }"
[headerActions]="[{ icon: 'chat_add_on' }]"
[notificationSelectionState]="{ '1': true, '2': false }"
```

Al copiar fixtures, retirar callbacks, campos de accesibilidad y propiedades excluidas, sin romper el tipo del objeto. No copiar métodos ni handlers completos desde un wrapper de Storybook.

Para valores que requieran `Date`, `FormControl` o `TemplateRef`, no inventar un literal de tipo incorrecto ni usar `new` dentro de una expresión Angular. Mostrar la preparación TypeScript mínima necesaria y su binding, o registrar que falta completar esa preparación. Una referencia a una variable sin definición no es un ejemplo autocontenido.

Si un componente se configura mediante un servicio, como Modal, conservar la receta documentada y sus datos de configuración; no convertir los campos del servicio en inputs inexistentes del host. Las llamadas necesarias para mostrar esa receta no autorizan agregar callbacks de interacción.

## Interfaces y preparación TypeScript

Las props de datos pueden existir únicamente en código: no necesitan una propiedad equivalente en Figma. Reutilizar las interfaces y los tipos de la implementación, sin volver a declararlos en el template.

- Incluir los `import type` del paquete público en el array `imports`; estos son los imports que Code Connect muestra al consumidor. Un import escrito solo fuera del snippet no documenta el import de uso.
- Para inputs estructurados, declarar los datos como campos tipados de `ExampleComponent` en un bloque `<script lang="ts">` dentro de `figma.code`, seguido del HTML con sus bindings. El bloque presenta la preparación: en Angular se copian los campos a la clase del componente consumidor y el HTML a su template. **No insertar el bloque `<script>` en un template Angular.**
- Modal conserva una receta TypeScript con `ModalDataConfig` y apertura mediante `MatDialog`.
- Si un tipo no se exporta públicamente, usar el contrato del input público, por ejemplo `ReturnType<BmbTableLiteComponent['columns']>`. No importar un tipo homónimo de otro componente ni inventar rutas internas del paquete.
- Conservar los campos requeridos por la interfaz dentro de los datos estructurados. No agregar atributos `alt`, `iconAlt`, `iconImageAlt` ni textos alternativos de iconos a los ejemplos HTML. Los callbacks opcionales y `target` opcionales siguen excluidos al completar fixtures.
- Usar arrays vacíos tipados cuando no se documenten datos sin callbacks, o como estado inicial de un input opcional. No agregar handlers de muestra para satisfacer una interfaz de acciones.

Ejemplo de preparación que se integra en la clase del componente consumidor:

```ts
import type { IBmbTab } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

export class ExampleComponent {
  tabs: IBmbTab[] = [{ id: 1, title: 'General' }];
}
```

```html
<bmb-tabs [tabs]="tabs" />
```


## Cuándo usar `[]`

La decisión depende del valor que se entrega a Angular, además de lo que muestre la story.

| Valor | Forma de ejemplo |
| --- | --- |
| Texto literal | `label="Cuota Mensual"` |
| Texto literal con binding, también válido | `[label]="'Cuota Mensual'"` |
| Número | `[totalCount]="10000"` |
| Booleano | `[enableSwipe]="false"` |
| Objeto | `[currentBot]="{ name: 'TecBot', icon: 'bot_tecStandar' }"` |
| Array | `[progressCircleTitle]="['Total a pagar', 'este mes']"` |
| Expresión o referencia con preparación incluida | `[control]="control"` |

No cambiar un texto literal válido solo para que su sintaxis sea idéntica a la de Storybook. Sí corregir los atributos que estén enviando texto cuando se espera otro tipo. Por ejemplo, `leftContent=""` no representa un booleano y `images=""` no representa un array de imágenes.

Escribir objetos con claves legibles y comillas simples para sus textos. No usar `&quot;` en lugar de las comillas de los objetos. Los valores de ejemplo deben seguir siendo expresiones Angular válidas. Los strings leídos dinámicamente de Figma deben escapar los caracteres especiales al escribirse en atributos HTML, y serializarse como literales al incluirse en los datos TypeScript. La detección de imagen corresponde a la implementación Angular existente (`isImage`); no duplicar esa validación en Code Connect.

## Exclusiones

No agregar automáticamente:

- Outputs y bindings de eventos, incluidos los eventos `Change` de los modelos.
- Métodos, callbacks, validadores de función y campos dedicados a manejadores de eventos.
- Props de accesibilidad: `aria*`, textos alternativos, `inputId` y otros identificadores cuyo propósito sea asociar etiquetas accesibles.
- Identificadores de pruebas y miembros marcados como internos.
- Propiedades deprecadas o sin uso en la implementación.
- Las propiedades **`link`**, **`target`** y **`tooltipText`**, incluso al copiar objetos de ejemplo.

No extender esa exclusión por coincidencia parcial a otros nombres: `textLink`, `valueLink`, `valueTarget` y otros campos distintos se revisan por su propio contrato. No agregar estados de hover, focus o transiciones visuales como si fueran inputs Angular.

No eliminar una propiedad solicitada expresamente por el usuario basándose en el filtro general de una revisión anterior.

## Excepciones solicitadas en esta revisión

Estas propiedades deben conservarse aunque comentarios del código o una revisión anterior las hayan clasificado como deprecadas o sin uso:

| Archivo | Propiedad | Ejemplo acordado |
| --- | --- | --- |
| `ActionMenu.figma.ts` | `subtitle` | `subtitle="Subtitle"` |
| `AlertCenter.figma.ts` | `enabledFooterOptions` | `[enabledFooterOptions]="{ tags: true, favorites: true, archive: true }"` |
| `AlertCenter.figma.ts` | `enableSwipe` | `[enableSwipe]="false"` |
| `AlertCenter.figma.ts` | `notificationSelectionState` | `[notificationSelectionState]="{ '1': true, '2': false }"` |

Las excepciones corresponden a estas entradas concretas. No rehabilitan otras props deprecadas ni requieren modificar la librería Angular.

## Composición y conexiones existentes

Mantener una receta estática documentada de los hijos cuando el componente requiera contenido. No sustituir una composición necesaria por un host vacío ni recuperar la extracción dinámica para generarla.

No crear nuevos targets para bloques `BB_*`, iconos internos o helpers durante la revisión de props. Los archivos de adaptadores ya existentes pueden ajustarse como ejemplos estáticos, conservando su nodo e identificador. Retirar conexiones o modificar el diseño de Figma requiere una tarea explícita distinta.

Los documentos `BB_ADAPTERS.md`, `BB_RETROACTIVE_AUDIT.md` y `COMPOSITION_REMEDIATION.md` conservan antecedentes del flujo anterior. Sus recetas dinámicas no prevalecen sobre esta convención.

## Comprobación y registro

Antes de dar por terminado un ejemplo:

1. Confirmar su story y leer los objetos completos, no solo el resumen del tipo.
2. Comprobar que cada atributo pertenece a la API que usa el ejemplo y tiene el binding correcto.
3. Revisar que los objetos, arrays y valores especiales incluyan ejemplos utilizables o la preparación necesaria.
4. Excluir los campos anteriores y conservar las excepciones solicitadas.
5. Comprobar sintaxis TypeScript y Angular, nombres de inputs y ausencia de duplicados.
6. Mantener la lectura de `image` en `icon-image.ts`; no agregar comentarios ni consultas al diseño dentro de cada template.
7. Conservar los metadatos de conexión y los cambios pedidos anteriormente.

El parseo local no verifica todos los tipos de una aplicación consumidora ni demuestra que el CLI de Code Connect acepte el lote. Antes de una publicación solicitada, confirmar el CLI y la configuración utilizada, ejecutar su parser y verificar el resultado remoto después de publicar.

No publicar como efecto secundario de editar props. No marcar cambios locales como publicados ni actualizar sus conteos en `INVENTORY.md` o `component-index.json` sin evidencia remota. Si se corrigen rutas o se registran pendientes locales en esos inventarios, distinguirlos del estado publicado. Los registros anteriores mantienen su fecha y alcance hasta que exista evidencia nueva.
