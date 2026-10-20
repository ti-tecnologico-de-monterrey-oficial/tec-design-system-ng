import { SidebarElement } from '../../types/components/sidebar';

export function hasSidebarChildren(selectedElement: SidebarElement): boolean {
  return !!selectedElement.children;
}

export function getSidebarLink(selectedElement: SidebarElement): string {
  if (hasSidebarChildren(selectedElement)) return '';
  return selectedElement.link || '';
}

export function getSidebarValidationErrors(
  elements: SidebarElement[][],
): string[] {
  const errors: string[] = [];
  const totalElements = elements.reduce((acc, group) => acc + group.length, 0);

  if (elements.length > 2) {
    errors.push(
      'The sidebar component only supports two levels of navigation',
    );
  }

  if (totalElements > 8) {
    errors.push(
      'The sidebar component only supports a maximum of 8 elements in the first level of navigation',
    );
  }

  return errors;
}
