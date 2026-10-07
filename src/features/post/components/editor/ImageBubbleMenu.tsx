"use client";

import type { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ImageIcon,
  Trash2,
} from "lucide-react";
import ImageSizeDropdown from "./UI/ImageSizeDropdown";

type ImageBubbleMenuProps = {
  editor: Editor;
};

function ImageBubbleMenu({ editor }: ImageBubbleMenuProps) {
  const setAlignment = (alignment: "left" | "center" | "right") => {
    editor.chain().focus().updateAttributes("image", { alignment }).run();
  };

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ editor }) => editor.isActive("image")}
    >
      <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1 shadow-lg">
        <span className="flex items-center gap-1 px-2 text-xs font-medium text-muted-foreground">
          <ImageIcon size={14} />
          Image
        </span>

        <div className="h-5 w-px bg-border" />

        <button
          type="button"
          title="Align left"
          aria-label="Align image left"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => setAlignment("left")}
          className="rounded-md px-2 py-1.5 text-xs hover:bg-muted"
        >
          <AlignLeft size={16} />
        </button>

        <button
          type="button"
          title="Align center"
          aria-label="Align image center"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => setAlignment("center")}
          className="rounded-md px-2 py-1.5 text-xs hover:bg-muted"
        >
          <AlignCenter size={16} />
        </button>

        <button
          type="button"
          title="Align right"
          aria-label="Align image right"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => setAlignment("right")}
          className="rounded-md px-2 py-1.5 text-xs hover:bg-muted"
        >
          <AlignRight size={16} />
        </button>

        <div className="h-5 w-px bg-border" />
        <ImageSizeDropdown editor={editor} />
        <button
          type="button"
          title="Delete image"
          aria-label="Delete image"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => editor.chain().focus().deleteSelection().run()}
          className="rounded-md p-1.5 text-destructive hover:bg-destructive/10"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </BubbleMenu>
  );
}

export default ImageBubbleMenu;
