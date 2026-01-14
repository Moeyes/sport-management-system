import { Event } from "../../types";
import { toCsv } from "./csv";

export function exportEventsToCsv(events: Event[]): string {
  const rows = events.map((event) => ({ id: event.id, name: event.name, startDate: event.startDate, endDate: event.endDate }));
  return toCsv(rows);
}
