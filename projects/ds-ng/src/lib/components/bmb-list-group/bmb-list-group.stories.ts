import { Meta, StoryObj } from '@storybook/angular';
import { BmbListGroupComponent } from './bmb-list-group.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import {
  attributes,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
} from '../../utils/doc/utils';
import { BmbListGroupItemComponent } from './bmb-list-group-item/bmb-list-group-item.component';
import { getOnEventParam } from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Containers/List group',
  component: BmbListGroupComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BmbListGroupItemComponent],
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [
          'getClassNames',
          'getStyles',
          'getVarStyles',
          'ngOnInit',
          '',
          '',
          '',
          '',
          '',
        ],
      },
      description: {
        component: `
${getGeneralDescription(
  `${getGeneralComponentDescription({ name: 'list-group' })} to organize related elements in an ordered list, optimizing navigation and displaying content clearly and efficiently.
It helps to group information in a coherent and accessible way.`,
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/components/list-group/descripcion-general-ieYN5a5C',
  },
)}
${getBasicExampleBlock('BmbListGroupComponent, BmbListGroupItemComponent')}
        `,
      },
    },
  },
  argTypes: {
    borderRadius: {
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
      description: 'Allows multiple items to be selected',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        category: 'Properties',
        defaultValue: { summary: 'false' },
      },
    },
    showControls: {
      description: 'Shows the control buttons',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        category: 'Properties',
        defaultValue: { summary: 'true' },
      },
    },
    isRowView: {
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
      description:
        'This property is used when you have multiple List Group, each instance of the component must have different ID, which will be defined with this property.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        category: 'Properties',
      },
    },
    selectionChange: getOnEventParam(
      getOnEvent('', 'selectionChange', 'string[]'),
      'when an option is selected. Contains the id of the selected option.',
      'other',
    ),
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
  name: 'One item',
  render: (args) => ({
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
  name: 'Example with multiple List group',
  render: (args) => ({
    template: `
    <!-- First List group -->
      <h1>First List Group </h1>
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

      <!-- Second List group -->
      <h1>Second List group </h1>
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
