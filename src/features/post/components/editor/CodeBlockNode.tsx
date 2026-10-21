import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CodeBlockView from "./CodeBlockView";

const CodeBlockNode = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockView, {
      contentDOMElementTag: "code",
    });
  },
});

export default CodeBlockNode;
