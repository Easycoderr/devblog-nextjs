"use client";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";
import Logo from "../components/Logo";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useActiveSection from "../hooks/useActiveSection";

const Links = [
  { id: "home", label: "Home", href: "/" },
  { id: "blogs", label: "Blogs", href: "/blogs" },
  { id: "about", label: "About", href: "#about" },
];

function Header() {
  const activeSection = useActiveSection(Links);
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setSticky(entry.isIntersecting);
        console.log(entry.isIntersecting);
      });
    });
    const id = document.getElementById("home");
    if (id) {
      observer.observe(id);
    }
    return () => observer.disconnect();
  }, [sticky]);

  return (
    <header
      className={`${!sticky && "sticky z-60 right-0 left-0 top-6"} px-2 md:px-0  left-0 right-0 w-full container 2xl:px-10 mx-auto`}
    >
      {/* container */}
      <div className="transition-all duration-200 rounded-4xl lg:rounded-full mt-6 bg-black/80 backdrop-blur-md">
        <div className="flex justify-between items-center">
          <div className="flex gap-10 items-center z-20">
            {/* logo */}
            <div className="ml-6">
              <Logo w={160} h={160} />
            </div>
            <nav className="hidden lg:block">
              <ul className="flex text-text items-center truncate gap-6 font-sans text-md font-medium tracking-wider">
                {Links.map((link, index) => (
                  <Li
                    key={index}
                    id={link.id}
                    activeSection={activeSection}
                    href={link.href}
                    pathname={pathname}
                  >
                    {link.label}
                  </Li>
                ))}
              </ul>
            </nav>
          </div>
          {/* sign in buttons */}
          <div className="lg:flex items-center mr-2 gap-2 hidden">
            <button className="font-sans font-medium tracking-wider py-2 px-4 bg-gray-100 hover:bg-gray-300 transition-all duration-200 text-black rounded-full my-2 active:scale-105">
              Register
            </button>
            <button className="font-sans font-medium tracking-wider py-2 px-4 bg-accent hover:bg-hover transition-all duration-200 text-indigo-50 rounded-full my-2 active:scale-105">
              Sign in
            </button>
          </div>
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
        <nav className={`${!isExpanded && "hidden"} lg:hidden h-38`}>
          <div
            className={`h-0.5 ${isExpanded && "w-full"} bg-gray-600 mb-4 transition-all duration-200`}
          ></div>
          <ul className="flex text-text flex-col items-center truncate gap-6 font-sans text-md font-medium tracking-wider">
            {Links.map((link, index) => (
              <Li
                key={index}
                id={link.id}
                activeSection={activeSection}
                href={link.href}
                pathname={pathname}
              >
                {link.label}
              </Li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
function Li({ children, href, pathname, id, activeSection }) {
  return (
    <li>
      <Link
        href={href}
        className={`${id === activeSection || (pathname === href && "active")} hover:text-hover transition-all duration-200`}
      >
        {children}
      </Link>
    </li>
  );
}
export default Header;
