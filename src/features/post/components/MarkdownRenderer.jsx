"use client";
import { Copy } from "lucide-react";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { toast } from "sonner";

function MarkdownRenderer({ content }) {
  function handleCopyToClipboard(children) {
    try {
      navigator.clipboard.writeText(String(children));
      toast.success("Code copied!");
    } catch (error) {
      console.log("Clipboard API is NOT supported");
      toast.error("Clipboard API is NOT supported");
    }
  }

  return (
    <Markdown
      components={{
        code(props) {
          const { children, className } = props;

          return (
            <div className="relative">
              <button
                className="absolute top-2 right-2 flex items-center gap-1  text-sm bg-card text-foreground px-2 py-1 rounded focus:opacity-80 active:scale-105 hover:opacity-90 "
                onClick={() => handleCopyToClipboard(children)}
              >
                <Copy size={17} />
                Copy
              </button>

              <SyntaxHighlighter
                language="javascript"
                className="rounded-xl bg-card"
              >
                {String(children)}
              </SyntaxHighlighter>
            </div>
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
}

export default MarkdownRenderer;
