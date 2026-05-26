# BmbProfileComponent

## Descripción general

`BmbProfileComponent` es un componente standalone de Angular diseñado para mostrar y gestionar la información de perfil de una persona en la plataforma. Permite visualizar datos de estudiantes y colaboradores, mostrar accesos rápidos, cambiar el idioma, y emitir eventos para cerrar sesión o perfil. Es altamente configurable y soporta diferentes modos de visualización (móvil, standalone), facilitando la integración en portales, dashboards y aplicaciones institucionales.

---

## Props / Parámetros

| Propiedad          | Tipo                          | Descripción                                          | Valor por defecto | Obligatorio                            |
| ------------------ | ----------------------------- | ---------------------------------------------------- | ----------------- | -------------------------------------- |
| `userData`         | `IBmbProfileData`             | Datos de perfil (obsoleto, solo para compatibilidad) | -                 | No                                     |
| `isStandAlone`     | `boolean`                     | Indica si el componente se usa en modo standalone    | `false`           | No                                     |
| `standAloneData`   | `IBmbUserData`                | Datos de usuario para modo standalone                | -                 | No                                     |
| `isStudent`        | `boolean`                     | Indica si el perfil es de estudiante                 | `true`            | No                                     |
| `studentData`      | `IBmbStudentProfileData`      | Datos de perfil de estudiante                        | -                 | Sí (si `isStudent` es `true`)          |
| `collaboratorData` | `IBmbCollaboratorProfileData` | Datos de perfil de colaborador                       | -                 | Sí (si `isStudent` es `false`)         |
| `isMobile`         | `boolean`                     | Indica si la vista es móvil                          | `true`            | No                                     |
| `idDigitalLink`    | `string`                      | Enlace a la credencial digital                       | `''`              | Sí (si `isMobile` y no `isStandAlone`) |
| `campusAcessLink`  | `string`                      | Enlace a acceso a campus                             | `''`              | Sí (si `isMobile` y no `isStandAlone`) |
| `tecServicesLink`  | `string`                      | Enlace a servicios Tec                               | `''`              | Sí (si `isMobile` y no `isStandAlone`) |
| `targetLinks`      | `IBmbTargetLink`              | Destino de los enlaces (`_blank`, `_self`, etc.)     | `'_blank'`        | No                                     |
| `versionLabel`     | `string`                      | Etiqueta de versión                                  | `''`              | Sí (si `isMobile` y no `isStandAlone`) |
| `enableLangChange` | `boolean`                     | Permite cambiar el idioma                            | `false`           | No                                     |

### Outputs

| Output                    | Tipo             | Descripción                           |
| ------------------------- | ---------------- | ------------------------------------- |
| `handleCloseSession`      | `void`           | Se emite al cerrar sesión             |
| `handleCloseProfile`      | `void`           | Se emite al cerrar el perfil          |
| `handleCollaboratorClick` | `IBmbUserData`   | Se emite al hacer clic en colaborador |
| `handleLangChange`        | `string` (model) | Se emite al cambiar el idioma         |

---

## Ejemplo de uso

```html
<bmb-profile
  [isStudent]="true"
  [studentData]="{
    userData: {
      name: 'Juan Pérez',
      userImg: '/assets/juan.jpg',
      email: 'juan.perez@tec.mx',
      registration: 'A01234567'
    },
    period: '2025-2',
    campus: 'Monterrey',
    program: 'Ingeniería',
    curp: 'PEPJ800101HNLNRN09',
    linkedin: 'https://linkedin.com/in/juanperez',
    isExatec: false
  }"
  [isMobile]="true"
  [idDigitalLink]="'/credencial-digital'"
  [campusAcessLink]="'/acceso-campus'"
  [tecServicesLink]="'/servicios-tec'"
  [versionLabel]="'v1.5.12'"
  [enableLangChange]="true"
  (handleCloseSession)="onCloseSession()"
  (handleCloseProfile)="onCloseProfile()"
  (handleCollaboratorClick)="onCollaboratorClick($event)"
  [(handleLangChange)]="selectedLang"
>
</bmb-profile>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `@angular/forms` (FormControl)
- `BmbMobileTemplatesComponent`
- `BmbUserSummaryContentComponent`
- `BmbIconItemComponent`
- `BmbDividerComponent`
- `BmbIconComponent`
- `BmbContainerButtonComponent`
- `BmbThemeComponent`
- `BmbButtonDirective`
- `BmbHomeCardComponent`
- `BmbRadialComponent`
- Utilidad interna: `buildErrorMessage`

---

## Notas adicionales

- **Accesibilidad:** El componente soporta navegación por teclado, etiquetas descriptivas y proyección de datos relevantes, facilitando la experiencia para todas las personas.
- **Compatibilidad:** Puede integrarse en cualquier template Angular y soporta diferentes modos de visualización (móvil, standalone, estudiante, colaborador).
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Validación:** Realiza validaciones internas para asegurar que los datos requeridos estén presentes según el modo de uso, arrojando errores claros si faltan datos.
- **Personalización:** Permite mostrar accesos rápidos, cambiar idioma y emitir eventos para cerrar sesión o perfil, adaptándose a diferentes flujos y necesidades institucionales.
- **Buenas prácticas:** Emite eventos desacoplados y utiliza modelos para facilitar la gestión de estado y la integración con formularios reactivos.

---
