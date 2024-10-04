import { Meta, StoryObj } from '@storybook/angular';
import { BmbHitoCardComponent } from './bmb-hito-card.component';

export default {
  title: 'Micro Componentes/Hito card',
  component: BmbHitoCardComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbHitoCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbHitoCardComponent ],
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
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons. The color of the icon depend on the parent.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    title: {
      name: 'Title',
      control: { type: 'text' },
      description: 'Set the title text of the card.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    id: {
      name: 'ID',
      control: { type: 'text' },
      description:
        'Set the id for the card, this value is send to the parent on the `handleClick` output.',

      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    short_description: {
      name: 'Short description',
      control: { type: 'text' },
      description: 'Set the short description text.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    type: {
      name: 'Type',
      control: {
        type: 'select',
      },
      options: ['pending', 'done', 'active', 'under_review'],
      description: 'Set the type for the badge component.',
      table: {
        category: 'Properties',
        type: { summary: 'ITimelineEventType' },
      },
    },
    sub_content: {
      name: 'Sub content',
      control: { type: 'text' },
      description: 'Set the text content at the right.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    enable_bullet: {
      name: 'Enable bullet',
      control: { type: 'boolean' },
      description: 'When set to true, shows a bullet element at the right.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    is_active: {
      name: 'Is active',
      control: { type: 'boolean' },
      description: 'Change the color of the bullet.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    alternative_appearance: {
      name: 'Alternative appearance',
      control: { type: 'boolean' },
      description: 'Change the color schema for the card.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    handleClick: {
      name: 'Handle click',
      control: false,
      description: 'Click event.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
  },
  args: {
    icon: 'home',
    title: 'Hito card title',
    id: 'card',
    short_description: 'Short description',
    type: 'active',
    sub_content: 'Sub content',
    enable_bullet: true,
    onClick: () => {
      console.log('test');
    },
  },
} as Meta<typeof BmbHitoCardComponent>;

type Story = StoryObj<BmbHitoCardComponent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 3rem">
        <bmb-hito-card
          [icon]="icon"
          [title]="title"
          [id]="id"
          [short_description]="short_description"
          [type]="type"
          [sub_content]="sub_content"
          [enable_bullet]="enable_bullet"
        />
      </div>
    `,
  }),
};
