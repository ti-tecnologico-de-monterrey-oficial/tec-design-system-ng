import type { Meta, StoryObj } from '@storybook/angular';
import { BmbMobileTemplatesComponent } from './bmb-mobile-templates.component';
import {
  getBasicExampleBlock,
  getGeneralDescription,
  getOnEvent,
  IBmbOnEvent,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  getOnClickParam,
} from '../../utils/doc/parameterDescriptions';

const onLeftIconEvent: IBmbOnEvent = getOnEvent(
    'left icon',
    'onHeaderLeftClick',
    'unknown',
  ),
  onRightIconEvent: IBmbOnEvent = getOnEvent(
    'right icon',
    'onHeaderRightClick',
    'unknown',
  );

export default {
  title: 'Templates/Mobile',
  component: BmbMobileTemplatesComponent,
  parameters: {
    docs: {
      controls: {
        exclude: [
          'height',
          'mainContent',
          'getSectionClass',
          'handleAction',
          'handleClose',
          'handleFooterEvent',
          'handleLeftClick',
          'handleLoginRequest',
          'handleMenuEvent',
          'handleRightClick',
          'ngOnInit',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`\`mobile-templates\` is the structure that visually organizes the elements of a mobile screen to ensure a coherent and functional experience. `, { generalDocLink: 'https://bamboo.tec.mx/latest/templates/mobile/descripcion-general-dUQzbIvB' })}
${getBasicExampleBlock(
  'BmbMobileTemplatesComponent',
  '',
  `${onLeftIconEvent.handleExample}
  ${onRightIconEvent.handleExample}`,
)}
        `,
      },
    },
  },
  argTypes: {
    template: {
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
        'Sets template layout, depending of the template, it required to send the #bmbTemplateMain template.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'single-header' },
        type: { summary: 'IBmbMobileTemplateName' },
      },
    },
    footerActions: {
      control: {
        type: 'object',
      },
      description:
        'Sets the buttons for templates: `card-header-with-footer` and `header-with-footer`',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbButtonAction[]' },
      },
    },
    buttonList: {
      control: {
        type: 'object',
      },
      description:
        'Sets the buttons for templates: `header-with-button-list` and `header-with-card-list`',
      table: {
        category: 'Properties',
        defaultValue: { summary: '[]' },
        type: { summary: 'IBmbMobileTemplateButton[]' },
      },
    },
    componentTitle: {
      control: {
        type: 'text',
      },
      description: 'Set the title for the header.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    headerIconLeft: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
      description:
        'Sets the left icon for the header, only available for templates: `single-header`, `header-with-footer`, `header-with-button-list`, and `header-with-card-list`',
    },
    headerIconRight: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
      description:
        'Sets the right icon for the header, only available for templates: `single-header`, `header-with-footer`, `header-with-button-list`, and `header-with-card-list`',
    },
    onHeaderLeftClick: getOnClickParam(onLeftIconEvent),
    onHeaderRightClick: getOnClickParam(onRightIconEvent),
    loginHandleRequest: {
      control: false,
      description:
        'This event is only available for `login` template, handle all events from Login onboarding component.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    calendarTimezone: {
      control: { type: 'text' },
      description:
        'Sets the remote timezone for the events (example: "America/Mexico_City")',
      table: {
        category: 'Properties',
        defaultValue: {
          summary: 'current time zone',
          detail: 'Intl.DateTimeFormat().resolvedOptions().timeZone',
        },
        type: { summary: 'string' },
      },
    },
    clientTimezone: {
      control: { type: 'text' },
      description:
        'Sets the client timezone for the events (example: "America/Mexico_City")',
      table: {
        category: 'Properties',
        defaultValue: {
          summary: 'current time zone',
          detail: 'Intl.DateTimeFormat().resolvedOptions().timeZone',
        },
        type: { summary: 'string' },
      },
    },
    lang: DBmbGenericParamDesc.lang,
    currentDate: {
      control: { type: 'text' },
      description:
        'Sets the target date to show in the calendar (example: "2024-04-23T15:00:00.715Z")',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    onDateChange: {
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
      control: {
        type: 'text',
      },
      description: 'Sets the header subtitle/url',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    externalLinkOnClose: {
      control: false,
      description: 'Close button event.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    externalLinkMenuEvent: {
      ...DBmbGenericParamDesc.link,
      description: DBmbGenericParamDesc.link.description.concat(
        '<br/><br/>Used for the menu option that was clicked. Options: link, openNew, info',
      ),
    },
    externalLinkFooterEvent: {
      control: false,
      description:
        'Used for the icon option that was clicked. Options: back, forward, share, reload',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    title: {
      control: null,
      description:
        'Please use `componentTitle` instead of `title` to set the component title.',
      table: {
        category: 'Deprecated',
        type: { summary: 'string' },
        defaultValue: '',
      },
    },
  },
  args: {
    template: 'single-header',
    componentTitle: 'Title',
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
      [componentTitle]="title"
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
