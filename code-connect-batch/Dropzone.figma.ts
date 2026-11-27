// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=109-36648
// source=ui-angular/src/lib/components/bmb-dropzone/bmb-dropzone.component.ts
// component=BmbDropzoneComponent
import figma from 'figma'
import { getIcon } from './icon-image'

import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const appearanceContrast = instance.getEnum('appearanceContrast', { Default: 'default', Primary: 'primary', Alternative: 'alternative' })

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleNewFile(event: Parameters<BmbDropzoneComponent['newFile']['emit']>[0]): void {
    console.info('newFile', event);
  }

  handleFileRemoved(event: Parameters<BmbDropzoneComponent['fileRemoved']['emit']>[0]): void {
    console.info('fileRemoved', event);
  }
}
</script>

<bmb-dropzone
  (newFile)="handleNewFile($event)"
  (fileRemoved)="handleFileRemoved($event)"
  appearanceContrast="${appearanceContrast ?? 'default'}"
  [progress]="0"
  [acceptedExtensions]="['png', 'image/jpeg', 'jpg']"
  formatFilesLabel="${escapeAttribute(instance.getString("formatFilesLabel") ?? "Formats: png, jpeg, and jpg.")}"
  linkFilesSupported="https://www.youtube.com/"
  linkLabel="${escapeAttribute(instance.getString("linkLabel") ?? "Images only")}"
  dropInstruction="${escapeAttribute(instance.getString("dropInstruction") ?? "Drag and drop your files or")}"
  dropLabel="${escapeAttribute(instance.getString("dropLabel") ?? "Attach your files")}"
  mainIcon="${getIcon('image')}"
  errorMessageFormat="${escapeAttribute(instance.getString("errorMessageFormat") ?? "Format not compatible")}"
  errorMessageSize="File exceeds the maximum allowed size."
  name="dropzoneInput"
  [fileSize]="2"
  [multiple]="false"
  [allowDuplicateFiles]="false"
  [customErrorMessages]="{}"
/>`,
  imports: [
    "import { BmbDropzoneComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-dropzone',
  metadata: { nestable: true },
}
