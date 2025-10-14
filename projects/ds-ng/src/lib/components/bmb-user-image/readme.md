# BmbUserImageComponent

## Descripción general

`BmbUserImageComponent` es un componente standalone de Angular diseñado para mostrar imágenes de usuario con opciones de personalización de tamaño, borde, texto alternativo y enlace externo. Permite emitir eventos al hacer clic, presionar el botón o interactuar por teclado, facilitando la integración de imágenes de perfil accesibles y funcionales en cualquier parte de la interfaz.

---

## Props / Parámetros

| Propiedad   | Tipo                | Descripción                                                        | Valor por defecto | Obligatorio |
|-------------|---------------------|--------------------------------------------------------------------|-------------------|-------------|
| `size`      | `IBmbUserImageSize` | Tamaño de la imagen (`small`, `medium`, `large`, etc.)             | -                 | No          |
| `image`     | `string`            | URL de la imagen a mostrar                                         | `''`              | No          |
| `altImage`  | `string`            | Texto alternativo para la imagen                                   | `''`              | No          |
| `link`      | `string`            | URL de destino al hacer clic en la imagen                          | `''`              | No          |
| `target`    | `IBmbTargetLink`    | Destino del enlace (`_blank`, `_self`, etc.)                       | -                 | No          |
| `bordered`  | `boolean`           | Muestra la imagen con borde                                        | `false`           | No          |

### Outputs

| Output           | Tipo           | Descripción                                  |
|------------------|----------------|----------------------------------------------|
| `buttonPress`    | `MouseEvent`   | Se emite al presionar el botón sobre la imagen|
| `buttonClick`    | `MouseEvent`   | Se emite al hacer clic en la imagen          |
| `buttonKeyPress` | `KeyboardEvent`| Se emite al interactuar por teclado          |

---

## Ejemplo de uso

```html
<bmb-user-image
  [size]="'large'"
  [image]="'/assets/usuario.jpg'"
  [altImage]="'Foto de perfil de Ana'"
  [link]="'https://perfil.tec.mx/ana'"
  [target]="'_blank'"
  [bordered]="true"
  (buttonClick)="onImageClick($event)"
  (buttonPress)="onImagePress($event)"
  (buttonKeyPress)="onImageKeyPress($event)"
></bmb-user-image>
```

---

## Dependencias

- `@angular/core` (Component, ChangeDetectionStrategy, ViewEncapsulation, input, output)
- `@angular/common` (CommonModule)
- `BmbCheckExternalLinkButtonComponent`
- Tipos: `IBmbUserImageSize`, `IBmbTargetLink`

---

## Notas adicionales

- **Accesibilidad:** El componente soporta texto alternativo (`altImage`), navegación por teclado y puede integrarse con atributos ARIA para mejorar la experiencia con tecnologías asistivas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y soporta enlaces externos, tamaños personalizados y estilos con borde.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite ajustar el tamaño, el borde y el destino del enlace, y proyectar la imagen en cualquier contexto visual.
- **Buenas prácticas:** Emite eventos desacoplados para manejar la interacción y utiliza métodos para gestionar clases CSS dinámicamente según el estado y las propiedades.

---
