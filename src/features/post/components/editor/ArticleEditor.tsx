"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorToolbar from "./EditorToolbar";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
const lowlight = createLowlight(common);

function ArticleEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: "<p>Start writing your article...</p>",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      console.log(editor.getJSON());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <EditorToolbar editor={editor} />

      <EditorContent className="tiptap" editor={editor} />
    </div>
  );
}

export default ArticleEditor;
