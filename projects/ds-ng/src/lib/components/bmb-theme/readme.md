# BmbThemeComponent

## Descripción general

`BmbThemeComponent` es un componente standalone de Angular que permite gestionar el tema visual de la aplicación (claro/oscuro) de forma centralizada. Ofrece controles opcionales para que la persona usuaria cambie el tema, guarda la preferencia en `localStorage` y aplica el tema seleccionado al documento y a elementos específicos. Es ideal para layouts, portales y cualquier interfaz que requiera alternancia de temas visuales.

---

## Props / Parámetros

| Propiedad     | Tipo      | Descripción                                                        | Valor por defecto | Obligatorio |
|---------------|-----------|--------------------------------------------------------------------|-------------------|-------------|
| `initialTheme`| `string`  | Tema inicial a aplicar (`'light'` o `'dark'`)                      | `''`              | No          |
| `showControls`| `boolean` | Muestra controles para cambiar el tema                             | `false`           | No          |
| `leftText`    | `string`  | Texto para el lado izquierdo del switch                            | `''`              | No          |
| `rightText`   | `string`  | Texto para el lado derecho del switch                              | `''`              | No          |

### Modelos internos

| Propiedad     | Tipo      | Descripción                                                        | Valor por defecto | Obligatorio |
|---------------|-----------|--------------------------------------------------------------------|-------------------|-------------|
| `leftIcon`    | `string`  | Ícono para el lado izquierdo (obsoleto, solo si no hay texto)      | `'light_mode'`    | No          |
| `rightIcon`   | `string`  | Ícono para el lado derecho (obsoleto, solo si no hay texto)        | `'dark_mode'`     | No          |

---

## Ejemplo de uso

```html
<bmb-theme
  [initialTheme]="'dark'"
  [showControls]="true"
  [leftText]="'Claro'"
  [rightText]="'Oscuro'"
></bmb-theme>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbSwitchComponent`
- Servicio: `ThemeService`
- Angular core: `ViewEncapsulation`, `input`, `model`, `inject`, `OnInit`, `Component`

---

## Notas adicionales

- **Accesibilidad:** El componente permite alternar el tema visual mediante controles accesibles y actualiza el atributo `data-theme` en el documento y elementos clave.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y puede usarse en layouts, portales o componentes raíz.
- **Persistencia:** Guarda la preferencia de tema en `localStorage` para mantener la experiencia entre sesiones.
- **Rendimiento:** Utiliza buenas prácticas de Angular y actualiza el tema solo cuando es necesario.
- **Personalización:** Permite mostrar texto o íconos en los controles, y definir el tema inicial desde la configuración.
- **Buenas prácticas:** Emite cambios al servicio de tema y actualiza el DOM de forma segura y desacoplada.

---
