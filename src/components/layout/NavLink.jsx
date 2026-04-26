"use client";
import Link from "next/link";

function NavLink({ children, href, pathname, id, activeSection }) {
  // console.log(
  //   `Link: ${id}, ActiveSec: ${activeSection}, Path: ${pathname}, Href: ${href}`,
  // );

  const isActive =
    id === activeSection || (activeSection !== "about" && href === pathname);
  return (
    <li>
      <Link
        href={href}
        className={`${isActive && "active"} hover:text-hover transition-all duration-200`}
      >
        {children}
      </Link>
    </li>
  );
}
export default NavLink;
