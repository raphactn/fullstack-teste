export function formatDateForInput(date?: string | Date | null) {
  if (!date) return "";

  return new Date(date).toISOString().slice(0, 10);
}
