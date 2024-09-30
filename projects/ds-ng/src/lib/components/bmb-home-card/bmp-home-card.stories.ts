import { Meta, StoryObj } from '@storybook/angular';
import { BmbHomeCardComponent } from './bmb-home-card.component';
import { Component } from '@angular/core';
import { IBmbDataTopBar } from '../bmb-breadcrumb/bmb-breadcrumb.component';

@Component({
  standalone: true,
  imports: [BmbHomeCardComponent],
  selector: 'storybook-toast-wrapper',
  template: `
    <div style="max-width: 300px; margin: 0 auto">
      <bmb-home-card
        leftIcon="chevron_left"
        icon="exposure"
        bgIconAppearance="green-light"
        title="Title"
        subtitle="subtitle"
        [dataLocalNav]="dataLocalNav"
        [isMobile]="false"
      >
        <p>hello world</p>
      </bmb-home-card>
    </div>
  `,
})
class StorybookToastWrapperComponent {
  dataLocalNav: IBmbDataTopBar[] = [
    { text: 'Breadcrumb 1', link: '/' },
    { text: 'Breadcrumb 2', link: '/emprendedor' },
    { text: 'Breadcrumb 3', link: '/emprendedor/vivencia' },
    { text: 'Breadcrumb 4', link: '/emprendedor/vivencia' },
    { text: 'Breadcrumb 5', link: '/emprendedor/vivencia' },
    { text: 'Breadcrumb 6', link: '/emprendedor/vivencia' },
  ];
}

export default {
  title: 'Micro Componentes/Home Card',
  component: BmbHomeCardComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbHomeCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbHomeCardComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class AppComponent {
  dataLocalNav: IBmbDataTopBar[] = [
      { text: 'Breadcrumb 1', link: '/' },
      { text: 'Breadcrumb 2', link: '/emprendedor' },
      { text: 'Breadcrumb 3', link: '/emprendedor/vivencia' },
      { text: 'Breadcrumb 4', link: '/emprendedor/vivencia' },
      { text: 'Breadcrumb 5', link: '/emprendedor/vivencia' },
      { text: 'Breadcrumb 6', link: '/emprendedor/vivencia' },
    ]
...
\`\`\`


Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    leftIcon: {
      name: 'Left icon',
      control: { type: 'text' },
      description: 'Sets left header icon.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description: 'Sets header icon.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    bgIconAppearance: {
      name: 'Icon background color',
      control: { type: 'text' },
      description: 'Sets icon background color.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbColor' },
      },
    },
    title: {
      name: 'Title',
      control: { type: 'text' },
      description: 'Sets card title.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    subtitle: {
      name: 'Subtitle',
      control: { type: 'text' },
      description: 'Sets card subtitle',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    dataLocalNav: {
      name: 'Data Local Navigation',
      control: { type: 'object' },
      description: 'Array of breadcrumb data for Local Navigation.',
      table: {
        category: 'Properties',
        type: {
          summary: 'IBmbDataTopBar[], [{ text: string, link?: string, }]',
        },
      },
    },
    actionHeaders: {
      name: 'Action header',
      control: { type: 'boolean' },
      description:
        'Sets an array of IBmbActionHeader objects, default value is an empty array.',
      table: {
        category: 'Properties',
        type: {
          summary:
            'IBmbActionHeader[], {icon: string; iconActiveToggle?: string; isToggleActive?: boolean; action: () => void;}',
        },
      },
    },
    isMobile: {
      name: 'Is mobile',
      control: { type: 'boolean' },
      description: 'Sets mobile state.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    onClose: {
      name: 'On close',
      control: null,
      description: 'Emmit the close event.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onBack: {
      name: 'On back',
      control: null,
      description: 'Emmit the back event.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
  },
  args: {
    leftIcon: 'chevron_left',
    icon: 'account_balance_wallet',
    bgIconAppearance: 'green-light',
    title: 'Title',
    subtitle: 'Subtitle',
    dataLocalNav: [],
    actionHeaders: [],
    isMobile: false,
  },
} as Meta<typeof BmbHomeCardComponent>;

type Story = StoryObj<BmbHomeCardComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
    <bmb-home-card
        [leftIcon]="leftIcon"
        [icon]="icon"
        [bgIconAppearance]="bgIconAppearance"
        [title]="title"
        [subtitle]="subtitle"
        [dataLocalNav]="dataLocalNav"
        [actionHeaders]="actionHeaders"
        [isMobile]="isMobile"
      >
        <p>hello world</p>
      </bmb-home-card>
    `,
  }),
};
