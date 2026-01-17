export interface TeamMember {
  id?: string;
  firstName: string;
  lastName: string;
  firstNameKh?: string | null;
  lastNameKh?: string | null;
  nationalID?: string | null;
  dateOfBirth?: string | null;
  gender?: 'Male' | 'Female' | null;
  phone?: string | null;
  position?: string | null;
  organization?: any | null;
  photoUrl?: string | null;
  isLeader?: boolean;
}

export interface Team {
  id: string;
  name: string;
  eventId?: string | null;
  sport: string;
  sportId?: string | null;
  sportCategory?: string | null;
  organization?: any | null;
  leaderNationalID?: string | null;
  members: TeamMember[];
  createdAt: string;
  status?: string;
}
