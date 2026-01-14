"use client"

import { Calendar } from "lucide-react"
import { FormRow } from "../FormField"
import { FormInput, FormSelect } from "../../ui/FormControls"
import type { FormSectionProps } from "@/types"

export function PersonalInfo({ formData, handleChange }: FormSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Personal Information</h3>
        <p className="text-sm text-muted-foreground">ផ្ទេរពត៌មានផ្ទាល់ខ្លួន</p>
      </div>

      <FormRow>
        <FormInput label="First Name (English)" khmer="ឈ្មោះ (អង់គ្លេស)" value={formData.firstName} onChange={v => handleChange("firstName", v)} required />
        <FormInput label="Last Name (English)" khmer="ត្រកូល (អង់គ្លេស)" value={formData.lastName} onChange={v => handleChange("lastName", v)} required />

        <FormInput label="First Name (Khmer)" khmer="ឈ្មោះ (ខ្មែរ)" value={formData.firstNameKh || ''} onChange={v => handleChange("firstNameKh", v)} required />
        <FormInput label="Last Name (Khmer)" khmer="ត្រកូល (ខ្មែរ)" value={formData.lastNameKh || ''} onChange={v => handleChange("lastNameKh", v)} required />

        <div>
          <label className="block text-sm font-medium text-slate-700">Date of Birth</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="date"
              className="pl-10 w-full rounded-xl border"
              value={formData.dateOfBirth}
              onChange={e => handleChange("dateOfBirth", e.target.value)}
            />
          </div>
        </div>

        <FormSelect
          label="Gender"
          khmer="យេនឌ័រ"
          value={formData.gender}
          onChange={v => handleChange("gender", v as any)}
          options={[
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "Other", label: "Other" },
          ]}
        />

        <FormInput
          label="National ID"
          khmer="លេខអត្តសញ្ញាណ"
          value={formData.nationalID || ''}
          onChange={v => handleChange("nationalID", v)}
        />
      </FormRow>
    </section>
  )
}
