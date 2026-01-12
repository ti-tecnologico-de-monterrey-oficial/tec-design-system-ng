import { create } from 'storybook/theming';

export default create({
  //Theme
  base: 'dark',

  // Typography
  fontBase: '"Poppins-Regular", sans-serif',
  fontCode: 'monospace',

  //Brand
  brandTitle: 'Bamboo Design System',
  brandUrl: 'https://bamboo.tec.mx/',
  brandImage: './logo.png',
  brandTarget: '_self',

  // Sidebar text colors
  colorPrimary: '#EBEDF3',
  colorSecondary: '#2766CB',

  // UI
  appBg: '#313649',
  appContentBg: '#373F55',
  appPreviewBg: '#D3D7E4',
  appBorderColor: '#617196',
  appBorderRadius: 4,

  //Button colors
  buttonBorder: '#DEDEDE',

  // Text colors
  textColor: '#F6F7F9',
  textInverseColor: '#1F222E',
  textMutedColor: '#ADB6CC',

  // Toolbar colors
  barTextColor: '#EBEDF3',
  barSelectedColor: '#ADB6CC',
  barHoverColor: '#617196',
  barBg: '#1F222E',
});
