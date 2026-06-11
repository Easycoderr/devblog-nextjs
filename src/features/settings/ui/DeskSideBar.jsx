import Links from "@/config/setting-links";
import NavLink from "./NavLink";
function DeskSideBar() {
  return (
    <div className="sticky top-0 h-screen hidden sm:flex flex-col gap-3 p-2 pt-10 border-r border-border">
      <h1 className="text-2xl font-semibold tracking-wide text-foreground mb-6">
        Settings
      </h1>

      {Links.map((link, index) => (
        <NavLink key={index} href={link.href}>
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}

export default DeskSideBar;
