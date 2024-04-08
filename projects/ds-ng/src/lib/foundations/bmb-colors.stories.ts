import { Meta, StoryFn } from '@storybook/angular';

export default {
  title: 'Foundations/Colors',
  parameters: {
    docs: {
      description: {
        component: `This interactive tool offers a hands-on exploration of our comprehensive color palettes, designed to enhance the aesthetic and functional appeal of your projects. To seamlessly integrate these colors into your design. Dive into our palette to discover the perfect colors that will bring your designs to life.

\`\`\`css
background-color: RGBA(var(--color-name));
color: RGBA(var(--color-name));

//You need to avoid the RGBA() for some variables, take a look to the playground
background-color: var(--color-name); 
color: var(--color-name);

//For gradients colors
background: linear-gradient(180deg, var(--color-gradient-blue));
background: radial-gradient(circle, var(--color-gradient-blue));

\`\`\``,
      },
    },
  },
  argTypes: {
    colors: {
      name: 'Colors',
      control: { type: 'select' },
      options: [
        '--color-mariner-50',
        '--color-mariner-100',
        '--color-mariner-200',
        '--color-mariner-300',
        '--color-mariner-400',
        '--color-mariner-500',
        '--color-mariner-700',
        '--color-mariner-800',
        '--color-mariner-900',
        '--color-mariner-950',
        '--color-charade-50',
        '--color-charade-100',
        '--color-charade-200',
        '--color-charade-300',
        '--color-charade-500',
        '--color-charade-600',
        '--color-charade-700',
        '--color-charade-800',
        '--color-charade-900',
        '--color-charade-950',
        '--color-white-primary',
        '--color-blue-tec',
        '--color-mitec-blue',
        '--color-mitec-green',
        '--color-mitec-red',
        '--color-mitec-orange',
        '--color-black-primary',
        '--color-black-light',
        '--color-black-tint',
        '--color-black-min',
        '--color-white-light',
        '--color-white-tint',
        '--color-white-min',
        '--color-neon-primary',
        '--color-neon-light',
        '--color-neon-tint',
        '--color-blue-primary',
        '--color-blue-light',
        '--color-blue-tint',
        '--color-green-primary',
        '--color-green-light',
        '--color-green-tint',
        '--color-purple-primary',
        '--color-purple-light',
        '--color-purple-tint',
        '--color-red-primary',
        '--color-red-light',
        '--color-red-tint',
        '--color-yellow-primary',
        '--color-yellow-light',
        '--color-yellow-tint',
        '--color-teal-primary',
        '--color-teal-light',
        '--color-teal-tint',
        '--color-container-home',
        '--color-container-secondary',
        '--color-container-button',
        '--color-background-main',
        '--color-container-home-light',
        '--color-container-secondary-light',
        '--color-container-button-light',
        '--color-background-main-light',
        '--color-container-home-tec',
        '--color-container-secondary-tec',
        '--color-container-button-tec',
        '--color-background-main-tec',
        '--color-blue-pigment',
        '--color-japanese-indigo',
        '--color-eerie-black',
      ],
      description: 'Select the color to look how works.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    gradient: {
      name: 'Gradient',
      control: { type: 'select' },
      options: [
        '--color-button-gradient',
        '--color-blue-gradient',
        '--color-green-gradient',
        '--color-purple-gradient',
        '--color-bg-gradient',
        '--color-bg-wheel',
        '--color-bg-gradient-light',
        '--color-bg-wheel-light',
        '--color-bg-gradient-tec',
        '--color-bg-wheel-tec',
      ],
      description: 'Select the gradient color to look how works.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    type: {
      name: 'Gradient type',
      control: { type: 'radio' },
      options: ['linear-gradient', 'radial-gradient'],
      description: 'Select the gradient color to look how works.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    colors: '--color-mariner-50',
    gradient: '--color-bg-wheel-tec',
    type: 'linear-gradient',
  },
} as Meta;

function colors(object: any): any {
  const color = object.colors;
  const colorsWithRGBA = [
    '--color-black-light',
    '--color-black-tint',
    '--color-black-min',
    '--color-white-light',
    '--color-white-tint',
    '--color-white-min',
    '--color-container-home-light',
    '--color-container-button-tec',
    '--color-background-main-tec',
  ];

  if (colorsWithRGBA.includes(color)) {
    return `var(${color})`;
  } else {
    return `RGBA(var(${color}))`;
  }
}

function gradients(object: any): any {
  const color = object.gradient;
  const type = object.type;
  return `${type}(${
    type === 'radial-gradient' ? 'circle' : '180deg'
  }, var(${color}))`;
}

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `<div class="storybook-colors-playground"><div style="background-color: ${colors(
    args
  )};"></div> <div style="background: ${gradients(args)};"></div></div>`,
});

export const Default = customizable();
