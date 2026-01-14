import type { SportRecord } from "./sport";

export interface Event {
  id: string;
  name: string;
  title?: string;
  startDate?: string;
  endDate?: string;
  sports: (string | SportRecord)[];
  status?: 'upcoming' | 'ongoing' | 'completed' | string;
}
