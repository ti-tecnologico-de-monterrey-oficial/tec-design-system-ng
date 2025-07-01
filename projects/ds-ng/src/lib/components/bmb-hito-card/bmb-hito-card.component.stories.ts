import { Meta, StoryObj } from '@storybook/angular';
import { BmbHitoCardComponent } from './bmb-hito-card.component';
import { attributes } from '../../utils/doc/utils';

export default {
  title: 'Components/Containers/Hito card',
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
      options: ['pending', 'done', 'active', 'under_review', 'canceled'],
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
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    is_active: {
      name: 'Is active',
      control: { type: 'boolean' },
      description: 'Change the color of the bullet. Selected hito card.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    isCompact: {
      name: 'Is compact',
      control: { type: 'boolean' },
      description: 'Reduce the padding of the card.',
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
    enable_bullet: false,
    is_active: false,
    isCompact: false,
    onClick: () => {
      console.log('test');
    },
  },
} as Meta<typeof BmbHitoCardComponent>;

type Story = StoryObj<BmbHitoCardComponent>;

export const Default: Story = {
  name: 'Example of active type',
  render: (args: any) => ({
    template: `
      <div style="padding: 1.5rem">
        <bmb-hito-card
          ${attributes(args)}
        />
      </div>
    `,
  }),
};

export const PendingExample = {
  name: 'Example of pending type',
  args: {
    type: 'pending',
  },
  render: (args: any) => ({
    template: `
      <div style="padding: 1.5rem">
        <bmb-hito-card
          ${attributes(args)}
        />
      </div>
    `,
  }),
};

export const DoneExample = {
  name: 'Example of done type',
  args: {
    type: 'done',
  },
  render: (args: any) => ({
    template: `
      <div style="padding: 1.5rem">
        <bmb-hito-card
          ${attributes(args)}
        />
      </div>
    `,
  }),
};

export const UnderReviewExample = {
  name: 'Example of under review type',
  args: {
    type: 'under_review',
  },
  render: (args: any) => ({
    template: `
      <div style="padding: 1.5rem">
        <bmb-hito-card
          ${attributes(args)}
        />
      </div>
    `,
  }),
};

export const CanceledExample = {
  name: 'Example of canceled type',
  args: {
    type: 'canceled',
  },
  render: (args: any) => ({
    template: `
      <div style="padding: 1.5rem">
        <bmb-hito-card
          ${attributes(args)}
        />
      </div>
    `,
  }),
};

export const CompactExample = {
  name: 'Compact version example',
  args: {
    isCompact: true,
  },
  render: (args: any) => ({
    template: `
      <div style="padding: 1.5rem">
        <bmb-hito-card
          ${attributes(args)}
        />
      </div>
    `,
  }),
};

export const EnableBulletExample = {
  name: 'Example of enable bullet',
  args: {
    enable_bullet: true,
  },
  render: (args: any) => ({
    template: `
      <div style="padding: 1.5rem">
        <bmb-hito-card
          ${attributes(args)}
        />
      </div>
    `,
  }),
};

export const ActiveExample = {
  name: 'Active example',
  args: {
    is_active: true,
    enable_bullet: true,
  },
  render: (args: any) => ({
    template: `
      <div style="padding: 1.5rem">
        <bmb-hito-card
          ${attributes(args)}
        />
      </div>
    `,
  }),
};
