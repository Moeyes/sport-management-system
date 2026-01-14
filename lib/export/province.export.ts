import { Province } from "../../types";
import { toCsv } from "./csv";

export function exportProvincesToCsv(provinces: Province[]): string {
  const rows = provinces.map((province) => ({ 
    id: province.id,
    name: province.name,
    athleteCount: province.athleteCount,
  }));
  return toCsv(rows);
}
