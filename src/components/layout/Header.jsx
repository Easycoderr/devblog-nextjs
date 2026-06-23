"use client";
import Link from "next/link";
import Logo from "../ui/Logo";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useActiveSection from "../../hooks/useActiveSection";
import HeaderMobNav from "./HeaderMobNav";
import HeaderDeskNav from "./HeaderDeskNav";
import { MenuIcon, Plus, XIcon } from "lucide-react";
import ProfileDropDownMenu from "./ProfileDropDownMenu";
import ThemeToggle from "../ui/ThemeToggle";

const links = [
  { id: "home", label: "Home", href: "/" },
  { id: "blogs", label: "Blogs", href: "/blogs" },
  { id: "about", label: "About", href: "/#about" },
];

function Header({ user }) {
  const activeSection = useActiveSection(links);
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setSticky(!entry.isIntersecting);
      });
    });
    const id = document.getElementById("home");
    if (id) {
      observer.observe(id);
    }
    if (pathname !== "/") {
      setSticky(false);
    }
    return () => observer.disconnect();
  }, [sticky, pathname]);

  return (
    <header
      aria-expanded={isExpanded}
      className={`${!sticky ? "lg:border-b border-b-border text-foreground py-1 bg-background" : "text-foreground"} w-full ${sticky && pathname === "/" && "sticky z-30 right-0 left-0 top-0"} z-30`}
    >
      <div
        className={`px-2 md:px-0 left-0 right-0 w-full container 2xl:px-10 mx-auto`}
      >
        {/* container */}
        <div
          className={`transition-all duration-200 ${sticky && "bg-background/80 backdrop-blur-md rounded-4xl lg:rounded-full mt-6 border border-primary/20 shadow-sm shadow-primary/20"}`}
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-10 items-center z-20">
              {/* logo */}
              <div className="ml-6">
                <Logo w={160} h={160} />
              </div>
              <HeaderDeskNav
                links={links}
                activeSection={activeSection}
                pathname={pathname}
              />
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              {user ? (
                <div className="lg:flex gap-8 items-center hidden">
                  <Link
                    title="Create post"
                    href={!user ? "/auth/signin" : "/blogs/create"}
                    className="group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 size-8"
                  >
                    <Plus />
                  </Link>
                  <div className="lg:flex items-center mr-2 gap-1">
                    <ProfileDropDownMenu user={user} />
                  </div>
                </div>
              ) : (
                <div className="lg:flex items-center mr-2 gap-2 hidden">
                  <Link
                    href="/auth/register"
                    className="font-sans font-medium tracking-wider py-2 px-4 bg-gray-100 hover:bg-gray-300 transition-all duration-200 text-gray-800 rounded-full my-2 active:scale-105"
                  >
                    Register
                  </Link>
                  <Link
                    href="/auth/signin"
                    className="font-sans font-medium tracking-wider py-2 px-4 bg-primary hover:bg-primary-hover transition-all duration-200 text-indigo-50 rounded-full my-2 active:scale-105"
                  >
                    Sign in
                  </Link>
                </div>
              )}
            </div>
            {/* Burger menu Icon */}
            <button
              className="lg:hidden"
              aria-expanded={isExpanded}
              onClick={() => setIsExpanded((expanded) => !expanded)}
            >
              {isExpanded ? (
                <XIcon className="text-current mr-6 hover:text-gray-300 transition-all duration-200" />
              ) : (
                <MenuIcon className="text-current mr-6" />
              )}
            </button>
          </div>
          {/* mobile */}
          <HeaderMobNav
            links={links}
            activeSection={activeSection}
            pathname={pathname}
            isExpanded={isExpanded}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
