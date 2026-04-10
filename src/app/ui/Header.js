"use client";
import Link from "next/link";
import Logo from "../components/Logo";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useActiveSection from "../hooks/useActiveSection";

import HeaderMobNav from "../components/HeaderMobNav";
import HeaderDeskNav from "../components/HeaderDeskNav";
import { LogOut, MenuIcon, XIcon } from "lucide-react";
import { signOutUser } from "../lib/actions/auth";

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
        setSticky(entry.isIntersecting);
      });
    });
    const id = document.getElementById("home");
    if (id) {
      observer.observe(id);
    }
    return () => observer.disconnect();
  }, [sticky, pathname]);

  return (
    <header
      className={`${!sticky && pathname === "/" && "sticky z-60 right-0 left-0 top-0"} z-100 px-2 md:px-0  left-0 right-0 w-full container 2xl:px-10 mx-auto`}
    >
      {/* container */}
      <div className="transition-all duration-200 rounded-4xl lg:rounded-full mt-6 bg-black/80 backdrop-blur-md">
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
          {/* sign in buttons */}

          {/* if user registered and login profile */}
          {user ? (
            <div className="lg:flex items-center mr-2 gap-1 hidden">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-sora text-2xl text-indigo-200">
                {user?.firstName[0]}
              </div>
              {/* <span className="px-2 py-1 rounded-full bg-indigo-500/50 text-gray-100 text-sm font-medium">
                {user?.name}
              </span> */}
              {
                <div>
                  <button
                    onClick={signOutUser}
                    aria-label="sign out button"
                    className="text-xs flex gap-1 items-center font-sans font-medium tracking-wider py-1 px-2 bg-red-500 hover:bg-red-400 transition-all duration-200 text-red-50 rounded-full my-2 active:scale-105"
                  >
                    Sign Out
                    <span>
                      <LogOut size={12} />
                    </span>
                  </button>
                </div>
              }
            </div>
          ) : (
            <div className="lg:flex items-center mr-2 gap-2 hidden">
              <Link
                href="/auth/register"
                className="font-sans font-medium tracking-wider py-2 px-4 bg-gray-100 hover:bg-gray-300 transition-all duration-200 text-black rounded-full my-2 active:scale-105"
              >
                Register
              </Link>
              <Link
                href="/auth/signin"
                className="font-sans font-medium tracking-wider py-2 px-4 bg-accent hover:bg-hover transition-all duration-200 text-indigo-50 rounded-full my-2 active:scale-105"
              >
                Sign in
              </Link>
            </div>
          )}
          {/* Burger menu Icon */}
          <button
            className="lg:hidden"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded((expanded) => !expanded)}
          >
            {isExpanded ? (
              <XIcon className="text-white mr-6 hover:text-gray-300/70 transition-all duration-200" />
            ) : (
              <MenuIcon className="text-white mr-6" />
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
    </header>
  );
}

export default Header;
