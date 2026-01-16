import type { Organization } from "@/types";

const baseUrl = "/api/organizations";

export async function fetchOrganizations(): Promise<Organization[]> {
  const r = await fetch(baseUrl);
  return r.json();
}

export async function createOrganization(payload: Organization): Promise<Organization> {
  const response = await fetch(baseUrl, { method: "POST", body: JSON.stringify(payload) });
  return response.json();
}

export async function updateOrganization(id: string, payload: Partial<Organization>): Promise<Organization> {
  const response = await fetch(`${baseUrl}/${id}`, { method: "PUT", body: JSON.stringify(payload) });
  return response.json();
}

export async function deleteOrganization(id: string): Promise<void> {
  await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
}
