// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=109-35160
// source=ui-angular/src/lib/components/bmb-dropdown/bmb-dropdown.component.ts
// component=BmbDropdownComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  options: string[] | IBmbDropdownItem[] = [
    { name: 'Apple name', value: '_apple', icon: ${getIcon('home', 'typescript')}, id: 'apple_' },
    { name: 'Banana name', value: '_banana', icon: ${getIcon('bolt', 'typescript')}, id: 'banana_' },
    { name: 'Orange name', value: '_orange', icon: ${getIcon('bolt', 'typescript')}, id: 'orange_' },
    { name: 'Pear name', value: '_pear', icon: ${getIcon('info', 'typescript')}, id: 'pear_' },
    { name: 'Grape name', value: '_grape', icon: ${getIcon('bolt', 'typescript')}, id: 'grape_' },
    { name: 'Mango name', value: '_mango', icon: ${getIcon('star', 'typescript')}, id: 'mango_' },
    {
      name: 'Strawberry name',
      value: '_strawberry',
      icon: ${getIcon('favorite', 'typescript')},
      id: 'strawberry_',
    },
    {
      name: 'Blueberry name',
      value: '_blueberry',
      icon: ${getIcon('circle', 'typescript')},
      id: 'blueberry_',
    },
    {
      name: 'Watermelon name',
      value: '_watermelon',
      icon: ${getIcon('water_drop', 'typescript')},
      id: 'watermelon_',
    },
    {
      name: 'Pineapple name',
      value: '_pineapple',
      icon: ${getIcon('sunny', 'typescript')},
      id: 'pineapple_',
    },
    {
      name: 'Cherry name',
      value: '_cherry',
      icon: ${getIcon('heart_broken', 'typescript')},
      id: 'cherry_',
    },
    { name: 'Peach name', value: '_peach', icon: ${getIcon('spa', 'typescript')}, id: 'peach_' },
    { name: 'Lemon name', value: '_lemon', icon: ${getIcon('wb_sunny', 'typescript')}, id: 'lemon_' },
    { name: 'Kiwi name', value: '_kiwi', icon: ${getIcon('eco', 'typescript')}, id: 'kiwi_' },
    {
      name: 'Coconut name',
      value: '_coconut',
      icon: ${getIcon('beach_access', 'typescript')},
      id: 'coconut_',
    },
  ];
}
</script>

<bmb-dropdown
  icon="${getIcon('bolt')}"
  [required]="true"
  [showIcon]="true"
  placeholder="Set Fruit"
  [options]="options"
  helperText="Select a fruit"
  [disabled]="false"
  label="Fruit"
  [control]="control"
  [isFilterable]="false"
  [preferredOptions]="['_pear']"
  [isMultiSelect]="false"
  tooltip="Tool tip"
  errorMessage="Error input dropdown"
  name="dropdown"
  value=""
/>`,
  imports: [
    "import type { IBmbDropdownItem } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbDropdownComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-dropdown',
}
