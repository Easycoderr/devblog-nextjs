import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function PopoverDialog({ button, children, variant, ...props }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={variant} {...props}>
          {button}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-full">{children}</PopoverContent>
    </Popover>
  );
}

export default PopoverDialog;
