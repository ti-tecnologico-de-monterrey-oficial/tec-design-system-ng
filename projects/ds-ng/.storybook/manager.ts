import { addons } from 'storybook/manager-api';
import bambooDarkTheme from './bambooDarkTheme';
import { API_PreparedIndexEntry } from 'storybook/internal/types';

addons.setConfig({
  theme: bambooDarkTheme,
  sidebar: {
    filters: {
      runPattern: (item: API_PreparedIndexEntry): boolean => {
        return !(item.tags ?? []).includes('hideInSidebar');
      }
    },
  },
});
