import { create } from 'storybook/theming';

export default create({
  base: 'dark',

  fontBase: '"Poppins-Regular", sans-serif',
  fontCode: 'monospace',

  brandTitle: 'Bamboo Design System',
  brandUrl: 'https://bamboo.tec.mx/',
  brandImage: './logo.png',
  brandTarget: '_self',

  // Colors
  colorPrimary: '#F6F7F9',
  colorSecondary: '#2766CB',

  // UI
  appBg: '#1F222E',
  appContentBg: '#313649',
  appPreviewBg: '#F6F7F9',
  appBorderColor: '#3F4965',
  // appBorderRadius: 4,

  // Text colors
  textColor: '#F6F7F9',
  // textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#F6F7F9',
  barSelectedColor: '#fff',
  barHoverColor: '#fff',
  barBg: '#313649',

  // Form colors
  // inputBg: '#ffffff',
  // inputBorder: '#10162F',
  // inputTextColor: '#10162F',
  // inputBorderRadius: 2,
});
