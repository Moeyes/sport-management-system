"use client"

import { useState } from "react"
import { MedalsView } from "@/components/medals"
import type { Event, Athlete, Medal } from "@/types"

const INITIAL_EVENTS: Event[] = [
  { id: "1", name: "32nd SEA GAMES", startDate: "2026-11-09", endDate: "2026-11-16", sports: ["Athletics"] },
  { id: "2", name: "National Youth Sports", startDate: "2026-12-01", endDate: "2026-12-10", sports: ["Ball Games"] },
]

const ATHLETES_DATA: Record<string, Athlete[]> = {
  "1": [
    { id: "a1", name: "Sokha Mean", province: "Phnom Penh", sport: "Boxing", status: "Approved", medals: { gold: 1, silver: 0, bronze: 0 } },
    { id: "a2", name: "Dara Van", province: "Siem Reap", sport: "Badminton", status: "Approved", medals: { gold: 0, silver: 1, bronze: 0 } },
  ],
}

export default function MedalsPage() {
  const [medals, setMedals] = useState<Medal[]>([
    { id: "m1", athleteId: "a1", eventId: "1", date: "2025-10-12", medalType: "Gold", sport: "Boxing" },
  ])

  return (
    <div className="p-6">
      <MedalsView events={INITIAL_EVENTS} athletes={ATHLETES_DATA["1"]} medals={medals} setMedals={setMedals} />
    </div>
  )
}
