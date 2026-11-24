// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=20-2782
// source=ui-angular/src/lib/components/bmb-box-icon/bmb-box-icon.component.ts
// component=BmbBoxIconComponent
import figma from 'figma'
import { getIcon } from './icon-image'
import { getBoxIconColor } from './box-icon-color'

const instance = figma.selectedInstance
const boxSize = instance.getEnum('boxSize', { small: 'small', regular: 'regular', min: 'small' })
const boxShape = instance.getEnum('boxShape', { square: 'square', circle: 'circle' })

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleImageNotFoundError(): void {
    console.info('imageNotFoundError');
  }
}
</script>

<bmb-box-icon
  (imageNotFoundError)="handleImageNotFoundError()"
  iconName="${getIcon('face')}"
  boxColor="${getBoxIconColor('semantic-success')}"
  boxShape="${boxShape ?? 'square'}"
  boxSize="${boxSize ?? 'small'}"
/>`,
  imports: [
    "import { BmbBoxIconComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-box-icon',
  metadata: { nestable: true },
}
