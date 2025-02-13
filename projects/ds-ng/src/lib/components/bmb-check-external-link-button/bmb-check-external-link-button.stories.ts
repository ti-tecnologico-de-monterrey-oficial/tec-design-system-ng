import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbCheckExternalLinkButtonComponent } from './bmb-check-external-link-button.component';
import { attributes } from '../../utils/utils';

export default {
  title: 'INTERNAL/Check link (external, internal) or button',
  component: BmbCheckExternalLinkButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbIconComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbCheckExternalLinkButtonComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbCheckExternalLinkButtonComponent ],
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
    idElement: {
      name: 'Id element',
      control: {
        type: 'text',
      },
      description: 'Sets the id property for the link or the button.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    link: {
      name: 'Link',
      control: {
        type: 'text',
      },
      description:
        'Sets the link for redirection to another page. If this property is empty it will emit the button event.',
      table: {
        category: 'Events',
        type: { summary: 'string' },
      },
    },
    target: {
      name: 'Target',
      control: {
        type: 'radio',
      },
      options: ['_blank', '_self', '_parent', '_top'],
      description:
        'Sets the target property for the link. Refer to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a for more information.',
      table: {
        category: 'Events',
        type: { summary: 'IBmbTargetLink' },
        defaultValue: { summary: '_blank' },
      },
    },
    buttonClick: {
      name: 'Button click',
      control: null,
      description:
        'This event is only emitted if the "Link" property is empty.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
  },
  args: {
    idElement: '',
    link: 'https://www.youtube.com/',
    target: '_blank',
    buttonClick: () => alert('hola'),
  },
} as Meta<typeof BmbCheckExternalLinkButtonComponent>;

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `
      <bmb-check-external-link-button
        ${attributes(args)}
      >
        <bmb-icon icon="face" [size]="20"/>
        <span>Custom</span>
      </bmb-check-external-link-button>
    `,
});

export const Default = customizable();
