# BmbLayoutDirective

## Descripción general

`BmbLayoutDirective` es una directiva standalone de Angular que facilita la creación de layouts flexibles y responsivos mediante clases CSS dinámicas. Permite definir el espacio entre elementos (gap), márgenes, alineación, justificación y la opción de columnas dinámicas, adaptando el contenedor a diferentes necesidades visuales y estructurales. Es ideal para dashboards, formularios, paneles y cualquier vista que requiera organización flexible de contenido.

---

## Props / Parámetros

| Propiedad     | Tipo                 | Descripción                                                     | Valor por defecto | Obligatorio |
| ------------- | -------------------- | --------------------------------------------------------------- | ----------------- | ----------- |
| `gapSize`     | `SizeNames`          | Espacio (gap) entre los elementos del layout                    | `'m'`             | No          |
| `margin`      | `SizeNames`          | Margen externo del layout                                       | `'m'`             | No          |
| `dynamicCols` | `boolean`            | Habilita columnas dinámicas (layout inteligente)                | `false`           | No          |
| `justify`     | `IJustifyOptions`    | Justificación de los elementos (`center`, `start`, `end`, etc.) | `'start'`         | No          |
| `alignItems`  | `IAlignItemsOptions` | Alineación vertical de los elementos (`center`, `start`, etc.)  | `'start'`         | No          |

---

## Ejemplo de uso

```html
<div
  bmbLayout
  [gapSize]="'l'"
  [margin]="'s'"
  [dynamicCols]="true"
  [justify]="'spaceBetween'"
  [alignItems]="'center'"
>
  <div>Columna 1</div>
  <div>Columna 2</div>
  <div>Columna 3</div>
</div>
```

---

## Dependencias

- `@angular/core` (Directive, HostBinding, input)
- Tipos: `SizeNames`, `IJustifyOptions`, `IAlignItemsOptions` (definidos en `../../types`)

---

## Notas adicionales

- **Accesibilidad:** La directiva no afecta directamente la accesibilidad, pero facilita la organización visual y estructural del contenido, lo que puede mejorar la experiencia con tecnologías asistivas si se usa junto con etiquetas semánticas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y puede combinarse con otras directivas de layout para construir interfaces responsivas.
- **Rendimiento:** Utiliza clases CSS generadas dinámicamente para optimizar el renderizado y la adaptación a diferentes tamaños de pantalla.
- **Personalización:** Permite definir el espacio, margen, alineación y justificación de los elementos, así como habilitar columnas dinámicas para layouts flexibles.
- **Buenas prácticas:** Utiliza clases CSS generadas dinámicamente para mantener la coherencia visual y facilita la construcción de layouts reutilizables y adaptativos.

---

# BmbLayoutItemDirective

## Descripción general

`BmbLayoutItemDirective` es una directiva standalone de Angular que permite definir y personalizar el comportamiento de un elemento dentro de un layout flexible basado en columnas. Facilita la asignación de tamaños de columna para móvil y escritorio, márgenes laterales, crecimiento dinámico y estilos responsivos mediante clases CSS y propiedades flexbox. Es ideal para construir layouts adaptativos y estructurados en dashboards, formularios y vistas complejas.

---

## Props / Parámetros

| Propiedad       | Tipo               | Descripción                                     | Valor por defecto  | Obligatorio |
| --------------- | ------------------ | ----------------------------------------------- | ------------------ | ----------- |
| `colSm`         | `IColumSizeMobile` | Tamaño de columna en dispositivos móviles (0-4) | `0`                | No          |
| `colLg`         | `IColumSizeFull`   | Tamaño de columna en escritorio (0-12)          | `0`                | No          |
| `marginLeft`    | `IMargin`          | Márgenes izquierdos para móvil y escritorio     | `{ sm: 0, lg: 0 }` | No          |
| `marginRight`   | `IMargin`          | Márgenes derechos para móvil y escritorio       | `{ sm: 0, lg: 0 }` | No          |
| `colGrow`       | `number`           | Valor de crecimiento dinámico (flex-grow)       | `0`                | No          |
| `isDynamicItem` | `boolean`          | Habilita crecimiento dinámico del elemento      | `false`            | No          |

---

## Ejemplo de uso

```html
<div
  bmbLayoutItem
  [colSm]="2"
  [colLg]="4"
  [marginLeft]="{ sm: 1, lg: 2 }"
  [marginRight]="{ sm: 1, lg: 2 }"
  [colGrow]="1"
  [isDynamicItem]="true"
>
  <!-- Contenido del layout item -->
</div>
```

---

## Dependencias

- `@angular/core` (Directive, HostBinding, input, OnInit)
- Tipos: `IColumSizeMobile`, `IColumSizeFull`, `IMargin`

---

## Notas adicionales

- **Accesibilidad:** La directiva no afecta directamente la accesibilidad, pero facilita la organización visual y estructural del contenido, lo que puede mejorar la experiencia con tecnologías asistivas si se usa junto con etiquetas semánticas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y puede combinarse con otras directivas de layout para construir interfaces responsivas.
- **Rendimiento:** Utiliza clases CSS y propiedades flexbox para optimizar el renderizado y la adaptación a diferentes tamaños de pantalla.
- **Personalización:** Permite definir márgenes y tamaños de columna específicos para móvil y escritorio, así como habilitar crecimiento dinámico para layouts flexibles.
- **Buenas prácticas:** Utiliza clases CSS generadas dinámicamente para mantener la coherencia visual y facilita la construcción de layouts reutilizables y adaptativos.

---
