# BmbListGroupComponent

## Descripción general

`BmbListGroupComponent` es un componente standalone de Angular que permite agrupar elementos en una lista con opciones de personalización visual y funcional. Soporta selección múltiple, vista en filas, controles adicionales y estilos adaptables, facilitando la organización y gestión de conjuntos de elementos en interfaces modernas.

---

## Props / Parámetros

| Propiedad            | Tipo                         | Descripción                                                                 | Valor por defecto | Obligatorio |
|----------------------|------------------------------|-----------------------------------------------------------------------------|-------------------|-------------|
| `borderRadius`       | `SizeNames \| SizeNames[]`   | Radio de borde de los elementos de la lista                                 | `'m'`             | No          |
| `borderType`         | `BorderType`                 | Tipo de borde (`rounded`, etc.)                                             | `'rounded'`       | No          |
| `margin`             | `SizeNames`                  | Margen entre los elementos de la lista                                      | `'m'`             | No          |
| `padding`            | `SizeNames \| SizeNames[]`   | Padding interno de los elementos                                            | `'m'`             | No          |
| `isMultipleSelection`| `boolean`                    | Permite selección múltiple de elementos                                     | `false`           | No          |
| `isRowView`          | `boolean`                    | Muestra los elementos en vista de fila horizontal                           | `false`           | No          |
| `showControls`       | `boolean`                    | Muestra controles adicionales en los elementos                              | `false`           | No          |
| `listGroupId`        | `string`                     | Identificador único para el grupo de lista                                  | `'listGroupStatus'`| No         |

### Outputs

| Output            | Tipo           | Descripción                                  |
|-------------------|----------------|----------------------------------------------|
| `selectionChange` | `string[]`     | Se emite cuando cambia la selección de elementos |

---

## Ejemplo de uso

```html
<bmb-list-group
  [borderRadius]="'l'"
  [borderType]="'rounded'"
  [margin]="'s'"
  [padding]="['m', 'l']"
  [isMultipleSelection]="true"
  [isRowView]="true"
  [showControls]="true"
  [listGroupId]="'grupoPrincipal'"
  (selectionChange)="onSelectionChange($event)"
>
  <!-- Aquí van los elementos de la lista -->
</bmb-list-group>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- Servicio interno: `BmbListGroupStatusService`
- Tipos: `SizeNames`, `BorderType`

---

## Notas adicionales

- **Accesibilidad:** Permite selección múltiple y controles visuales, facilitando la interacción para todas las personas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y puede usarse para listas verticales u horizontales.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Los estilos de borde, padding y margen son configurables para adaptarse a diferentes diseños.
- **Gestión de estado:** El servicio interno gestiona el estado de selección y configuración del grupo, permitiendo una lógica desacoplada y escalable.

---
