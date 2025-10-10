# BmbLoginOnboardingComponent

## Descripción general

`BmbLoginOnboardingComponent` es un componente standalone de Angular diseñado para gestionar el flujo de autenticación y onboarding de personas en la plataforma. Integra diferentes etapas como login, recuperación de contraseña, cambio de cuenta y confirmación de sesión, permitiendo personalizar enlaces y etiquetas. Facilita la navegación entre pasos y la emisión de eventos para manejar el proceso de autenticación de manera flexible y escalable.

---

## Props / Parámetros

| Propiedad                     | Tipo                               | Descripción                                                        | Valor por defecto                                                                                   | Obligatorio |
|-------------------------------|------------------------------------|--------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|-------------|
| `loginOnBoardingCustomization`| `IBmbLoginOnBoardingCustomization` | Configuración de enlaces y etiquetas para acciones de onboarding    | `{ anotherAccount: { label: 'Ingresar con otra cuenta', link: '' }, forgottenPassword: { label: '¿Olvidaste tu contraseña?', link: '' } }` | No          |

### Outputs

| Output         | Tipo         | Descripción                                  |
|----------------|--------------|----------------------------------------------|
| `handleRequest`| `any`        | Se emite al realizar una solicitud de autenticación o cambio de estado |

### Interfaces relacionadas

#### IBmbLoginOnBoardingCustomization

```typescript
export interface IBmbLoginOnBoardingCustomization {
  anotherAccount: IBmbLinkConfiguration;
  forgottenPassword: IBmbLinkConfiguration;
}
```

---

## Ejemplo de uso

```html
<bmb-login-onboarding
  [loginOnBoardingCustomization]="{
    anotherAccount: { label: 'Usar otra cuenta', link: '/otra-cuenta' },
    forgottenPassword: { label: 'Recuperar contraseña', link: '/recuperar' }
  }"
  (handleRequest)="onOnboardingRequest($event)"
>
</bmb-login-onboarding>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbLoginOnboardingLoginComponent`
- `BmbLoginOnboardingStepperComponent`
- `BmbLoginOnboardingLogoutComponent`
- `BmbLoginOnboardingLoggedComponent`
- `BmbIconComponent`
- Servicio: `BmbLoginOnboardingService`
- Tipos: `IBmbLinkConfiguration`

---

## Notas adicionales

- **Accesibilidad:** El componente soporta navegación por teclado y etiquetas descriptivas, facilitando el acceso para todas las personas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y permite personalizar enlaces y acciones según el flujo de onboarding.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Gestión de estado:** El servicio interno gestiona la página activa y el estado de carga, permitiendo una lógica desacoplada y escalable.
- **Personalización:** Permite configurar textos y enlaces para adaptarse a diferentes escenarios de autenticación y recuperación de acceso.

---
