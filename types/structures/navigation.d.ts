export interface NavItemChildrenBase {
  hasLabel?: boolean;
  items: {
    name: string;
    url: string;
  }[];
}

export interface NavItemChildrenWithLabel extends NavItemChildrenBase {
  hasLabel: true;
  label: string;
  url?: string;
}

export interface NavItem {
  label: string;
  url?: string;
  children?: NavItemChildrenWithLabel[];
}
