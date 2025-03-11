import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbActionMenuComponent } from './bmb-action-menu.component';
import { attributes } from '../../utils/utils';
import { BmbIconItemComponent } from '../bmb-icon-item/bmb-icon-item.component';

export default {
  title: 'Micro Componentes/Action Menu',
  component: BmbActionMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbIconItemComponent],
    }),
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
  imports: [ BmbActionMenuComponent ],
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
        category: 'Properties',
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
    isAList: true,
  },
} as Meta<typeof BmbActionMenuComponent>;

type Story = StoryObj<BmbActionMenuComponent>;

export const ListExample: Story = {
  render: (args) => ({
    props: args,
    template: `
    <!-- Instruction to users: This html is used for internal Storybook logic and should not be copied -->
    <div style="height: ${args['isAList'] ? '420' : '200'}px;">
      <!-- Example of how you can use this component. -->
      <bmb-action-menu ${attributes(args)}>
        ${
          args['isAList']
            ? `
            <ng-template>
              <!-- Example of content. The content can be a bamboo component or html. -->
              <button class="action-btn">Option 1</button>
            </ng-template>
            <ng-template>
               <!-- Example of content. The content can be a bamboo component or html. -->
              <a href="#">Option 2</a>
            </ng-template>
            <ng-template>
               <!-- Example of content. The content can be a bamboo component or html. -->
              <div>Only Text</div>
            </ng-template>
            <ng-template>
               <!-- Example of content. The content can be a bamboo component or html. -->
              <bmb-icon-item
                icon="calendar_month"
                [iconSize]="24"
                label="Semestre"
                value="AGO-DIC 24"
              />
            </ng-template>
          `
            : `
            <!-- Example of content. The content can be a bamboo component or html. -->
            <button class="action-btn">Option 1</button>
              <a href="#">Option 2</a>
            <div>Only Text</div>
          `
        }
      </bmb-action-menu>
    </div>
  `,
  }),
};

export const NotListExample = {
  render: (args: any) => ({
    props: args,
    template: `
    <!-- Instruction to users: This html is used for internal Storybook logic and should not be copied -->
    <div style="height: 200px;">
      <!-- Example of how you can use this component. -->
      <bmb-action-menu ${attributes({ ...args, isAList: false })}>
        <!-- Example of content. The content can be a bamboo component or html. -->
        <bmb-icon-item
          icon="calendar_month"
          [iconSize]="24"
          label="Semestre"
          value="AGO-DIC 24"
        />
        <a href="#">Option 2</a>
      </bmb-action-menu>
    </div>
    `,
  }),
};
