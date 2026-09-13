"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
type NavLinkProps = {
  href: string;
  children: ReactNode;
  icon: ReactNode;
};
function NavLink({ href, children, icon, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className="w-full px-3 py-1.5 md:px-4 md:py-2.5 border border-border text-foreground bg-card rounded-lg hover:opacity-75 aria-[current=page]:text-primary aria-[current=page]:bg-primary/20 transition-all duration-200"
      aria-current={isActive ? "page" : undefined} // Sets the ARIA attribute dynamically
      {...props}
    >
      <span className="flex gap-1 items-center">
        {icon}
        {children}
      </span>
    </Link>
  );
}
export default NavLink;
