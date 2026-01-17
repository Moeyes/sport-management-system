//registation
import React from 'react';
import type { ParticipationGender, ParticipationNationality, PositionInfo, OrganizationInfo } from './participation'

export interface FormData {
  selectedSport?: string | string[] | null;
  id?: string;
  registeredAt?: string | number | Date;
  // name?: string;

  firstName?: string;
  lastName?: string;
  firstNameKh?: string;
  lastNameKh?: string;
  gender?: ParticipationGender;
  dateOfBirth?: string;
  nationality?: ParticipationNationality;
  nationalID?: string;
  phone?: string;
  photoUrl?: string;
  photoUpload?: File | null;

  position?: PositionInfo | null;
  organization?: OrganizationInfo | null;

  // selected sport category (e.g., "Men", "Women", etc.)
  category?: string;
  // normalized id for the primary sport (slug)
  sportId?: string;
  // canonical sport category name (stored on server as `sportCategory`)
  sportCategory?: string;

  sport: string;
  sports: string[];
  eventId?: string | null;

  // Team fields (for team registrations)
  registrationType?: 'individual' | 'team';
  teamId?: string | null;
  teamName?: string | null;
  teamMembers?: import('./team').TeamMember[];
  isTeamLeader?: boolean;


}

export interface FormErrors {
  province?: string;
  department?: string;
  eventType?: string;
  typeOfSport?: string;
  selectedSport?: string;
  sport?: string;
  firstName?: string;
  lastName?: string;
  nationalID?: string;
  dateOfBirth?: string;
  gender?: string;
  email?: string;
  position?: string;
  phone?: string;
  phoneNumber?: string;
  photoUpload?: string;
  sports?: string;
  organization?: string;

  // Team-related errors
  teamName?: string;
  teamMembers?: string;
  // member_{index} => per-member error string
}

export type OnFieldChange = <K extends keyof FormData>(
  field: K,
  value: FormData[K]
) => void;

export interface SportCategory {
  id: string;
  name: string;
  icon: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface HeaderButtonProps {
  variant?: 'primary' | 'outline';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export interface FormSectionProps {
  formData: FormData;
  handleChange: OnFieldChange;
  errors?: FormErrors;
}

export interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
}

export interface FormSelectProps {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  options: SelectOption[];
  required?: boolean;
  error?: string;
  disabled?: boolean;
}

export interface LogEntry {
  id: number;
  action: string;
  timestamp: string;
}