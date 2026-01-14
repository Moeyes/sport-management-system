import { Province } from "../../../types";
import { loadProvinces } from "../loaders/province.loader";

export async function listProvinceNames(): Promise<string[]> {
  const provinces = await loadProvinces();
  return provinces.map((province) => province.name);
}

export async function findProvinceByName(name: string): Promise<Province | undefined> {
  const provinces = await loadProvinces();
  return provinces.find((province) => province.name === name);
}
