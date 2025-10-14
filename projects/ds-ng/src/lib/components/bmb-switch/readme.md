# BmbSwitchComponent

## Descripción general

`BmbSwitchComponent` es un componente standalone de Angular que representa un interruptor (switch) personalizable, compatible con formularios reactivos y template-driven. Permite mostrar texto o íconos en ambos lados del switch, controlar el estado de selección, emitir eventos al cambiar de valor y gestionar atributos de accesibilidad. Es ideal para formularios, configuraciones y cualquier interfaz que requiera una selección binaria visual y accesible.

---

## Props / Parámetros

| Propiedad   | Tipo      | Descripción                                                        | Valor por defecto                       | Obligatorio |
|-------------|-----------|--------------------------------------------------------------------|-----------------------------------------|-------------|
| `leftText`  | `string`  | Texto a mostrar en el lado izquierdo del switch                    | `''`                                    | No          |
| `leftIcon`  | `string`  | Ícono a mostrar en el lado izquierdo del switch                    | `''`                                    | No          |
| `rightText` | `string`  | Texto a mostrar en el lado derecho del switch                      | `''`                                    | No          |
| `rightIcon` | `string`  | Ícono a mostrar en el lado derecho del switch                      | `''`                                    | No          |
| `isChecked` | `boolean` (model) | Estado actual del switch (seleccionado/no seleccionado)      | `false`                                 | No          |
| `ariaLabel` | `string`  | Etiqueta accesible para describir la función del switch            | `'Describe the button function here'`   | No          |
| `id`        | `string`  | Identificador único del input (obsoleto, usar `inputId`)           | `''`                                    | No          |
| `disabled`  | `boolean` | Deshabilita el switch                                              | `false`                                 | No          |
| `name`      | `string`  | Nombre del input asociado                                          | `getUUID()`                             | No          |

### Outputs

| Output   | Tipo      | Descripción                                  |
|----------|-----------|----------------------------------------------|
| `change` | `boolean` | Se emite al cambiar el estado del switch     |

---

## Ejemplo de uso

```html
<bmb-switch
  [leftText]="'No'"
  [rightText]="'Sí'"
  [isChecked]="true"
  [ariaLabel]="'Activar notificaciones'"
  [disabled]="false"
  (change)="onSwitchChange($event)"
></bmb-switch>

<bmb-switch
  [leftIcon]="'close'"
  [rightIcon]="'check'"
  [isChecked]="false"
  [ariaLabel]="'Estado de aprobación'"
  (change)="onSwitchChange($event)"
></bmb-switch>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `@angular/forms` (FormControl, FormsModule, ReactiveFormsModule)
- `BmbIconComponent`
- `BmbInputValidatorComponent`
- Utilidades internas: `getUUID`, `assignNewFormControl`, `newFormControlByType`

---

## Notas adicionales

- **Accesibilidad:** El componente soporta atributos ARIA, navegación por teclado (Enter) y puede integrarse con validadores y mensajes de ayuda/error.
- **Compatibilidad:** Funciona con formularios reactivos y template-driven, y puede usarse en cualquier template Angular.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite mostrar texto o íconos en ambos lados, controlar el estado y emitir eventos desacoplados.
- **Buenas prácticas:** Gestiona el estado y la integración con formularios de manera robusta, y asegura que el switch sea accesible y fácil de usar.

---
