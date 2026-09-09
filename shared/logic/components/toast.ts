import { BmbToastAppearance } from '../../types/components/toast';

export function getToastClasses(appearance: BmbToastAppearance): string[] {
  const classes: string[] = ['bmb_toast'];

  if (appearance) {
    classes.push('bmb_toast-' + appearance);
  }

  return classes;
}

export function getToastIcon(appearance: BmbToastAppearance): string {
  const icons: { [key: string]: string } = {
    neutral: 'info',
    warning: 'warning',
    error: 'error',
    event: 'notification_important',
    reminder: 'info',
    successful: 'check_circle',
    primary: 'info',
  };

  if (icons[appearance]) return icons[appearance];

  return 'info';
}
