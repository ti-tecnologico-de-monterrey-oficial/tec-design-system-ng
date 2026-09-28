import type { IBmbActionHeaderLinks } from '../../types/components/header-mitec';
import type { IBmbActionHeader } from '../../types/components/navigation-bar';

export const getHeaderMitecActions = (
  links?: IBmbActionHeaderLinks,
): IBmbActionHeader[] =>
  (
    ['apple', 'android', 'twitter', 'facebook', 'instagram', 'youtube'] as const
  ).map((name) => ({
    icon: `bmb_${name}`,
    alt: `${name} social icon`,
    link: links?.[name].link,
    target: links?.[name].target,
    action: () => {},
  }));
