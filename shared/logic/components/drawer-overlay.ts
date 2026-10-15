import { IBmbApp } from '../../types/utils';

export function getDrawerOverlayActiveApps(
  appServices: { [key: number]: IBmbApp[] },
  activeNavItemIndex: number,
): IBmbApp[] {
  const appsForCurrentNav = appServices[activeNavItemIndex];
  return Array.isArray(appsForCurrentNav) ? appsForCurrentNav : [];
}
