"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Trophy, Download, } from "lucide-react"
import { AddMedalDialog } from "./add-medal-dialog"
import { MedalCard } from "./medal-card"
import { MedalTable } from "./medal-table"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { Event, Athlete, Medal } from "@/types"
import CrudManager from "../common/CrudManager"
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
          <AddMedalDialog
            athletes={athletes}
            events={events}
            onAdd={(data) => {
              const newMedal: Medal = {
                id: Math.random().toString(36).substr(2, 9),
                ...data,
                date: format(data.date, "yyyy-MM-dd"),
                medalType: data.medalType as "Gold" | "Silver" | "Bronze",
              }
              setList((prev) => [...prev, newMedal])
            }}
          />
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

      <div className="space-y-6">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search medals..." className="pl-10 h-11 bg-slate-50 border-slate-200 rounded-xl" />
          </div>
          <select className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium">
            <option>All Medals</option>
          </select>
          <select className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium">
            <option>All Provinces</option>
          </select>
        </div>

        <CrudManager
          initialItems={list}
          idKey="id"
          CreateComponent={(props) => <CreateMedalDialog {...props} athletes={athletes} events={events} />}
          onCreate={(item) => setList((prev) => [...prev, item])}
          onDelete={(id) => setList((prev) => prev.filter((m) => m.id !== id))}
          renderList={({ items, openCreate, onDeleteRequested }) => (
            <MedalTable medals={items} athletes={athletes} events={events} onCreate={() => openCreate()} onDelete={(id) => onDeleteRequested(id)} />
          )}
        />
      </div>
    </div>
  )
}
