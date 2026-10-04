"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function ArticleEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start writing your article...</p>",
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} />;
}

export default ArticleEditor;
