import type { SectionType } from "@/hooks/useActiveSection";
import NavLink from "./NavLink";

export type HeaderDeskProps = {
  links: SectionType[];
  activeSection: string;
  pathname: string;
};
function HeaderDeskNav({ links, activeSection, pathname }: HeaderDeskProps) {
  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center truncate gap-6 font-sans text-md font-medium tracking-wider">
        {links.map((link, index) => (
          <NavLink
            key={link.id}
            id={link.id}
            activeSection={activeSection}
            href={link.href}
            pathname={pathname}
          >
            {link.label}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}

export default HeaderDeskNav;
