import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { BmbNoticeCardComponent } from './bmb-notice-card.component';
import { attributes } from '../../utils/utils';

export default {
  title: 'Particularities/mitec web/Notice card',
  component: BmbNoticeCardComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbNoticeCardComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbNoticeCard } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbNoticeCard ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    title: {
      name: 'Title',
      control: {
        type: 'text',
      },
      description: 'Set the notification title.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    src: {
      name: 'Src',
      control: {
        type: 'text',
      },
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
      description: 'Set an image at the top of the notification.',
    },
    description: {
      name: 'Description',
      control: {
        type: 'object',
      },
      description:
        'Set the description of the notice card, this is an object with two pages, each page is a string.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbCardNoticeDescription' },
        defaultValue: { summary: '' },
      },
    },
    buttonText: {
      name: 'Button text',
      control: {
        type: 'text',
      },
      description: 'Set the button text of the notice card.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    link: {
      name: 'Link',
      control: {
        type: 'text',
      },
      description: 'Set the link of the notice card.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    closeBtnColor: {
      name: 'Close Button Color',
      control: {
        type: 'select',
      },
      options: ['black', 'white'],
      table: {
        category: 'Properties',
        type: { summary: 'select' },
        defaultValue: { summary: 'white' },
      },
      description: 'Set the color of the close button.',
    },
  },
  args: {
    title: 'Notification Title',
    src: 'https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg',
    description: {
      pageOne: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      pageTwo:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    buttonText: 'Ir',
    link: 'https://www.youtube.com',
  },
} as Meta<typeof BmbNoticeCardComponent>;

export const Default: StoryFn<typeof BmbNoticeCardComponent> = (args) => {
  return {
    props: args,
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
        <bmb-notice-card
            ${attributes(args)}
        >
        </bmb-notice-card>

      `,
  };
};
