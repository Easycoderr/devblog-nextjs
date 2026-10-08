"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorToolbar from "./EditorToolbar";
import { common, createLowlight } from "lowlight";
import CodeBlockNode from "./CodeBlockNode";
import TextAlign from "@tiptap/extension-text-align";
import type { JSONContent } from "@tiptap/core";
import CustomImage from "./CustomImage";
import ImageBubbleMenu from "./ImageBubbleMenu";
const lowlight = createLowlight(common);
type ArticleEditorProps = {
  content?: JSONContent;
  onChange?: (content: JSONContent) => void;
};
function ArticleEditor({ content, onChange }: ArticleEditorProps) {
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
    ],
    content: "<p>Start writing your article...</p>",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      console.log(editor.getJSON());
      onChange?.(editor.getJSON());
    },
  });
  if (!editor) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <EditorToolbar editor={editor} />
      <ImageBubbleMenu editor={editor} />
      <EditorContent className="tiptap" editor={editor} />
    </div>
  );
}

export default ArticleEditor;
