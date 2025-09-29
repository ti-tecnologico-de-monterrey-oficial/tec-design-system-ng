import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbNavigationBarComponent } from './bmb-navigation-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  DBmbLayoutParamDesc,
} from '../../utils/doc/parameterDescriptions';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';

export default {
  title: 'Components/Menus/Navigation bar',
  component: BmbNavigationBarComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    }),
  ],
  parameters: {
    docs: {
      controls: { exclude: ['handleClick'] },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'navigation-bar' })} for quick access to key navigation functions and common actions.`, 'https://bamboo.tec.mx/latest/componentes/navigation-bar/descripcion-general-vOGTleaR')}
${getBasicExampleBlock('BmbNavigationBarComponent')}
        `,
      },
    },
  },
  argTypes: {
    actionHeaders: DBmbGenericParamDesc.actionHeaders,
    iconSize: DBmbIconParamDesc.iconSize,
    gapSize: DBmbLayoutParamDesc.gapSize,
    justify: DBmbLayoutParamDesc.justify,
    alignItems: DBmbLayoutParamDesc.alignItems,
  },
  args: {
    actionHeaders: [
      {
        icon: 'home',
        link: 'https://www.example.com/',
      },
      {
        icon: 'share',
        action: () => {
          console.log('share');
        },
      },
      {
        icon: 'inventory_2',
        link: 'https://www.example.com/',
        target: '_blank',
      },
      {
        icon: 'send',
        action: () => {
          console.log('send');
        },
      },
    ],
    iconSize: 24,
    gapSize: 'm',
    justify: 'spaceBetween',
    alignItems: 'center',
  },
} as Meta<typeof BmbNavigationBarComponent>;

type Story = StoryObj<BmbNavigationBarComponent>;

export const Default: Story = {};
