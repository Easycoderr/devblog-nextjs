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
    };
  },
});

export default CustomImage;
