import { IBmbApp } from '../../types/utils';
import { getDrawerOverlayActiveApps } from './drawer-overlay';

describe('drawer-overlay', () => {
  describe('getDrawerOverlayActiveApps', () => {
    it('should return the apps for the active nav index', () => {
      const apps: IBmbApp[] = [{ title: 'App 1', icon: 'home', appearance: 'red' }];
      expect(getDrawerOverlayActiveApps({ 0: apps }, 0)).toEqual(apps);
    });

    it('should return an empty array when there are no apps for the index', () => {
      expect(getDrawerOverlayActiveApps({}, 0)).toEqual([]);
    });

    it('should return an empty array when the value is not an array', () => {
      expect(
        getDrawerOverlayActiveApps(
          { 0: 'not-an-array' as unknown as IBmbApp[] },
          0,
        ),
      ).toEqual([]);
    });
  });
});
