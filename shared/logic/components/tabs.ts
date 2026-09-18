import { IBmbContrast } from '../../types/colors';

export function getBmbTabsClasses(appearanceContrast: IBmbContrast): string[] {
  const classes: string[] = ['bmb_tabs'];

  if (appearanceContrast === 'primary') {
    classes.push('bmb_tabs-primary');
  }

  if (appearanceContrast === 'alternative') {
    classes.push('bmb_tabs-alternative');
  }

  return classes;
}
