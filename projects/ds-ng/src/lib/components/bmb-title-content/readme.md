# BmbTitleContentComponent

## Descripción general

`BmbTitleContentComponent` es un componente standalone de Angular diseñado para mostrar títulos y subtítulos enriquecidos, con soporte para íconos, imágenes, breadcrumbs (navegación local), alineación central, personalización de tamaño y peso de fuente, y fondo transparente o coloreado. Es ideal para encabezados de páginas, secciones, tarjetas y vistas que requieren jerarquía visual y navegación contextual.

---

## Props / Parámetros

| Propiedad           | Tipo                       | Descripción                                                        | Valor por defecto | Obligatorio |
|---------------------|----------------------------|--------------------------------------------------------------------|-------------------|-------------|
| `title`             | `string`                   | Título principal                                                   | -                 | Sí          |
| `titleSize`         | `string`                   | Tamaño de fuente del título (`1` a `6`)                            | `'5'`             | No          |
| `titleFontWeight`   | `string`                   | Peso de fuente del título (`100` a `900`)                          | `'600'`           | No          |
| `subtitle`          | `string \| undefined`      | Subtítulo opcional                                                 | `''`              | No          |
| `subtitleSize`      | `string`                   | Tamaño de fuente del subtítulo                                     | `'4'`             | No          |
| `subtitleFontWeight`| `string`                   | Peso de fuente del subtítulo                                       | `'400'`           | No          |
| `subtitleIcon`      | `string`                   | Ícono para el subtítulo                                            | `''`              | No          |
| `subtitleIconSize`  | `number`                   | Tamaño del ícono del subtítulo                                     | `0`               | No          |
| `isCenterContent`   | `boolean`                  | Centra el contenido del título y subtítulo                         | `false`           | No          |
| `dataLocalNav`      | `IBmbDataTopBar[]`         | Breadcrumbs para navegación local                                  | `[]`              | No          |
| `transparentBgC`    | `boolean`                  | Fondo transparente para el ícono                                   | `false`           | No          |
| `icon`              | `string`                   | Ícono o imagen para el título                                      | `''`              | No          |
| `iconSize`          | `number`                   | Tamaño del ícono del título                                        | `24`              | No          |
| `bgIconAppearance`  | `IBmbColor`                | Color de fondo del ícono                                           | -                 | No          |

---

## Ejemplo de uso

```html
<bmb-title-content
  [title]="'Panel de control'"
  [titleSize]="'6'"
  [titleFontWeight]="'700'"
  [subtitle]="'Bienvenido al sistema de gestión'"
  [subtitleSize]="'4'"
  [subtitleFontWeight]="'400'"
  [subtitleIcon]="'info'"
  [subtitleIconSize]="20"
  [isCenterContent]="true"
  [dataLocalNav]="[{ label: 'Inicio', link: '/' }, { label: 'Panel' }]"
  [transparentBgC]="false"
  [icon]="'dashboard'"
  [iconSize]="32"
  [bgIconAppearance]="'mitec-blue'"
></bmb-title-content>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbContainerComponent`
- `BmbIconComponent`
- `BmbBreadcrumbComponent`
- Tipos: `IBmbDataTopBar`, `IBmbColor`, `IBmbFontWeightContent`
- Utilidad: `isImage` (para detectar si el ícono es una imagen)

---

## Notas adicionales

- **Accesibilidad:** El componente soporta navegación por teclado y puede integrarse con roles y etiquetas ARIA para mejorar la experiencia con tecnologías asistivas. Los breadcrumbs facilitan la orientación y navegación contextual.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y permite personalizar la jerarquía visual, el fondo y los íconos.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite ajustar tamaño, peso, alineación, íconos, imágenes y fondo del título y subtítulo, así como mostrar breadcrumbs para navegación local.
- **Buenas prácticas:** Utiliza métodos para gestionar estilos y clases dinámicamente, y valida la presencia de navegación local para mostrar breadcrumbs solo cuando es necesario.

---
