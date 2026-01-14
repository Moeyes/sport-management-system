export function toCsv(rows: Array<Record<string, string | number>>): string {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const escape = (value: string | number) => {
    const str = String(value ?? "");
    if (str.includes(",") || str.includes("\n")) return `"${str.replace(/"/g, '""')}"`;
    return str;
  };
  const lines = [headers.join(","), ...rows.map((row) => headers.map((key) => escape(row[key])).join(","))];
  return lines.join("\n");
}
