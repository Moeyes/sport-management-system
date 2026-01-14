import { Sport } from "../../../types";
import { loadSports } from "../loaders/sport.loader";

export async function findSportsByEvent(eventId: string): Promise<Sport[]> {
  const sports = await loadSports();
  return sports.filter((sport) => sport.eventId === eventId);
}

export async function listSportNames(): Promise<string[]> {
  const sports = await loadSports();
  return sports.map((sport) => sport.name);
}
