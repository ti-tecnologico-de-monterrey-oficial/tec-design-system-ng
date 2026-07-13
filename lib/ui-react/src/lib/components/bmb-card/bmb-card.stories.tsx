import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  BmbCard,
  BmbCardContent,
  BmbCardFooter,
  BmbCardHeader,
} from './bmb-card';

const meta = {
  component: BmbCard,
  title: 'Components/BmbCard',
  args: {
    borderRadius: 'm',
    margin: 'm',
    type: 'normal',
    boxShadowStyle: 'none',
    borderColor: 'default',
  },
  argTypes: {
    borderRadius: {
      control: 'text',
    },
    margin: {
      control: 'text',
    },
    type: {
      control: 'text',
    },
    boxShadowStyle: {
      control: 'text',
    },
    borderColor: {
      control: 'text',
    },
  },
} satisfies Meta<typeof BmbCard>;

export default meta;

type Story = StoryObj<typeof BmbCard>;

export const Basic: Story = {
  render: (args) => (
    <BmbCard {...args}>
      <BmbCardHeader padding="s">
        <h3>Header</h3>
      </BmbCardHeader>
      <BmbCardContent>
        <p>
          Los gatos son criaturas llenas de misterio. Su elegancia al moverse, sus ojos
          penetrantes y su habilidad para desaparecer en las sombras han inspirado
          leyendas y supersticiones.
        </p>
      </BmbCardContent>
      <BmbCardFooter padding="m">
        <h3>Footer</h3>
      </BmbCardFooter>
    </BmbCard>
  ),
};

export const BoxShadowAndBorderColor: Story = {
  args: {
    boxShadowStyle: 'box-shadow-4',
    borderColor: 'contrasts-100',
  },
  render: (args) => (
    <BmbCard {...args}>
      <BmbCardHeader>
        <h3>Header</h3>
      </BmbCardHeader>
      <BmbCardContent colorBackground="contrasts-5">
        <p>Contenido con color de fondo custom.</p>
      </BmbCardContent>
      <BmbCardFooter>
        <h3>Footer</h3>
      </BmbCardFooter>
    </BmbCard>
  ),
};
