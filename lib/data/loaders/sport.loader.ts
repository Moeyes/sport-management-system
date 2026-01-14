import { Sport } from "../../../types";

const sports: Sport[] = [];

export async function loadSports(): Promise<Sport[]> {
  return sports;
}

export async function loadSportById(id: string): Promise<Sport | undefined> {
  return sports.find((sport) => sport.id === id);
}
