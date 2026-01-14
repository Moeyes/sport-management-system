export function formatDate(value: string | number | Date, locale: string = "en-US", options?: Intl.DateTimeFormatOptions): string {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", year: "numeric", ...options }).format(date);
}

export function formatTime(value: string | number | Date, locale: string = "en-US", options?: Intl.DateTimeFormatOptions): string {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", ...options }).format(date);
}

export function toISODate(value: string | number | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString();
}

export function formatRelativeTime(value: string | number | Date, locale: string = 'en-US') {
  const now = Date.now();
  const date = value instanceof Date ? value : new Date(value);
  const delta = Math.round((date.getTime() - now) / 1000); // seconds (future positive)

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  const abs = Math.abs(delta);
  if (abs < 60) return rtf.format(Math.round(delta), 'second');
  if (abs < 3600) return rtf.format(Math.round(delta / 60), 'minute');
  if (abs < 86400) return rtf.format(Math.round(delta / 3600), 'hour');
  if (abs < 2592000) return rtf.format(Math.round(delta / 86400), 'day');
  if (abs < 31536000) return rtf.format(Math.round(delta / 2592000), 'month');
  return rtf.format(Math.round(delta / 31536000), 'year');
}
