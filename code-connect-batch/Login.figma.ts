// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=2592-57821
// source=ui-angular/src/lib/components/bmb-login/bmb-login.component.ts
// component=BmbLoginComponent
import figma from 'figma'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  actionHeaderLinks: IBmbActionHeaderLinks = {
    apple: { link: '' },
    android: { link: '' },
    twitter: { link: '' },
    facebook: { link: '' },
    instagram: { link: '' },
    youtube: { link: '' },
  };
}
</script>

<bmb-login
  headerLabel=""
  forgottenPasswordLabel="¿Olvidaste tu contraseña?"
  forgottenPasswordLink=""
  forgottenPasswordTarget="_blank"
  buttonLabel="Ingresar"
  [actionHeaderLinks]="actionHeaderLinks"
  [showRememberMeCheckbox]="false"
  rememberMeCheckboxLabel="Recordarme"
  [showLoginAsGuest]="false"
  loginAsGuestLabel="Entrar como invitado"
  loginAsGuestLink=""
  loginAsGuestTarget="_blank"
/>`,
  imports: [
    "import type { IBmbActionHeaderLinks } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbLoginComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-login',
}
