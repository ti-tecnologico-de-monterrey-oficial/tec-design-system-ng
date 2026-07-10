export interface IBmbDataTopBar {
  text: string;
  link?: string;
}

export const getLinkClass = (length: number): string => {
  return length > 4
    ? 'bmb_breadcrumb-link-more'
    : `bmb_breadcrumb-link-${length}`;
};

export const getClasses = ({
  length,
  isInactive,
}: {
  length: number;
  isInactive: boolean;
}): { [key: string]: boolean } => ({
  [getLinkClass(length)]: true,
  'bmb_breadcrumb-link-inactive': isInactive,
});

export const getDropdownItems = (
  items: IBmbDataTopBar[],
): IBmbDataTopBar[] => {
  if (items.length > 4) {
    return items.slice(1, items.length - 2);
  }

  return [];
};

export const getPenultimateLink = (
  items: IBmbDataTopBar[],
): string | undefined => {
  if (items.length > 1) {
    return items[items.length - 2].link;
  }

  return undefined;
};