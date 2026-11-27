// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=109-44803
// source=ui-angular/src/lib/components/bmb-input-tags/bmb-input-tags.component.ts
// component=BmbInputTagsComponent
import figma from 'figma'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleOnKeyDown(event: Parameters<BmbInputTagsComponent['onKeyDown']['emit']>[0]): void {
    console.info('onKeyDown', event);
  }

  handleOnChange(event: Parameters<BmbInputTagsComponent['onChange']['emit']>[0]): void {
    console.info('onChange', event);
  }

  tagOptions: string[] | IBmbDropdownItem[] = [
    'Tacos al pastor',
    'Enchiladas',
    'Tamales',
    'Quesadillas',
    'Chiles en nogada',
    'Mole poblano',
    'Sopes',
    'Gorditas',
    'Pozole',
    'Ceviche',
    'Tortas',
    'Guacamole',
    'Tacos de pescado',
    'Flautas',
    'Chalupas',
    'Huevos rancheros',
    'Elote',
    'Mole verde',
    'Arroz a la mexicana',
    'Burritos',
  ];
}
</script>

<bmb-input-tags
  (onKeyDown)="handleOnKeyDown($event)"
  (onChange)="handleOnChange($event)"
  errorMessage=""
  helperMessage="Helper Message"
  [isRequired]="false"
  placeholder=""
  [disabled]="false"
  label=""
  [tagOptions]="tagOptions"
  tooltip=""
  name=""
  value=""
/>`,
  imports: [
    "import type { IBmbDropdownItem } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbInputTagsComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-input-tags',
}
