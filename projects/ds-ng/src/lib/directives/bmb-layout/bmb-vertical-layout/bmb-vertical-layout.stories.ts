import { Meta, moduleMetadata, StoryFn, StoryObj } from '@storybook/angular';
import { BmbVerticalLayoutDirective } from './bmb-vertical-layout.directive';
import { attributes } from '../../../utils/doc/utils';
import {
  BmbIconStatusComponent,
  BmbInnerHeaderComponent,
  BmbVerticalLayoutItemDirective,
  BmbCardComponent,
  BmbCardContentComponent,
  BmbProgressBarComponent,
  BmbChevronTitleSelectorComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
} from '../../../../public-api';

export default {
  title: 'Foundations/Layouts/Vertical layout container',
  tags: ['!autodocs'],
  component: BmbVerticalLayoutDirective,
  decorators: [
    moduleMetadata({
      imports: [
        BmbInnerHeaderComponent,
        BmbChevronTitleSelectorComponent,
        BmbIconStatusComponent,
        BmbVerticalLayoutDirective,
        BmbVerticalLayoutItemDirective,
        BmbProgressBarComponent,
        BmbCardComponent,
        BmbCardContentComponent,
        BmbLayoutDirective,
        BmbLayoutItemDirective,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbVerticalLayoutDirective} from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbVerticalLayoutDirective ],
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
    gapSize: {
      description: `
Sets the size of the space between elements.

  SizeNames =
    | 'xs'
    | 's'
    | 'm'
    | 'l'
    | 'xl'
    | 'none'
    | 'auto'
    `,
      control: { type: 'select' },
      options: ['xs', 's', 'm', 'l', 'xl', 'none', 'auto'],
      table: {
        type: { summary: 'SizeNames' },
        category: 'Properties',
        defaultValue: { summary: 'm' },
      },
    },
    justify: {
      description: `
Sets the justify content.

  IJustifyOptions =
    | 'center'
    | 'end'
    | 'start'
    | 'stretch'
    | 'spaceAround'
    | 'spaceBetween'
    | 'spaceEvenly'
      `,
      control: { type: 'select' },
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
        type: { summary: 'IJustifyOptions' },
        category: 'Properties',
        defaultValue: { summary: 'start' },
      },
    },
    alignItems: {
      description: `
Set the align items.

    IAlignItemsOptions =
      | 'center'
      | 'end'
      | 'start'
      | 'stretch'
      `,
      control: { type: 'select' },
      options: ['center', 'end', 'start', 'stretch'],
      table: {
        type: { summary: 'IAlignItemsOptions' },
        category: 'Properties',
        defaultValue: { summary: 'start' },
      },
    },
    layoutHeight: {
      name: 'Layout height',
      control: 'text',
      description: 'Sets the height of the layout container.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '100%' },
        type: { summary: 'string' },
      },
    },
  },
  args: { gapSize: 'm', justify: 'start', alignItems: 'start', layoutHeight: '500px' },
} as Meta<typeof BmbVerticalLayoutDirective>;

type Story = StoryObj<BmbVerticalLayoutDirective>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    template: `
    <section bmbVerticalLayout ${attributes(args)}>
      <bmb-card bmbVerticalLayoutItem  margin="none" [rowGrow]="1">
        <bmb-card-content padding="m">
          <span>Column</span>
        </bmb-card-content>
      </bmb-card>
      <bmb-card bmbVerticalLayoutItem  margin="none" [rowGrow]="1">
        <bmb-card-content padding="m">
          <span>Column</span>
        </bmb-card-content>
      </bmb-card>
      <bmb-card bmbVerticalLayoutItem  margin="none" [rowGrow]="1">
        <bmb-card-content padding="m">
          <span>Column</span>
        </bmb-card-content>
      </bmb-card>
      <bmb-card bmbVerticalLayoutItem  margin="none" [rowGrow]="1">
        <bmb-card-content padding="m">
          <span>Column</span>
        </bmb-card-content>
      </bmb-card>
      <bmb-card bmbVerticalLayoutItem  margin="none" [rowGrow]="1">
        <bmb-card-content padding="m">
          <span>Column</span>
        </bmb-card-content>
      </bmb-card>
    </section>
  `,
  }),
};

export const WithHeader: Story = {
  name: 'Example with header',
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <section
        bmbVerticalLayout
        gapSize="m"
        justify="start"
        alignItems="start"
        layoutHeight="500px"
      >
        <bmb-inner-header bmbVerticalLayoutItem>
          <bmb-chevron-title-selector
            [title]="'Acceso a Campus'"
            [leadingIcon]="'chevron_left'"
            [trailingIcon]="'chevron_right'"
          />
        </bmb-inner-header>
        <div bmbVerticalLayoutItem bmbLayout [rowGrow]="1" justify="center" alignItems="center">
          <bmb-icon-status bmbLayoutItem [icon]="'id_card'"/>
          <p bmbLayoutItem class="font-regular-9" style="text-align: center" [colSm]="4">
            Estamos activando tu credencial digital en este equipo
          </p>
        </div>
        <div class="bmb_padding-m" bmbVerticalLayoutItem [colSm]="4">
          <bmb-progress-bar [totalCount]="100" [counter]="50" />
        </div>
      </section>
    `,
  }),
};
