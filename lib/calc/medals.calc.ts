import { Medal } from "../../types";
import { groupBy } from "./groupBy";

export function tallyMedalsByProvince(medals: Medal[]): Record<string, { gold: number; silver: number; bronze: number }> {
  const grouped = groupBy(medals, (medal) => medal.province || "unknown");
  const result: Record<string, { gold: number; silver: number; bronze: number }> = {};
  Object.entries(grouped).forEach(([province, items]) => {
    result[province] = items.reduce(
      (acc, medal) => {
        if (medal.medalType === "gold") acc.gold += 1;
        if (medal.medalType === "silver") acc.silver += 1;
        if (medal.medalType === "bronze") acc.bronze += 1;
        return acc;
      },
      { gold: 0, silver: 0, bronze: 0 }
    );
  });
  return result;
}

export function medalCount(medals: Medal[]): number {
  return medals.length;
}
