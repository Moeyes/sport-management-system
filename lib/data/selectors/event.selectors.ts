import { Event } from "../../../types";
import { loadEvents } from "../loaders/event.loader";

export async function findActiveEvents(now: Date = new Date()): Promise<Event[]> {
  const events = await loadEvents();
  return events.filter((event) => {
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    return start <= now && now <= end;
  });
}

export async function findEventNames(): Promise<string[]> {
  const events = await loadEvents();
  return events.map((event) => event.name);
}
