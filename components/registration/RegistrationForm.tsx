"use client"

import { Button } from "@/components/ui/button"
import { useRegister } from "@/services/useRegister"
import { PersonalInfo } from "./sections/PersonalInfoField"
import { ContactInfo } from "./sections/ContactField"
import { LocationDetails } from "./sections/LocationField"
import { useRouter } from "next/navigation"

export function RegistrationForm() {
  const { formData, setField, reset } = useRegister() as any
  const router = useRouter()
  const submit = async () => {
    await fetch("/api/athletes", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" }
    })
    reset()
    router.push("/?view=athletes")
  }

  return (
    <form className="max-w-3xl mx-auto space-y-8 p-6 bg-white rounded-2xl shadow-sm">
      <LocationDetails formData={formData} handleChange={setField} />
      <PersonalInfo formData={formData} handleChange={setField} />
      <ContactInfo formData={formData} handleChange={setField} />

      <div className="flex justify-between sticky bottom-0 bg-white pt-6">
        <Button variant="ghost" onClick={reset}>Reset Form</Button>
        <Button className="bg-[#1a4cd8]" onClick={submit}>Submit</Button>
      </div>
    </form>
  )
}
