function categoryColorPicker(category) {
  const categoryType = category.toLowerCase();
  let categoryColor = "text-indigo-50 bg-indigo-500";
  switch (categoryType) {
    case "javascript":
      categoryColor = "text-yellow-50 bg-yellow-500";
      break;
    case "css":
      categoryColor = "text-blue-50 bg-blue-500";
      break;
    case "python":
      categoryColor = "text-cyan-50 bg-cyan-500";
      break;
  }
  return categoryColor;
}

export default categoryColorPicker;
