import { Meta, StoryObj } from '@storybook/angular';
import {
  BmbListGroupComponent,
  BmbListGroupItemComponent,
} from './bmb-list-group.component';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { InputSignal } from '@angular/core';
import { attributes } from '../../utils/utils';

const appearanceOptions: IBbmBgAppearance[] = [
  'normal',
  'strong',
  'success',
  'info',
  'warning',
  'error',
  'brand',
  'background',
  'disabled',
  'mitec_blue',
  'mitec_red',
  'mitec_green',
  'mitec_orange',
  'mitec_light_green',
  'mitec_purple',
  'creative_violet',
  'creative_indigo',
  'creative_emerald',
  'creative_licorice',
  'creative_darkteal',
  'creative_peach',
  'creative_sepia',
  'creative_softred',
  'creative_wattle',
  'creative_shipcove',
  'creative_plantation',
  'creative_rum',
  'creative_hibiscus',
  'creative_ripelemon',
];

export default {
  title: 'Macro componentes/ListsGroup/List group item',
  component: BmbListGroupComponent,
  subcomponents: { BmbListGroupComponent },
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BmbListGroupComponent, BmbListGroupItemComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbListGroupComponent, BmbListGroupItemComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbListGroupComponent, BmbListGroupItemComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    id: {
      name: 'Id',
      description: 'The id of the list group item **(required)**',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        category: 'Properties',
      },
    },
    personalizedTemplate: {
      name: 'Personalized Template',
      description:
        'When the value is true, the component will use the template that the user provides, instead of that, you need to provide the inputs por the deafult template',
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
        category: 'Properties',
      },
    },
    headerText: {
      name: 'Header Text',
      description: 'Is the header text of the list group item',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        category: 'Properties',
      },
    },
    descriptionText: {
      name: 'Description Text',
      description: 'Is the description text of the list group item',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        category: 'Properties',
      },
    },
    infoText: {
      name: 'Information Text',
      description: 'Is the information text of the list group item',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        category: 'Properties',
      },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description: 'Sets header icon.',
      table: {
        category: 'Properties',
        type: { summary: 'string (optional)' },
      },
    },
    imgSrc: {
      name: 'Image source URL',
      control: {
        type: 'text',
      },
      description: 'Set the Hi-res image source URL',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    tooltipTitle: {
      name: 'Tooltip Title',
      description: 'The title of the tooltip',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        category: 'Properties',
      },
    },
    tooltipText: {
      name: 'Tooltip Text',
      description: 'The main text of the tooltip',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        category: 'Properties',
      },
    },
    badgeAppearance: {
      name: 'Badge Appearance',
      control: {
        type: 'select',
      },
      options: appearanceOptions,
      table: {
        category: 'Properties',
        defaultValue: { summary: 'mitec_purple' },
        type: { summary: 'string' },
      },
      description: 'The appearance of the badge, affecting its visual style.',
    },
    badgeText: {
      name: 'Badge Text',
      description: 'The text of the badge',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        category: 'Properties',
      },
    },
    isDisabled: {
      name: 'Is disabled',
      description: 'Determines if the item is disabled',
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        category: 'Properties',
        defaultValue: { summary: 'false' },
      },
    },
    isActive: {
      name: 'Is active',
      description: 'Determines the initial state of the item',
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        category: 'Properties',
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    id: 'list-group-item-1' as unknown as InputSignal<string>,
    isDisabled: false as unknown as InputSignal<boolean>,
    isActive: false as unknown as InputSignal<boolean>,
    personalizedTemplate: false as unknown as InputSignal<boolean>,
  },
} as Meta<typeof BmbListGroupItemComponent>;

type Story = StoryObj<BmbListGroupItemComponent>;

export const Default: Story = {
  name: 'Example with a personalized template',
  args: {
    personalizedTemplate: true as unknown as InputSignal<boolean>,
  },
  render: (args) => ({
    props: args,
    template: `
      <bmb-list-group>
        <bmb-list-group-item ${attributes(args)}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo ante,
          mattis nec libero a, malesuada pellentesque sem. Aliquam erat volutpat.
          Nulla ut consequat turpis, id efficitur velit. Fusce vitae dolor leo.
          Praesent diam justo, consectetur in blandit ut, tincidunt vitae enim. Nulla
          eleifend, leo at finibus volutpat, nulla metus eleifend lacus, ullamcorper
          dictum augue diam id erat. Donec ac fringilla elit. Aliquam sit amet luctus
          elit. Suspendisse ante tortor, euismod nec metus id, commodo sollicitudin
          massa. Aliquam magna nibh, semper eu vestibulum aliquam, aliquet gravida
          massa. Nullam vehicula, augue non aliquam posuere, enim urna blandit erat,
          et euismod enim nisi vel eros. Ut dictum egestas mi, faucibus iaculis lorem.
          Donec risus diam, maximus at varius rutrum, blandit quis augue. Sed
          consectetur massa ut auctor ultricies. Etiam fringilla venenatis nulla,
          gravida finibus nulla faucibus fringilla. Morbi luctus porta orci eu
          iaculis.
        </bmb-list-group-item>
      </bmb-list-group>
    `,
  }),
};

export const WithDefaultTemplate: Story = {
  name: 'Example with the default template',
  args: {
    personalizedTemplate: false as unknown as InputSignal<boolean>,
    headerText: 'Header text' as unknown as InputSignal<string>,
    descriptionText: 'Description text' as unknown as InputSignal<string>,
    infoText: 'Info text' as unknown as InputSignal<string>,
    icon: 'add_box' as unknown as InputSignal<string>,
    tooltipTitle: 'Tooltip title' as unknown as InputSignal<string>,
    tooltipText: 'Tooltip text' as unknown as InputSignal<string>,
    badgeAppearance: 'mitec_blue' as unknown as InputSignal<IBbmBgAppearance>,
    badgeText: 'Badge Text' as unknown as InputSignal<string>,
  },
  render: (args) => ({
    props: args,
    template: `
       <bmb-list-group>
        <bmb-list-group-item ${attributes(args)}>
        </bmb-list-group-item>
      </bmb-list-group>
    `,
  }),
};
