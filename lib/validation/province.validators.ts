import { Province } from "../../types";
import { requireField } from "./common.validators";

export function validateProvince(input: Province): string[] {
  const errors: string[] = [];
  const nameError = requireField("Province name", input.name);
  if (nameError) errors.push(nameError);
  return errors;
}
