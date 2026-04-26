import NavLink from "./NavLink";

function HeaderDeskNav({ links, activeSection, pathname }) {
  return (
    <nav className="hidden lg:block">
      <ul className="flex text-text items-center truncate gap-6 font-sans text-md font-medium tracking-wider">
        {links.map((link, index) => (
          <NavLink
            key={index}
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
