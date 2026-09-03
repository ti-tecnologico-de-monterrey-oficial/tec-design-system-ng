import type { Meta, StoryObj } from '@storybook/angular';
import { BmbIframeComponent } from './bmb-iframe.component';
import {
  getArchitectureSection,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '@docs/utils/utils';

export default {
  title: 'Foundations/System elements/Iframe',
  component: BmbIframeComponent,
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(
  `
${getGeneralComponentDescription({ name: 'iframe', type: 'element' })} to embed another webpage within the current, acting as a *window* within the main page to display external content.
  `,
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/foundations/i-frame/descripcion-general-gxUE3JoE',
  },
)}
${getArchitectureSection(`
<section class="bmb_iframe">
  <iframe { configuration } ></iframe>
</section>
`)}
${getBasicExampleBlock('BmbIframeComponent')}
        `,
      },
    },
  },
  argTypes: {
    height: {
      control: {
        type: 'text',
      },
      description: 'The height of the iframe.',
      table: {
        category: 'Properties',
        type: { summary: 'number | string' },
        defaultValue: { summary: '100%' },
      },
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the iframe.',
      table: {
        category: 'Properties',
        type: { summary: 'number | string' },
        defaultValue: { summary: '100%' },
      },
    },
    src: {
      control: {
        type: 'text',
      },
      description:
        'The source of the iframe. Optional when `srcdoc` is provided.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    loading: {
      control: {
        type: 'select',
      },
      options: ['lazy', 'eager'],
      description: 'The loading behavior of the iframe.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'eager' },
      },
    },
    importance: {
      control: { type: 'select' },
      options: ['auto', 'high', 'low'],
      description: 'Indicates the relative fetch priority of the iframe.',
      table: {
        category: 'Properties',
        type: { summary: 'auto | high | low' },
        defaultValue: { summary: 'auto' },
      },
    },
    frameborder: {
      control: { type: 'text' },
      description: 'Controls whether the legacy iframe border is displayed.',
      table: {
        category: 'Properties',
        type: { summary: 'string | number' },
        defaultValue: { summary: '0' },
      },
    },
    scrolling: {
      control: { type: 'select' },
      options: ['auto', 'yes', 'no'],
      description: 'Controls the legacy iframe scrollbar behavior.',
      table: {
        category: 'Properties',
        type: { summary: 'auto | yes | no' },
        defaultValue: { summary: 'auto' },
      },
    },
    align: {
      control: { type: 'select' },
      options: [null, 'top', 'middle', 'bottom', 'left', 'right'],
      description: 'Controls the legacy alignment of the iframe.',
      table: {
        category: 'Properties',
        type: { summary: 'top | middle | bottom | left | right | null' },
        defaultValue: { summary: 'null' },
      },
    },
    longdesc: {
      control: { type: 'text' },
      description: 'URL containing a long description of the iframe content.',
      table: {
        category: 'Accessibility',
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
    },
    name: {
      control: {
        type: 'text',
      },
      description: 'The name of the iframe.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    srcdoc: {
      control: { type: 'text' },
      description:
        'Inline HTML rendered by the iframe. It takes precedence over `src`.',
      table: { category: 'Properties', type: { summary: 'string | null' } },
    },
    title: {
      control: { type: 'text' },
      description: 'Accessible title for the embedded document.',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    sandbox: {
      control: { type: 'text' },
      description: 'Space-separated sandbox permission tokens.',
      table: { category: 'Security', type: { summary: 'string | null' } },
    },
    allow: {
      control: { type: 'text' },
      description: 'Permissions policy applied to the embedded document.',
      table: { category: 'Security', type: { summary: 'string | null' } },
    },
    allowFullscreen: {
      control: { type: 'boolean' },
      description: 'Allows the embedded document to enter fullscreen mode.',
      table: { category: 'Security', type: { summary: 'boolean' } },
    },
    credentialless: {
      control: { type: 'boolean' },
      description: 'Loads cross-origin content without credentials.',
      table: { category: 'Security', type: { summary: 'boolean' } },
    },
    csp: {
      control: { type: 'text' },
      description: 'Content Security Policy required for the iframe response.',
      table: { category: 'Security', type: { summary: 'string | null' } },
    },
    referrerPolicy: {
      control: { type: 'select' },
      options: [
        'no-referrer',
        'no-referrer-when-downgrade',
        'origin',
        'origin-when-cross-origin',
        'same-origin',
        'strict-origin',
        'strict-origin-when-cross-origin',
        'unsafe-url',
      ],
      description: 'Controls the referrer information sent by the iframe.',
      table: { category: 'Security', type: { summary: 'string | null' } },
    },
    iframeLoad: {
      action: 'iframeLoad',
      description: 'Emitted when the native iframe fires its load event.',
      table: { category: 'Events' },
    },
  },
  args: {
    height: '100%',
    width: '100%',
    src: 'https://www.openstreetmap.org/export/embed.html?bbox=-118.5%2C14.3%2C-86.5%2C32.8&layer=mapnik',
    loading: 'eager',
    importance: 'auto',
    frameborder: '0',
    scrolling: 'auto',
    align: null,
    longdesc: null,
    name: 'test',
    title: 'Embedded OpenStreetMap map',
  },
} as Meta<typeof BmbIframeComponent>;

type Story = StoryObj<typeof BmbIframeComponent>;

export const Default: Story = {};
