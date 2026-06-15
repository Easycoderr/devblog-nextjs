import {
  Cog,
  Monitor,
  Palette,
  Settings,
  ShieldCheck,
  UserCircle,
} from "lucide-react";

const Links = [
  {
    href: "/settings/profile",
    label: "Profile",
    icon: <UserCircle className="size-4 md:size-6 mb-[1px]" />,
  },
  {
    href: "/settings/account",
    label: "Account",
    icon: <Settings className="size-4 md:size-6 mb-[1px]" />,
  },
  {
    href: "/settings/security",
    label: "Security",
    icon: <ShieldCheck className="size-4 md:size-6 mb-[1px]" />,
  },
  {
    href: "/settings/appearance",
    label: "Appearance",
    icon: <Palette className="size-4 md:size-6 mb-[1px]" />,
  },
];
export default Links;
