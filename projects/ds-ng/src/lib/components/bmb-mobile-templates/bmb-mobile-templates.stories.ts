import type { Meta, StoryObj } from '@storybook/angular';
import { BmbMobileTemplatesComponent } from './bmb-mobile-templates.component';

export default {
  title: 'Macro Componentes/Mobile Templates',
  component: BmbMobileTemplatesComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbLogoComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbLogoComponent ],
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
    template: {
      name: 'Template',
      control: {
        type: 'select',
      },
      options: [
        'single-header',
        'header-with-footer',
        'card-header-with-footer',
        'header-with-button-list',
        'header-with-card-list',
        'login',
        'calendar',
        'external-link',
      ],
      description:
        'Set template layout, depending of the template, it required to send the #bmbTemplateMain template.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbMobileTemplateName' },
      },
    },
    footerActions: {
      name: 'Footer actions',
      control: {
        type: 'object',
      },
      description:
        'Set the buttons for templates: `card-header-with-footer` and `header-with-footer`',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbButtonAction[]' },
      },
    },
    buttonList: {
      name: 'Button list',
      control: {
        type: 'object',
      },
      description:
        'Set the buttons for templates: `header-with-button-list` and `header-with-card-list`',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbMobileTemplateButton[]' },
      },
    },
    title: {
      name: 'Title',
      control: {
        type: 'text',
      },
      description: 'Set the title for the header.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    headerIconLeft: {
      name: 'Header icon left',
      control: {
        type: 'text',
      },
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
      description:
        'The left icon for the header, only available for templates: `single-header`, `header-with-footer`, `header-with-button-list`, and `header-with-card-list`',
    },
    headerIconRight: {
      name: 'Header icon right',
      control: {
        type: 'text',
      },
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
      description:
        'The right icon for the header, only available for templates: `single-header`, `header-with-footer`, `header-with-button-list`, and `header-with-card-list`',
    },
    onHeaderLeftClick: {
      name: 'Header left click',
      control: false,
      description:
        'Function that is executed when the header left icon is pressed.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    onHeaderRightClick: {
      name: 'Header right click',
      control: false,
      description:
        'Function that is executed when the header right icon is pressed.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    loginHandleRequest: {
      name: 'Login handle request',
      control: false,
      description:
        'This event is only available for `login` template, handle all events from Login onboarding component.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    calendarTimezone: {
      name: 'Calendar timezone',
      control: { type: 'text' },
      description:
        'Set the remote timezone for the events (example: "America/Mexico_City")',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    clientTimezone: {
      name: 'Client timezone',
      control: { type: 'text' },
      description:
        'Set the client timezone for the events (example: "America/Mexico_City")',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    lang: {
      name: 'Language',
      control: {
        type: 'text',
      },
      description: 'Set the default language.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'es' },
      },
    },
    currentDate: {
      name: 'Current date',
      control: { type: 'text' },
      description:
        'Set the target date to show in the calendar (example: "2024-04-23T15:00:00.715Z")',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    onDateChange: {
      name: 'On date change',
      control: {
        type: '',
      },
      description: 'This handler can be used for pull new calendar events.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    externalLinkSubtitle: {
      name: 'subtitle',
      control: {
        type: 'text',
      },
      description: 'Header subtitle/url',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    externalLinkOnClose: {
      name: 'Close event',
      control: false,
      description: 'Close button event.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    externalLinkMenuEvent: {
      name: 'Menu events',
      control: false,
      description:
        'Used for the menu option that was clicked. Options: link, openNew, info',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    externalLinkFooterEvent: {
      name: 'Footer events',
      control: false,
      description:
        'Used for the icon option that was clicked. Options: back, forward, share, reload',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
  },
  args: {
    template: 'single-header',
    title: 'Title',
    buttonList: [
      {
        title: 'Title 1',
        target: '_blank',
        link: 'google.com',
        subtitle: 'Subtitle',
        iconLeft: 'home',
      },
      {
        title: 'Title 2',
        link: 'google.com',
        iconLeft: 'home',
      },
    ],
    footerActions: [
      {
        title: 'Button A',
        action: () => {
          alert('Action 1');
        },
        icon: 'home',
      },
      {
        title: 'Button B',
        action: () => {
          alert('Action 1');
        },
        type: 'primary',
      },
    ],
    headerIconLeft: 'home',
    headerIconRight: 'close',
    calendarTimezone: 'America/Mexico_City',
    clientTimezone: 'America/Mexico_City',
    lang: 'es',
    currentDate: '2024-04-23T15:00:00.715Z',
    externalLinkSubtitle: 'https://www.CONECTA.tec.mx',
    externalLinkMenuEvent: (event: unknown) => {
      alert('Selection: ' + event);
    },
    onHeaderLeftClick: () => {
      alert('header left icon');
    },
    onHeaderRightClick: () => {
      alert('header right icon');
    },
    loginHandleRequest: () => {
      alert('Login event');
    },
    onDateChange: () => {
      alert('Date change');
    },
    externalLinkOnClose: (event: unknown) => {
      alert('Selection: close');
    },
    externalLinkFooterEvent: (event: unknown) => {
      alert('Selection: ' + event);
    },
  },
} as Meta<typeof BmbMobileTemplatesComponent>;

type Story = StoryObj<BmbMobileTemplatesComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
    <bmb-mobile-templates
      [template]="template"
      [title]="title"
      [buttonList]="buttonList"
      [footerActions]="footerActions"
      [headerIconLeft]="headerIconLeft"
      [headerIconRight]="headerIconRight"
      [calendarTimezone]="calendarTimezone"
      [clientTimezone]="clientTimezone"
      [lang]="lang"
      [currentDate]="currentDate"
      [externalLinkSubtitle]="externalLinkSubtitle"
      (onHeaderLeftClick)="onHeaderLeftClick($event)"
      (onHeaderRightClick)="onHeaderRightClick($event)"
      (loginHandleRequest)="loginHandleRequest($event)"
      (onDateChange)="onDateChange($event)"
      (externalLinkOnClose)="externalLinkOnClose($event)"
      (externalLinkMenuEvent)="externalLinkMenuEvent($event)"
      (externalLinkFooterEvent)="externalLinkFooterEvent($event)"
    >
      <ng-template #bmbTemplateMain>
        <p>
          Nam aliquam massa accumsan suscipit posuere. Maecenas in ex malesuada,
          consequat lacus id, lobortis est. Sed elementum orci congue, viverra metus
          at, interdum ex. Nullam sed est sollicitudin, iaculis nisi nec, sodales
          ex. Morbi aliquam tellus ut quam sollicitudin, a elementum tortor
          vulputate. Cras efficitur sapien sed ipsum aliquam gravida. Fusce accumsan
          eget nisl vitae dignissim. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia curae; Maecenas blandit tempus sem eget
          bibendum. Integer a arcu vestibulum, fringilla dui vitae, aliquet arcu.
          Maecenas elementum bibendum urna quis porta. In hac habitasse platea
          dictumst. Maecenas fringilla quam at orci fermentum, in mattis ligula
          viverra. Maecenas vel sagittis tellus, ac suscipit sapien.
        </p>
        <p>
          Nulla finibus orci justo, in ultrices nisl ullamcorper quis. Etiam at
          purus ac neque auctor pellentesque non eu ante. Suspendisse pharetra augue
          id mauris facilisis, non rhoncus lacus tempor. In at auctor turpis. Donec
          egestas fermentum auctor. Integer nec libero nec justo porta hendrerit. In
          tempus eleifend urna, nec iaculis magna lobortis id. Duis venenatis a
          mauris at condimentum. Morbi interdum dolor dui, efficitur molestie purus
          fringilla quis. Aliquam in nulla at urna consectetur posuere. Pellentesque
          nec dolor libero. Phasellus dictum, leo sed ornare venenatis, elit turpis
          cursus tellus, nec maximus erat justo ac risus. Sed tempus sagittis neque,
          eget gravida eros semper ac. Proin ac tristique leo, ut suscipit turpis.
          Ut eget metus at purus tristique dictum id et ex.
        </p>
        <p>
          Donec porttitor ut enim eu euismod. Maecenas leo nulla, lacinia a risus
          nec, porta tristique eros. Curabitur dignissim dolor non justo egestas, in
          maximus dolor venenatis. Aliquam ornare maximus augue ut aliquam. Maecenas
          vitae pharetra quam. Maecenas imperdiet, metus et porta ullamcorper, nisl
          quam bibendum quam, et vulputate sapien diam sit amet felis. Integer
          tempus blandit vehicula. Fusce tincidunt magna id ullamcorper tempus.
          Etiam quis tempor ex. Nunc nec nunc quis libero consectetur pellentesque.
        </p>
        <p>
          Nam eu tempor turpis, non consequat arcu. Sed nec pharetra diam, sodales
          malesuada lorem. Morbi fringilla ac massa quis placerat. Nunc sagittis,
          ligula vel malesuada ullamcorper, dui diam luctus neque, non imperdiet
          libero sapien convallis ligula. Nullam eget feugiat erat, et vestibulum
          ante. Vivamus sollicitudin metus sit amet malesuada ultricies. Aliquam sed
          leo in justo mattis ullamcorper. Pellentesque commodo mi at lacus interdum
          bibendum. Aliquam sollicitudin scelerisque nunc a sodales. Suspendisse
          ornare mauris ex. Curabitur nulla arcu, consectetur ut elementum nec,
          imperdiet vel augue. Nunc at luctus leo, eu porta metus.
        </p>
        <p>
          Nam eu tempor turpis, non consequat arcu. Sed nec pharetra diam, sodales
          malesuada lorem. Morbi fringilla ac massa quis placerat. Nunc sagittis,
          ligula vel malesuada ullamcorper, dui diam luctus neque, non imperdiet
          libero sapien convallis ligula. Nullam eget feugiat erat, et vestibulum
          ante. Vivamus sollicitudin metus sit amet malesuada ultricies. Aliquam sed
          leo in justo mattis ullamcorper. Pellentesque commodo mi at lacus interdum
          bibendum. Aliquam sollicitudin scelerisque nunc a sodales. Suspendisse
          ornare mauris ex. Curabitur nulla arcu, consectetur ut elementum nec,
          imperdiet vel augue. Nunc at luctus leo, eu porta metus.
        </p>
      </ng-template>
    </bmb-mobile-templates>
    `,
  }),
};
