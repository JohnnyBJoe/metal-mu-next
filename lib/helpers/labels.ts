export function normalizeLabel(label: string): string {
  const index = label.indexOf("(");

  if (index === -1) {
    return label.trim();
  }

  return label.substring(0, index).trim();
}