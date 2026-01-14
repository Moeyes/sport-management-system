import { Athlete } from "../../../types";

const athletes: Athlete[] = [];

export async function loadAthletes(): Promise<Athlete[]> {
  return athletes;
}

export async function loadAthleteById(id: string): Promise<Athlete | undefined> {
  return athletes.find((athlete) => athlete.id === id);
}
