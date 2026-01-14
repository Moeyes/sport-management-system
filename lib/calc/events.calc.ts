import { Event } from "../../types";

export function totalEventDays(event: Event): number {
  const start = new Date(event.startDate).getTime();
  const end = new Date(event.endDate).getTime();
  return Math.max(0, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);
}
