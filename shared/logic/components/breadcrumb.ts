import type { IBmbDataTopBar } from '../../types/components/breadcrumb';

export const getBreadcrumbLinkClass = (length: number): string =>
  length > 4 ? 'bmb_breadcrumb-link-more' : `bmb_breadcrumb-link-${length}`;

export const getBreadcrumbClasses = (
  length: number,
  isInactive: boolean,
): Record<string, boolean> => ({
  [getBreadcrumbLinkClass(length)]: true,
  'bmb_breadcrumb-link-inactive': isInactive,
});

export const getBreadcrumbDropdownItems = (
  items: IBmbDataTopBar[],
): IBmbDataTopBar[] =>
  items.length > 4 ? items.slice(1, items.length - 2) : [];

export const getBreadcrumbPenultimateLink = (
  items: IBmbDataTopBar[],
): string | undefined =>
  items.length > 1 ? items[items.length - 2].link : undefined;
