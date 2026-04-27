export type SidebarItem = {
  title: string;
  url: string;
  isActive?: boolean;
};

export type SidebarGroup = {
  title: string;
  url: string;
  items?: SidebarItem[];
};

export type SidebarLinkType = {
  navMain: SidebarGroup[];
};