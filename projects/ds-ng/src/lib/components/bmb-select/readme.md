# BmbSelectComponent

## Descripción general

`BmbSelectComponent` es un componente standalone de Angular que permite seleccionar un valor de una lista desplegable personalizada. Gestiona el estado de expansión, la selección de elementos y la emisión de eventos al cambiar el valor. Es ideal para formularios, filtros y cualquier interfaz que requiera selección única de opciones con estilos y lógica personalizados.

---

## Props / Parámetros

| Propiedad        | Tipo      | Descripción                                                        | Valor por defecto | Obligatorio |
|------------------|-----------|--------------------------------------------------------------------|-------------------|-------------|
| `value`          | `unknown` | Valor seleccionado actualmente                                     | `null`            | No          |

### Outputs

| Output           | Tipo         | Descripción                                  |
|------------------|--------------|----------------------------------------------|
| `onValueChange`  | `string`     | Se emite al seleccionar un nuevo valor       |

---

## Ejemplo de uso

```html
<bmb-select
  [value]="selectedOption"
  (onValueChange)="handleSelectChange($event)"
>
  <bmb-select-item value="opcion1">Opción 1</bmb-select-item>
  <bmb-select-item value="opcion2">Opción 2</bmb-select-item>
  <bmb-select-item value="opcion3">Opción 3</bmb-select-item>
</bmb-select>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbIconComponent`
- Angular core: `ElementRef`, `HostListener`, `EventEmitter`

---

## Notas adicionales

- **Accesibilidad:** Se recomienda complementar con atributos ARIA y roles para mejorar la experiencia con tecnologías asistivas.
- **Compatibilidad:** Puede integrarse en cualquier template Angular y usarse en formularios o filtros personalizados.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Gestión de estado:** El componente controla la expansión del menú y la selección de opciones mediante eventos de documento y lógica interna.
- **Personalización:** Permite usar plantillas personalizadas y estilos propios para adaptar el select a diferentes necesidades visuales.
- **Buenas prácticas:** Emite eventos desacoplados para manejar la selección y utiliza métodos para gestionar el estado visual y funcional del componente.

---
