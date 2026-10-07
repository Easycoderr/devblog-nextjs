"use client";

import type { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Check,
  ChevronDown,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TextAlignDropdownProps = {
  editor: Editor;
};

const alignments = [
  {
    value: "left",
    label: "Align left",
    icon: AlignLeft,
  },
  {
    value: "center",
    label: "Align center",
    icon: AlignCenter,
  },
  {
    value: "right",
    label: "Align right",
    icon: AlignRight,
  },
  {
    value: "justify",
    label: "Justify",
    icon: AlignJustify,
  },
] as const;

function TextAlignDropdown({ editor }: TextAlignDropdownProps) {
  if (editor.isActive("codeBlock")) {
    return null;
  }

  const currentAlignment =
    editor.getAttributes("paragraph").textAlign ??
    editor.getAttributes("heading").textAlign ??
    "left";

  const current =
    alignments.find((item) => item.value === currentAlignment) ?? alignments[0];

  const CurrentIcon = current.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          className="inline-flex items-center gap-1 rounded-md p-2 hover:bg-muted"
          title="Text alignment"
        >
          <CurrentIcon size={18} />
          <ChevronDown size={14} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        {alignments.map((item) => {
          const Icon = item.icon;
          const isActive = currentAlignment === item.value;

          return (
            <DropdownMenuItem
              key={item.value}
              onSelect={() => {
                editor.chain().focus().setTextAlign(item.value).run();
              }}
            >
              <Icon size={18} />
              <span>{item.label}</span>

              {isActive && <Check className="ml-auto" size={16} />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TextAlignDropdown;
