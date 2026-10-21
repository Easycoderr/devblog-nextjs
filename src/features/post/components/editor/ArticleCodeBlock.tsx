"use client";

import { Check, Copy } from "lucide-react";
import { useState, type ReactNode } from "react";
import { common, createLowlight } from "lowlight";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

type ArticleCodeBlockProps = {
  language?: string | null;
  children: ReactNode;
};

const lowlight = createLowlight(common);

const languageLabels: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  xml: "HTML",
  css: "CSS",
  json: "JSON",
  python: "Python",
  sql: "SQL",
  bash: "Bash",
};

function ArticleCodeBlock({ language, children }: ArticleCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const label = languageLabels[language ?? ""] ?? language ?? "Code";

  const code = extractText(children);

  const highlighted = language
    ? lowlight.highlight(language, code)
    : lowlight.highlightAuto(code);

  const highlightedCode = toJsxRuntime(highlighted, {
    Fragment,
    jsx,
    jsxs,
  });

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  }

  return (
    <div className="code-card my-6 overflow-hidden rounded-lg border not-prose">
      <div className="code-card-header flex items-center justify-between px-4 py-2.5">
        <span className="code-card-language text-xs font-medium">{label}</span>

        <button
          type="button"
          onClick={handleCopy}
          className="code-card-copy inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs transition"
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

      <pre className="m-0 overflow-x-auto p-4">
        <code className="text-sm leading-7">{highlightedCode}</code>
      </pre>
    </div>
  );
}

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }

  if (node && typeof node === "object" && "props" in node) {
    return extractText((node.props as { children?: ReactNode }).children);
  }

  return "";
}

export default ArticleCodeBlock;
