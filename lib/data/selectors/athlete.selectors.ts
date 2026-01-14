import { Athlete } from "../../../types";
import { loadAthletes } from "../loaders/athlete.loader";

export async function findAthletesBySport(sportId: string): Promise<Athlete[]> {
  const athletes = await loadAthletes();
  return athletes.filter((athlete) => athlete.sportId === sportId);
}

export async function findAthletesByProvince(provinceName: string): Promise<Athlete[]> {
  const athletes = await loadAthletes();
  return athletes.filter((athlete) => (athlete.province ?? '') === provinceName);
}
