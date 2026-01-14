export type SportStatus = "Ongoing" | "Completed" | "Upcoming";

export interface Sport {
  id: string;
  name: string;
  eventId?: string;
  category: string;
  description: string;
  maxParticipants: number;
  currentParticipants: number;
  startDate: string;
  endDate: string;
  venue: string;
  status: "active" | "upcoming" | "ongoing" | "completed";
  icon?: string;
}

export interface SportRecord {
  id: string;
  name: string;
  category?: string[];
  categories?: string[];
  participants?: string;
  status: SportStatus;
}
