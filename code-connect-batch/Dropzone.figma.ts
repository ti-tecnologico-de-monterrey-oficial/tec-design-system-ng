// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=109-36648
// source=ui-angular/src/lib/components/bmb-dropzone/bmb-dropzone.component.ts
// component=BmbDropzoneComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<bmb-dropzone
  appearanceContrast="default"
  [progress]="0"
  [acceptedExtensions]="['png', 'image/jpeg', 'jpg']"
  formatFilesLabel="Formats: png, jpeg, and jpg."
  linkFilesSupported="https://www.youtube.com/"
  linkLabel="Images only"
  dropInstruction="Drag and drop your files or"
  dropLabel="Attach your files"
  mainIcon="${getIcon('image')}"
  errorMessageFormat="Format not compatible"
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
