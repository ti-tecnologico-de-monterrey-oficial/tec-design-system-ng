import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { BmbNavigationBarComponent } from './bmb-navigation-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '@docs/utils/utils';
import type {
  BmbNavigationBarGapSize,
  IBmbActionHeader,
} from '../../_shared/types/components/navigation-bar';
import type {
  IAlignItemsOptions,
  IJustifyOptions,
} from '../../_shared/types/components/layout';

interface NavigationBarStoryArgs {
  actionHeaders: IBmbActionHeader[];
  iconSize?: number;
  gapSize: BmbNavigationBarGapSize;
  justify: IJustifyOptions;
  alignItems: IAlignItemsOptions;
  isMitecHeader: boolean;
}

const meta = {
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
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'navigation-bar' })} for quick access to key navigation functions and common actions.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/navigation-bar/descripcion-general-vOGTleaR' })}
${getBasicExampleBlock('BmbNavigationBarComponent')}
        `,
      },
    },
  },
  argTypes: {
    actionHeaders: {
      control: 'object',
      description: 'Navigation actions rendered by the component.',
      table: {
        type: { summary: 'IBmbActionHeader[]' },
        category: 'Properties',
        defaultValue: { summary: '[]' },
      },
    },
    iconSize: {
      control: { type: 'number', min: 0 },
      description: 'Overrides the size of every action icon.',
      table: {
        type: { summary: 'number | undefined' },
        category: 'Properties',
        defaultValue: { summary: 'undefined' },
      },
    },
    gapSize: {
      control: 'select',
      options: ['none', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'auto'],
      description: 'Spacing between navigation actions.',
      table: {
        type: { summary: 'BmbNavigationBarGapSize' },
        category: 'Properties',
        defaultValue: { summary: 'm' },
      },
    },
    justify: {
      control: 'select',
      options: [
        'start',
        'center',
        'end',
        'stretch',
        'spaceAround',
        'spaceBetween',
        'spaceEvenly',
      ],
      description: 'Horizontal distribution of navigation actions.',
      table: {
        type: { summary: 'IJustifyOptions' },
        category: 'Properties',
        defaultValue: { summary: 'spaceBetween' },
      },
    },
    alignItems: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Cross-axis alignment of navigation actions.',
      table: {
        type: { summary: 'IAlignItemsOptions' },
        category: 'Properties',
        defaultValue: { summary: 'start' },
      },
    },
    isMitecHeader: {
      control: 'boolean',
      description: 'Uses the MiTec header rendering variant.',
      table: {
        type: { summary: 'boolean' },
        category: 'Properties',
        defaultValue: { summary: 'false' },
      },
    },
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
    isMitecHeader: false,
  },
} satisfies Meta<NavigationBarStoryArgs>;

export default meta;

type Story = StoryObj<NavigationBarStoryArgs>;

export const Default: Story = {};

export const MiTecHeader: Story = {
  args: {
    isMitecHeader: true,
  },
};
