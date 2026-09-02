export function formatDate(date) {
  if (!date) return "";
  let d;
  // handle both Date objects and date strings
  if (date instanceof Date) {
    d = date;
  } else if (typeof date === "string") {
    const parts = date.slice(0, 10).split("-");
    if (parts.length === 3) {
      d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    } else {
      d = new Date(date);
    }
  } else {
    d = new Date(date);
  }

  if (d instanceof Date && !Number.isNaN(d.getTime())) {
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  return String(date);
}

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
