# BmbItemComponent

## Descripción general

`BmbItemComponent` es un componente standalone de Angular diseñado para mostrar elementos individuales con ícono, etiqueta, valor y texto de soporte. Permite que cada elemento sea interactivo, actuando como botón o enlace, y es ideal para listas, paneles de información o accesos rápidos en interfaces modernas.

---

## Props / Parámetros

| Propiedad     | Tipo             | Descripción                                  | Valor por defecto | Obligatorio |
| ------------- | ---------------- | -------------------------------------------- | ----------------- | ----------- |
| `icon`        | `string`         | Nombre del ícono a mostrar                   | `''`              | No          |
| `iconSize`    | `number`         | Tamaño del ícono en píxeles                  | `20`              | No          |
| `label`       | `string`         | Etiqueta principal del elemento              | `''`              | No          |
| `value`       | `string`         | Valor o información principal a mostrar      | `''`              | No          |
| `valueLink`   | `string`         | URL o ruta para el valor (si es enlace)      | `''`              | No          |
| `valueTarget` | `IBmbTargetLink` | Destino del enlace (`_blank`, `_self`, etc.) | `'_blank'`        | No          |
| `supportText` | `string`         | Texto de soporte o información adicional     | `''`              | No          |
| `isButton`    | `boolean`        | Indica si el elemento actúa como botón       | `false`           | No          |

### Outputs

| Output   | Tipo         | Descripción                           |
| -------- | ------------ | ------------------------------------- |
| `action` | `MouseEvent` | Se emite al hacer clic en el elemento |

---

## Ejemplo de uso

```html
<bmb-item
  [icon]="'info'"
  [iconSize]="24"
  [label]="'Correo electrónico'"
  [value]="'ejemplo@correo.com'"
  [valueLink]="'mailto:ejemplo@correo.com'"
  [valueTarget]="'_blank'"
  [supportText]="'Haz clic para enviar un correo'"
  [isButton]="true"
  (action)="onItemClick($event)"
>
</bmb-item>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbIconComponent`
- Tipos: `IBmbTargetLink`

---

## Notas adicionales

- **Accesibilidad:** El componente puede actuar como botón o enlace, facilitando la navegación y la interacción por teclado.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y puede usarse en listas, paneles o tarjetas.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite ajustar el ícono, tamaño, enlaces y comportamiento interactivo según las necesidades de la interfaz.
- **Buenas prácticas:** Utiliza eventos de salida para manejar acciones de clic de forma desacoplada y flexible.

---
