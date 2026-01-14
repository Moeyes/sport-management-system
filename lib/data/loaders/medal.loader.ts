import { Medal } from "../../../types";

const medals: Medal[] = [];

export async function loadMedals(): Promise<Medal[]> {
  return medals;
}

export async function loadMedalsByEvent(eventId: string): Promise<Medal[]> {
  return medals.filter((medal) => medal.event === eventId);
}
