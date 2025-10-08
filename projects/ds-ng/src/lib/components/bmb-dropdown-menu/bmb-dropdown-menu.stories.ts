import {
  Meta,
  StoryObj,
  applicationConfig,
  moduleMetadata,
} from '@storybook/angular';
import { BmbDropdownMenuComponent } from './bmb-dropdown-menu.component';
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
import { provideHttpClient } from '@angular/common/http';

export default {
  title: 'Components/Menus/Dropdown menu',
  component: BmbDropdownMenuComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null,
              },
              queryParamMap: {
                get: () => null,
              },
            },
          },
        },
      ],
    }),
  ],
  parameters: {
    docs: {
      controls: { exclude: ['closeDropdown', 'openDropdown'] },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'dropdown-menu' })} navigation through the options displayed in the menu listing.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/dropdown-menu/descripcion-general-kEoPUKDr' })}
${getSpecialSpecifications(getEmptyStateMessage(), { showAdditionalBlockquote: true })}
${getBasicExampleBlock('BmbDropdownMenuComponent', '', '', false, '', 'ActivatedRoute', '@angular/router')}
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
