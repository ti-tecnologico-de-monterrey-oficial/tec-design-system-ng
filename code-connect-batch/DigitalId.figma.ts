// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=3480-50512
// source=ui-angular/src/lib/components/bmb-digital-id/bmb-digital-id.component.ts
// component=BmbDigitalIdComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleClose(event: Parameters<BmbDigitalIdComponent['close']['emit']>[0]): void {
    console.info('close', event);
  }

  handleAccess(event: Parameters<BmbDigitalIdComponent['access']['emit']>[0]): void {
    console.info('access', event);
  }

  handleOnSecondaryClick(event: Parameters<BmbDigitalIdComponent['onSecondaryClick']['emit']>[0]): void {
    console.info('onSecondaryClick', event);
  }
}
</script>

<bmb-digital-id
  (close)="handleClose($event)"
  (access)="handleAccess($event)"
  (onSecondaryClick)="handleOnSecondaryClick($event)"
  name="Paola"
  surname="Montes Perez"
  registration="L0353882"
  campus="Campus Tec Norte"
  career="ITICS"
  role="Estudiante"
  textButton="Acceso a Campues"
  logoSrc="assets/images/tec-logo.svg"
  icon="${getIcon('qr_code_scanner')}"
  imgProfile="https://picsum.photos/id/64/200/300"
  imgBackground="https://2.bp.blogspot.com/-YkNDZEbKt_g/TYzcbF2_tkI/AAAAAAAAalk/Vt_MHS60Xv8/s1600/www.JoseLuisAvilaHerrera.BLOGSPOT.com%2B-%2BFunny%2BCats%2B-%2BGatitos%2Bmuy%2Btiernos%2B8.jpg"
  [disableSecondaryButton]="false"
  [disableMainButton]="false"
  [hideMainButton]="false"
  [hideSecondaryButton]="false"
/>`,
  imports: [
    "import { BmbDigitalIdComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-digital-id',
}
