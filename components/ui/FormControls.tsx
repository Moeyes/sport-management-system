"use client"

import { Input } from "@/components/ui/input"
import { NativeSelect } from "@/components/ui/native-select"
import { FieldLabel } from "../registration"

export function FormInput({
  label,
  khmer,
  value,
  onChange,
  type = "text",
  required,
  className = ""
}: {
  label: string
  khmer?: string
  value: string
  type?: string
  required?: boolean
  className?: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <FieldLabel label={label} khmer={khmer} />
      <Input
        required={required}
        type={type}
        value={value}
        className={className}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}

export function FormSelect({
  label,
  khmer,
  value,
  options,
  required,
  disabled,
  onChange,
}: {
  label: string
  khmer?: string
  value: string
  options: { value: string; label: string }[]
  required?: boolean
  disabled?: boolean
  onChange: (v: string) => void
}) {
  return (
    <div>
      <FieldLabel label={label} khmer={khmer} />
      <NativeSelect
        value={value}
        disabled={disabled}
        required={required}
        onChange={e => onChange(e.target.value)}
      >
        <option value="">Select</option>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </NativeSelect>
    </div>
  )
}
