import { BmbAccordionComponent } from './bmb-accordion.component';
import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { attributes } from '../../utils/utils';
import { storiesLayoutVertical } from '../../utils/bambooLayout';

export default {
  title: 'Micro Componentes/Accordion',
  component: BmbAccordionComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, BmbAccordionComponent],
    }),
    storiesLayoutVertical
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbAccordionComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbAccordionComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

## Architecture

\`\`\`html
<section class="bmb_accordion"
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
</section>
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    borderRadius: {
      name: 'Border radius',
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
      name: 'Margin',
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
      name: 'Padding Header ',
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
      name: 'Padding Content ',
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
      name: 'Icon',
      control: { type: 'text' },
      description:
        'Name of the icon to be displayed in the input field. Refer to Material Icons for options.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    accordionId: {
      name: 'Accordion Id',
      control: { type: 'text' },
      description:
        'Is a identifier for the component, this attribute is REQUIRED to use the accordion control directive',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
    hideToggle: {
      name: 'Hide Toggle',
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
      name: 'Active',
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
      name: 'Disabled',
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
      name: 'Expanded',
      control: { type: 'boolean' },
      description: 'If set to true, expanded the accordion.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    lockToggle: {
      name: 'Lock toggle',
      control: { type: 'boolean' },
      description: 'If set to true, the click interaction is disabled, but without adding disabled styles.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    closed: {
      name: 'Closed',
      control: null,
      description: 'Emmit the close event.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    opened: {
      name: 'Opened',
      control: null,
      description: 'Emmit the open event.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onClick: {
      name: 'On Click',
      control: null,
      description: 'Emmit the click event.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
  },
  args: {
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

export const OneItem: Story = {
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
  ...OneItem,
  args: {
    ...OneItem.args,
    active: true,
  },
};
