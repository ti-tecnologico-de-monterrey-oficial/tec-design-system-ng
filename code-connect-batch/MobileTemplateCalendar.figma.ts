// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=523-207868
// source=ui-angular/src/lib/components/bmb-mobile-templates/bmb-mobile-templates.component.ts
// component=BmbMobileTemplatesComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  footerActions: IBmbButtonAction[] = [];

  buttonList: IBmbMobileTemplateButton[] = [
    {
      title: 'Title 1',
      target: '_blank',
      link: 'google.com',
      subtitle: 'Subtitle',
      iconLeft: ${getIcon('home', 'typescript')},
    },
    { title: 'Title 2', link: 'google.com', iconLeft: ${getIcon('home', 'typescript')} },
  ];
}
</script>

<bmb-mobile-templates
  template="calendar"
  [footerActions]="footerActions"
  [buttonList]="buttonList"
  componentTitle="Title"
  headerIconRight="${getIcon('close')}"
  calendarTimezone="America/Mexico_City"
  clientTimezone="America/Mexico_City"
  lang="es"
  externalLinkSubtitle="https://www.CONECTA.tec.mx"
/>`,
  imports: [
    "import type { IBmbButtonAction, IBmbMobileTemplateButton } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbMobileTemplatesComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-mobile-templates',
}
