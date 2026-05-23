import { HelpCircle, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOutUser } from "@/lib/actions/auth";
import ConfirmationAlertDialog from "../ConfirmationAlertDialog";
import ConfirmSignOutAction from "./ConfirmSignOutAction";
function ProfileDropDownMenu({ user }) {
  const { name, avatar, email, firstName, lastName } = user;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative h-10 w-10 rounded-full" variant="ghost">
          <Avatar>
            <AvatarImage
              alt={`${firstName || "User"}'s profile picture`}
              src={avatar}
            />
            <AvatarFallback>
              {firstName[0]}
              {lastName[0]}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" sideOffset={12}>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="font-medium text-sm leading-none">{name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="!text-current" />
          <span className="!text-current">Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HelpCircle />
          Help
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onSelect={(e) => e.preventDefault()}
        >
          <ConfirmationAlertDialog
            alertTitle="Signout"
            button={
              <span className="flex items-center gap-2">
                <LogOut />
                Signout
              </span>
            }
            message="Are you sure you want to sign out?"
            icon={<LogOut />}
          >
            <ConfirmSignOutAction />
          </ConfirmationAlertDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropDownMenu;
