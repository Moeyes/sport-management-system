"use client"

import { FormRow } from "../FormField"
import { FormSelect } from "../../ui/FormControls"
import type { FormSectionProps } from "@/types"

export function LocationDetails({ formData, handleChange }: FormSectionProps) {
  return (
    <section className="space-y-4">
      <FormRow>
        <FormSelect
          label="Province"
          khmer="ខេត្ត"
          value={formData.province || ''}
          disabled={!!formData.department}
          onChange={v => {
            handleChange("province", v)
            handleChange("department", "")
          }}
          options={[
            { value: "Phnom Penh", label: "Phnom Penh" },
            { value: "Siem Reap", label: "Siem Reap" },
          ]}
        />

        <FormSelect
          label="Department"
          khmer="នាយកដ្ឋាន"
          value={formData.department || ''}
          disabled={!!formData.province}
          onChange={v => {
            handleChange("department", v)
            handleChange("province", "")
          }}
          options={[
            { value: "Department A", label: "Department A" },
            { value: "Department B", label: "Department B" },
            { value: "Department C", label: "Department C" },
          ]}
        />
      </FormRow>
    </section>
  )
}


