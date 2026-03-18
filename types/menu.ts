export type MenuItem = {
  label: string;
  href?: string;                 // link for parent if no children
  children?: MenuItem[];         // submenu items
};