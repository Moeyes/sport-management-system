// Simple className joiner for Tailwind-friendly merges
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
