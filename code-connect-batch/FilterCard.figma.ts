// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=107-31067
// source=ui-angular/src/lib/components/bmb-filter-card/bmb-filter-card.component.ts
// component=BmbFilterCardComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  visibilityRules: IBmbVisibilityRule[] = [];

  optionRules: IBmbOptionRule[] = [];

  controlTypes: IBmbControlType[] = [
    {
      title: 'Filter - Dropdown',
      control: [
        {
          name: 'dropdown-1',
          type: 'dropdown',
          label: 'Fruit',
          options: [
            { value: 'banana', name: 'Banana' },
            { value: 'apple', name: 'Apple' },
            { value: 'tomato', name: 'Tomato' },
          ],
          value: 'apple',
          isMultiSelect: true,
        },
      ],
    },
    {
      title: 'Filter - tags',
      control: [
        { name: 'tag-1', type: 'tag', label: 'Name tag 1', checked: false },
        { name: 'tag-2', type: 'tag', label: 'Name tag 2', checked: false },
      ],
    },
    {
      title: 'Filter - Radial',
      control: [
        {
          name: 'radial-1',
          type: 'radial',
          label: 'Radial 1',
          id: 'radial-1',
          value: '1',
          checked: false,
        },
        {
          name: 'radial-1',
          type: 'radial',
          label: 'Radial 2',
          id: 'radial-2',
          value: '2',
          checked: false,
        },
      ],
    },
    {
      title: 'Filter - Checkbox',
      control: [
        {
          name: 'checkbox-1',
          type: 'checkbox',
          label: 'Checkbox 1',
          checked: false,
        },
        {
          name: 'checkbox-2',
          type: 'checkbox',
          label: 'Checkbox 2',
          checked: false,
        },
      ],
    },
    {
      title: 'Filter - Switch',
      control: [
        {
          name: 'switch-1',
          type: 'switch',
          label: 'Switch 3',
          rightText: 'Switch 3',
          checked: false,
        },
      ],
    },
  ];
}
</script>

<bmb-filter-card
  modalTitle="Opciones Filtrado"
  primaryBtnLabel="Aplicar Filtros"
  secondaryBtnLabel="Limpiar Filtros"
  icon="${getIcon('tune')}"
  [visibilityRules]="visibilityRules"
  [optionRules]="optionRules"
  placeholderSearch="Search"
  [controlTypes]="controlTypes"
  [inLine]="false"
  [showGlobalSearch]="true"
/>`,
  imports: [
    "import type { IBmbControlType, IBmbOptionRule, IBmbVisibilityRule } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbFilterCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-filter-card',
}
