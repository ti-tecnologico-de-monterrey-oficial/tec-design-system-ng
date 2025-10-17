# BmbLoaderComponent

## Descripción general

`BmbLoaderComponent` es un componente standalone de Angular diseñado para mostrar indicadores de carga, estados de error y overlays informativos en la interfaz. Permite personalizar el aspecto visual, mostrar mensajes y acciones, y controlar la visibilidad y el modo de presentación (inline o overlay). Es útil para informar a las personas sobre procesos en curso, errores o bloqueos temporales en la aplicación.

---

## Props / Parámetros

| Propiedad         | Tipo               | Descripción                                                 | Valor por defecto | Obligatorio |
| ----------------- | ------------------ | ----------------------------------------------------------- | ----------------- | ----------- |
| `appearance`      | `IBbmBgAppearance` | Apariencia visual del loader (`normal`, variantes de fondo) | `'normal'`        | No          |
| `title`           | `string`           | Título principal del mensaje de carga o error               | `''`              | No          |
| `icon`            | `string`           | Icono a mostrar                                             | `'wifi_off'`      | No          |
| `subtitle`        | `string`           | Mensaje secundario o descripción                            | `''`              | No          |
| `overlay`         | `boolean`          | Muestra el loader como overlay bloqueando la pantalla       | `false`           | No          |
| `isVisible`       | `boolean`          | Controla la visibilidad del loader                          | `true`            | No          |
| `errorState`      | `boolean`          | Indica si se muestra un estado de error                     | `false`           | No          |
| `actions`         | `boolean`          | Muestra botones de acción                                   | `false`           | No          |
| `buttonPrimary`   | `string`           | Texto del botón principal                                   | `''`              | No          |
| `buttonSecondary` | `string`           | Texto del botón secundario                                  | `''`              | No          |
| `showInline`      | `boolean`          | Muestra el loader en línea en vez de overlay                | `false`           | No          |

### Outputs

| Output              | Tipo         | Descripción                                   |
| ------------------- | ------------ | --------------------------------------------- |
| `onButtonPrimary`   | `MouseEvent` | Se emite al hacer clic en el botón principal  |
| `onButtonSecondary` | `MouseEvent` | Se emite al hacer clic en el botón secundario |

---

## Ejemplo de uso

```html
<bmb-loader
  [appearance]="'normal'"
  [title]="'Cargando información...'"
  [icon]="'hourglass_empty'"
  [subtitle]="'Por favor espera unos segundos.'"
  [overlay]="true"
  [isVisible]="true"
  [actions]="true"
  [buttonPrimary]="'Reintentar'"
  [buttonSecondary]="'Cancelar'"
  (onButtonPrimary)="handleRetry($event)"
  (onButtonSecondary)="handleCancel($event)"
>
</bmb-loader>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbIconComponent`
- `BmbButtonDirective`
- Tipos: `IBbmBgAppearance`
- Angular core: `Renderer2`, `ElementRef`

---

## Notas adicionales

- **Accesibilidad:** El componente puede mostrar mensajes claros y botones de acción para facilitar la interacción y la recuperación ante errores.
- **Compatibilidad:** Funciona tanto en modo overlay como inline, y detecta si está dentro de un iframe para evitar conflictos.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Gestión de estado:** Añade y elimina clases en el `body` para controlar el overlay, asegurando que no queden estilos residuales.
- **Buenas prácticas:** Emite eventos desacoplados para manejar acciones de los botones y permite personalizar todos los textos y estados visuales.

---
