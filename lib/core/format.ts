export function formatNumber(value: number, maximumFractionDigits = 1): string {
  return Number.isFinite(value)
    ? new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value)
    : "-";
}

export function formatPercent(value: number, maximumFractionDigits = 1): string {
  if (!Number.isFinite(value)) return "-";
  return `${value.toFixed(maximumFractionDigits)}%`;
}

export function titleCase(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ");
}
