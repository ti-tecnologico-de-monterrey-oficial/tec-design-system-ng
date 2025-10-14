# BmbVerticalLayoutDirective

## Descripción general

`BmbVerticalLayoutDirective` es una directiva standalone de Angular que facilita la creación de layouts verticales flexibles y responsivos. Permite definir el espacio entre elementos (gap), la justificación y alineación de los ítems, así como la altura total del contenedor. Es ideal para paneles, dashboards, formularios y cualquier vista que requiera organización vertical de contenido con control visual y estructural.

---

## Props / Parámetros

| Propiedad      | Tipo                | Descripción                                                        | Valor por defecto | Obligatorio |
|----------------|---------------------|--------------------------------------------------------------------|-------------------|-------------|
| `gapSize`      | `SizeNames`         | Espacio (gap) entre los elementos del layout vertical              | `'m'`             | No          |
| `justify`      | `IJustifyOptions`   | Justificación de los elementos (`start`, `center`, `end`, etc.)    | `'start'`         | No          |
| `alignItems`   | `IAlignItemsOptions`| Alineación vertical de los elementos (`start`, `center`, etc.)     | `'start'`         | No          |
| `layoutHeight` | `string`            | Altura total del layout vertical (ej. `'100%'`, `'80vh'`)          | `'100%'`          | No          |

---

## Ejemplo de uso

```html
<div
  bmbVerticalLayout
  [gapSize]="'l'"
  [justify]="'center'"
  [alignItems]="'stretch'"
  [layoutHeight]="'80vh'"
>
  <div>Sección superior</div>
  <div>Sección central</div>
  <div>Sección inferior</div>
</div>
```

---

## Dependencias

- `@angular/core` (Directive, HostBinding, input, effect)
- Tipos: `SizeNames` (definido en `../../../types`), `IJustifyOptions`, `IAlignItemsOptions` (definidos en `../bmb-layout.directive`)

---

## Notas adicionales

- **Accesibilidad:** La directiva no afecta directamente la accesibilidad, pero facilita la organización visual y estructural del contenido, lo que puede mejorar la experiencia con tecnologías asistivas si se usa junto con etiquetas semánticas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y puede combinarse con otras directivas de layout para construir interfaces verticales adaptativas.
- **Rendimiento:** Utiliza clases CSS generadas dinámicamente y el sistema de señales/efectos de Angular para optimizar el renderizado y la adaptación a diferentes tamaños de pantalla.
- **Personalización:** Permite definir el espacio, la alineación, la justificación y la altura del layout vertical, facilitando la construcción de layouts flexibles y reutilizables.
- **Buenas prácticas:** Utiliza clases CSS generadas dinámicamente para mantener la coherencia visual y facilita la construcción de layouts adaptativos y estructurados.

---

# BmbVerticalLayoutItemDirective

## Descripción general

`BmbVerticalLayoutItemDirective` es una directiva standalone de Angular que permite definir el comportamiento de crecimiento (flex-grow) de un elemento dentro de un layout vertical. Facilita la asignación dinámica de espacio vertical entre los elementos hijos de un contenedor flex, permitiendo que ciertos elementos ocupen más espacio según el valor de `rowGrow`. Es ideal para construir layouts verticales adaptativos en dashboards, paneles y vistas con múltiples secciones.

---

## Props / Parámetros

| Propiedad  | Tipo     | Descripción                                      | Valor por defecto | Obligatorio |
|------------|----------|--------------------------------------------------|-------------------|-------------|
| `rowGrow`  | `number` | Valor de crecimiento vertical (flex-grow)         | `0`               | No          |

---

## Ejemplo de uso

```html
<div style="display: flex; flex-direction: column; height: 100vh;">
  <div bmbVerticalLayoutItem [rowGrow]="1">
    <!-- Sección principal que crece -->
  </div>
  <div bmbVerticalLayoutItem>
    <!-- Sección fija -->
  </div>
</div>
```

---

## Dependencias

- `@angular/core` (Directive, HostBinding, input, effect, OnInit)

---

## Notas adicionales

- **Accesibilidad:** La directiva no afecta directamente la accesibilidad, pero facilita la organización visual y estructural del contenido, lo que puede mejorar la experiencia con tecnologías asistivas si se usa junto con etiquetas semánticas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y puede combinarse con layouts flexibles para construir interfaces verticales adaptativas.
- **Rendimiento:** Utiliza el sistema de señales y efectos de Angular para actualizar el estilo `flex` dinámicamente sin afectar el rendimiento.
- **Personalización:** Permite definir el crecimiento vertical de cada elemento, facilitando layouts donde ciertas secciones deben ocupar más espacio.
- **Buenas prácticas:** Utiliza clases CSS generadas dinámicamente para mantener la coherencia visual y facilita la construcción de layouts reutilizables y adaptativos.

---
