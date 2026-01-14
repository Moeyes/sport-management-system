import { Athlete } from "../../types";
import { requireField } from "./common.validators";

export function validateAthlete(input: Athlete): string[] {
  const errors: string[] = [];
  const firstNameError = requireField("First name", input.firstName);
  if (firstNameError) errors.push(firstNameError);
  const lastNameError = requireField("Last name", input.lastName);
  if (lastNameError) errors.push(lastNameError);
  const dobError = requireField("Date of birth", input.dateOfBirth);
  if (dobError) errors.push(dobError);
  return errors;
}
