"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorToolbar from "./EditorToolbar";
import lowlight from "./lowlight-config";
import CodeBlockNode from "./CodeBlockNode";
import TextAlign from "@tiptap/extension-text-align";
import type { JSONContent } from "@tiptap/core";
import CustomImage from "./CustomImage";
import ImageBubbleMenu from "./ImageBubbleMenu";
import { Placeholder } from "@tiptap/extensions";
import { memo, useState } from "react";
import extractTiptapText from "@/lib/utils/extractTiptapText";
import EditorStats from "./EditorStats";

type ArticleEditorProps = {
  content?: JSONContent;
  onChange?: (content: JSONContent) => void;
  onBlur: () => void;
};
function ArticleEditor({ content, onChange, onBlur }: ArticleEditorProps) {
  const initialContent: JSONContent = content ?? {
    type: "doc",
    content: [{ type: "paragraph" }],
  };

  function countWords(text: string) {
    const trimmed = text.trim();

    return trimmed ? trimmed.split(/\s+/).length : 0;
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
        codeBlock: false,
      }),
      CodeBlockNode.configure({
        lowlight,
      }),
      CustomImage,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Start writing your article...",
      }),
    ],
    onBlur: () => onBlur?.(),
    content: content ?? {
      type: "doc",
      content: [{ type: "paragraph" }],
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();

      onChange?.(json);
    },
  });
  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-editor overflow-hidden rounded-xl border border-border">
      <EditorToolbar editor={editor} />
      <div className="tiptap">
        <ImageBubbleMenu editor={editor} />
      </div>
      <EditorContent editor={editor} />
      <EditorStats editor={editor} />
    </div>
  );
}

export default memo(ArticleEditor);
