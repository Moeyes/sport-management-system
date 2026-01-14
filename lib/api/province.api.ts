import { Province } from "../../types";

const baseUrl = "/api/provinces";

export async function createProvince(payload: Province): Promise<Province> {
  const response = await fetch(baseUrl, { method: "POST", body: JSON.stringify(payload) });
  return response.json();
}

export async function updateProvince(id: string, payload: Partial<Province>): Promise<Province> {
  const response = await fetch(`${baseUrl}/${id}`, { method: "PUT", body: JSON.stringify(payload) });
  return response.json();
}

export async function deleteProvince(id: string): Promise<void> {
  await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
}
