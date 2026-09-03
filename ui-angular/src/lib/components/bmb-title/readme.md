# BmbTitleContentComponent

## Descripción general

`BmbTitleContentComponent` es un componente standalone de Angular diseñado para mostrar títulos y subtítulos enriquecidos con alineación central, personalización de tamaño y peso de fuente, y fondo transparente o coloreado.

---

## Props / Parámetros

| Propiedad            | Tipo                  | Descripción                                | Valor por defecto | Obligatorio |
| -------------------- | --------------------- | ------------------------------------------ | ----------------- | ----------- |
| `title`              | `string`              | Título principal                           | -                 | Sí          |
| `titleSize`          | `string`              | Tamaño de fuente del título (`1` a `6`)    | `'5'`             | No          |
| `titleFontWeight`    | `string`              | Peso de fuente del título (`100` a `900`)  | `'600'`           | No          |
| `subtitle`           | `string \| undefined` | Subtítulo opcional                         | `''`              | No          |
| `subtitleSize`       | `string`              | Tamaño de fuente del subtítulo             | `'4'`             | No          |
| `subtitleFontWeight` | `string`              | Peso de fuente del subtítulo               | `'400'`           | No          |
| `isCenterContent`    | `boolean`             | Centra el contenido del título y subtítulo | `false`           | No          |

---

## Ejemplo de uso

```html
<bmb-title-content
  [componentTitle]="'Panel de control'"
  [titleSize]="'6'"
  [titleFontWeight]="'700'"
  [subtitle]="'Bienvenido al sistema de gestión'"
  [subtitleSize]="'4'"
  [subtitleFontWeight]="'400'"
  [isCenterContent]="true"
></bmb-title-content>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbContainerComponent`
- Tipos: `IBmbDataTopBar`, `IBmbColor`, `IBmbFontWeightContent`

---

## Notas adicionales

- **Accesibilidad:** El componente soporta navegación por teclado y puede integrarse con roles y etiquetas ARIA para mejorar la experiencia con tecnologías asistivas. Los breadcrumbs facilitan la orientación y navegación contextual.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y permite personalizar la jerarquía visual, el fondo y los íconos.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite ajustar tamaño, peso, alineación, íconos, imágenes y fondo del título y subtítulo, así como mostrar breadcrumbs para navegación local.
- **Buenas prácticas:** Utiliza métodos para gestionar estilos y clases dinámicamente.

---
