// @ts-nocheck
"use client"

import { useState } from "react"
import { AthletesSection } from "@/components/dashboard"
import type { Athlete } from "@/types"

const INITIAL_ATHLETES: Athlete[] = [
  { id: "a1", name: "Sokha Mean", province: "Phnom Penh", sport: "Boxing", status: "Approved", medals: { gold: 1, silver: 0, bronze: 0 } },
  { id: "a2", name: "Dara Van", province: "Siem Reap", sport: "Badminton", status: "Approved", medals: { gold: 0, silver: 1, bronze: 0 } },
]

export default function AthletesPage() {
  const [athletes] = useState<Athlete[]>(INITIAL_ATHLETES)

  return (
    <div className="p-6">
      <AthletesSection athletes={athletes} />
    </div>
  )
}
