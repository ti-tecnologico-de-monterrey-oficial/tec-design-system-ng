import { addons } from 'storybook/manager-api';
import bambooLightTheme from './bambooLightTheme';
import bambooDarkTheme from './bambooDarkTheme';
import { themes } from 'storybook/internal/theming';

addons.setConfig({
  theme: bambooDarkTheme,
});
