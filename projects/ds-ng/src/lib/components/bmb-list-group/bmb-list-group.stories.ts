import { Meta, StoryObj } from '@storybook/angular';
import {
  BmbListGroupComponent,
  BmbListGroupItemComponent,
} from './bmb-list-group.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { InputSignal } from '@angular/core';
import { SizeNames } from '../../types';
import { BorderType } from './types';

const meta: Meta<BmbListGroupComponent> = {
  title: 'Macro componentes/ListsGroup/List group',
  component: BmbListGroupComponent,
  subcomponents: { BmbListGroupItemComponent },
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
    borderRadius: {
      name: 'Border radius',
      control: {
        type: 'select',
      },
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
      control: {
        type: 'select',
      },
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
      control: {
        type: 'select',
      },
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
      control: {
        type: 'select',
      },
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
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        category: 'Properties',
        defaultValue: { summary: 'false' },
      },
    },
    showControls: {
      name: 'Show controls',
      description: 'Shows the control buttons',
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        category: 'Properties',
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    borderRadius: 'm' as unknown as InputSignal<SizeNames | SizeNames[]>,
    borderType: 'rounded' as unknown as InputSignal<BorderType>,
    margin: 'm' as unknown as InputSignal<SizeNames>,
    padding: 'm' as unknown as InputSignal<SizeNames | SizeNames[]>,
    isMultipleSelection: false as unknown as InputSignal<boolean>,
    showControls: true as unknown as InputSignal<boolean>,
  },
};

export default meta;

type Story = StoryObj<BmbListGroupComponent>;

export const Primary: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <bmb-list-group
        [borderRadius]="borderRadius"
        [margin]="margin"
        [padding]="[padding]"
        [borderType]="borderType"
        [isMultipleSelection]="isMultipleSelection"
        [showControls]="showControls"
      >
        <bmb-list-group-item id="list-group-item-1">
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
        <bmb-list-group-item id="list-group-item-2" [isDisabled]="true">
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
        <bmb-list-group-item id="list-group-item-3">
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
