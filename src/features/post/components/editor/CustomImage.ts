import Image from "@tiptap/extension-image";

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),

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
          "data-image-width": attributes.imageWidth,
        }),
      },
    };
  },
});

export default CustomImage;
