"use client";
import Link from "next/link";
import Logo from "../components/Logo";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="footer"
      className="mt-auto pt-6 pb-2 bg-black/80 flex  flex-col"
    >
      <div className="container 2xl:px-10 mx-auto">
        <div className="grid grid-cols-1 gap-4">
          {/* logo */}
          <div className="flex flex-col items-center">
            <span className="mb-3">
              <Logo w={140} h={140} />
            </span>
            <p className="text-gray-50 leading-relaxed text-center">
              A platform for developers to share knowledge and grow together.
            </p>
            <div className="bg-gradient-to-l from-transparent mt-2 via-purple-500 to-transparent w-full h-0.5"></div>
          </div>
          {/* links */}
          <div className="flex text-sm text-gray-100  gap-8 mx-auto">
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
          <div className="text-muted text-sm mx-auto">
            © <span>{year}</span> DevBlog. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
