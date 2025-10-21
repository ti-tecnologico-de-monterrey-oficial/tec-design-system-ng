# BmbTabsComponent

## Descripción general

`BmbTabsComponent` es un componente standalone de Angular que permite mostrar y gestionar pestañas navegables en la interfaz. Soporta scroll horizontal, selección de pestaña activa, badges de notificación, estilos visuales alternativos y proyección de contenido. Es ideal para organizar secciones, paneles o flujos en aplicaciones web y móviles, facilitando la navegación y el acceso rápido a diferentes vistas o módulos.

---

## Props / Parámetros

| Propiedad            | Tipo             | Descripción                                                            | Valor por defecto | Obligatorio |
| -------------------- | ---------------- | ---------------------------------------------------------------------- | ----------------- | ----------- |
| `appearanceContrast` | `IBmbContrast`   | Contraste visual de las pestañas (`default`, `primary`, `alternative`) | `'default'`       | No          |
| `format`             | `string`         | Formato visual adicional (clase personalizada)                         | `''`              | No          |
| `tabs`               | `IBmbTab[]`      | Lista de pestañas a mostrar                                            | `[]`              | Sí          |
| `selectedTabId`      | `number` (model) | ID de la pestaña seleccionada (interno)                                | `0`               | No          |

### Outputs

| Output     | Tipo      | Descripción                         |
| ---------- | --------- | ----------------------------------- |
| `selected` | `IBmbTab` | Se emite al seleccionar una pestaña |

---

## Ejemplo de uso

```html
<bmb-tabs
  [appearanceContrast]="'primary'"
  [tabs]="[
    { id: 1, title: 'Inicio', isActive: true },
    { id: 2, title: 'Mensajes', badge: 5 },
    { id: 3, title: 'Perfil' }
  ]"
  (selected)="onTabSelected($event)"
></bmb-tabs>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbActionIconComponent`
- `BmbNotificationCounterComponent`
- Servicio: `TabsService`
- Tipos: `IBmbTab`, `IBmbContrast`
- Angular core: `ElementRef`, `ViewChild`, `NgZone`, `ChangeDetectionStrategy`, `ViewEncapsulation`, `signal`, `model`, `input`, `output`

---

## Notas adicionales

- **Accesibilidad:** El componente gestiona el foco y el estado activo, facilitando la navegación por teclado y tecnologías asistivas. Los badges pueden indicar el número de notificaciones o elementos pendientes.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y soporta scroll horizontal, badges y estilos alternativos.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` y señales reactivas para optimizar el renderizado y la actualización de estado.
- **Personalización:** Permite ajustar el contraste visual, el formato y proyectar contenido adicional en las pestañas.
- **Gestión de scroll:** Detecta automáticamente si hay overflow y permite desplazarse entre pestañas mediante botones o scroll.
- **Buenas prácticas:** Emite eventos desacoplados para manejar la selección de pestañas y utiliza lógica interna para mantener el estado visual y funcional actualizado.

---
