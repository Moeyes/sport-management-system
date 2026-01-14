//participant 
export type ParticipationGender = 'Male' | 'Female' | 'Other'
export type ParticipationNationality = 'IDCard' | 'BirthCertificate'
export type ParticipationPosition = 'Athlete' | 'Leader' | 'Technical'
export type ParticipationOrganization = 'Province' | 'Ministry'


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
  position: ParticipationPosition;
  organization: ParticipationOrganization; 

  photoUrl: string;
  phone: string;

  sports: string[];
  registrationDate: string;

  eventId?: string;
  sportId?: string;
}

