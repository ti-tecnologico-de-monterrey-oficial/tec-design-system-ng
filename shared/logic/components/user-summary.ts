import { IBmbLinkConfiguration } from '../../types';
import { IBmbContentLayoutSummary } from '../../types/components/user-summary';

export function getUserSummaryContentClass(
  mainClassName: string,
  name: string,
  contentLayout: IBmbContentLayoutSummary,
): string[] {
  const classes: string[] = [];
  if (!!name) classes.push(`${mainClassName}-${contentLayout}`);

  return classes;
}

export function getUserSummarySalutationClasses({
  mainClassName,
  name,
  contentLayout,
  isProfile,
  isRole = false,
}: {
  mainClassName: string;
  name: string;
  contentLayout: IBmbContentLayoutSummary;
  isProfile: boolean;
  isRole?: boolean;
}): string[] {
  const classes: string[] = getUserSummaryContentClass(
    mainClassName,
    name,
    contentLayout,
  );

  if (!isProfile && contentLayout === 'column')
    classes.push(`${mainClassName}-salutation`);
  if (isRole && contentLayout === 'row') {
    classes.push('bmb_top-bar-user-section-role');
    classes.push('bmb_user-summary_content-wrapper-role');
  }
  return classes;
}

export function getUserSummaryName(
  name: string,
  salutation: string | undefined,
  isProfile: boolean,
): string {
  if (!!salutation && !isProfile)
    return `¡${salutation}${!!name ? ' '.concat(name) : ''}!`;
  return name;
}

export function getUserSummaryEmailAsLink(
  email: string | IBmbLinkConfiguration,
): IBmbLinkConfiguration | null {
  return typeof email === 'object' && email !== null ? email : null;
}
