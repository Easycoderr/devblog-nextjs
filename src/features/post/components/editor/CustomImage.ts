import Image from "@tiptap/extension-image";
declare module "@tiptap/extension-image" {
  interface SetImageOptions {
    fileId?: string | null;
  }
}
const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fileId: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-imagekit-file-id"),
        renderHTMLL: (attributes: { fileId?: string | null }) =>
          attributes.fileId
            ? { "data-imagekit-file-id": attributes.fileId }
            : {},
      },
      alignment: {
        default: "center",

        parseHTML: (element) =>
          element.getAttribute("data-alignment") || "center",

        renderHTML: (attributes) => ({
          "data-alignment": attributes.alignment,
        }),
      },

      width: {
        default: "100%",

        parseHTML: (element) =>
          element.getAttribute("data-image-width") || "100%",

        renderHTML: (attributes) => ({
          "data-image-width": attributes.width,
        }),
      },
    };
  },
});

export default CustomImage;
