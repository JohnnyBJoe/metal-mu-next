export function formatDate(
  date: Date | null
): string {
  if (!date) {
    return "Unknown";
  }

  return date.toLocaleDateString("cs-CZ");
}

export function formatYear(
  date: Date | null
): string {
  if (!date) {
    return "";
  }

  return date.getFullYear().toString();
}

export function formatActiveYears(
  start: Date | null,
  end: Date | null
): string {
  if (!start) {
    return "";
  }

  const from = start.getFullYear();

  if (!end) {
    return `${from}–active`;
  }

  return `${from}–${end.getFullYear()}`;
}