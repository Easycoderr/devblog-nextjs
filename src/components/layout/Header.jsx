"use client";
import Link from "next/link";
import Logo from "../ui/Logo";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useActiveSection from "../../hooks/useActiveSection";
import HeaderMobNav from "./HeaderMobNav";
import HeaderDeskNav from "./HeaderDeskNav";
import { MenuIcon, Plus, PlusCircle, XIcon } from "lucide-react";
import ProfileDropDownMenu from "./ProfileDropDownMenu";

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
      className={`${!sticky ? "lg:border-b border-b-gray-300 text-gray-800 py-1" : "text-text"} w-full ${sticky && pathname === "/" && "sticky z-60 right-0 left-0 top-0"} z-800`}
    >
      <div
        className={`px-2 md:px-0  left-0 right-0 w-full container 2xl:px-10 mx-auto`}
      >
        {/* container */}
        <div
          className={`transition-all duration-200 ${sticky && "bg-black/70 backdrop-blur-md rounded-4xl lg:rounded-full mt-6"}`}
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
            {/* sign in buttons */}

            {/* if user registered and login profile */}
            {user ? (
              <div className="lg:flex gap-8 items-center hidden">
                <Link
                  title="Create post"
                  href={!user ? "/auth/signin" : "/blogs/create"}
                  className={`${sticky ? "text-gray-800 bg-gray-100 border-gray-500 hover:bg-gray-300" : "text-gray-800 hover:bg-gray-200 hover:border-gray-200 border-gray-500"} border inline-flex justify-center items-center text-sm font-medium tracking-wide gap-x-0.5 transition-all duration-200  px-2 py-1 rounded-lg`}
                >
                  <Plus size={28} />
                  <span>Create</span>
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
