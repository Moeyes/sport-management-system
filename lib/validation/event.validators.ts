import { Event } from "../../types";
import { requireField } from "./common.validators";

export function validateEvent(input: Event): string[] {
  const errors: string[] = [];
  const nameError = requireField("Event name", input.name);
  if (nameError) errors.push(nameError);
  if (new Date(input.endDate) < new Date(input.startDate)) {
    errors.push("End date must be after start date");
  }
  return errors;
}
