import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbBreadcrumbComponent } from './bmb-breadcrumb.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';
import { getDefaultValueControl } from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Menus/Breadcrumb',
  component: BmbBreadcrumbComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, CommonModule, BmbIconComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            events: of(new NavigationEnd(0, '/emprendedor/vivencia', '/')),
            navigate: () => Promise.resolve(true),
            navigateByUrl: () => Promise.resolve(true),
            createUrlTree: () => {},
            serializeUrl: () => '',
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
            paramMap: of({ get: () => '1' }),
          },
        },
      ],
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [
          'getDropdownItems',
          'getLinkClass',
          'getPenultimateLink',
          'toggleDropdown',
          'getClasses',
          'ngOnDestroy',
          'ngOnInit',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'breadcrumb' })} to navigate, providing a trail of clickable links leading to different pages.`, 'https://bamboo.tec.mx/latest/componentes/breadcrumb/descripcion-general-w8BsNT9r')}
${getBasicExampleBlock('BmbBreadcrumbComponent')}
        `,
      },
    },
  },
  argTypes: {
    dataTopBar: {
      control: { type: 'object' },
      description:
        'Sets the array of breadcrumb data for the top bar.<br/><br/>The first item contains text and internal (router) link, and clicking it navigates to the designated home page.<br/><br/>The second item displays the name of the global page and has no link.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '[]' },
        type: {
          summary: 'IBmbDataTopBar[]',
          detail: `IBmbDataTopBar {
  text: string;
  link?: string;
}`,
        },
      },
    },
    dataLocalNav: {
      control: { type: 'object' },
      description: 'Sets the array of breadcrumb data for local navigation.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '[]' },
        type: {
          summary: 'IBmbDataTopBar[]',
          detail: `IBmbDataTopBar {
  text: string;
  link?: string;
}`,
        },
      },
    },
    isTopBar: {
      control: { type: 'boolean' },
      description:
        'Sets the toggles between top bar breadcrumb style and local navigation style.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(false),
        type: { summary: 'boolean' },
      },
    },
    isInactive: {
      control: { type: 'boolean' },
      description:
        'Sets a flag to indicate whether the local navigation is inactive or not.<br/>Sets inactive when true.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(false),
        type: { summary: 'boolean' },
      },
    },
    dropdownOpen: {
      control: { type: 'boolean' },
      description:
        'Sets a flag to indicate whether the dropdown is open.<br/>The dropdown is open when true.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(false),
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    dataTopBar: [
      { text: 'Tec. Sign', link: '/' },
      { text: 'Borem ipsum dolor sit amet 1 Borem ipsum dolor sit amet 1' },
    ],
    dataLocalNav: [
      {
        text: 'Borem ipsum dolor sit amet 1',
        link: '/',
      },
      {
        text: 'Borem ipsum dolor sit amet 2',
        link: '/emprendedor',
      },
      {
        text: 'Borem ipsum dolor sit amet 3',
        link: '/emprendedor/vivencia',
      },
      {
        text: 'Borem ipsum dolor sit amet 4',
        link: '/emprendedor/vivencia',
      },
      {
        text: 'Borem ipsum dolor sit amet 5',
        link: '/emprendedor/vivencia',
      },
      {
        text: 'Borem ipsum dolor sit amet 6',
        link: '/emprendedor/vivencia',
      },
    ],
    isTopBar: false,
    isInactive: false,
  },
} as Meta<typeof BmbBreadcrumbComponent>;

type Story = StoryObj<BmbBreadcrumbComponent>;

export const Default: Story = {};

export const TopBar = {
  ...Default,
  args: {
    ...Default.args,
    isTopBar: true,
  },
};
