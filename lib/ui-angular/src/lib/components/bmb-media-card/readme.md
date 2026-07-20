# BmbMediaCardComponent

## Descripción general

`BmbMediaCardComponent` es un componente standalone de Angular diseñado para mostrar tarjetas multimedia con imagen, título, subtítulo, contenido y atributos de usuario. Permite personalizar el aspecto visual, el comportamiento de enlaces, el fondo, el zoom y el tipo de presentación, adaptándose a diferentes contextos como galerías, perfiles de autor, noticias o contenido destacado.

---

## Props / Parámetros

| Propiedad           | Tipo                   | Descripción                                             | Valor por defecto | Obligatorio |
| ------------------- | ---------------------- | ------------------------------------------------------- | ----------------- | ----------- |
| `link`              | `string`               | URL o ruta de navegación al hacer clic en la tarjeta    | `''`              | No          |
| `target`            | `IBmbTargetLink`       | Destino del enlace (`_blank`, `_self`, etc.)            | `'_blank'`        | No          |
| `src`               | `string`               | URL de la imagen principal                              | `''`              | No          |
| `mobileSrc`         | `string`               | URL de la imagen para dispositivos móviles              | -                 | No          |
| `alt`               | `string`               | Texto alternativo para la imagen (accesibilidad)        | `''`              | No          |
| `width`             | `string`               | Ancho de la tarjeta/media                               | `'100%'`          | No          |
| `ratio`             | `string`               | Relación de aspecto de la imagen                        | -                 | No          |
| `borderRadius`      | `SizeNames`            | Radio de borde de la tarjeta                            | `'m'`             | No          |
| `loading`           | `IBmbMediaCardLoading` | Estrategia de carga de la imagen (`lazy`, `eager`)      | `'lazy'`          | No          |
| `enableZoom`        | `boolean`              | Permite hacer zoom en la imagen                         | `false`           | No          |
| `isBlurredBackdrop` | `boolean`              | Muestra fondo difuminado detrás del contenido           | `false`           | No          |
| `type`              | `IBmbMediaCardType`    | Tipo de tarjeta (`inline`, `floating`, `author_detail`) | `'inline'`        | No          |
| `title`             | `string`               | Título principal de la tarjeta                          | -                 | No          |
| `subtitle`          | `string`               | Subtítulo o descripción breve                           | -                 | No          |
| `content`           | `string`               | Contenido adicional o descripción extendida             | -                 | No          |
| `date`              | `string`               | Fecha asociada al contenido                             | -                 | No          |
| `userName`          | `string`               | Nombre del usuario/autor                                | -                 | No          |
| `userImage`         | `string`               | Imagen del usuario/autor                                | -                 | No          |
| `fullmediaCard`     | `boolean`              | Expande el contenido a toda la tarjeta                  | `false`           | No          |
| `bgColor`           | `string`               | Color de fondo personalizado (CSS variable)             | -                 | No          |
| `boxShadow`         | `boolean`              | Muestra sombra en la tarjeta                            | `false`           | No          |

---

## Ejemplo de uso

```html
<bmb-media-card
  [link]="'https://tec.mx/noticia'"
  [target]="'_blank'"
  [src]="'/assets/noticia.jpg'"
  [alt]="'Imagen de noticia'"
  [width]="'400px'"
  [borderRadius]="'l'"
  [loading]="'lazy'"
  [enableZoom]="true"
  [type]="'floating'"
  [componentTitle]="'Nuevo logro académico'"
  [subtitle]="'Reconocimiento internacional'"
  [content]="'El Tec de Monterrey fue premiado por su innovación educativa.'"
  [date]="'2025-10-09'"
  [userName]="'Dra. Ana Pérez'"
  [userImage]="'/assets/ana-perez.jpg'"
  [fullmediaCard]="true"
  [bgColor]="'--color-bg-card'"
  [boxShadow]="true"
>
</bmb-media-card>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbUserImageComponent`
- Tipos: `SizeNames`, `IBmbTargetLink`, `IBmbMediaCardType`, `IBmbMediaCardLoading`
- Utilidad interna: `isExternalLink`

---

## Notas adicionales

- **Accesibilidad:** El uso de `alt` en la imagen mejora la experiencia para tecnologías asistivas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y soporta enlaces internos o externos.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` y soporta carga diferida de imágenes (`lazy`).
- **Personalización:** Permite ajustar el fondo, el radio de borde, el tipo de tarjeta y el contenido según el contexto.
- **Buenas prácticas:** Incluye métodos para gestionar clases CSS y estilos dinámicos, facilitando la extensión y el mantenimiento.

---
