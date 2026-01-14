import { Event } from "../../types";

const baseUrl = "/api/events";

export async function createEvent(payload: Event): Promise<Event> {
  const response = await fetch(baseUrl, { method: "POST", body: JSON.stringify(payload) });
  return response.json();
}

export async function updateEvent(id: string, payload: Partial<Event>): Promise<Event> {
  const response = await fetch(`${baseUrl}/${id}`, { method: "PUT", body: JSON.stringify(payload) });
  return response.json();
}

export async function deleteEvent(id: string): Promise<void> {
  await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
}
