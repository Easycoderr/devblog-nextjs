import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/logo.png";

const Links = [
  { label: "Home", href: "/" },
  { label: "Blogs", href: "/Blogs" },
  { label: "Featured Post", href: "/" },
  { label: "Latest Post", href: "/" },
  { label: "About", href: "/" },
];

function Header() {
  return (
    <header>
      {/* container */}
      <div className="flex justify-between items-center container mx-auto rounded-full my-8 bg-black px-6">
        <div className="flex gap-10 items-center">
          {/* logo */}
          <Image src={logo} width="160" height="160" alt="dev logo" />
          <nav className="hidden lg:block">
            <ul className="flex text-text items-center truncate gap-6 font-sans text-lg font-medium tracking-wider">
              {Links.map((link, index) => (
                <Li key={index} href={link.href}>
                  {link.label}
                </Li>
              ))}
            </ul>
          </nav>
        </div>
        {/* sign in buttons */}
        <div className="lg:flex items-center gap-2 hidden">
          <button className="font-sans text-lg font-medium tracking-wider py-2 px-4 bg-gray-100 hover:bg-gray-300 transition-all duration-200 text-black rounded-full my-2">
            Register
          </button>
          <button className="font-sans text-lg font-medium tracking-wider py-2 px-4 bg-accent hover:bg-hover transition-all duration-200 text-indigo-50 rounded-full my-2">
            Sign in
          </button>
        </div>
      </div>
    </header>
  );
}
function Li({ children, href }) {
  return (
    <li>
      <Link
        href={href}
        className="hover:text-indigo-500 transition-all duration-200"
      >
        {children}
      </Link>
    </li>
  );
}
export default Header;
