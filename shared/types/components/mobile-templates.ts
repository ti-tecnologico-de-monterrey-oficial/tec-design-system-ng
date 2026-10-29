import { IBmbTargetLink } from '../utils/utils';

export type IBmbMobileTemplateName =
  | 'single-header'
  | 'header-with-footer'
  | 'card-header-with-footer'
  | 'header-with-button-list'
  | 'header-with-card-list'
  | 'login'
  | 'calendar'
  | 'external-link';

export interface IBmbMobileTemplateButton {
  title: string;
  iconLeft: string;
  subtitle?: string;
  target?: IBmbTargetLink;
  link?: string;
  onButton?: () => void;
}
