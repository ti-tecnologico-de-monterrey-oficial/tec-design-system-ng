# BmbMitecLogoAnimationComponent

## Descripción general

`BmbMitecLogoAnimationComponent` es un componente standalone de Angular diseñado para mostrar una animación del logotipo MiTec junto con una etiqueta personalizada. Es ideal para encabezados, pantallas de bienvenida o cualquier sección donde se desee resaltar la identidad visual de MiTec de manera atractiva y dinámica.

---

## Props / Parámetros

| Propiedad | Tipo     | Descripción                                 | Valor por defecto | Obligatorio |
| --------- | -------- | ------------------------------------------- | ----------------- | ----------- |
| `label`   | `string` | Etiqueta que acompaña la animación del logo | `'ESTUDIANTES'`   | No          |

---

## Ejemplo de uso

```html
<bmb-mitec-logo-animation [label]="'Bienvenida'"></bmb-mitec-logo-animation>
```

---

## Dependencias

- No requiere módulos externos adicionales.

---

## Notas adicionales

- **Accesibilidad:** Se recomienda que la animación y la etiqueta sean descriptivas para facilitar la comprensión a todas las personas, incluyendo aquellas que utilizan tecnologías asistivas.
- **Compatibilidad:** Puede integrarse en cualquier template Angular y personalizarse mediante la propiedad `label`.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** La etiqueta puede adaptarse según el contexto de uso, permitiendo flexibilidad en la presentación.

---
