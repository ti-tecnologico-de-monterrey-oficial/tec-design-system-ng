import { create } from 'storybook/theming';

export default create({
  base: 'dark',

  fontBase: '"Poppins-Regular", sans-serif',
  fontCode: 'monospace',

  brandTitle: 'Bamboo Design System',
  brandUrl: 'https://bamboo.tec.mx/',
  brandImage: './logo.png',
  brandTarget: '_self',

  colorPrimary: '#F6F7F9',
  colorSecondary: '#2766CB',
  appBg: '#1F222E',
  appContentBg: '#313649',
  appPreviewBg: '#F6F7F9',
  appBorderColor: '#3F4965',
  textColor: '#F6F7F9',
  barTextColor: '#F6F7F9',
  barHoverColor: '#fff',
  barBg: '#313649',
});
