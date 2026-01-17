//participant 
export type ParticipationGender = 'Male' | 'Female' 
export type ParticipationNationality = 'IDCard' | 'BirthCertificate'
export type ParticipationPosition = 'Athlete' | 'Leader' | 'Technical'
export type ParticipationOrganization = 'province' | 'ministry' | string

export interface PositionInfo {
  role: ParticipationPosition;
  coach?: string;
  assistant?: string;
  leaderRole?: string;
  athleteCategory?: ParticipationGender;
}

export interface OrganizationInfo {
  // Unified organization info (supports provinces and ministries)
  type: ParticipationOrganization;
  // id and name reference the unified organizations dataset
  id?: string;
  name?: string;
  // legacy fields kept for compatibility
  province?: string;
  department?: string;
}

export interface Participation {
  registeredAt: string | number | Date;
  id: string;
  firstName: string;
  lastName: string;
  firstNameKh: string;
  lastNameKh: string;
  gender: ParticipationGender;
  dateOfBirth: string;
  nationality : ParticipationNationality;
  position: PositionInfo;
  organization: OrganizationInfo; 
  photoUrl: string;
  phone: string;
  sports: string[];
  eventId?: string;
}

