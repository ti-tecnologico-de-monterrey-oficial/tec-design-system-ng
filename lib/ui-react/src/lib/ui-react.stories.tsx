import type { Meta, StoryObj } from '@storybook/react-vite';
import { TiTecnologicoDeMonterreyOficialUiReact } from './ui-react';

const meta = {
  component: TiTecnologicoDeMonterreyOficialUiReact,
  title: 'TiTecnologicoDeMonterreyOficialUiReact',
} satisfies Meta<typeof TiTecnologicoDeMonterreyOficialUiReact>;
export default meta;

type Story = StoryObj<typeof TiTecnologicoDeMonterreyOficialUiReact>;

export const Primary = {
  args: {},
} satisfies Story;
