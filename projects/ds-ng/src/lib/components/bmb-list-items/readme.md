# BmbListItemsComponent

## Descripción general

`BmbListItemsComponent` es un componente standalone de Angular que permite mostrar y gestionar una lista de elementos agrupados por fecha. Ofrece funcionalidades para agregar nuevos elementos, visualizar íconos y etiquetas, y organizar los ítems en categorías temporales como "Recientes", "Última semana", "Último mes" y "Resto". Es ideal para paneles de actividad, historial de eventos o cualquier contexto donde la organización temporal de datos sea relevante.

---

## Props / Parámetros

| Propiedad         | Tipo                        | Descripción                                                        | Valor por defecto | Obligatorio |
|-------------------|-----------------------------|--------------------------------------------------------------------|-------------------|-------------|
| `title`           | `string`                    | Título principal de la lista                                       | `''`              | No          |
| `addButtonIcon`   | `string`                    | Ícono para el botón de agregar                                     | `'add_box'`       | No          |
| `showAddButton`   | `boolean`                   | Muestra u oculta el botón de agregar                               | `true`            | No          |
| `items`           | `IBmbListItemsElement[]`    | Lista de elementos a mostrar                                       | `[]`              | No          |
| `dateFormat`      | `string`                    | Formato de fecha para los elementos                                | `'yyyy-MM-dd'`    | No          |

### Outputs

| Output             | Tipo         | Descripción                                  |
|--------------------|--------------|----------------------------------------------|
| `addButtonAction`  | `MouseEvent` | Se emite al hacer clic en el botón de agregar|

### Interfaces relacionadas

#### IBmbListItemsElement

```typescript
export interface IBmbListItemsElement {
  title: string;
  date: string;
  disabled?: boolean;
  icon?: string;
  formattedDate?: DateTime;
}
```

---

## Ejemplo de uso

```html
<bmb-list-items
  [title]="'Historial de actividades'"
  [addButtonIcon]="'add_circle'"
  [showAddButton]="true"
  [items]="[
    { title: 'Reunión de equipo', date: '2025-10-08', icon: 'group' },
    { title: 'Entrega de reporte', date: '2025-10-01', icon: 'description' },
    { title: 'Actualización de sistema', date: '2025-09-15', icon: 'update' }
  ]"
  [dateFormat]="'yyyy-MM-dd'"
  (addButtonAction)="onAddItem($event)"
>
</bmb-list-items>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `luxon` (DateTime)
- `BmbActionIconComponent`
- `BmbInputComponent`

---

## Notas adicionales

- **Accesibilidad:** El componente permite navegación por teclado y uso de íconos descriptivos para mejorar la comprensión visual.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y soporta formatos de fecha configurables.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Organización temporal:** Agrupa automáticamente los elementos por fecha en categorías útiles para la persona.
- **Personalización:** Permite cambiar el ícono del botón de agregar y el formato de fecha según las necesidades del proyecto.
- **Buenas prácticas:** Emite eventos desacoplados para manejar acciones de agregar elementos y facilita la extensión del componente.

---
