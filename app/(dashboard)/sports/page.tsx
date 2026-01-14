"use client"

import { SportsSection } from "@/components/dashboard"
import type { SportRecord } from "@/types"

const SPORTS_DATA: SportRecord[] = [
  { id: "s1", name: "Basketball", category: "Team Sports", participants: "144/12", status: "Completed" },
  { id: "s2", name: "Swimming", category: "Aquatics", participants: "96/8", status: "Ongoing" },
  { id: "s3", name: "Athletics", category: "Track & Field", participants: "128/16", status: "Ongoing" },
]

export default function SportsPage() {
  return (
    <div className="p-6">
      <SportsSection sports={SPORTS_DATA} />
    </div>
  )
}
