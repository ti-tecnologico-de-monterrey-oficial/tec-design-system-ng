export interface SidebarElement {
  id: number;
  icon: string;
  title: string;
  link: string;
  target?: string;
  children?: SidebarElement[];
  isOpen?: boolean;
}
