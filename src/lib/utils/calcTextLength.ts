function calcTextRange(text: string[] = [], maxLength: number): string {
  const textLength = text.length;
  return `(${textLength}/${maxLength})`;
}

export default calcTextRange;
