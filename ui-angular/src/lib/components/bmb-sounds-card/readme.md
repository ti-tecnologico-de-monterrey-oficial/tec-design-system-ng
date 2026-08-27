# BmbSoundsCardComponent

## Descripción general

`BmbSoundsCardComponent` es un componente standalone de Angular diseñado para mostrar una tarjeta multimedia con controles de reproducción y volumen para contenido de audio. Permite visualizar título, subtítulo, ajustar el volumen, reproducir/pausar y silenciar el audio, mostrando el estado visualmente y emitiendo eventos para manejar la interacción. Es ideal para galerías de sonidos, podcasts, mensajes de voz y cualquier interfaz que requiera control de audio integrado.

---

## Props / Parámetros

| Propiedad  | Tipo     | Descripción                       | Valor por defecto | Obligatorio |
| ---------- | -------- | --------------------------------- | ----------------- | ----------- |
| `title`    | `string` | Título principal de la tarjeta    | `''`              | No          |
| `subtitle` | `string` | Subtítulo o descripción breve     | `''`              | No          |
| `width`    | `string` | Ancho de la tarjeta               | `'250px'`         | No          |
| `ratio`    | `string` | Relación de aspecto de la tarjeta | `'8/9'`           | No          |

### Outputs

| Output         | Tipo      | Descripción                              |
| -------------- | --------- | ---------------------------------------- |
| `handlevolume` | `number`  | Se emite al cambiar el volumen           |
| `handlePlay`   | `boolean` | Se emite al reproducir o pausar el audio |
| `handleMute`   | `boolean` | Se emite al silenciar o activar el audio |

---

## Ejemplo de uso

```html
<bmb-sounds-card
  [componentTitle]="'Podcast semanal'"
  [subtitle]="'Episodio 12: Innovación educativa'"
  [width]="'320px'"
  [ratio]="'16/9'"
  (handlevolume)="onVolumeChange($event)"
  (handlePlay)="onPlayPause($event)"
  (handleMute)="onMute($event)"
></bmb-sounds-card>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbMediaCardComponent`
- `BmbIconComponent`
- Angular core: `ElementRef`, `ViewChild`, `ChangeDetectionStrategy`, `ViewEncapsulation`

---

## Notas adicionales

- **Accesibilidad:** El componente gestiona el foco y el estado visual de los controles, facilitando la navegación por teclado y tecnologías asistivas. Se recomienda complementar con etiquetas ARIA y descripciones para mejorar la experiencia.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y puede usarse en galerías, listas o tarjetas multimedia.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite ajustar el ancho, la relación de aspecto y los textos mostrados, así como el estilo visual del control de volumen.
- **Buenas prácticas:** Emite eventos desacoplados para manejar la interacción de forma flexible y segura, y actualiza el fondo del control de volumen dinámicamente para reflejar el estado actual.

---
