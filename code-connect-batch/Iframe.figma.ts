// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=596-122793
// source=ui-angular/src/lib/components/bmb-iframe/bmb-iframe.component.ts
// component=BmbIframeComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-iframe
  height="100%"
  width="100%"
  src="https://www.openstreetmap.org/export/embed.html?bbox=-118.5%2C14.3%2C-86.5%2C32.8&amp;layer=mapnik"
  loading="eager"
  importance="auto"
  name="test"
  [srcdoc]="srcdoc"
  [sandbox]="sandbox"
  [allow]="allow"
  [allowFullscreen]="allowFullscreen"
  [credentialless]="credentialless"
  [csp]="csp"
  [referrerPolicy]="referrerPolicy"
/>`,
  imports: [
    "import { BmbIframeComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-iframe',
}
