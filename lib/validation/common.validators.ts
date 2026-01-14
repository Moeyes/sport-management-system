export function requireField(label: string, value: unknown): string | null {
  if (value === null || value === undefined || value === "") return `${label} is required`;
  return null;
}

export function ensurePositive(label: string, value: number): string | null {
  return value > 0 ? null : `${label} must be positive`;
}
