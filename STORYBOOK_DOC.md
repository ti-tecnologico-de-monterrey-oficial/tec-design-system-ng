# Documentación técnica — Utilidades de Storybook (Bamboo Design System)

Este módulo contiene un conjunto de **constantes, tipos y funciones utilitarias** usadas para generar de forma programática el contenido de las páginas de documentación de Storybook (`.stories` / `.mdx`) del sistema de diseño **Bamboo**. Su propósito es estandarizar el formato de las descripciones, ejemplos de código, avisos (alertas), arquitectura DOM y demás secciones que aparecen en la documentación de cada componente/elemento/directiva/servicio del sistema.

---

## Índice

1. [Importaciones](#importaciones)
2. [Tipos e interfaces](#tipos-e-interfaces)
3. [Constantes generales](#constantes-generales)
4. [Estructura de página](#estructura-de-página)
5. [Utilidades de formato de atributos](#utilidades-de-formato-de-atributos)
6. [Utilidades de nombres y enlaces](#utilidades-de-nombres-y-enlaces)
7. [Eventos](#eventos)
8. [Alertas y bloques destacados](#alertas-y-bloques-destacados)
9. [Secciones de arquitectura DOM](#secciones-de-arquitectura-dom)
10. [Ejemplos de código (TypeScript / HTML / Formularios reactivos)](#ejemplos-de-código-typescript--html--formularios-reactivos)
11. [Descripciones generales de componentes](#descripciones-generales-de-componentes)
12. [Tipografía y variables de diseño (foundations)](#tipografía-y-variables-de-diseño-foundations)
13. [Providers de Angular](#providers-de-angular)
14. [Generadores de descripción para variantes de componentes](#generadores-de-descripción-para-variantes-de-componentes)
15. [Lista de colores](#lista-de-colores)
16. [Checklist de documentación (comentario interno)](#checklist-de-documentación-comentario-interno)

---

## Importaciones

El archivo importa:

- Bloques de `@storybook/addon-docs/blocks` (`Controls`, `Description`, `Heading`, `Primary`, `Title`) para construir el árbol de la página de documentación con `createElement` de React.
- `getListingOnOneLine` desde `../../shared/logic/utils`, utilizada para convertir listas en cadenas de texto legibles en una sola línea.
- Listas de colores predefinidas desde `../../shared/types/foundations/colors/color-type` (bases, semánticas, MITEC, "creative" y de alerta).

---

## Tipos e interfaces

| Nombre | Tipo | Descripción |
|---|---|---|
| `IBmbVariableDesc` | `interface` | Describe una variable de diseño con `element` (nombre del elemento) y `name` (nombre de la variable). |
| `IBmbOnEvent` | `interface` | Describe un evento documentado: `name`, `handleExample`, `propertyValue`, `type`, `event_type`. |
| `IBmbStoryLink` | `interface` | Referencia a otra historia/página: `title` y, opcionalmente, `showFullLinkName`. |
| `IBmbStoryType` | `type` | Tipo de historia: `'element' \| 'component' \| 'organism' \| 'directive' \| 'service'`. |
| `IBmbOnEventType` | `type` | Tipo de evento: `'change' \| 'keyDown' \| 'other'`. |

---

## Constantes generales

- **`RELEVANT_TITLE`**: mapa de títulos con emoji para distintos tipos de aviso (`warning`, `important`, `note`, `configuration`, `example`, `deprecated`, `lts`).
- **`BlockquoteType`**: sintaxis de blockquote de GitHub Flavored Markdown para `warning`, `note` e `important`.
- **`DESIGN_SYSTEM_TITLE`**: nombre estilizado del sistema de diseño (`***Bamboo***`).
- **`TECHNICAL_DOC_TITLE`**, **`TECHNICAL_DOC_REFERENCES`**: título y texto introductorio para la sección de referencias a documentación técnica.
- Títulos de sección reutilizables: `STORIES_TITLE`, `TITLE_OF_CONTROLS`, `PREVIEW_TITLE`, `TOC_TITLE`, `DESCRIPTION_TITLE`, `SPECIAL_SPECIFICATIONS_TITLE`, `SANDBOX_TITLE`.
- Textos descriptivos fijos: `SPACING_DESCRIPTION`, `TYPOGRAPHY_DESCRIPTION`, `FONT_FAMILY_DESCRIPTION`, `FULLSCREEN_DESC`.
- **`TOC_OBJ`**: configuración por defecto de la tabla de contenidos (`headingSelector: 'h2, h3'`).

---

## Estructura de página

### `getPageStructureForFoundationStories(): unknown[]`
Devuelve el arreglo de elementos React (`Title`, `Description`, `Heading` con `PREVIEW_TITLE`, `Primary`, `Controls`) usado como plantilla de página para historias de tipo **foundation** (fundamentos de diseño).

### `getPageStructureForTemplateStories(): unknown[]`
Igual que la anterior, pero **sin** el bloque `Controls` — pensado para historias de tipo **template**.

---

## Utilidades de formato de atributos

### `attributes(object): string`
Convierte un objeto de propiedades en una cadena de atributos HTML/Angular, excluyendo la clave `test_text`. Usa `[prop]='valor'` para funciones/objetos y `prop="valor"` para strings (mediante los helpers internos `getKeyFormat` y `getValue`).

### `attributesText(object): string`
Extrae únicamente el valor de la clave `test_text` del objeto, para usarlo como contenido de texto del elemento de ejemplo.

---

## Utilidades de nombres y enlaces

- **`getLandingGeneralDesc(name)`** / **`getStandaloneGeneralDesc(name)`**: generan la descripción general para plantillas de *Landing* y de *Stand alone sites*, respectivamente, incluyendo su enlace a documentación general.
- **`getFormatName(name, separator?, replace?)`**: capitaliza la primera letra de un nombre; si se indica un separador, capitaliza cada palabra separada y las concatena, o bien reemplaza el separador por otro carácter.
- **`getStoryTitle(fullTitle)`**: obtiene solo el último segmento del título completo de una historia (después del último `/`).
- **`getStoryLink({ title, showFullLinkName, isPreURL })`**: construye un enlace Markdown hacia la página `/docs/...--documentation` de otra historia.

---

## Eventos

### `getOnEvent(name, paramName, type?, isHandle?, additionalBlock?): IBmbOnEvent`
Genera la descripción de un evento de un componente/directiva:
- `name`: nombre del evento.
- `type`: tipo del parámetro del evento (por defecto `'MouseEvent'`; si es `'void'` se omite el parámetro).
- `handleExample`: fragmento de código de ejemplo del método manejador (`handleX(event) {...}`).
- `propertyValue`: valor a usar al enlazar el evento en la plantilla, p. ej. `handleX($event)`.

---

## Alertas y bloques destacados

### `getAlertBlockquote(content, options): string`
Función base para construir bloques de tipo `blockquote` (GFM `> [!WARNING]`, `> [!NOTE]`, `> [!CALLOUT]`) con un título y contenido. Soporta títulos en negritas (`isRelevantTitle`), títulos como encabezado (`isHeader`) e identificadores de sub-historia.

Construidas sobre `getAlertBlockquote`:

| Función | Propósito |
|---|---|
| `getEmptyStateMessage(...)` | Recuerda usar el *empty state* correspondiente, con enlace a la guía de UX writing. |
| `getTECParticularitiesMessage(element, ...)` | Advierte que un elemento es particularidad exclusiva de las marcas TEC/TECMI y no debe usarse en otras marcas. |
| `getOutOfModalUseMessage(...)` | Advierte que el elemento debe implementarse fuera de un `Modal`. |
| `getReferenceRecommendationForVariable(element)` | Recomienda revisar la documentación de *Variables* para implementar el elemento vía CSS. |
| `getFullScreenDesc()` | Nota sobre la visualización incorrecta en modo pantalla completa dentro de Storybook. |
| `getElementUsesDesc(name, isOther?)` | Indica qué variante (`bmb-{name}`) usa el ejemplo actual. |
| `getActionMenuAlert()` | Recuerda añadir la etiqueta `#actionMenuItem` a las plantillas de *Action menu*. |
| `getDeprecatedDesc({ type, isHeaderL2, isBlockquote })` | Genera el aviso de elemento/propiedad **obsoleta**, opcionalmente como blockquote con encabezado. |

Otras utilidades relacionadas:
- **`getGridGeneratorLink()`**: enlace fijo a la herramienta *Grid generator*.
- **`getAuxiliaryDescription(principal, auxiliary)`**: describe la relación entre un componente principal y su auxiliar.
- **`getTechnicalDocReferences({ references, isFullScreenDesc })`**: construye la sección "🛠️ Documentación técnica" con una lista de enlaces (`IBmbStoryLink[]`).
- **`getTechnicalOneReference(title)`**: atajo de `getTechnicalDocReferences` para una sola referencia.

---

## Secciones de arquitectura DOM

### `getArchitectureSection(architectureBlock, isSubStory?, bmbNameLink?, documentationLink?, subStoryChart?): string`
Genera la sección **"DOM Architecture"** con un bloque de código HTML y, opcionalmente, un enlace a la arquitectura DOM de otro componente relacionado (`getDOMArchitectureLink`).

### `getCheckboxOrRadialArchitecture(type): string`
Atajo de `getArchitectureSection` con la estructura DOM predefinida para componentes de tipo `checkbox` o `radial` (contenedor, `input`, caja de marca y etiqueta opcional).

### `getDOMArchitectureLink(bmbNameLink?, documentationLink?): string`
Genera el enlace Markdown hacia la sección de arquitectura DOM de otro componente Bamboo.

---

## Ejemplos de código (TypeScript / HTML / Formularios reactivos)

- **`getDescribeTypeTextBlock(typeExampleName, additionalTitle?, isLevel3?, additionalText?, isSubStory?, subStoryChart?)`**: encabezado descriptivo genérico para un bloque de ejemplo (p. ej. "TypeScript example", "HTML example").
- **`getTypescriptExampleBlock(...)`** *(interna)*: arma el bloque de código TypeScript con imports de Angular (`CommonModule`, `Component`), el import del componente Bamboo y la definición de la clase del componente standalone.
- **`getTypescriptExampleTextBlock(...)`**: combina el encabezado (`getDescribeTypeTextBlock`) con el bloque de código (`getTypescriptExampleBlock`).
- **`getReactiveFormTitle(bmbInputName, ...)`**: título y descripción para la sección de ejemplo de **formulario reactivo**.
- **`getFormExampleBlock(bmbInputName, inputName, additionalBlock, inputExample, ...)`**: genera el ejemplo completo de formulario reactivo, incluyendo el ejemplo TypeScript (con `FormGroup`/`FormControl`, `onSubmit`, validación de errores) y el ejemplo HTML correspondiente.
- **`getHTMLFormExampleTextBlock(inputExample, ...)`**: bloque de código HTML de un formulario (`<form [formGroup]="userForm" ...>`) con el campo de ejemplo y un botón de envío.
- **`getBasicExampleBlock(inputName, ...)`**: combina el ejemplo TypeScript y el encabezado del ejemplo HTML básico (sin formulario reactivo) para un componente.
- **`getSubStoryIdentifier(isSubStory?, subStoryChart?)`**: devuelve el prefijo/identificador usado en encabezados cuando el contenido pertenece a una **sub-historia**.

---

## Descripciones generales de componentes

- **`getGeneralComponentDescription({ name, type, additional, alternativeDescription })`**: primera frase estándar de la descripción de un componente/elemento/directiva, con el formato `` `bmb-nombre` es un [tipo] de Bamboo que permite... ``.
- **`getGeneralDescription(content, options)`**: construye la sección **"Description"** completa, incluyendo el aviso de obsolescencia si aplica (`isDeprecated`) y el enlace a documentación general (`generalDocLink`).
- **`getFieldDescription(componentName, additionalDescription, generalDocLink)`**: descripción estándar para componentes de tipo **campo de entrada** (`bmb-{componentName}`), incluyendo validaciones, mensajes de error y soporte de tooltips.
- **`getSpecialSpecifications(content, options)`**: sección **"Considerations / Restrictions"**.
- **`getContainerButtonComponentDescription({ selectorName, variantName, componentName })`**: documentación completa (descripción + estado vacío + ejemplo básico) para variantes de **Container button**.
- **`getActionMenuItemComponentDescription({ selectorName, variantName, componentName, parentName })`**: documentación completa para variantes de elementos de **Action menu** (u otro componente padre indicado).

---

## Tipografía y variables de diseño (foundations)

- **`getFoundationDescriptions(element, additionalDescription?)`**: descripción genérica para una colección de variables de *foundation* (p. ej. espaciado, tipografía).
- **`getHelpDescriptionForGeneratingVariables(element, isControl?)`**: texto de ayuda que invita a usar la herramienta interactiva o los controles para generar variables de un elemento.
- **`getTypographyDetail(isCompleteDetail?)`**: sección detallada de **tipografía**: familias de fuente (`font-light`, `font-regular`, `font-bold`), escala de tamaños (1–12) y su mapeo a tags HTML (`h1`–`h4`, `p`, `a`, `blockquote`).
- **`getVariableDetail(element, classes, list, definitionClass, size, style?, isInherit?, variableDescription?, stylesVar?)`**: describe el nombre de clase o variable CSS de un elemento, con ejemplo de uso y, si `isInherit` es verdadero, un segundo ejemplo mostrando la herencia del valor en elementos hijos.
- **`getVariableAndClassesSizes(element)`**: tabla de valores disponibles para un tipo de tamaño (`none`, `xxs`…`xxl`, `auto`, y escala numérica `1`–`10`) en unidades REM aproximadas en píxeles.
- **`getSandboxConsiderationsDocumentation(element, introductionContent?, content?, isWarning?, implementationDetails?, style?, isClassNameVar?, isInherit?, isOmitImportant?)`**: función más compleja del módulo; arma la documentación completa de una *foundation* de tipo sandbox (p. ej. espaciados), incluyendo:
  - Recomendación de uso de variables (opcional, `isOmitImportant`).
  - Advertencia sobre posibles sobreescrituras por componentes (`isWarning`).
  - Secciones **"Class Name"** y **"CSS Variable"** generadas a partir de `implementationDetails` (lista de `IBmbVariableDesc` o `string[]`), apoyándose en las funciones internas `getSubList` y `getMergeList` para construir los nombres de clase/variable y sus valores combinados.
  - Cierre con la sección **"Sandbox"**.

Funciones internas de apoyo (no exportadas fuera del flujo de `getSandboxConsiderationsDocumentation`):
- **`getSubList(list, elementName, template?)`**: mapea una lista de strings o de `IBmbVariableDesc` a una lista de strings, aplicando opcionalmente una plantilla con marcador `[__]`.
- **`getMergeList(list, definition, splitChar)`**: combina una lista de propiedades con una definición de estilos separada por `splitChar`, generando declaraciones CSS del tipo `propiedad: var(--variable);`.

---

## Providers de Angular

- **`getProviderBlockExample(bambooProviderName)`**: bloque de código del arreglo `providers` con `provideRouter` y `importProvidersFrom([...])`.
- **`getProviderExample(bambooProviderName)`**: envuelve el bloque anterior en una frase de instrucción ("Add the *** X *** to your App providers").
- **`getProviderTypescriptExample(bambooProviderName, additionalDetail?)`**: sección completa **"⚙️ Configuration"** con el ejemplo de `app.config.ts` mostrando cómo registrar el provider de Bamboo en `ApplicationConfig`.

---

## Lista de colores

### `colorList: (color)[]`
Arreglo que concatena todas las listas de colores del sistema:
`BMB_BASE_COLOR_LIST`, `BMB_MITEC_BASE_COLOR_LIST`, `BMB_CREATIVE_BASE_COLOR_LIST`, `BMB_SEMANTIC_COLOR_LIST`, `BMB_SEMANTIC_BASE_COLOR_LIST`, `BMB_MITEC_COLOR_LIST`, `BMB_CREATIVE_COLOR_LIST` y `BMB_ALERT_COLOR_LIST`.

Se usa como fuente única para controles/selectores de color en Storybook.

---

## Checklist de documentación (comentario interno)

El archivo incluye, al final, dos bloques de comentarios que **no son código ejecutable** sino ayudas para quien documenta un nuevo componente:

1. **Checklist** de las secciones que debe tener toda página de documentación (tabla de contenidos, tabs, nombre, descripción, arquitectura DOM, consideraciones/restricciones, ejemplo de formulario reactivo, ejemplos TypeScript/HTML, propiedades y eventos, plantillas de variantes), indicando dónde/cómo añadir cada una dentro de los `parameters` de Storybook.
2. **Plantilla de ejemplo** (comentada) que muestra cómo combinar `getGeneralDescription`, `getBasicExampleBlock`, `getOnEvent`, y las opciones de `controls.exclude` / `tags: ['!autodocs']` al crear una nueva historia.

> Estas secciones sirven como referencia rápida para desarrolladores del equipo al crear la documentación de un nuevo componente del sistema Bamboo, y no deben eliminarse ni tratarse como código muerto.

---

## Resumen de propósito

En conjunto, este módulo funciona como una **capa de generación de plantillas Markdown/MDX** reutilizable para toda la documentación de Storybook del Design System Bamboo, evitando la duplicación de texto/formato entre los distintos componentes, elementos, directivas y servicios documentados, y garantizando consistencia visual y estructural (títulos, alertas, ejemplos de código, arquitectura DOM, tipografía y variables de diseño) en toda la librería.
