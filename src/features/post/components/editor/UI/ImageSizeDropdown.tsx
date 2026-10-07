"use client";

import type { Editor } from "@tiptap/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ImageSizeDropdownProps = {
  editor: Editor;
};

const sizes = [
  { label: "Small", value: "50%" },
  { label: "Medium", value: "75%" },
  { label: "Full", value: "100%" },
];

function ImageSizeDropdown({ editor }: ImageSizeDropdownProps) {
  const currentWidth =
    (editor.getAttributes("image").imageWidth as string | undefined) ?? "100%";

  function handleChange(value: string) {
    console.log("VALUE:", value);
    const { from } = editor.state.selection;

    editor
      .chain()
      .setNodeSelection(from)
      .updateAttributes("image", {
        width: value,
      })
      .run();
  }

  return (
    <Select defaultValue={currentWidth} onValueChange={handleChange}>
      <SelectTrigger
        className="h-8 w-26.25"
        onPointerDown={(event) => {
          event.preventDefault();
        }}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {sizes.map((size) => (
          <SelectItem key={size.value} value={size.value}>
            {size.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default ImageSizeDropdown;
