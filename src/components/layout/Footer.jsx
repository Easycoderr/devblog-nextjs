"use client";
import Link from "next/link";
import Logo from "../ui/Logo";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="footer"
      className="pt-6 pb-2 bg-background/80 border-t border-t-border flex flex-col"
    >
      <div className="container 2xl:px-10 mx-auto">
        <div className="grid grid-cols-1 gap-4 text-foreground">
          {/* logo */}
          <div className="flex flex-col items-center">
            <span className="mb-3">
              <Logo w={140} h={140} />
            </span>
            <p className="leading-relaxed text-center">
              A platform for developers to share knowledge and grow together.
            </p>
            <div className="bg-gradient-to-l from-transparent mt-2 via-primary to-transparent w-full h-0.5"></div>
          </div>
          {/* links */}
          <div className="flex text-sm text-muted-foreground  gap-8 mx-auto">
            <Link
              href={""}
              className="hover:text-indigo-200 transition-all duration-200"
            >
              Home
            </Link>
            <Link
              href={""}
              className="hover:text-indigo-200 transition-all duration-200"
            >
              Blogs
            </Link>
            <Link
              href={""}
              className="hover:text-indigo-200 transition-all duration-200"
            >
              Featured
            </Link>
            <Link
              href={""}
              className="hover:text-indigo-200 transition-all duration-200"
            >
              Latest
            </Link>
          </div>

          {/* register buttons */}
          <div className="text-muted text-sm mx-auto text-muted-foreground">
            &copy; <span>{year}</span> DevBlog. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
