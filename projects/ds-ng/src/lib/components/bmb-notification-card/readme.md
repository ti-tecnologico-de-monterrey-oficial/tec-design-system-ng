# BmbNotificationCardComponent

## Descripción general

`BmbNotificationCardComponent` es un componente standalone de Angular diseñado para mostrar notificaciones y anuncios en formato de tarjeta, agrupando y organizando los mensajes en pestañas y permitiendo la interacción con cada alerta. Facilita la gestión visual de notificaciones, anuncios y estados (leído, favorito, archivado), ofreciendo una experiencia clara y accesible para las personas usuarias.

---

## Props / Parámetros

| Propiedad         | Tipo                  | Descripción                                                        | Valor por defecto | Obligatorio |
|-------------------|-----------------------|--------------------------------------------------------------------|-------------------|-------------|
| `data`            | `IBmbDataAlert[]`     | Lista de notificaciones a mostrar                                  | `[]`              | No          |
| `advertisements`  | `IBmbDataAlert[]`     | Lista de anuncios a mostrar                                        | `[]`              | No          |
| `hideExpandBtn`   | `boolean`             | Oculta el botón de expandir la tarjeta                             | `false`           | No          |
| `maxHeight`       | `string`              | Altura máxima de la tarjeta                                        | `'auto'`          | No          |

### Outputs

| Output            | Tipo             | Descripción                                  |
|-------------------|------------------|----------------------------------------------|
| `alertEvent`      | `IBmbDataAlert`  | Se emite al interactuar con una alerta       |
| `showAlertDetail` | `IBmbDataAlert`  | Se emite al mostrar el detalle de una alerta |
| `closeAlertDetail`| `IBmbDataAlert`  | Se emite al cerrar el detalle de una alerta  |
| `onExpandClick`   | `void`           | Se emite al hacer clic en el botón de expandir|

---

## Ejemplo de uso

```html
<bmb-notification-card
  [data]="notificaciones"
  [advertisements]="anuncios"
  [hideExpandBtn]="false"
  [maxHeight]="'400px'"
  (alertEvent)="onAlert($event)"
  (showAlertDetail)="onShowDetail($event)"
  (closeAlertDetail)="onCloseDetail($event)"
  (onExpandClick)="onExpand()"
>
</bmb-notification-card>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbAlertCenterComponent`
- `BmbHomeCardComponent`
- Tipos: `IBmbDataAlert`, `IBmbTab`, `IBmbAlertCenterTabConfig`

---

## Notas adicionales

- **Accesibilidad:** El componente soporta navegación por teclado y etiquetas descriptivas, facilitando la interacción para todas las personas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y permite personalizar la altura y visibilidad de controles.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Organización:** Agrupa notificaciones y anuncios en pestañas, mostrando contadores de nuevos mensajes y permitiendo la gestión de estados.
- **Personalización:** Permite definir la estructura de pestañas y configurar el comportamiento de expansión y detalle de alertas.
- **Buenas prácticas:** Emite eventos desacoplados para manejar la interacción con notificaciones y anuncios, promoviendo una lógica flexible y segura.

---
