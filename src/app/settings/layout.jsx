import DeskSideBar from "@/features/settings/ui/DeskSideBar";
import MobSideBar from "@/features/settings/ui/MobSideBar";

const Links = [
  {
    href: "/settings/profile",
    label: "Profile",
  },
  {
    href: "/settings/account",
    label: "Account",
  },
  {
    href: "/settings/security",
    label: "Security",
  },
];
function layout({ children }) {
  return (
    <div className="sm:grid sm:grid-cols-[150px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[300px_1fr] gap-8 min-h-screen px-10 container mx-auto">
      <MobSideBar />
      <DeskSideBar />
      <div className="pt-10">{children}</div>
    </div>
  );
}

export default layout;
