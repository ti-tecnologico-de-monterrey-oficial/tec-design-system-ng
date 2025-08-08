import {
  Meta,
  StoryObj,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { BmbDropdownMenuComponent } from './bmb-dropdown-menu.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  getBasicExampleBlock,
  getEmptyStateMessage,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
} from '../../utils/doc/utils';
import {
  DBmbDropdownMenuParamDesc,
  getPropertyParamDesc,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Menus/Dropdown menu',
  component: BmbDropdownMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              url: [],
            },
          },
        },
      ],
    }),
    componentWrapperDecorator((story: string) => {
      return `
        <div style="height: 15rem">
          ${story}
        </div>`;
    }),
  ],
  parameters: {
    docs: {
      controls: { exclude: ['closeDropdown', 'openDropdown'] },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('dropdown-menu')} navigation through the options displayed in the menu listing.`, 'https://bamboo.tec.mx/latest/componentes/dropdown-menu/descripcion-general-kEoPUKDr')}
${getSpecialSpecifications(getEmptyStateMessage())}
${getBasicExampleBlock('BmbDropdownMenuComponent', '', '', '', 'ActivatedRoute', '@angular/router')}
        `,
      },
    },
  },
  argTypes: {
    items: DBmbDropdownMenuParamDesc.items,
    isOpen: getPropertyParamDesc(
      'flag to display the listing',
      'boolean',
      false,
    ),
  },
  args: {
    items: [
      {
        icon: 'link',
        text: 'External Link External Link External Link',
        url: 'https://example.com',
        target: '_blank',
      },
      {
        icon: 'link',
        text: 'internal Link',
        url: '/vivencia',
        target: '_self',
      },
      {
        icon: 'delete',
        text: 'Delete',
        action: () => console.log('Delete clicked!'),
      },
      {
        icon: 'settings',
        text: 'Settings',
        action: () => console.log('Settings clicked'),
      },
    ],
  },
} as Meta<typeof BmbDropdownMenuComponent>;

type Story = StoryObj<BmbDropdownMenuComponent>;

export const Default: Story = {};
