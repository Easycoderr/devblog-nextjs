"use client";

import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";

type EditorStatsProps = {
  editor: Editor;
};

function countWords(text: string): number {
  const trimmed = text.trim();

  return trimmed ? trimmed.split(/\s+/).length : 0;
}

function EditorStats({ editor }: EditorStatsProps) {
  const doc = useEditorState({
    editor,
    selector: ({ editor }) => editor.state.doc,
    equalityFn: (prev, next) => prev === next,
  });

  const text = doc.textBetween(0, doc.content.size, " ");
  const wordCount = countWords(text);

  return (
    <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border px-3 py-2 text-xs text-muted-foreground">
      <span>{wordCount.toLocaleString()} words</span>

      <span aria-hidden="true">·</span>

      <span>
        {wordCount === 0
          ? "Less than 1 min read"
          : `~${Math.max(1, Math.ceil(wordCount / 200))} min read`}
      </span>
    </div>
  );
}

export default EditorStats;
