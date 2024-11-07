import { NavListItem } from "./nav-list-item";

type Props = {
  navItem: {
    href: string;
    lavel: string;
  }[];
};

export const NavList = ({ navItem }: Props) => {
  return (
    <ul className="flex items-center gap-x-4">
      {navItem.map((item) => (
        <NavListItem key={item.lavel} href={item.href} lavel={item.lavel} />
      ))}
    </ul>
  );
};
