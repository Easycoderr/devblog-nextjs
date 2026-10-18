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
import { Placeholder } from "@tiptap/extensions";
import { useState } from "react";
import extractTiptapText from "@/lib/utils/extractTiptapText";

const lowlight = createLowlight(common);
type ArticleEditorProps = {
  content?: JSONContent;
  onChange?: (content: JSONContent) => void;
};
function ArticleEditor({ content, onChange }: ArticleEditorProps) {
  const initialContent: JSONContent = content ?? {
    type: "doc",
    content: [{ type: "paragraph" }],
  };

  function countWords(text: string) {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }

  const [wordCount, setWordCount] = useState(() =>
    countWords(extractTiptapText(initialContent)),
  );
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

    content: content ?? {
      type: "doc",
      content: [{ type: "paragraph" }],
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      console.log(json);
      const text = extractTiptapText(json);

      setWordCount(countWords(text));
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
      <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border px-3 py-2 text-xs text-muted-foreground">
        <span>{wordCount.toLocaleString()} words</span>

        <span aria-hidden="true">·</span>

        <span>
          {wordCount === 0
            ? "Less than 1 min read"
            : `~${Math.max(1, Math.ceil(wordCount / 200))} min read`}
        </span>
      </div>
    </div>
  );
}

export default ArticleEditor;
