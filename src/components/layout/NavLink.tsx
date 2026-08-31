"use client";
import Link from "next/link";
import { ReactNode } from "react";
type NavLinkProps = {
  children: ReactNode;
  href: string;
  pathname: string;
  id: string;
  activeSection: string;
};
function NavLink({
  children,
  href,
  pathname,
  id,
  activeSection,
}: NavLinkProps) {
  // console.log(
  //   `Link: ${id}, ActiveSec: ${activeSection}, Path: ${pathname}, Href: ${href}`,
  // );

  const isActive =
    id === activeSection || (activeSection !== "about" && href === pathname);
  return (
    <li>
      <Link
        href={href}
        className={`${isActive && "active"} text-current text-sm hover:text-primary transition-all duration-200`}
      >
        {children}
      </Link>
    </li>
  );
}
export default NavLink;
