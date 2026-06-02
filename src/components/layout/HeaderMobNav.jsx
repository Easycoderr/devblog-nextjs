import NavLink from "./NavLink";

function HeaderMobNav({ links, activeSection, pathname, isExpanded }) {
  return (
    <nav
      className={`${!isExpanded && "hidden"} lg:hidden bg-bg border-b border-b-border h-38`}
    >
      <div
        className={`h-0.5 ${isExpanded && "w-full"} bg-gray-600 mb-4 transition-all duration-200`}
      ></div>
      <ul className="flex text-current flex-col items-center truncate gap-6 font-sans text-md font-medium tracking-wider">
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

export default HeaderMobNav;
