"use client";

import { memo, useEffect, useState } from "react";
import type { Editor } from "@tiptap/core";

type EditorStatsProps = {
  editor: Editor;
};

function countWords(text: string): number {
  const trimmed = text.trim();

  return trimmed ? trimmed.split(/\s+/).length : 0;
}

function getWordCount(editor: Editor): number {
  return countWords(editor.getText({ blockSeparator: " " }));
}

function EditorStats({ editor }: EditorStatsProps) {
  const [wordCount, setWordCount] = useState(() => getWordCount(editor));

  useEffect(() => {
    const handleUpdate = () => {
      setWordCount(getWordCount(editor));
    };

    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor]);

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

export default memo(EditorStats);
