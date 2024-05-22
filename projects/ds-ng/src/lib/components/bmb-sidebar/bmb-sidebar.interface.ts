export interface SidebarElement {
  id: number;
  icon: string;
  title: string;
  link: string;
}

export interface SidebarElements {
  child: SidebarElement[];
}
