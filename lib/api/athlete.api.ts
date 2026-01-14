import { Athlete } from "../../types";

const baseUrl = "/api/athletes";

export async function createAthlete(payload: Athlete): Promise<Athlete> {
  const response = await fetch(baseUrl, { method: "POST", body: JSON.stringify(payload) });
  return response.json();
}

export async function updateAthlete(id: string, payload: Partial<Athlete>): Promise<Athlete> {
  const response = await fetch(`${baseUrl}/${id}`, { method: "PUT", body: JSON.stringify(payload) });
  return response.json();
}

export async function deleteAthlete(id: string): Promise<void> {
  await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
}
