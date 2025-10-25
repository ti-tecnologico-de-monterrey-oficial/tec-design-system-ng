# BmbSidebarComponent

## Descripción general

`BmbSidebarComponent` es un componente standalone de Angular que proporciona una barra lateral de navegación con hasta dos niveles jerárquicos. Permite organizar accesos rápidos, menús y submenús, soportando enlaces internos y externos, integración con íconos y lógica de apertura/cierre. Incluye validaciones para limitar la cantidad de elementos por nivel y gestiona el foco para mejorar la accesibilidad. Es ideal para layouts de aplicaciones web y móviles que requieren navegación estructurada y accesible.

---

## Props / Parámetros

| Propiedad  | Tipo                  | Descripción                                          | Valor por defecto | Obligatorio |
| ---------- | --------------------- | ---------------------------------------------------- | ----------------- | ----------- |
| `elements` | `SidebarElement[][]`  | Matriz de elementos de navegación, hasta dos niveles | `[]`              | Sí          |
| `title`    | `string`              | Título principal de la barra lateral                 | `'Navigation'`    | No          |
| `position` | `IPositionButtonMenu` | Posición de la barra (`left`, `right`) solo para web | `'left'`          | No          |

---

## Ejemplo de uso

```html
<bmb-sidebar
  [elements]="[
    [
      { label: 'Inicio', icon: 'home', link: '/inicio' },
      { label: 'Perfil', icon: 'person', link: '/perfil', children: [
        { label: 'Datos', link: '/perfil/datos' },
        { label: 'Configuración', link: '/perfil/configuracion' }
      ]}
    ]
  ]"
  [title]="'Menú principal'"
  [position]="'left'"
></bmb-sidebar>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbIconComponent`
- `BmbCheckExternalLinkButtonComponent`
- `BmbActionIconComponent`
- Tipos: `SidebarElement`, `IPositionButtonMenu`

---

## Notas adicionales

- **Accesibilidad:** El componente gestiona el foco y el estado activo para facilitar la navegación por teclado y tecnologías asistivas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y soporta hasta dos niveles de navegación, con máximo 5 elementos en el primer nivel y 3 en el segundo.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Validación:** Muestra advertencias en consola si se exceden los límites de niveles o elementos permitidos.
- **Gestión de estado:** Permite abrir/cerrar submenús, controlar el foco y limpiar la selección al cerrar la barra.
- **Buenas prácticas:** Emite errores claros, gestiona la lógica de enlaces y submenús, y utiliza métodos para mantener el estado desacoplado y seguro.

---
