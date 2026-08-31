import type { HeaderDeskProps } from "./HeaderDeskNav";
import NavLink from "./NavLink";
type HeaderMobProps = { isExpanded: boolean } & HeaderDeskProps;
function HeaderMobNav({
  links,
  activeSection,
  pathname,
  isExpanded,
}: HeaderMobProps) {
  return (
    <nav
      className={`absolute top-14 ${isExpanded ? "right-0 left-0 visible opacity-100" : "-translate-x-full invisible opacity-0"} lg:hidden bg-background/80 backdrop-blur-sm h-38 transition-all duration-400 rounded-xl`}
    >
      <ul className="flex text-current flex-col items-center truncate gap-6 font-sans text-md font-medium tracking-wider">
        {links.map((link) => (
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

export default HeaderMobNav;
