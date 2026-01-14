import { Athlete } from "../../types";
import { groupBy } from "./groupBy";

export function countAthletesBySport(athletes: Athlete[]): Record<string, number> {
  const grouped = groupBy(athletes, (athlete) => athlete.sportId ?? 'unknown');
  return Object.fromEntries(Object.entries(grouped).map(([sportId, list]) => [sportId, list.length]));
}

function computeAgeFromDob(dob?: string): number | null {
  if (!dob) return null;
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
}

export function averageAge(athletes: Athlete[]): number {
  if (!athletes.length) return 0;
  const ages = athletes.map(a => computeAgeFromDob(a.dateOfBirth)).filter((n): n is number => typeof n === 'number');
  if (!ages.length) return 0;
  const total = ages.reduce((s, v) => s + v, 0);
  return total / ages.length;
}
