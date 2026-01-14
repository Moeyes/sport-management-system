//registation
import React from 'react';
import type { ParticipationGender, ParticipationNationality, ParticipationPosition, ParticipationOrganization } from './participation'

export interface FormData {
  selectedSport?: string | string[] | null;

  id?: string;
  registeredAt?: string | number | Date;
  // Support either full `name` (as collected by the UI) or optional first/last name fields
  name?: string;
  firstName?: string;
  lastName?: string;
  firstNameKh?: string;
  lastNameKh?: string;
  gender?: ParticipationGender;
  dateOfBirth?: string;
  nationality?: ParticipationNationality;
  position: ParticipationPosition | null;
  organization?: ParticipationOrganization | null;

  photoUpload?: File | null;
  photoUrl?: string;

  sportCategory?: string | null;
  sports: string[];
  eventId?: string | null;
  sportId?: string | null;

  registrationDate?: string;
  phone?: string;
  phoneNumber?: string;
  email?: string;
  nationalID?: string;

  province?: string;
  department?: string;

  coach?: string;
  assistant?: string;
  event?: string;
  sport?: string;

  eventType?: string | null;
  typeOfSport?: string | null;
  category?: string | null;
}

export interface FormErrors {
  province?: string;
  department?: string;
  eventType?: string;
  typeOfSport?: string;
  selectedSport?: string;
  firstName?: string;
  lastName?: string;
  nationalID?: string;
  dateOfBirth?: string;
  gender?: string;
  email?: string;
  position?: string;
  phoneNumber?: string;
  photoUpload?: string;
  sports?: string;
  organization?: string;
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