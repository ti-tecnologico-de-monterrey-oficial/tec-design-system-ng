// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=82-27913
// source=ui-angular/src/lib/components/bmb-modal/bmb-native-modal.component.ts
// component=BmbNativeModalComponent
import figma from 'figma'

const instance = figma.selectedInstance
const title = JSON.stringify(instance.getString('componentTitle') ?? 'My Modal').replace(/</g, '\\u003c')
const showSubtitle = instance.getBoolean('showSubtitle')
const subtitle = JSON.stringify(instance.getString('subtitle') ?? 'Subtitle').replace(/</g, '\\u003c')
const size = instance.getEnum('size', {
  'x-small': 'x-small',
  small: 'small',
  medium: 'medium',
  large: 'large',
  'x-large': 'x-large',
})
const iconStyle = instance.getEnum('iconStyle', {
  warning: 'warning',
  neutral: 'neutral',
  primary: 'primary',
  event: 'event',
  success: 'success',
  error: 'error',
})

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  private readonly modalService = inject(BmbNativeModalService);

  openModal() {
    this.modalService.openModal({
      title: ${title},
      ${showSubtitle ? `subtitle: ${subtitle},` : ''}
      content: 'This is plain text content.',
      size: '${size ?? 'medium'}',
      ${iconStyle ? `iconStyle: '${iconStyle}',` : ''}
    });
  }
}
</script>

<button bmbButton type="button" (click)="openModal()">Abrir modal</button>`,
  imports: [
    "import { inject } from '@angular/core'",
    "import { BmbButtonDirective, BmbNativeModalService } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-native-modal',
}
