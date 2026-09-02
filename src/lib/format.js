export function formatDate(date) {
  if (date instanceof Date && !Number.isNaN(date.getTime())) {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  if (typeof date === "string") {
    return date.slice(0, 10);
  }
  return String(date);
}

// helper to get timestamp for sorting
export function dateValue(date) {
  if (!date) return 0;
  if (date instanceof Date) return date.getTime();
  if (typeof date === "string") {
    const parts = date.slice(0, 10).split("-");
    if (parts.length === 3) {
      return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])).getTime();
    }
    return new Date(date).getTime() || 0;
  }
  return new Date(date).getTime() || 0;
}
