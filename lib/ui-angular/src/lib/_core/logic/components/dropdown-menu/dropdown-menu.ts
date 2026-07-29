import {
  BmbDropdownContentComponent,
} from '../../../../components/utils/bmb-dropdown-content/bmb-dropdown-content.component';

import {
  IDropdownItem,
} from '../../../../components/types';

import {
  BmbProjectionContentService,
} from '../../../../services/projection/projection.service';

/**
 * Opens the dropdown menu.
 */
export const openDropdownMenu = ({
  projectionService,
  targetRef,
  items,
  onItemClick,
}: {
  projectionService: BmbProjectionContentService;
  targetRef: HTMLElement;
  items: IDropdownItem[];
  onItemClick: (item: IDropdownItem) => void;
}): string => {
  return projectionService.openContent({
    content: BmbDropdownContentComponent,
    targetRef,
    inputContext: {
      items,
    },
    outputContext: {
      clickedItem: onItemClick,
    },
    focusOnOpen: true,
    showBackdrop: false,
  });
};