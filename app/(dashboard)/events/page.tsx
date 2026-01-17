// @ts-nocheck
"use client"

import { useState, useEffect } from "react"
// import { EventsSection } from "@/components/dashboard"
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
      {/* EventsSection temporarily disabled to avoid build-time export mismatch */}
      <div className="text-sm text-muted-foreground">Events UI temporarily disabled.</div>
    </div>
  )
}
