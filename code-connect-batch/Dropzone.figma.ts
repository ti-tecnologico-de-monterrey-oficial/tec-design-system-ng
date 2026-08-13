// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=109-36648
// source=projects/ds-ng/src/lib/components/bmb-dropzone/bmb-dropzone.component.ts
// component=BmbDropzoneComponent
import figma from 'figma'

const instance = figma.selectedInstance
const appearanceContrast = instance.getEnum('Container color', {
  Default: 'default',
  Primary: 'primary',
  Alternative: 'alternative',
})
const instructionLayer = instance.findText('Help text', { traverseInstances: true })
const formatLayer = instance.findText('Supporting text', {
  traverseInstances: true,
})
const linkLabelLayer = instance.findText('link', { traverseInstances: true })
const dropInstruction =
  instructionLayer && instructionLayer.type === 'TEXT'
    ? instructionLayer.textContent
    : 'Drag and drop your files or'
const formatFilesLabel =
  formatLayer && formatLayer.type === 'TEXT'
    ? formatLayer.textContent
    : 'Formats: png, jpeg, and jpg.'
const linkLabel =
  linkLabelLayer && linkLabelLayer.type === 'TEXT'
    ? linkLabelLayer.textContent
    : 'Images only'

export default {
  example: figma.code`<bmb-dropzone appearanceContrast="${appearanceContrast}" [acceptedExtensions]="['png', 'image/jpeg', 'jpg']" dropLabel="Attach your files" dropInstruction="${dropInstruction}" formatFilesLabel="${formatFilesLabel}" linkFilesSupported="https://www.youtube.com/" linkLabel="${linkLabel}" mainIcon="image" [fileSize]="2" />`,
  imports: [
    "import { BmbDropzoneComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-dropzone',
  metadata: { nestable: true },
}
