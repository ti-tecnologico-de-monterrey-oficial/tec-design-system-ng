import type { IBmbControlType } from 'ui-angular';

export const filterCardDemoControls: IBmbControlType[] = [
  {
    title: 'Filter - Dropdown',
    control: [
      {
        name: 'dropdown-1',
        type: 'dropdown',
        options: [
          {
            value: 'banana',
            name: 'Banana',
          },
          {
            value: 'apple',
            name: 'Apple',
          },
          {
            value: 'tomato',
            name: 'Tomato',
          },
        ],
        value: 'apple',
        isMultiSelect: true,
        label: 'Filter dropdown',
      },
    ],
  },
  {
    title: 'Filter - tags',
    control: [
      {
        name: 'tag-1',
        type: 'tag',
        label: 'Name tag 1',
        checked: false,
      },
      {
        name: 'tag-2',
        type: 'tag',
        label: 'Name tag 2',
        checked: false,
      },
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
        rightText: 'Switch 3',
        checked: false,
        label: 'Switch 3',
      },
    ],
  },
];
