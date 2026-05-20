function calcTextRange(text, maxLength) {
  const textLength = text.length;
  return `(${textLength} - ${maxLength})`;
}

export default calcTextRange;
