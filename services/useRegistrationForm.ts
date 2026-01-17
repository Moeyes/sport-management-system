import { useCallback, useState } from "react";
import type { FormData as RegistrationFormData, FormErrors } from "@/types/registration";
import { useRegister as useSubmitRegister } from "./useRegister";
import { validateForm } from "@/lib/validation/validators";

export function useRegistrationForm(initial?: Partial<RegistrationFormData>) {
  const [formData, setFormData] = useState<Partial<RegistrationFormData>>({
    sport: "",
    category: "",
    position: undefined,
    organization: undefined,
    phone: "",
    sports: [],
    ...initial,
  });

  const [errors, setErrors] = useState<Partial<FormErrors>>({});

  const setField = useCallback((data: Partial<RegistrationFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const reset = useCallback(() => {
    setFormData({ sport: "", category: "", position: undefined, organization: undefined, phone: "", sports: [] });
    setErrors({});
  }, []);

  const { submitRegistration, loading, error, success, reset: resetSubmitState } = useSubmitRegister();

  const submit = useCallback(async () => {
    // Map our Partial<RegistrationFormData> to the expected FormData shape
    // The useRegister.submitRegistration expects FormData from types/registration
    const payload = formData as RegistrationFormData;
    await submitRegistration(payload);
  }, [formData, submitRegistration]);

  const validate = useCallback(() => {
    const e = validateForm(formData as RegistrationFormData);
    setErrors(e);
    return e;
  }, [formData]);

  const clearErrors = useCallback(() => setErrors({}), []);
  const setFormErrors = useCallback((e: Partial<FormErrors>) => setErrors(e), []);

  return { formData, setField, setFormData, reset, submit, loading, error, success, resetSubmitState, errors, validate, clearErrors, setFormErrors } as const;
}
