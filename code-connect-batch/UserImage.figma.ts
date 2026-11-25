// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=107-34907
// source=ui-angular/src/lib/components/bmb-user-image/bmb-user-image.component.ts
// component=BmbUserImageComponent
import figma from 'figma'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleButtonPress(event: Parameters<BmbUserImageComponent['buttonPress']['emit']>[0]): void {
    console.info('buttonPress', event);
  }

  handleButtonClick(event: Parameters<BmbUserImageComponent['buttonClick']['emit']>[0]): void {
    console.info('buttonClick', event);
  }

  handleButtonKeyPress(event: Parameters<BmbUserImageComponent['buttonKeyPress']['emit']>[0]): void {
    console.info('buttonKeyPress', event);
  }

  handleImageNotFoundError(): void {
    console.info('imageNotFoundError');
  }
}
</script>

<bmb-user-image
  (buttonPress)="handleButtonPress($event)"
  (buttonClick)="handleButtonClick($event)"
  (buttonKeyPress)="handleButtonKeyPress($event)"
  (imageNotFoundError)="handleImageNotFoundError()"
  image="https://picsum.photos/id/64/200/300"
  size="desktop-small"
  [bordered]="false"
/>`,
  imports: [
    "import { BmbUserImageComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-user-image',
}
