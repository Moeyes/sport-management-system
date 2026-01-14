
export type MedalType = 'gold' | 'silver' | 'bronze';

export interface Medal {
  id: string;
  athleteId: string;
  athleteName: string;
  athleteNameKh?: string;
  sportId: string;
  sportName: string;
  medalType: MedalType;
  province?: string;
  awardedDate?: string;
  event: string;
}
