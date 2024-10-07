import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbBreadcrumbComponent } from './bmb-breadcrumb.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

export default {
  title: 'Micro Componentes/Breadcrumb',
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
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbBreadcrumbComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbBreadcrumbComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    dataTopBar: {
      name: 'Data Top Bar',
      control: { type: 'object' },
      description:
        'An array of breadcrumb data for the Top Bar, each containing a label and a link. The first item contains text and internal (router) link, and clicking it navigates to the designated home page. The second item displays the name of the global page and has no link.',
      table: {
        category: 'Properties',
        type: { summary: '{ text: string, link?: string}[]' },
      },
    },
    dataLocalNav: {
      name: 'Data Local Navigation',
      control: { type: 'object' },
      description:
        'An array of breadcrumb data for Local Navigation, each containing a text and an internal (router) link.',
      table: {
        category: 'Properties',
        type: { summary: '{ text: string, link?: string, }[]' },
      },
    },
    isTopBar: {
      name: 'Is Top Bar',
      control: { type: 'boolean' },
      description:
        'Toggles between Top Bar breadcrumb style and Local Navigation style.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    isInactive: {
      name: 'Inactive Local Navigation',
      control: { type: 'boolean' },
      description: 'Indicates whether the local navigation is inactive or not.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
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
