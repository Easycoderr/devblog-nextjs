"use client";

import { useState } from "react";
import type { Editor } from "@tiptap/react";
import { ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Input from "@/components/ui/Input";

type ImageAltTextProps = {
  editor: Editor;
};

function ImageAltText({ editor }: ImageAltTextProps) {
  const currentAlt = (editor.getAttributes("image").alt as string | null) ?? "";

  const [alt, setAlt] = useState(currentAlt);

  function handleSave() {
    editor
      .chain()
      .focus()
      .updateAttributes("image", {
        alt: alt.trim(),
      })
      .run();
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          title="Edit alt text"
          aria-label="Edit image alt text"
        >
          <ImageIcon size={16} />
          <span className="hidden sm:inline">Alt</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium">Image alt text</h3>
            <p className="text-xs text-muted-foreground">
              Describe the image briefly for accessibility.
            </p>
          </div>

          <Input
            label="Describe image"
            value={alt}
            onChange={(event) => setAlt(event.target.value)}
            placeholder="Describe this image..."
          />

          <Button
            type="button"
            size="sm"
            className="w-full"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ImageAltText;
