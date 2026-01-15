"use client"

import { Button } from "@/components/ui/button";
import { useRegistrationForm } from "@/services/useRegistrationForm";
import { PersonalInfo } from "./sections/PersonalInfo";
import { PositionSelector } from "./sections/PositionSelector";
import { LocationDetails } from "./sections/LocationDetails";
import { useRouter } from "next/navigation";
import type { FormData as RegistrationFormData } from "@/types/registration";

export function RegistrationForm() {
  const { formData, setField, reset, submit, loading } = useRegistrationForm();
  const router = useRouter();

  const submitForm = async () => {
    await submit();
    reset();
    router.push("/?view=athletes");
  };

  return (
    <form className="max-w-3xl mx-auto space-y-8 p-6 bg-white rounded-2xl shadow-sm">
      <LocationDetails selectedOrganization={formData.organization as any} onSelect={(organization) => setField({ organization })} />

      <PositionSelector
        formData={{ position: formData.position as any }}
        updateFormData={(data) => setField({ position: { ...(formData.position as any), ...(data.position ?? data) } })}
        onNext={() => {}}
      />

      <PersonalInfo formData={formData as any} updateFormData={(d: Partial<RegistrationFormData>) => setField(d)} onNext={() => {}} />

      <div className="flex justify-between sticky bottom-0 bg-white pt-6">
        <Button variant="ghost" onClick={reset}>Reset Form</Button>
        <Button className="bg-[#1a4cd8]" onClick={submitForm} disabled={loading}>{loading ? "Submitting..." : "Submit"}</Button>
      </div>
    </form>
  );
}
