"use client";

import type { Editor } from "@tiptap/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "HTML", value: "xml" },
  { label: "CSS", value: "css" },
  { label: "JSON", value: "json" },
  { label: "Python", value: "python" },
  { label: "SQL", value: "sql" },
  { label: "Bash", value: "bash" },
];

type CodeBlockLanguageSelectProps = {
  editor: Editor;
};

function CodeBlockLanguageSelect({ editor }: CodeBlockLanguageSelectProps) {
  if (!editor.isActive("codeBlock")) {
    return null;
  }

  const language =
    (editor.getAttributes("codeBlock").language as string | null) ??
    "javascript";

  return (
    <Select
      value={language}
      onValueChange={(value) => {
        editor
          .chain()
          .focus()
          .updateAttributes("codeBlock", {
            language: value,
          })
          .run();
      }}
    >
      <SelectTrigger className="h-8 w-32.5">
        <SelectValue placeholder="Language" />
      </SelectTrigger>

      <SelectContent>
        {languages.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CodeBlockLanguageSelect;
