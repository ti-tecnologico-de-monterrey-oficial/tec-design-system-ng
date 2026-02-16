import { Meta, StoryObj } from '@storybook/angular';
import { BmbHomeCardHeaderComponent } from './bmb-home-card-header.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../../utils/doc/utils';

export default {
  title: 'Internals/Home card header',
  component: BmbHomeCardHeaderComponent,
  parameters: {
    docs: {
      controls: {
        exclude: ['handleBack', 'handleClose', 'handleExpand'],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'home-card-header' })} to display a header with customizable title, subtitle, icons, navigation data, and action headers.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/home-card/descripcion-general-SzSShX4e' })}
${getBasicExampleBlock(
  'BmbHomeCardHeaderComponent',
  '',
  `//This block of code is only necessary for cases where local navigation is required.
    dataLocalNav: IBmbDataTopBar[] = [
      { text: 'Breadcrumb 1', link: '/' },
      { text: 'Breadcrumb 2', link: '/emprendedor' },
      { text: 'Breadcrumb 3', link: '/emprendedor/vivencia' },
      { text: 'Breadcrumb 4', link: '/emprendedor/vivencia' },
      { text: 'Breadcrumb 5', link: '/emprendedor/vivencia' },
      { text: 'Breadcrumb 6', link: '/emprendedor/vivencia' },
    ]`,
)}
        `,
      },
    },
  },
  argTypes: {},
  args: {},
} as Meta<typeof BmbHomeCardHeaderComponent>;

type Story = StoryObj<BmbHomeCardHeaderComponent>;

export const Default: Story = {};
