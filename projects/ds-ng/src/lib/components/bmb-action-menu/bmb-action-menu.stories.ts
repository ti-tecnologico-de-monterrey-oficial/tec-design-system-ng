import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbActionMenuComponent } from './bmb-action-menu.component';
import { attributes } from '../../utils/utils';
import { BmbItemComponent } from '../bmb-item/bmb-item.component';
import { storiesLayoutVertical } from '../../utils/bambooLayout';

export default {
  title: 'Components/Menus/Action menu',
  component: BmbActionMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbItemComponent],
    }),
    storiesLayoutVertical,
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbActionMenuComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbActionMenuComponent, BmbItemComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class AppComponent {
}
...
\`\`\`


Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description: 'Sets header icon.',
      table: {
        category: 'Properties',
        type: { summary: 'string (optional)' },
      },
    },
    bgIconAppearance: {
      name: 'Icon background color',
      control: { type: 'text' },
      description: 'Sets icon background color.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbColor (optional)' },
      },
    },
    title: {
      name: 'Title',
      control: { type: 'text' },
      description: 'Sets he main title of the home card..',
      table: {
        category: 'Properties',
        type: { summary: 'string (required)' },
      },
    },
    subtitle: {
      name: 'Subtitle',
      control: { type: 'text' },
      description: 'Sets card subtitle',
      table: {
        category: 'Properties',
        type: { summary: 'string (optional)' },
      },
    },
    showHeader: {
      name: 'Show header',
      control: { type: 'boolean' },
      description: 'This property hides or show the header',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    isAList: {
      name: 'Is a list',
      control: { type: 'boolean' },
      description:
        'This property hides or show the divider on each item and you can place whatever you want',
      table: {
        category: 'Deprecated',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    icon: 'account_balance_wallet',
    bgIconAppearance: 'green-light',
    title: 'Title',
    subtitle: 'Subtitle',
    showHeader: true,
  },
} as Meta<typeof BmbActionMenuComponent>;

type Story = StoryObj<BmbActionMenuComponent>;

export const WithIcon: Story = {
  render: (args: any) => ({
    template: `
      <bmb-action-menu ${attributes(args)}>
        <ng-template>
          <bmb-item
            label="Correo"
            icon="mail"
            value="tecservices@servicios.tec.mx"
            valueLink="mailto:tecservices@servicios.tec.mx"
            valueTarget="_self"
        />
        </ng-template>
        <ng-template>
          <bmb-item
            label="Teléfono"
            icon="smartphone"
            value="52 81 8358 2000"
            valueLink="tel:52 81 8358 2000"
            valueTarget="_self"
          />
        </ng-template>
        <ng-template>
          <bmb-item
            label="Teléfono"
            icon="smartphone"
            value="+52 81 1625 5123 (solo texto)"
          />
        </ng-template>
      </bmb-action-menu>
  `,
  }),
};

export const WithoutIcon: Story = {
  render: (args: any) => ({
    template: `
      <bmb-action-menu ${attributes(args)}>
        <ng-template>
          <bmb-item
            label="Correo"
            value="tecservices@servicios.tec.mx"
            valueLink="mailto:tecservices@servicios.tec.mx"
            valueTarget="_self"
          />
        </ng-template>
        <ng-template>
          <bmb-item
            label="Teléfono"
            value="52 81 8358 2000"
            valueLink="tel:52 81 8358 2000"
            valueTarget="_self"
          />
        </ng-template>
        <ng-template>
          <bmb-item
            label="Teléfono"
            value="+52 81 1625 5123 (solo texto)"
          />
        </ng-template>
      </bmb-action-menu>
  `,
  }),
};

export const InformativeText: Story = {
  render: (args: any) => ({
    template: `
      <bmb-action-menu ${attributes(args)}>
        <ng-template>
          <bmb-item
            label="Informative text. Non actionable"
            icon="mail"
            supportText="Support text. <a href='https://www.google.com.mx' target='_blank'>Optional hyperlink text</a>"
          />
        </ng-template>
        <ng-template>
          <bmb-item
            icon="smartphone"
            label="Informative text. Non actionable"
            supportText="Here is some support text for your soul."
          />
        </ng-template>
      </bmb-action-menu>
  `,
  }),
};

export const InformativeTextWithoutIcon: Story = {
  render: (args: any) => ({
    template: `
      <bmb-action-menu ${attributes(args)}>
        <ng-template>
          <bmb-item
            label="Informative text. Non actionable"
            icon="mail"
            supportText="Support text. <a href='https://www.google.com.mx' target='_blank'>Optional hyperlink text</a>"
          />
        </ng-template>
        <ng-template>
          <bmb-item
            icon="smartphone"
            label="Informative text. Non actionable"
            supportText="Here is some support text for your soul."
          />
        </ng-template>
      </bmb-action-menu>
  `,
  }),
};

export const Button: Story = {
  render: (args: any) => ({
    props: {
      ...args,
      action: () => {
        alert('In this method you can define the action to be executed');
      },
    },
    template: `
      <bmb-action-menu ${attributes(args)}>
        <ng-template>
          <bmb-item label="Correo" [isButton]="true" (action)="action($event)" />
        </ng-template>
        <ng-template>
          <bmb-item label="Phone" [isButton]="true" (action)="action($event)" />
        </ng-template>
      </bmb-action-menu>
  `,
  }),
};

export const ButtonWithIcon: Story = {
  render: (args: any) => ({
    props: {
      ...args,
      action: () => {
        alert('In this method you can define the action to be executed');
      },
    },
    template: `
      <bmb-action-menu ${attributes(args)}>
        <ng-template>
          <bmb-item icon="mail" label="Correo" [isButton]="true" (action)="action($event)" />
        </ng-template>
        <ng-template>
          <bmb-item icon="smartphone" label="Phone" [isButton]="true" (action)="action($event)" />
        </ng-template>
      </bmb-action-menu>
  `,
  }),
};
