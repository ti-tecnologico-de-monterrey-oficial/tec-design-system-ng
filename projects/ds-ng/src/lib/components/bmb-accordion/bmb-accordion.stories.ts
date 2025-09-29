import { BmbAccordionComponent } from './bmb-accordion.component';
import { Meta, StoryObj } from '@storybook/angular';
import {
  attributes,
  getArchitectureSection,
  getBasicExampleBlock,
  getEmptyStateMessage,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
} from '../../utils/doc/utils';

export default {
  title: 'Components/Containers/Accordion',
  tags: ['!autodocs'],
  component: BmbAccordionComponent,
  parameters: {
    docs: {
      controls: {
        exclude: [
          '_active',
          '_disabled',
          '_expanded',
          'isOpen',
          'getClassesAccordion',
          'getClassesContent',
          'getClassesHeader',
          'getIconToggle',
          'getStyles',
          'toggle',
          'ngOnChanges',
          'ngOnInit',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'accordion' })} to present content on vertically stacked, collapsible elements.`, 'https://bamboo.tec.mx/latest/componentes/accordion/descripcion-general-yABR8pUx')}
${getArchitectureSection(`<section class="bmb_accordion"
<!-- conditional class bmb_radius-{borderRadius} bmb_margin-{this.margin} -> >
  <!-- if Accordion is disabled -->
  <section class="bmb_accordion-overlay"></section>

  <header <!-- conditional class bmb_padding-{paddingHeader} bmb_accordion-header bmb_accordion-header-icon --> >
    <!-- Header content -->
    <div> {Header content} </div>

    <!-- if icon is defined -->
    < icon content >

    <!-- if hideToggle is false -->
    < icon content toggle >
  </header>

  <section class="bmb_accordion-content" <!-- conditional class bmb_padding-{paddingContent} bmb_accordion-content-open --> >
    <div> {content} </div>
  </section>
</section>`)}
${getSpecialSpecifications(getEmptyStateMessage())}
${getBasicExampleBlock('BmbAccordionComponent')}
        `,
      },
    },
  },
  argTypes: {
    appearanceContrast: {
      control: {
        type: 'select',
      },
      options: ['default', 'primary', 'alternative'],
      description: 'Defines the appearance style.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    borderRadius: {
      control: {
        type: 'select',
      },
      options: ['xs', 's', 'm', 'l', 'xl', 'none', 'auto'],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'm' },
      },
      description: 'Determines the corner radius size',
    },
    margin: {
      control: {
        type: 'select',
      },
      options: ['xs', 's', 'm', 'l', 'xl', 'none', 'auto'],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'm' },
      },
    },
    paddingHeader: {
      control: {
        type: 'select',
      },
      options: ['xs', 's', 'm', 'l', 'xl', 'none', 'auto'],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'm' },
      },
    },
    paddingContent: {
      control: {
        type: 'select',
      },
      options: ['xs', 's', 'm', 'l', 'xl', 'none', 'auto'],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'm' },
      },
    },
    icon: {
      control: { type: 'text' },
      description:
        'Name of the icon to be displayed in the input field. Refer to Material Icons for options.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    accordionId: {
      control: { type: 'text' },
      description:
        'Is a identifier for the component, this attribute is REQUIRED to use the accordion control directive',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
    hideToggle: {
      control: { type: 'boolean' },
      description:
        'This property hides or show the toggle to collapse the accordion',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    active: {
      control: { type: 'boolean' },
      description:
        'When this property is set as true, the accordion is not collapsed, so the content is shown.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description:
        'If set to true, disables the accordion, making it non-interactive and unclickable. This is useful for conditions where user interaction should be restricted.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    expanded: {
      control: { type: 'boolean' },
      description: 'If set to true, expanded the accordion.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    lockToggle: {
      control: { type: 'boolean' },
      description:
        'If set to true, the click interaction is disabled, but without adding disabled styles.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    closed: {
      control: null,
      description: 'Emmit the close event.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    opened: {
      control: null,
      description: 'Emmit the open event.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onClick: {
      control: null,
      description: 'Emmit the click event.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
  },
  args: {
    appearanceContrast: 'default',
    borderRadius: 'm',
    margin: 'm',
    paddingHeader: 'm',
    paddingContent: 'm',
    hideToggle: false,
    icon: 'keyboard_arrow_down',
    active: false,
    disabled: false,
    expanded: false,
    lockToggle: false,
  },
} as Meta<typeof BmbAccordionComponent>;

type Story = StoryObj<BmbAccordionComponent>;

export const Default: Story = {
  render: (args) => ({
    template: `
  <bmb-accordion
    ${attributes(args)}
  >
    <ng-template #bmbAccordionHeader>
      1
    </ng-template>
    <ng-template #bmbAccordionContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo ante,
        mattis nec libero a, malesuada pellentesque sem. Aliquam erat volutpat.
        Nulla ut consequat turpis, id efficitur velit. Fusce vitae dolor leo.
        Praesent diam justo, consectetur in blandit ut, tincidunt vitae enim.
        Nulla eleifend, leo at finibus volutpat, nulla metus eleifend lacus,
        ullamcorper dictum augue diam id erat. Donec ac fringilla elit. Aliquam
        sit amet luctus elit. Suspendisse ante tortor, euismod nec metus id,
        commodo sollicitudin massa. Aliquam magna nibh, semper eu vestibulum
        aliquam, aliquet gravida massa. Nullam vehicula, augue non aliquam
        posuere, enim urna blandit erat, et euismod enim nisi vel eros. Ut dictum
        egestas mi, faucibus iaculis lorem. Donec risus diam, maximus at varius
        rutrum, blandit quis augue. Sed consectetur massa ut auctor ultricies.
        Etiam fringilla venenatis nulla, gravida finibus nulla faucibus fringilla.
        Morbi luctus porta orci eu iaculis.
      </p>
    </ng-template>
  </bmb-accordion>
    `,
  }),
};

export const SelectedItem = {
  args: {
    active: true,
  },
  render: (args: any) => ({
    template: `
  <bmb-accordion
    ${attributes(args)}
  >
    <ng-template #bmbAccordionHeader>
      1
    </ng-template>
    <ng-template #bmbAccordionContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo ante,
        mattis nec libero a, malesuada pellentesque sem. Aliquam erat volutpat.
        Nulla ut consequat turpis, id efficitur velit. Fusce vitae dolor leo.
        Praesent diam justo, consectetur in blandit ut, tincidunt vitae enim.
        Nulla eleifend, leo at finibus volutpat, nulla metus eleifend lacus,
        ullamcorper dictum augue diam id erat. Donec ac fringilla elit. Aliquam
        sit amet luctus elit. Suspendisse ante tortor, euismod nec metus id,
        commodo sollicitudin massa. Aliquam magna nibh, semper eu vestibulum
        aliquam, aliquet gravida massa. Nullam vehicula, augue non aliquam
        posuere, enim urna blandit erat, et euismod enim nisi vel eros. Ut dictum
        egestas mi, faucibus iaculis lorem. Donec risus diam, maximus at varius
        rutrum, blandit quis augue. Sed consectetur massa ut auctor ultricies.
        Etiam fringilla venenatis nulla, gravida finibus nulla faucibus fringilla.
        Morbi luctus porta orci eu iaculis.
      </p>
    </ng-template>
  </bmb-accordion>
    `,
  }),
};
