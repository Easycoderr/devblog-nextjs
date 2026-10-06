"use client";

import type { Editor } from "@tiptap/react";
import {
  Bold,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Undo,
} from "lucide-react";
import CodeBlockLanguageSelect from "./CodeBlockLanguageSelect";

type EditorToolbarProps = {
  editor: Editor;
};

function EditorToolbar({ editor }: EditorToolbarProps) {
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
        onClick={() => {
          console.log("H1 clicked");

          const result = editor
            .chain()
            .focus()
            .toggleHeading({ level: 1 })
            .run();

          console.log("H1 result:", result);
        }}
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
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleCodeBlock()
            .updateAttributes("codeBlock", {
              language: "javascript",
            })
            .run()
        }
        title="Code block"
      >
        {"</>"}
      </button>
      <CodeBlockLanguageSelect editor={editor} />
    </div>
  );
}

export default EditorToolbar;
