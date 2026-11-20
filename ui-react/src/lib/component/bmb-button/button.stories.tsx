import type { Meta, StoryObj } from '@storybook/react-vite';
import { BmbButton } from './index';

const appearances = [
  'primary',
  'secondary-filled',
  'secondary-outlined',
  'destructive',
  'transparent',
] as const;

const meta = {
  title: 'Components/Buttons/Button',
  component: BmbButton,
  parameters: {
    docs: {
      description: {
        component: `
Applies the Bamboo button styles to a native button while preserving native button behavior and attributes.

### Structure

\`\`\`html
<button type="button" class="bmb_btn bmb_btn-{appearance} bmb_btn-rounded">
  <!-- Optional icon -->
  Button text
</button>
\`\`\`

### Usage

\`\`\`tsx
<BmbButton appearance="primary" size="small" onClick={handleClick}>
  Continue
</BmbButton>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    appearance: {
      control: 'select',
      options: appearances,
      description: 'Selects the visual appearance of the button.',
      table: {
        category: 'Properties',
        type: { summary: 'primary | secondary-filled | secondary-outlined | destructive | transparent' },
        defaultValue: { summary: 'primary' },
      },
    },
    icon: {
      control: 'text',
      description: 'Sets a Material Symbol name or an image URL to display with the button.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    iconSize: {
      control: { type: 'number', min: 0 },
      description: 'Sets the icon size in pixels. A value of 0 uses the inherited size.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: { summary: '16' },
      },
    },
    position: {
      control: 'inline-radio',
      options: ['left', 'right'],
      description: 'Sets the icon position relative to the button content.',
      table: {
        category: 'Properties',
        type: { summary: 'left | right' },
        defaultValue: { summary: 'left' },
      },
    },
    case: {
      control: 'boolean',
      description: 'Applies the case layout used to separate the icon and text.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'large', 'micro'],
      description: 'Sets the button size.',
      table: {
        category: 'Properties',
        type: { summary: 'small | large | micro' },
        defaultValue: { summary: 'small' },
      },
    },
    isToggleActive: {
      control: 'boolean',
      description: 'Indicates whether the toggle state is active.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    enableButtonToggle: {
      control: 'boolean',
      description: 'Enables the active toggle appearance.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isRounded: {
      control: 'boolean',
      description: 'Controls whether the button has rounded corners.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    isMobile: {
      control: 'boolean',
      description: 'Enables the full-width mobile button style on small screens.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    iconAlt: {
      control: 'text',
      description: 'Sets alternative text when the icon is an image.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'icon' },
      },
    },
  },
  args: {
    children: 'Button',
    appearance: 'primary',
    size: 'small',
  },
} satisfies Meta<typeof BmbButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AppearanceGallery: Story = {
  name: 'Appearances',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {appearances.map((appearance) => (
        <BmbButton key={appearance} {...args} appearance={appearance}>
          {appearance}
        </BmbButton>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {(['micro', 'small', 'large'] as const).map((size) => (
        <BmbButton key={size} {...args} size={size}>
          {size}
        </BmbButton>
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  args: { icon: 'check', children: 'Confirm' },
};

export const IconOnRight: Story = {
  args: { icon: 'arrow_forward', position: 'right', children: 'Continue' },
};

export const ToggleActive: Story = {
  args: {
    enableButtonToggle: true,
    isToggleActive: true,
    children: 'Selected',
  },
};

export const Mobile: Story = {
  args: { isMobile: true, children: 'Full width on small screens' },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Unavailable' },
};
