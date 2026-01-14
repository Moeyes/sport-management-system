import { Event } from "../../../types";
import eventsData from "../mock/events.json";

const events: Event[] = eventsData as Event[];

export async function loadEvents(): Promise<Event[]> {
  return events;
}

export async function loadEventById(id: string): Promise<Event | undefined> {
  return events.find((evt) => evt.id === id);
}
