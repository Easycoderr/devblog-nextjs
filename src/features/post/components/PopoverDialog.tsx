import { Button, buttonVariants } from "@/components/ui/button";

import {
  PopoverContent,
  PopoverTrigger,
  Popover,
} from "@/components/ui/popover";
import { VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
type PopoverDialogProps = VariantProps<typeof buttonVariants> & {
  button: ReactNode;
  children: ReactNode;
  variant: string;
  className?: string;
};
function PopoverDialog({
  button,
  children,
  variant,
  className,
  ...props
}: PopoverDialogProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={variant} className={className} {...props}>
          {button}
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" align="start" className="min-w-full">
        {children}
      </PopoverContent>
    </Popover>
  );
}

export default PopoverDialog;
