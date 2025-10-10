# BmbLogoComponent

## Descripción general

`BmbLogoComponent` es un componente standalone de Angular diseñado para mostrar el logotipo institucional o de marca en la interfaz. Permite personalizar el tamaño, la imagen, el texto alternativo y el comportamiento interactivo, incluyendo enlaces y eventos de clic, presión y teclado. Es ideal para encabezados, barras de navegación y cualquier contexto donde se requiera destacar la identidad visual de la aplicación.

---

## Props / Parámetros

| Propiedad     | Tipo              | Descripción                                                        | Valor por defecto | Obligatorio |
|---------------|-------------------|--------------------------------------------------------------------|-------------------|-------------|
| `size`        | `string`          | Tamaño del logo (clase CSS asociada)                               | `''`              | No          |
| `image`       | `string`          | URL de la imagen del logo                                          | `''`              | No          |
| `altImage`    | `string`          | Texto alternativo para la imagen (accesibilidad)                   | `''`              | No          |
| `link`        | `string`          | URL o ruta de navegación al hacer clic en el logo                  | `''`              | No          |
| `target`      | `IBmbTargetLink`  | Destino del enlace (`_self`, `_blank`, etc.)                       | `'_self'`         | No          |
| `buttonName`  | `string`          | Nombre del botón asociado al logo                                  | `'logo_button'`   | No          |

### Outputs

| Output           | Tipo           | Descripción                                  |
|------------------|----------------|----------------------------------------------|
| `buttonPress`    | `MouseEvent`   | Se emite al presionar el logo                |
| `buttonClick`    | `MouseEvent`   | Se emite al hacer clic en el logo            |
| `buttonKeyPress` | `KeyboardEvent`| Se emite al interactuar con el teclado       |

---

## Ejemplo de uso

```html
<bmb-logo
  [size]="'large'"
  [image]="'/assets/logo-tec.svg'"
  [altImage]="'Logo Tecnológico de Monterrey'"
  [link]="'https://tec.mx'"
  [target]="'_blank'"
  [buttonName]="'logo_principal'"
  (buttonClick)="onLogoClick($event)"
  (buttonPress)="onLogoPress($event)"
  (buttonKeyPress)="onLogoKeyPress($event)"
>
</bmb-logo>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbCheckExternalLinkButtonComponent`
- Tipos: `IBmbTargetLink`

---

## Notas adicionales

- **Accesibilidad:** El uso de `altImage` permite que el logo sea accesible para tecnologías asistivas. Los eventos de teclado facilitan la navegación inclusiva.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y soporta enlaces internos o externos.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite ajustar el tamaño, imagen y comportamiento interactivo según las necesidades de la interfaz.
- **Buenas prácticas:** Emite eventos desacoplados para manejar interacciones de forma flexible y segura.

---
