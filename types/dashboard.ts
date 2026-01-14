export interface DashboardStats {
  totalAthletes: number;
  totalSports: number;
  totalProvinces: number;
  totalMedals: number;
  activeCompetitions: number;
  pendingRegistrations: number;
}

export interface RecentRegistration {
  id: string;
  athleteId?: string;
  athleteName: string;
  sport: string;
  province: string;
  registrationDate: string;
  status: 'pending' | 'approved' | 'rejected';
}
