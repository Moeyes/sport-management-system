//Form Field

"use client"

import React from "react"

export function FormRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
}

export function FieldLabel({ label, khmer }: { label: string; khmer?: string }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      <div className="flex items-baseline gap-2">
        <span>{label}</span>
        {/** Khmer secondary label */}
        {khmer && <span className="text-[11px] text-muted-foreground">{khmer}</span>}
      </div>
    </label>
  )
}
