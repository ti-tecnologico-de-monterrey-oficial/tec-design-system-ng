// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=152-46854
// source=ui-angular/src/lib/components/bmb-toast/bmb-toast.component.ts
// component=BmbToastComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-toast
  componentTitle="Your toast title here"
  description="Your toast description here (optional)"
  appearance="neutral"
  [isClosable]="false"
/>`,
  imports: [
    "import { BmbToastComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-toast',
  metadata: { nestable: true },
}
