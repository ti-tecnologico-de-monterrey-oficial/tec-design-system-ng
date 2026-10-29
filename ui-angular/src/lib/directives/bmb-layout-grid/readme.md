# BmbLayoutGridDirective & BmbLayoutGridItemDirective

## Descripción general

`BmbLayoutGridDirective` y `BmbLayoutGridItemDirective` son directivas standalone de Angular que permiten crear layouts basados en CSS Grid de forma declarativa y flexible. Facilitan la definición de filas, columnas, espacios (gap), tamaños personalizados y posicionamiento de los elementos hijos dentro de la cuadrícula. Son ideales para dashboards, paneles, galerías y cualquier vista que requiera organización visual avanzada y responsiva.

---

## Props / Parámetros

### BmbLayoutGridDirective

| Propiedad    | Tipo                 | Descripción                                          | Valor por defecto | Obligatorio |
| ------------ | -------------------- | ---------------------------------------------------- | ----------------- | ----------- |
| `colGapSize` | `SizeNames`          | Espacio entre columnas                               | `'m'`             | No          |
| `rowGapSize` | `SizeNames`          | Espacio entre filas                                  | `'m'`             | No          |
| `columnSize` | `string[] \| string` | Tamaño de columnas (ej. `'auto'`, `['1fr', '2fr']`)  | `'auto'`          | No          |
| `rowSize`    | `string[] \| string` | Tamaño de filas (ej. `'auto'`, `['100px', '200px']`) | `'auto'`          | No          |
| `columns`    | `number`             | Número de columnas en la cuadrícula                  | `1`               | No          |
| `rows`       | `number`             | Número de filas en la cuadrícula                     | `1`               | No          |
| `height`     | `string \| number`   | Altura total del grid                                | `'auto'`          | No          |

### BmbLayoutGridItemDirective

| Propiedad         | Tipo     | Descripción                              | Valor por defecto | Obligatorio |
| ----------------- | -------- | ---------------------------------------- | ----------------- | ----------- |
| `colStart`        | `number` | Columna inicial del elemento en el grid  | -                 | Sí          |
| `rowStart`        | `number` | Fila inicial del elemento en el grid     | -                 | Sí          |
| `numberOfColumns` | `number` | Número de columnas que ocupa el elemento | `1`               | No          |
| `numberOfRows`    | `number` | Número de filas que ocupa el elemento    | `1`               | No          |

---

## Ejemplo de uso

```html
<div
  bmbLayoutGrid
  [columns]="3"
  [rows]="2"
  [colGapSize]="'l'"
  [rowGapSize]="'s'"
  [columnSize]="['1fr', '2fr', '1fr']"
  [rowSize]="['100px', '200px']"
  [height]="'400px'"
>
  <div
    bmbLayoutGridItem
    [colStart]="1"
    [rowStart]="1"
    [numberOfColumns]="2"
    [numberOfRows]="1"
  >
    Elemento 1
  </div>
  <div bmbLayoutGridItem [colStart]="3" [rowStart]="1">Elemento 2</div>
  <div
    bmbLayoutGridItem
    [colStart]="1"
    [rowStart]="2"
    [numberOfColumns]="3"
    [numberOfRows]="1"
  >
    Elemento 3
  </div>
</div>
```

---

## Dependencias

- `@angular/core` (Directive, HostBinding, input)
- Tipos: `SizeNames` (definido en `../../types`)

---

## Notas adicionales

- **Accesibilidad:** La directiva no afecta directamente la accesibilidad, pero facilita la organización visual y estructural del contenido, lo que puede mejorar la experiencia con tecnologías asistivas si se usa junto con etiquetas semánticas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y permite construir layouts grid avanzados y responsivos.
- **Rendimiento:** Utiliza clases CSS y estilos generados dinámicamente para optimizar el renderizado y la adaptación a diferentes tamaños de pantalla.
- **Personalización:** Permite definir el número y tamaño de filas/columnas, así como el posicionamiento y el espacio entre elementos, facilitando la construcción de layouts flexibles y reutilizables.
- **Buenas prácticas:** Utiliza clases CSS generadas dinámicamente y estilos inline para mantener la coherencia visual y facilitar la construcción de layouts adaptativos y estructurados.

---
