import { Medal } from "../../types";
import { toCsv } from "./csv";

export function exportMedalsToCsv(medals: Medal[]): string {
  const rows = medals.map((medal) => ({
    id: medal.id,
    event: medal.event,
    athleteId: medal.athleteId,
    medalType: medal.medalType,
  }));
  return toCsv(rows);
}
