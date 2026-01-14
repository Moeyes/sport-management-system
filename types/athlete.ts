import type { Participation } from './participation'

export interface Athlete extends Participation {
  status: string;
  position: 'Athlete';

  gender: 'Male' | 'Female';

  sportCategory: string;

  medals?: {
    gold: number;
    silver: number;
    bronze: number;
  };
}