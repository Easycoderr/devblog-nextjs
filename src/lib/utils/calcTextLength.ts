function calcTextRange(text: string, maxLength: number): string {
  const textLength = text.length || 0;
  return `(${textLength}/${maxLength})`;
}

export default calcTextRange;
