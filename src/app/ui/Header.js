"use client";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";
import Logo from "../components/Logo";
import { useState } from "react";

const Links = [
  { label: "Home", href: "/" },
  { label: "Blogs", href: "/Blogs" },
  { label: "About", href: "/" },
];

function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <header className="absolute px-2 md:px-0  left-0 right-0 w-full container 2xl:px-10 mx-auto ">
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
                  <Li key={index} href={link.href}>
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
              <Li key={index} href={link.href}>
                {link.label}
              </Li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
function Li({ children, href }) {
  return (
    <li>
      <Link
        href={href}
        className="hover:text-hover transition-all duration-200"
      >
        {children}
      </Link>
    </li>
  );
}
export default Header;
