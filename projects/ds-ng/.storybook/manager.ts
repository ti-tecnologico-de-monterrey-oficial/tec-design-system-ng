import { addons } from 'storybook/manager-api';
import bambooLightTheme from './bambooLightTheme';
import bambooDarkTheme from './bambooDarkTheme';

addons.setConfig({
  theme: bambooDarkTheme,
});
