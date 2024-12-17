import { Meta, StoryObj } from '@storybook/angular';
import {
  BmbListGroupComponent,
  BmbListGroupItemComponent,
} from './bmb-list-group.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { InputSignal } from '@angular/core';

const meta: Meta<BmbListGroupItemComponent> = {
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
        type: 'text'
      },
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: '' },
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
  },
};

export default meta;

type Story = StoryObj<BmbListGroupItemComponent>;

export const Primary: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <bmb-list-group>
        <bmb-list-group-item [id]="id" [isDisabled]="isDisabled">
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
