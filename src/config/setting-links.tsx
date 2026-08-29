import { Palette, Settings, ShieldCheck, UserCircle } from "lucide-react";

const Links = [
  {
    href: "/settings/profile",
    label: "Profile",
    icon: <UserCircle className="size-4 md:size-6 mb-px" />,
  },
  {
    href: "/settings/account",
    label: "Account",
    icon: <Settings className="size-4 md:size-6 mb-px" />,
  },
  {
    href: "/settings/security",
    label: "Security",
    icon: <ShieldCheck className="size-4 md:size-6 mb-px" />,
  },
  {
    href: "/settings/appearance",
    label: "Appearance",
    icon: <Palette className="size-4 md:size-6 mb-px" />,
  },
];
export default Links;
