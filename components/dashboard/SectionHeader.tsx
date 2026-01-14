"use client"

import React from "react"

export default function SectionHeader({
  icon,
  title,
  subtitle,
  actions,
}: {
  icon?: React.ReactNode
  title: string
  subtitle?: string
  actions?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="bg-slate-100 p-3 rounded-xl">{icon}</div>
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div className="flex gap-3">{actions}</div>
    </div>
  )
}
