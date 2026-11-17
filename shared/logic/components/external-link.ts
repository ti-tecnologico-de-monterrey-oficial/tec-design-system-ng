import { isExternalLink } from '../utils';

export function getExternalLinkSubtitleIcon(subtitle: string): string {
  return (!!subtitle && isExternalLink(subtitle) && 'lock') || '';
}
