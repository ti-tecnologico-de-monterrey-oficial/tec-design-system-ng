import type { IBmbAlertCenterDetailTextStyle } from '../../types/components/alert-center-detail';

export const getAlertCenterDetailClass = (
  style?: IBmbAlertCenterDetailTextStyle,
): string => `bmb_alert-center-content-${style ?? 'normal'}`;
