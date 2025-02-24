import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbThreeColsComponent } from './bmb-three-cols.component';
import { BmbTitleContentComponent } from '../bmb-title-content/bmb-title-content.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import { attributes } from '../../utils/utils';

export default {
  title: 'Internal/Three column content template',
  component: BmbThreeColsComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        BmbContainerComponent,
        BmbTitleContentComponent,
        BmbIconComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbThreeColsComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbThreeColsComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class AppComponent {

...
\`\`\`


Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    names: {
      name: 'Column names',
      control: {
        type: 'radio',
      },
      options: ['bmbLeftContent', 'bmbMainContent', 'bmbRightContent'],
      table: {
        category: 'templates',
        type: { summary: 'ng-template' },
      },
      description: `
    The column names are bmbLeftContent, bmbMainContent, and bmbRightContent.
    The html block must be inside the ng-template with the column name,
    example: <ng-template #columnName> <p> text </p> </ng-template>
      `,
    },
    gapSize: {
      name: 'Gap size',
      control: {
        type: 'select',
      },
      options: ['xs', 's', 'm', 'l', 'xl', 'none', 'auto'],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'm' },
      },
      description: 'Determines the size of the space between columns.',
    },
    justify: {
      name: 'Justify content',
      control: {
        type: 'select',
      },
      options: [
        'center',
        'end',
        'start',
        'stretch',
        'spaceAround',
        'spaceBetween',
        'spaceEvenly',
      ],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'spaceBetween' },
      },
      description: 'Set the justify content.',
    },
    alignItems: {
      name: 'Align items',
      control: {
        type: 'select',
      },
      options: ['center', 'end', 'start', 'stretch'],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'center' },
      },
      description: 'Set the align items.',
    },
    expandMainColumn: {
      name: 'Expand main column',
      control: { type: 'boolean' },
      description:
        'This property expands the main column to the maximum width.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    gapSize: 'm',
    justify: 'spaceBetween',
    alignItems: 'center',
    expandMainColumn: false,
  },
} as Meta<typeof BmbThreeColsComponent>;

type Story = StoryObj<BmbThreeColsComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
<bmb-container>
  <bmb-three-cols style="width: 100%" ${attributes(args)}>
    <ng-template #bmbLeftContent>
      <bmb-icon
        icon="home"
        styleIcon="material-symbols-outlined"
        [isFill]="true"
        fontWeight="400"
        [size]="24"
      />
    </ng-template>
    <ng-template #bmbMainContent>
      <bmb-title-content
        icon="account_balance_wallet"
        bgIconAppearance="green-light"
        title="Title"
        subtitle="Subtitle"
      />
    </ng-template>
    <ng-template #bmbRightContent>
      <bmb-icon
        icon="close"
        styleIcon="material-symbols-outlined"
        [isFill]="true"
        fontWeight="400"
        [size]="24"
      />
    </ng-template>
  </bmb-three-cols>
</bmb-container>
    `,
  }),
};
