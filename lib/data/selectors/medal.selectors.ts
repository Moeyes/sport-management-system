import { Medal } from "../../../types";
import { loadMedals } from "../loaders/medal.loader";

export async function findMedalsByAthlete(athleteId: string): Promise<Medal[]> {
  const medals = await loadMedals();
  return medals.filter((medal) => medal.athleteId === athleteId);
}

export async function findMedalsByProvince(provinceName: string): Promise<Medal[]> {
  const medals = await loadMedals();
  return medals.filter((medal) => (medal.province ?? '') === provinceName);
}
