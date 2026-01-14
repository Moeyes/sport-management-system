/**
 * Form Validation Utilities
 * Centralized validation logic for forms
 */

import type { FormData, FormErrors } from '../../types/registration';

// Validation regex patterns
const PATTERNS = {
  phone: /^\+?[0-9\s\-()]{7,15}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  numeric: /^[0-9]+$/,
};

/**
 * Validate a single email address
 */
export function isValidEmail(email: string): boolean {
  return PATTERNS.email.test(email);
}

/**
 * Validate a phone number
 */
export function isValidPhone(phone: string): boolean {
  return PATTERNS.phone.test(phone);
}

/**
 * Validate a date is not in the future
 */
export function isValidPastDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && date <= new Date();
}

/**
 * Check if a string meets minimum length
 */
export function hasMinLength(value: string, min: number): boolean {
  return value.trim().length >= min;
}

/**
 * Check if a string is within length range
 */
export function isWithinLength(value: string, min: number, max: number): boolean {
  const len = value.trim().length;
  return len >= min && len <= max;
}

/**
 * Validate the registration form
 */
export function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  // Required text fields
  if (!data.firstName?.trim()) {
    errors.firstName = 'First name is required.';
  }

  if (!data.lastName?.trim()) {
    errors.lastName = 'Last name is required.';
  }

  // Email validation
  if (!data.email?.trim()) {
    errors.email = 'Email address is required.';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  // Phone validation
  if (!data.phoneNumber?.trim()) {
    errors.phoneNumber = 'Phone number is required.';
  } else if (!isValidPhone(data.phoneNumber)) {
    errors.phoneNumber = 'Enter a valid phone number (7–15 digits).';
  }

  // Date of birth validation
  if (!data.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required.';
  } else if (!isValidPastDate(data.dateOfBirth)) {
    errors.dateOfBirth = 'Date of birth must be a valid past date.';
  }

  // Province validation
  if (!data.province) {
    errors.province = 'Please select a province.';
  }

  // National ID validation
  if (!data.nationalID?.trim()) {
    errors.nationalID = 'National ID is required.';
  } else if (!isWithinLength(data.nationalID, 6, 20)) {
    errors.nationalID = 'National ID must be between 6 and 20 characters.';
  }

  // Sport selection validation
  if (!data.selectedSport) {
    errors.selectedSport = 'Please select a sport.';
  }

  // Photo upload validation (optional but if present, must be valid)
  if (data.photoUpload) {
    const file = data.photoUpload;
    const maxSize = 2 * 1024 * 1024; // 2MB
    
    if (!file.type.startsWith('image/')) {
      errors.photoUpload = 'Only image files are allowed (JPG, PNG, etc.).';
    } else if (file.size > maxSize) {
      errors.photoUpload = 'Image must be 2MB or smaller.';
    }
  }

  return errors;
}

/**
 * Check if form has any errors
 */
export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
