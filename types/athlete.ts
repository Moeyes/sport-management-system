import type { Participation } from './participation'

export interface Athlete extends Participation {
  status: string;
  position: Participation['position'];

  gender: 'Male' | 'Female';

  sportCategory: string;

  // Team support (optional)
  registrationType?: 'individual' | 'team';
  teamId?: string | null;
  teamName?: string | null;
  isTeamLeader?: boolean;

  medals?: {
    gold: number;
    silver: number;
    bronze: number;
  };
}