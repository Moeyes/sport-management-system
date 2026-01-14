"use client"

import { FormRow } from "../FormField"
import { FormInput } from "../../ui/FormControls"
import type { FormSectionProps } from "@/types"

export function ContactInfo({ formData, handleChange }: FormSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-muted-foreground">ព័ត៌មានទំនាក់ទំនង</h3>
        <p className="text-lg font-bold">Contact Information</p>
      </div>

      <FormRow>
        <FormInput label="Email Address" khmer="អ៊ីម៉ែល" value={formData.email || ''} onChange={v => handleChange("email", v)} />
        <FormInput label="Phone Number" khmer="លេខទូរស័ព្ទ" value={formData.phone || ''} onChange={v => handleChange("phone", v)} />
      </FormRow>
    </section>
  )
}
