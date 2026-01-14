import { Sport } from "../../types";

const baseUrl = "/api/sports";

export async function createSport(payload: Sport): Promise<Sport> {
  const response = await fetch(baseUrl, { method: "POST", body: JSON.stringify(payload) });
  return response.json();
}

export async function updateSport(id: string, payload: Partial<Sport>): Promise<Sport> {
  const response = await fetch(`${baseUrl}/${id}`, { method: "PUT", body: JSON.stringify(payload) });
  return response.json();
}

export async function deleteSport(id: string): Promise<void> {
  await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
}
