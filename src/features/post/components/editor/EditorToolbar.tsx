"use client";
import { useRef, useState } from "react";
import uploadEditorImage from "@/lib/actions/editor/uploadEditorImage";
import type { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Code2Icon,
  Heading1,
  Heading2,
  ImageIcon,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  Redo,
  Undo,
} from "lucide-react";

type EditorToolbarProps = {
  editor: Editor;
};

function EditorToolbar({ editor }: EditorToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  function handleCodeBlock() {
    const { from, to } = editor.state.selection;

    // If we're already inside a code block, toggle it off.
    if (editor.isActive("codeBlock")) {
      editor.chain().focus().toggleCodeBlock().run();
      return;
    }

    // No selection → normal code block.
    if (from === to) {
      editor
        .chain()
        .focus()
        .setCodeBlock()
        .updateAttributes("codeBlock", {
          language: "javascript",
        })
        .run();

      return;
    }

    // Multiple selected blocks → ONE code block.
    const selectedText = editor.state.doc.textBetween(from, to, "\n");

    editor.commands.insertContentAt(
      { from, to },
      {
        type: "codeBlock",
        attrs: {
          language: "javascript",
        },
        content: selectedText
          ? [{ type: "text", text: selectedText }]
          : undefined,
      },
      {
        updateSelection: true,
      },
    );
  }
  return (
    <div className="flex items-center gap-1 border-b border-border p-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo"
        className="rounded-md p-2 hover:bg-muted disabled:opacity-40"
      >
        <Undo size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo"
        className="rounded-md p-2 hover:bg-muted disabled:opacity-40"
      >
        <Redo size={18} />
      </button>

      <div className="mx-1 h-6 w-px bg-border" />

      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        title="Paragraph"
        className={`rounded-md p-2 hover:bg-muted ${
          editor.isActive("paragraph") ? "bg-muted" : ""
        }`}
      >
        P
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        title="Heading 1"
        className={`rounded-md p-2 hover:bg-muted ${
          editor.isActive("heading", { level: 1 }) ? "bg-muted" : ""
        }`}
      >
        <Heading1 size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        title="Heading 2"
        className={`rounded-md p-2 hover:bg-muted ${
          editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""
        }`}
      >
        <Heading2 size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Bold"
        className={`rounded-md p-2 hover:bg-muted ${
          editor.isActive("bold") ? "bg-muted" : ""
        }`}
      >
        <Bold size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="Italic"
        className={`rounded-md p-2 hover:bg-muted ${
          editor.isActive("italic") ? "bg-muted" : ""
        }`}
      >
        <Italic size={18} />
      </button>
      <button
        type="button"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => editor.chain().focus().toggleCode().run()}
        title="Inline code"
        className={`rounded-md p-2 hover:bg-muted ${
          editor.isActive("code") ? "bg-muted" : ""
        }`}
      >
        <Code size={18} />
      </button>
      <>
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          title="Insert image"
          disabled={isUploadingImage}
          className="rounded-md p-2 hover:bg-muted disabled:opacity-50"
        >
          <ImageIcon size={18} />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (event) => {
            const file = event.target.files?.[0];

            if (!file) return;

            setIsUploadingImage(true);

            try {
              const formData = new FormData();
              formData.append("image", file);

              const result = await uploadEditorImage(formData);

              if (!result.success) {
                console.error(result.message);
                return;
              }

              editor
                .chain()
                .focus()
                .setImage({
                  src: result.url,
                  alt: file.name,
                })
                .run();
            } finally {
              setIsUploadingImage(false);

              // Allows selecting the same image again later.
              event.target.value = "";
            }
          }}
        />
      </>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title="Bullet list"
        className={`rounded-md p-2 hover:bg-muted ${
          editor.isActive("bulletList") ? "bg-muted" : ""
        }`}
      >
        <List size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        title="Numbered list"
        className={`rounded-md p-2 hover:bg-muted ${
          editor.isActive("orderedList") ? "bg-muted" : ""
        }`}
      >
        <ListOrdered size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        title="Blockquote"
        className={`rounded-md p-2 hover:bg-muted ${
          editor.isActive("blockquote") ? "bg-muted" : ""
        }`}
      >
        <Quote size={18} />
      </button>
      <button
        type="button"
        onClick={handleCodeBlock}
        title="Code block"
        className={`rounded-md p-2 hover:bg-muted ${
          editor.isActive("codeblock") ? "bg-muted" : ""
        }`}
      >
        <Code2Icon size={19} />
      </button>
      <button
        type="button"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => {
          if (editor.isActive("link")) {
            editor.chain().focus().unsetLink().run();
            return;
          }

          const url = window.prompt("Enter URL");

          if (!url) return;

          editor
            .chain()
            .focus()
            .setLink({
              href: url,
              target: "_blank",
            })
            .run();
        }}
        title="Add link"
        className={`rounded-md p-2 hover:bg-muted ${
          editor.isActive("link") ? "bg-muted" : ""
        }`}
      >
        <Link size={18} />
      </button>
    </div>
  );
}

export default EditorToolbar;
