import { Medal } from "../../types";

const baseUrl = "/api/medals";

export async function createMedal(payload: Medal): Promise<Medal> {
  const response = await fetch(baseUrl, { method: "POST", body: JSON.stringify(payload) });
  return response.json();
}

export async function updateMedal(id: string, payload: Partial<Medal>): Promise<Medal> {
  const response = await fetch(`${baseUrl}/${id}`, { method: "PUT", body: JSON.stringify(payload) });
  return response.json();
}

export async function deleteMedal(id: string): Promise<void> {
  await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
}
