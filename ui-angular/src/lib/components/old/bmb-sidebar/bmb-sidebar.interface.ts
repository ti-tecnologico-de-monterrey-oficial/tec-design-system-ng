import { IBmbTargetLink } from '../../../_shared/types';

export interface SidebarElement {
  id: number;
  icon: string;
  title: string;
  link?: string;
  target?: IBmbTargetLink;
  children?: SidebarElement[];
  isOpen?: boolean;
  event?: (event: SidebarElement) => void;
}
