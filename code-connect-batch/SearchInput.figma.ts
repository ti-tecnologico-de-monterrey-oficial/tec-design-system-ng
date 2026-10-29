// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=109-37785
// source=ui-angular/src/lib/components/bmb-search-input/bmb-search-input.component.ts
// component=BmbSearchInputComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-search-input
  name=""
  [data]="['Carlee Bengochea', 'Reynard Howgate', 'Pearce Jore', 'Giacopo Mellings', 'Clyve Nerval', 'Pauletta Pavelka', 'Midge Girardot']"
  [isServerSideFilter]="false"
  placeholder=""
/>`,
  imports: [
    "import { BmbSearchInputComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-search-input',
}
