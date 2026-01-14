import { Medal } from "../../types";
import { requireField } from "./common.validators";

export function validateMedal(input: Medal): string[] {
  const errors: string[] = [];
  const typeError = requireField("Medal type", input.medalType);
  if (typeError) errors.push(typeError);
  return errors;
}
