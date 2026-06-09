import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
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
  getOnEventParam,
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
      controls: { exclude: ['closeDropdown', 'openDropdown', 'contentRef'] },
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
    icon: DBmbDropdownMenuParamDesc.icon,
    clickedItem: getOnEventParam(
      {
        name: 'clickedItem',   
        handleExample: '(item) => console.log("Clicked item:", item)',
        propertyValue: 'EventEmitter<IDropdownItem>',
        type: 'EventEmitter',
        event_type: 'IDropdownItem',
      },
      'IDropdownItem',
    ),
  },
  args: {
    icon: 'more_vert',
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
