// @ts-nocheck
"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Trophy, Download } from "lucide-react"
import { MedalCard } from "./medal-card"
import { format } from "date-fns"
import type { Event, Athlete, Medal } from "@/types"
import CreateMedalDialog from "./create-medal-dialog"

interface MedalsViewProps {
  events: Event[]
  athletes: Athlete[]
  selectedEventId?: string | null
  medals: Medal[]
  setMedals: React.Dispatch<React.SetStateAction<Medal[]>>
}

export function MedalsView({ events, athletes, selectedEventId, medals, setMedals }: MedalsViewProps) {
  const [list, setList] = useState<Medal[]>(medals)
  const [createOpen, setCreateOpen] = useState(false)

  const filteredMedals = selectedEventId ? list.filter((m) => m.eventId === selectedEventId) : list

  const stats = useMemo(
    () => ({
      total: filteredMedals.length,
      gold: filteredMedals.filter((m) => m.medalType === "Gold").length,
      silver: filteredMedals.filter((m) => m.medalType === "Silver").length,
      bronze: filteredMedals.filter((m) => m.medalType === "Bronze").length,
    }),
    [filteredMedals],
  )

  function handleCreate(medal: Medal) {
    setList((prev) => [...prev, medal])
    setMedals((prev) => [...prev, medal])
  }

  function handleDelete(id: string) {
    setList((prev) => prev.filter((m) => m.id !== id))
    setMedals((prev) => prev.filter((m) => m.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-slate-100 p-3 rounded-xl">
            <Trophy className="h-6 w-6 text-slate-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Medals Tracking</h2>
            <p className="text-sm text-muted-foreground">Track and manage medal awards</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => setCreateOpen(true)} className="bg-[#1a4cd8] hover:bg-blue-700 rounded-xl gap-2 h-11 text-white">
            Add Medal
          </Button>
          <Button variant="outline" className="rounded-xl gap-2 h-11 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MedalCard title="Total Medals" value={stats.total} color="bg-purple-100" iconColor="text-purple-600" />
        <MedalCard title="Gold Medals" value={stats.gold} color="bg-yellow-100" iconColor="text-yellow-600" />
        <MedalCard title="Silver Medals" value={stats.silver} color="bg-slate-100" iconColor="text-slate-400" />
        <MedalCard title="Bronze Medals" value={stats.bronze} color="bg-orange-100" iconColor="text-orange-600" />
      </div>

      <div className="space-y-4">
        <div className="overflow-x-auto bg-white rounded-2xl p-4 shadow-sm">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left text-sm text-slate-500">
                <th>Athlete</th>
                <th>Sport</th>
                <th>Event</th>
                <th>Province</th>
                <th>Medal</th>
                <th>Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedals.map((medal) => {
                const athlete = athletes.find((a) => a.id === medal.athleteId)
                const event = events.find((e) => e.id === medal.eventId)
                return (
                  <tr key={medal.id} className="border-t">
                    <td className="py-3 font-medium">{athlete?.name || "N/A"}</td>
                    <td className="py-3 text-slate-500">{medal.sport}</td>
                    <td className="py-3 text-slate-500">{event?.name || "N/A"}</td>
                    <td className="py-3 text-slate-500">{athlete?.province || "N/A"}</td>
                    <td className="py-3 text-slate-500">{medal.medalType}</td>
                    <td className="py-3 text-slate-500">{medal.date}</td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleDelete(medal.id)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <CreateMedalDialog open={createOpen} onOpenChange={setCreateOpen} athletes={athletes} events={events} onCreate={handleCreate} />
    </div>
  )
}
