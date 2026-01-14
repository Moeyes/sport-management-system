import { Athlete } from "../../types";
import { toCsv } from "./csv";

export function exportAthletesToCsv(athletes: Athlete[]): string {
  const rows = athletes.map((athlete) => ({ 
    id: athlete.id, 
    name: athlete.firstName || athlete.lastName ? `${athlete.firstName ?? ''} ${athlete.lastName ?? ''}`.trim() : (athlete.email ?? ''), 
    sportId: athlete.sportId ?? '', 
  }));
  return toCsv(rows);
}
