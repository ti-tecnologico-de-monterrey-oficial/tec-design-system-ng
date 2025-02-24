import { Meta, StoryFn } from '@storybook/angular';
import { BmbActionMenuComponent } from './bmb-action-menu.component';
import { attributes, attributesText } from '../../utils/utils';

export default {
  title: 'Micro Componentes/Action Menu',
  component: BmbActionMenuComponent,
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

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `
    <div style="height: 200px;">
      <bmb-action-menu ${attributes(args)}>
        ${
          args['isAList']
            ? `
            <ng-template>
              <button class="action-btn">Option 1</button>
            </ng-template>
            <ng-template>
              <a href="#">Option 2</a>
            </ng-template>
            <ng-template>
              <div>Only Text</div>
            </ng-template>
          `
            : `
            <button class="action-btn">Option 1</button>
            <a href="#">Option 2</a>
            <div>Only Text</div>
          `
        }
      </bmb-action-menu>
    </div>
  `,
});

export const Default = customizable();
