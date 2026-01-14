"use client"

import { useState, useEffect } from "react"
import { EventsSection } from "@/components/dashboard"
import type { Event } from "@/types"
import { useRouter } from "next/navigation"
import { useEvents } from "@/hooks/useEvents"

export default function EventsPage() {
  const { events: fetchedEvents } = useEvents()
  const [events, setEvents] = useState<Event[]>(fetchedEvents as Event[])
  const router = useRouter()

  useEffect(() => {
    setEvents(fetchedEvents as Event[])
  }, [fetchedEvents])

  const handleSelect = (id: string | null) => {
    if (id) router.push(`/events/${id}`)
    else router.push("/")
  }

  return (
    <div className="p-6">
      <EventsSection events={events} onCreate={(e) => setEvents((prev) => [e, ...prev])} onSelect={handleSelect} />
    </div>
  )
}
