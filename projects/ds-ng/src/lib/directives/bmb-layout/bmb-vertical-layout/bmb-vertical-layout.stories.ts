import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbVerticalLayoutDirective } from './bmb-vertical-layout.directive';
import {
  attributes,
  getAuxiliaryDescription,
  getBasicExampleBlock,
  getGeneralDescription,
} from '../../../utils/doc/utils';
import {
  BmbIconStatusComponent,
  BmbInnerHeaderComponent,
  BmbVerticalLayoutItemDirective,
} from '../../../../public-api';
import { BmbProgressBarComponent } from '../../../components/bmb-progress-bar/bmb-progress-bar.component';
import { BmbChevronTitleSelectorComponent } from '../../../components/bmb-chevron-title-selector/bmb-chevron-title-selector.component';

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
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(
  `The \`Vertical layout container\` is a vertical structure that allows for customization of its content, allowing for the integration of different types of components, making it highly flexible and adaptable to diverse needs.<br/><br/>
${getAuxiliaryDescription('Vertical layout container', 'Vertical layout container item')}`,
  'https://bamboo.tec.mx/latest/foundations/vertical-layout-container/descripcion-general-Crf8ymYZ',
)}
${getBasicExampleBlock('BmbVerticalLayoutDirective, BmbVerticalLayoutItemDirective')}
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
    test_text: {
      name: 'Test text',
      control: 'text',
      description: '',
      table: {
        category: 'Example',
        type: { summary: 'string' },
      },
    },
  },
  args: { gapSize: 'm', justify: 'start', alignItems: 'start' },
} as Meta<typeof BmbVerticalLayoutDirective>;

type Story = StoryObj<BmbVerticalLayoutDirective>;

export const Default: Story = {
  render: (args) => ({
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
  }),
};

// export const Item: Story = {
//   name: 'Vertical layout item',
//   args: {
//     rowGrow: 1 as unknown as InputSignal<number>,
//     test_text: 'Estamos activando tu credencial digital en este equipo',
//   },
//   render: (args) => ({
//     template: `
//   <div bmbVerticalLayoutItem ${attributes(args)}>
//       <bmb-icon-status [icon]="'id_card'" />
//       <p class="font-regular-9" style="text-align: center">
//         ${attributesText(args)}
//       </p>
//     </div>
//   `
//   }),
// };

// const customizable = (): StoryFn => (args) => ({
//   template: `
//   <div bmbVerticalLayoutItem ${attributes({
//     rowGrow: 1,
//   })}>
//     <bmb-icon-status [icon]="'id_card'" />
//     <p class="font-regular-9" style="text-align: center">
//       Estamos activando tu credencial digital en este equipo
//     </p>
//   </div>
//   `,
// });

// export const VerticalLayoutItem = customizable();
