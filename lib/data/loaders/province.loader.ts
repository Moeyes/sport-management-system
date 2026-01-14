import { Province } from "../../../types";

const provinces: Province[] = [];

export async function loadProvinces(): Promise<Province[]> {
  return provinces;
}

export async function loadProvinceById(id: string): Promise<Province | undefined> {
  return provinces.find((province) => province.id === id);
}

export async function loadProvinceByName(name: string): Promise<Province | undefined> {
  return provinces.find((province) => province.name === name);
}
