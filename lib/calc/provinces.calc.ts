import { Province } from "../../types";

export function provinceParticipationRate(provinces: Province[], participatingCodes: string[]): number {
  if (!provinces.length) return 0;
  const unique = new Set(participatingCodes);
  return unique.size / provinces.length;
}
