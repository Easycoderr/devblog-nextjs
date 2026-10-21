"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import {
  NodeViewContent,
  NodeViewWrapper,
  type NodeViewProps,
} from "@tiptap/react";

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

const languageLabels: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  xml: "HTML",
  css: "CSS",
  json: "JSON",
  python: "Python",
  sql: "SQL",
  bash: "Bash",
  plaintext: "Plain Text",
};

function CodeBlockView({ node, updateAttributes }: NodeViewProps) {
  const [copied, setCopied] = useState(false);

  const language = (node.attrs.language as string | null) ?? "javascript";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(node.textContent);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  }

  return (
    <NodeViewWrapper className="my-4 overflow-hidden rounded-xl border border-border bg-zinc-950">
      {/* Header */}
      <div
        contentEditable={false}
        className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2"
      >
        <Select
          value={language}
          onValueChange={(value: string) => {
            updateAttributes({
              language: value,
            });
          }}
        >
          <SelectTrigger className="h-8 w-35 border-0 bg-transparent px-2 text-xs shadow-none">
            <SelectValue>{languageLabels[language] ?? language}</SelectValue>
          </SelectTrigger>

          <SelectContent>
            {languages.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <NodeViewContent className="block overflow-x-auto p-4 text-sm leading-7" />
    </NodeViewWrapper>
  );
}

export default CodeBlockView;
