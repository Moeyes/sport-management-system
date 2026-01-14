"use client"

import { Card } from "@/components/ui/card"
import React from "react"

type StatItem = {
  label: string
  value: string
  color?: string
}

export default function StatsGrid({ items }: { items: StatItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {items.map((s) => (
        <Card key={s.label} className="border-none shadow-sm rounded-2xl">
          <div className="p-6 flex items-center gap-4">
            <div className={`${s.color ?? "bg-slate-100"} p-3 rounded-xl`} />
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase">{s.label}</p>
              <p className="text-2xl font-bold">{s.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
