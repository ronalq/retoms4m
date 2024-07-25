export interface TreeMenu {
  name: string;
  links: LinkMenu[];
  key: string
}

export interface LinkMenu {
  key: string;
  name: string;
  url: string;
  icon: string;
}