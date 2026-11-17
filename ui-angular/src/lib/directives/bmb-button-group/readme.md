# BmbButtonGroupDirective

## Descripción general

`BmbButtonGroupDirective` es una directiva standalone de Angular que permite agrupar y estandarizar la apariencia y el tamaño de un conjunto de botones. Aplica clases CSS dinámicas para asegurar consistencia visual entre los botones agrupados, facilitando la creación de toolbars, paneles de acciones y controles de navegación en la interfaz.

---

## Props / Parámetros

| Propiedad    | Tipo                 | Descripción                                                | Valor por defecto | Obligatorio |
| ------------ | -------------------- | ---------------------------------------------------------- | ----------------- | ----------- |
| `appearance` | `IButtonAppearance`  | Apariencia visual del grupo (`primary`, `secondary`, etc.) | `'primary'`       | No          |
| `size`       | `'small' \| 'large'` | Tamaño de los botones agrupados                            | `'small'`         | No          |

---

## Ejemplo de uso

```html
<div bmbButtonGroup [appearance]="'secondary'" [size]="'large'">
  <button bmbButton>Guardar</button>
  <button bmbButton>Cancelar</button>
  <button bmbButton>Eliminar</button>
</div>
```

---

## Dependencias

- `@angular/core` (Directive, HostBinding, input)
- Tipos: `IButtonAppearance`, `IBbmButtonGroupType`

---

## Notas adicionales

- **Accesibilidad:** Se recomienda que los botones agrupados incluyan atributos ARIA y roles adecuados para mejorar la experiencia con tecnologías asistivas.
- **Compatibilidad:** Puede aplicarse a cualquier contenedor de botones en Angular y funciona con la directiva `bmbButton`.
- **Rendimiento:** Utiliza clases CSS dinámicas para actualizar la apariencia y el tamaño sin afectar el rendimiento.
- **Personalización:** Permite definir la apariencia y el tamaño del grupo de botones de forma centralizada, facilitando la coherencia visual en la interfaz.
- **Buenas prácticas:** Agrupa botones relacionados para mejorar la usabilidad y la organización de acciones en la UI.

---
