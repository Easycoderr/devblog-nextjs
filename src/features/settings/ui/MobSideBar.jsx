import Links from "@/config/setting-links";
import NavLink from "./NavLink";

function MobSideBar() {
  return (
    <div className="sm:hidden">
      <h1 className="text-2xl font-semibold tracking-wide text-foreground mb-6">
        Settings
      </h1>{" "}
      <div className="flex text-center gap-2 overflow-x-auto">
        {Links.map((link, index) => (
          <NavLink key={index} href={link.href}>
            {link.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default MobSideBar;
