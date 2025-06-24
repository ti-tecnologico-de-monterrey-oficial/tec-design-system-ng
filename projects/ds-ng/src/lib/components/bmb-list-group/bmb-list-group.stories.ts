import { Meta, StoryObj } from '@storybook/angular';
import {
  BmbListGroupComponent,
  BmbListGroupItemComponent,
} from './bmb-list-group.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { attributes } from '../../utils/utils';
import { storiesLayoutHorizontal } from '../../utils/bambooLayout';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';

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
  title: 'Components/Containers/List group',
  component: BmbListGroupComponent,
  subcomponents: { BmbListGroupItemComponent },
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BmbListGroupComponent, BmbListGroupItemComponent],
    }),
    storiesLayoutHorizontal,
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
    borderRadius: {
      name: 'Border radius',
      control: { type: 'select' },
      options: ['xs', 's', 'm', 'l', 'xl', 'none', 'auto'],
      table: {
        type: { summary: 'SizeNames | SizeNames[]' },
        category: 'Properties',
        defaultValue: { summary: 'm' },
      },
      description: 'Determines the corner radius size',
    },
    borderType: {
      name: 'Border type',
      control: { type: 'select' },
      options: ['rounded', 'flush'],
      table: {
        type: { summary: 'BorderType' },
        category: 'Properties',
        defaultValue: { summary: 'rounded' },
      },
      description: 'Determines the border type',
    },
    margin: {
      name: 'Margin',
      description: 'Determines the separation between the list group items',
      control: { type: 'select' },
      options: ['xs', 's', 'm', 'l', 'xl', 'none', 'auto'],
      table: {
        type: { summary: 'SizeNames' },
        category: 'Properties',
        defaultValue: { summary: 'm' },
      },
    },
    padding: {
      name: 'Padding',
      description:
        'Determines the space between the list group items and the border',
      control: { type: 'select' },
      options: ['xs', 's', 'm', 'l', 'xl', 'none', 'auto'],
      table: {
        type: { summary: 'SizeNames | SizeNames[]' },
        category: 'Properties',
        defaultValue: { summary: 'm' },
      },
    },
    isMultipleSelection: {
      name: 'Is multiple selection',
      description: 'Allows multiple items to be selected',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        category: 'Properties',
        defaultValue: { summary: 'false' },
      },
    },
    showControls: {
      name: 'Show controls',
      description: 'Shows the control buttons',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        category: 'Properties',
        defaultValue: { summary: 'true' },
      },
    },
    isRowView: {
      name: 'Is row view',
      description:
        'Determines if the list items should be displayed in a horizontal row with wrapping. When set to true, items will be arranged in a flex container with a row direction and wrap behavior.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        category: 'Properties',
        defaultValue: { summary: 'false' },
      },
    },
    listGroupId: {
      name: 'List Group Id',
      description:
        'This property is used when you have multiple List Group, each instance of the component must have different ID, which will be defined with this property.',
      control: { type: 'string' },
      table: {
        type: { summary: 'string' },
        category: 'Properties',
      },
    },
    selectionChange: {
      name: 'Selection Change',
      control: {
        type: '',
      },
      description:
        'Emitted when an option is selected. Contains the id of the selected option.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
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
    borderRadius: 'm',
    borderType: 'rounded',
    margin: 'm',
    padding: 'm',
    isMultipleSelection: false,
    showControls: true,
    isRowView: false,
  },
} as Meta<typeof BmbListGroupComponent>;

type Story = StoryObj<BmbListGroupComponent>;

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    props: args,
    template: `
      <bmb-list-group ${attributes(args)}>
        <bmb-list-group-item
          id="list-group-item-1"
          [personalizedTemplate]="true"
        >
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

        <bmb-list-group-item
          id="list-group-item-2"
          [personalizedTemplate]="true"
          [isDisabled]="true"
        >
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

        <bmb-list-group-item
          id="list-group-item-3"
          [personalizedTemplate]="true"
        >
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

export const MultipleListGroup: Story = {
  name: 'Example With Multiple List Group',
  render: (args) => ({
    props: args,
    template: `
    <!-- First List Group -->
      <h1>First Bmb List Group </h1>
      <bmb-list-group ${attributes(args)} [listGroupId]="'group-1'">
        <bmb-list-group-item
          id="list-group-item-1"
          [personalizedTemplate]="true"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo ante,
          mattis nec libero a, malesuada pellentesque sem. Aliquam erat volutpat.
          Nulla ut consequat turpis, id efficitur velit. Fusce vitae dolor leo.
          Praesent diam justo, consectetur in blandit ut, tincidunt vitae enim. Nulla
          eleifend, leo at finibus volutpat, nulla metus eleifend lacus, ullamcorper
          dictum augue diam id erat.
        </bmb-list-group-item>

        <bmb-list-group-item
          id="list-group-item-2"
          [personalizedTemplate]="true"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo ante,
          mattis nec libero a, malesuada pellentesque sem. Aliquam erat volutpat.
          Nulla ut consequat turpis, id efficitur velit. Fusce vitae dolor leo.
          Praesent diam justo, consectetur in blandit ut, tincidunt vitae enim. Nulla
          eleifend, leo at finibus volutpat, nulla metus eleifend lacus, ullamcorper
          dictum augue diam id erat.
        </bmb-list-group-item>
      </bmb-list-group>
      <hr>

      <!-- Second List Group -->
      <h1>Second Bmb List Group </h1>
      <bmb-list-group ${attributes(args)} [listGroupId]="'group-2'">
        <bmb-list-group-item
          id="list-group2-item-1"
          [personalizedTemplate]="true"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo ante,
          mattis nec libero a, malesuada pellentesque sem. Aliquam erat volutpat.
          Nulla ut consequat turpis, id efficitur velit. Fusce vitae dolor leo.
          Praesent diam justo, consectetur in blandit ut, tincidunt vitae enim. Nulla
          eleifend, leo at finibus volutpat, nulla metus eleifend lacus, ullamcorper
          dictum augue diam id erat.
        </bmb-list-group-item>

        <bmb-list-group-item
          id="list-group2-item-2"
          [personalizedTemplate]="true"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo ante,
          mattis nec libero a, malesuada pellentesque sem. Aliquam erat volutpat.
          Nulla ut consequat turpis, id efficitur velit. Fusce vitae dolor leo.
          Praesent diam justo, consectetur in blandit ut, tincidunt vitae enim. Nulla
          eleifend, leo at finibus volutpat, nulla metus eleifend lacus, ullamcorper
          dictum augue diam id erat.
        </bmb-list-group-item>
      </bmb-list-group>
    `,
  }),
};
