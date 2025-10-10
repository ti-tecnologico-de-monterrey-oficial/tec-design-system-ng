# BmbNoticeCardComponent

## Descripción general

`BmbNoticeCardComponent` es un componente standalone de Angular diseñado para mostrar avisos, notificaciones o mensajes importantes en formato de tarjeta. Permite incluir imagen, título, descripción paginada, botón de acción y control de cierre, facilitando la comunicación clara y visual de información relevante para las personas usuarias.

---

## Props / Parámetros

| Propiedad       | Tipo                        | Descripción                                           | Valor por defecto | Obligatorio |
| --------------- | --------------------------- | ----------------------------------------------------- | ----------------- | ----------- |
| `src`           | `string`                    | URL de la imagen a mostrar en la tarjeta              | `''`              | No          |
| `title`         | `string`                    | Título principal del aviso                            | `''`              | No          |
| `description`   | `IBmbCardNoticeDescription` | Descripción paginada del aviso (`pageOne`, `pageTwo`) | -                 | No          |
| `buttonText`    | `string`                    | Texto del botón de acción                             | `'Enterado'`      | No          |
| `link`          | `string`                    | URL o ruta asociada al aviso                          | `''`              | No          |
| `closeBtnColor` | `'white' \| 'black'`        | Color del botón de cierre                             | `'white'`         | No          |

### Outputs

| Output       | Tipo   | Descripción                                  |
| ------------ | ------ | -------------------------------------------- |
| `onClose`    | `void` | Se emite al cerrar la tarjeta                |
| `onClickBtn` | `void` | Se emite al hacer clic en el botón de acción |

### Interfaces relacionadas

#### IBmbCardNoticeDescription

```typescript
export interface IBmbCardNoticeDescription {
  pageOne?: string;
  pageTwo?: string;
}
```

---

## Ejemplo de uso

```html
<bmb-notice-card
  [src]="'/assets/alerta.svg'"
  [title]="'Actualización importante'"
  [description]="{ pageOne: 'Se realizará mantenimiento el viernes.', pageTwo: 'El servicio estará disponible nuevamente el sábado.' }"
  [buttonText]="'Entendido'"
  [link]="'/detalles-mantenimiento'"
  [closeBtnColor]="'black'"
  (onClose)="handleNoticeClose()"
  (onClickBtn)="handleNoticeAction()"
>
</bmb-notice-card>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbActionIconComponent`
- `BmbDividerComponent`
- `BmbDotPaginatorComponent`
- `BmbButtonDirective`

---

## Notas adicionales

- **Accesibilidad:** El componente soporta navegación por teclado y uso de etiquetas descriptivas, facilitando la comprensión y la interacción para todas las personas.
- **Compatibilidad:** Puede integrarse en cualquier template Angular y personalizarse mediante las propiedades disponibles.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite mostrar descripciones paginadas, elegir el color del botón de cierre y definir acciones personalizadas.
- **Buenas prácticas:** Emite eventos desacoplados para manejar el cierre y la acción del botón, promoviendo una lógica flexible y segura.

---
