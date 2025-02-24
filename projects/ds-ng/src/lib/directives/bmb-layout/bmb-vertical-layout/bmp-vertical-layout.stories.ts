import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { BmbVerticalLayoutDirective } from './bmb-vertical-layout.directive';
import { attributes } from '../../../utils/utils';
import {
  BmbIconStatusComponent,
  BmbInnerHeaderComponent,
  BmbVerticalLayoutItemDirective,
} from '../../../../public-api';
import { BmbProgressBarComponent } from 'ds-ng';
import { BmbChevronTitleSelectorComponent } from '../../../components/bmb-chevron-title-selector/bmb-chevron-title-selector.component';

export default {
  title: 'Micro Componentes/Vertical layout',
  component: BmbVerticalLayoutDirective,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        BmbInnerHeaderComponent,
        BmbChevronTitleSelectorComponent,
        BmbIconStatusComponent,
        BmbVerticalLayoutDirective,
        BmbVerticalLayoutItemDirective,
        BmbProgressBarComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbVerticalLayoutDirective } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

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
      name: 'Gap size',
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
    justify: {
      name: 'Justify content',
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
        type: { summary: 'IJustifyOptions' },
        category: 'Properties',
        defaultValue: { summary: 'start' },
      },
    },
    alignItems: {
      name: 'Align items',
      description: `
Set the align items.

    IAlignItemsOptions =
      | 'center'
      | 'end'
      | 'start'
      | 'stretch'
      `,
      control: {
        type: 'select',
      },
      options: ['center', 'end', 'start', 'stretch'],
      table: {
        type: { summary: 'IAlignItemsOptions' },
        category: 'Properties',
        defaultValue: { summary: 'start' },
      },
    },
  },
  args: {
    gapSize: 'm',
    justify: 'start',
    alignItems: 'start',
  },
} as Meta<typeof BmbVerticalLayoutDirective>;

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `
  <section
    bmbVerticalLayout
    ${attributes(args)}
  >
    <div bmbVerticalLayoutItem style="width: 100%">
      <bmb-inner-header>
        <bmb-chevron-title-selector
          [title]="'Acceso a Campus'"
          [leadingIcon]="'chevron_left'"
          [trailingIcon]="'chevron_right'"
        />
      </bmb-inner-header>
    </div>
    <div bmbVerticalLayoutItem [rowGrow]="1">
      <bmb-icon-status [icon]="'id_card'" />
      <p class="font-regular-9" style="text-align: center">
        Estamos activando tu credencial digital en este equipo
      </p>
    </div>
    <div class="bmb_padding-m" bmbVerticalLayoutItem style="width: 100%">
      <bmb-progress-bar [totalCount]="100" [counter]="50" />
    </div>
  </section>
  `,
});

export const Default = customizable();
