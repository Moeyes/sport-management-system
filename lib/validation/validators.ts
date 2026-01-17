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
    errors.firstName = 'សូមបញ្ចូលគោត្តនាម។';
  }

  if (!data.lastName?.trim()) {
    errors.lastName = 'សូមបញ្ចូលនាម។';
  }

  // Phone validation (accept current `phone` or legacy `phoneNumber`)
  const phoneValue = (data.phone ?? (data as any).phoneNumber) as string | undefined;
  if (!phoneValue?.trim()) {
    errors.phone = 'សូមបញ្ចូលលេខទូរស័ព្ទ។';
    // keep legacy key for backward compatibility
    errors.phoneNumber = 'សូមបញ្ចូលលេខទូរស័ព្ទ។';
  } else if (!isValidPhone(phoneValue)) {
    errors.phone = 'សូមបញ្ចូលលេខទូរស័ព្ទត្រឹមត្រូវ (7–15 ខ្ទង់).';
    errors.phoneNumber = errors.phone;
  }

  // Date of birth validation
  if (!data.dateOfBirth) {
    errors.dateOfBirth = 'សូមបញ្ចូលថ្ងៃខែឆ្នាំកំណើត។';
  } else if (!isValidPastDate(data.dateOfBirth)) {
    errors.dateOfBirth = 'ថ្ងៃកំណើតត្រូវតែជាកាលបរិច្ឆេទមុនថ្ងៃនេះ។';
  }

  // Organization validation (province/ministry unified)
  // Accept both the new unified organization (id) or legacy province/department fields
  const orgType = String(data.organization?.type ?? '').toLowerCase();
  const hasOrg = !!(data.organization?.id || data.organization?.province || data.organization?.department || data.organization?.name);
  if (orgType === 'province' && !hasOrg) {
    const msg = 'សូមជ្រើសរើសអង្គភាព។';
    errors.organization = msg;
    // keep old key for compatibility
    errors.province = msg;
  }

  // National ID validation
  if (!data.nationalID?.trim()) {
    errors.nationalID = 'សូមបញ្ចូលលេខអត្តសញ្ញាណជាតិ។';
  } else if (!isWithinLength(data.nationalID, 6, 20)) {
    errors.nationalID = 'លេខអត្តសញ្ញាណត្រូវមានចន្លោះពី 6 ទៅ 20 តួអក្សរ។';
  }

  // Sport selection validation (accept `sport` or legacy `selectedSport`)
  if (!data.sport && !data.selectedSport) {
    errors.selectedSport = 'សូមជ្រើសរើសកីឡា។';
    errors.sport = 'សូមជ្រើសរើសកីឡា។';
  }

  // Note: `category` is optional for some events; when present it is stored as `sportCategory` on the server.
  // If you want `category` to be required for specific events, add event-aware validation where needed.

  // Team registration validations
  if ((data as any).registrationType === 'team') {
    if (!data.teamName || !(data.teamName as string).trim()) {
      (errors as any).teamName = 'សូមបញ្ចូលឈ្មោះក្រុម.'
    }

    const members = (data as any).teamMembers ?? []
    const sport = (data as any).sport ?? ''

    // basic sport-specific minimums
    const SPORT_MIN_MEMBERS: Record<string, number> = {
      football: 11,
      basketball: 5,
      volleyball: 6,
      default: 1,
    }
    const min = SPORT_MIN_MEMBERS[sport?.toLowerCase?.()] ?? SPORT_MIN_MEMBERS.default

    if (!Array.isArray(members) || members.length < min) {
      (errors as any).teamMembers = `ក្រុមត្រូវតែមានអ្នកចូលរួមយ៉ាងតិច ${min} នាក់`;
    }

    // unique nationalID check
    const ids = members.map((m: any) => (m.nationalID || '').trim()).filter(Boolean)
    const dup = ids.find((id: string, idx: number) => ids.indexOf(id) !== idx)
    if (dup) {
      (errors as any).teamMembers = (errors as any).teamMembers ? (errors as any).teamMembers + ' លេខអត្តសញ្ញាណជាតិក្នុងក្រុមមិនត្រូវមានចម្លង។' : 'លេខអត្តសញ្ញាណជាតិក្នុងក្រុមមិនត្រូវមានចម្លង។'
    }

    // per-member required fields
    members.forEach((m: any, i: number) => {
      if (!m.firstName || !m.lastName) {
        (errors as any)[`member_${i}`] = 'សូមបញ្ចូលឈ្មោះ និងនាមសម្រាប់សមាជិកទាំងអស់។'
      }
      if (!m.nationalID) {
        (errors as any)[`member_${i}`] = ((errors as any)[`member_${i}`] || '') + ' សូមបញ្ចូលលេខអត្តសញ្ញាណ.'
      }
    })
  }

  // Photo upload validation (optional but if present, must be valid)
  if (data.photoUpload) {
    const file = data.photoUpload;
    const maxSize = 2 * 1024 * 1024; // 2MB
    
    if (!file.type.startsWith('image/')) {
      errors.photoUpload = 'សូមផ្ទុកឡើងឯកសាររូបភាពតែប៉ុណ្ណោះ (JPG, PNG, ...).';
    } else if (file.size > maxSize) {
      errors.photoUpload = 'ទំហំរូបភាពត្រូវតែ 2MB ឬតូចជាង។';
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
