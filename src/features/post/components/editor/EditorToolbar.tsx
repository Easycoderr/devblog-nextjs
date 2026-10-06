"use client";

import type { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Code2Icon,
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
    </div>
  );
}

export default EditorToolbar;
