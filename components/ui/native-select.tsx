"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function NativeSelect({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select data-slot="native-select" className={cn("h-11 rounded-xl bg-slate-50 border-slate-200", className)} {...props}>
      {children}
    </select>
  )
}

export { NativeSelect }
