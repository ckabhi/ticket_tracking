export interface MenuItem {
  name: string;
  key: string;
  to: string;
}

export const Menu: MenuItem[] = [
  {
    name: "Home",
    key: "home",
    to: "/home",
  },
  {
    name: "New",
    key: "new",
    to: "/new",
  },
];
