# BmbNativeModalComponent

## Descripción general

`BmbNativeModalComponent` es un componente standalone de Angular diseñado para mostrar modales nativos altamente configurables. Permite proyectar contenido dinámico (plantillas, componentes o texto), definir acciones personalizadas, controlar el cierre por fondo y adaptar el tamaño y estilo visual. Es ideal para flujos de interacción, confirmaciones, formularios y cualquier contexto donde se requiera una ventana modal flexible y accesible.

---

## Props / Parámetros

| Propiedad            | Tipo                                         | Descripción                                                                 | Valor por defecto | Obligatorio |
|----------------------|----------------------------------------------|-----------------------------------------------------------------------------|-------------------|-------------|
| `title`              | `string`                                     | Título principal del modal                                                  | `''`              | No          |
| `subtitle`           | `string`                                     | Subtítulo o descripción adicional                                           | `''`              | No          |
| `content`            | `TemplateRef<any> \| Type<any> \| string \| null` | Contenido a proyectar en el modal (plantilla, componente o texto)           | `''`              | No          |
| `actions`            | `IBmbActionButton[]`                         | Lista de botones de acción en el modal                                      | `[]`              | No          |
| `modalId`            | `string`                                     | Identificador único del modal                                               | -                 | Sí          |
| `size`               | `IBmbNativeModalSize`                        | Tamaño del modal (`x-small`, `small`, `medium`, `large`, `x-large`)         | `'medium'`        | No          |
| `iconStyle`          | `IBmbModalAlertStyle`                        | Estilo visual del ícono del modal                                           | -                 | No          |
| `disableBackdropClose`| `boolean`                                   | Deshabilita el cierre al hacer clic en el fondo                             | `true`            | No          |
| `hasBackdrop`        | `boolean`                                    | Muestra fondo detrás del modal                                              | `true`            | No          |
| `inputContext`       | `{ [key: string]: any }`                     | Contexto de entrada para el componente proyectado                           | `{}`              | No          |
| `outputContext`      | `{ [key: string]: (value: any) => void }`    | Contexto de salida para el componente proyectado                            | `{}`              | No          |

### Outputs

| Output              | Tipo                                             | Descripción                                  |
|---------------------|--------------------------------------------------|----------------------------------------------|
| `actionsClicked`    | `{ buttonName: string; event: MouseEvent }`      | Se emite al hacer clic en un botón de acción |
| `closeModalClicked` | `{ modalId: string; event: MouseEvent }`         | Se emite al cerrar el modal                  |

---

## Ejemplo de uso

```html
<bmb-native-modal
  [title]="'Confirmar acción'"
  [subtitle]="'¿Estás seguro de continuar?'"
  [content]="modalContentTemplate"
  [actions]="[
    { name: 'Aceptar', appearance: 'primary' },
    { name: 'Cancelar', appearance: 'secondary' }
  ]"
  [modalId]="'confirmModal'"
  [size]="'small'"
  [iconStyle]="'info'"
  [disableBackdropClose]="false"
  [hasBackdrop]="true"
  [inputContext]="{ data: myData }"
  [outputContext]="{ onAccept: handleAccept, onCancel: handleCancel }"
  (actionsClicked)="onAction($event)"
  (closeModalClicked)="onClose($event)"
>
</bmb-native-modal>

<ng-template #modalContentTemplate>
  <p>Este es el contenido personalizado del modal.</p>
</ng-template>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbOverlayComponent`
- `BmbButtonDirective`
- `BmbThreeColsComponent`
- `BmbTitleContentComponent`
- `BmbActionIconComponent`
- `BmbIconComponent`
- Servicio: `BmbNativeModalService`
- Tipos: `IBmbNativeModalSize`, `IBmbModalAlertStyle`, `IBmbActionButton`

---

## Notas adicionales

- **Accesibilidad:** El componente soporta navegación por teclado, proyección de contenido accesible y control de cierre por fondo.
- **Compatibilidad:** Permite proyectar componentes, plantillas o texto, facilitando la integración con cualquier flujo de la aplicación.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado y gestiona dinámicamente la creación y destrucción de componentes proyectados.
- **Personalización:** Admite múltiples tamaños, estilos de ícono y acciones, permitiendo adaptar el modal a diferentes contextos y necesidades.
- **Buenas prácticas:** Emite eventos desacoplados para manejar acciones y cierre, y permite pasar contexto de entrada/salida a componentes proyectados.

---
