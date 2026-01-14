"use client"

import React, { useState } from "react"
import type { Event, Athlete, Medal } from "@/types"
import { EventCard } from "@/components/events/EventCardMock"
import { AthletesSection } from "@/components/dashboard/AthletesSection"
import { ProvincesSection } from "@/components/dashboard/ProvincesSection"
import { MedalsView } from "@/components/medals"

export default function EventDetailClient({ event, athletes, medals }: { event: Event; athletes: Athlete[]; medals: Medal[] }) {
  const [localMedals, setLocalMedals] = useState<Medal[]>(medals)

  const provinceStats = React.useMemo(() => {
    const provs: Record<string, { gold: number; silver: number; bronze: number; athletes: number }> = {}
    athletes.forEach((a) => {
      if (!provs[a.province]) provs[a.province] = { gold: 0, silver: 0, bronze: 0, athletes: 0 }
      provs[a.province].gold += a.medals.gold
      provs[a.province].silver += a.medals.silver
      provs[a.province].bronze += a.medals.bronze
      provs[a.province].athletes += 1
    })

    return Object.entries(provs).map(([name, s]) => ({ name, ...s, total: s.gold + s.silver + s.bronze }))
  }, [athletes])

  return (
    <div className="space-y-8">
      <div>
        <EventCard event={event} onClick={() => {}} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AthletesSection athletes={athletes} />
        </div>

        <div className="space-y-6">
          <ProvincesSection provinces={provinceStats} />
        </div>
      </div>

      <div>
        <MedalsView events={[event]} athletes={athletes} selectedEventId={event.id} medals={localMedals} setMedals={setLocalMedals} />
      </div>
    </div>
  )
}
