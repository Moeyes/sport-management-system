"use client"

import { Card } from "@/components/ui/card"
import { Trophy, Users } from "lucide-react"
import type { SportRecord } from "@/types"
import { useMemo, useState } from "react"
// import CrudManager from "@/components/common/CrudManager"
// import { CreateSportDialog } from "@/components/sports/create-sport-dialog"
// import { EditSportDialog } from "@/components/sports/edit-sport-dialog"
// import { SportTable } from "@/components/sports/sport-table"
// import { createSport } from "@/lib"

export function SportsSection({ sports }: { sports: SportRecord[] }) {
  const [list, setList] = useState<SportRecord[]>(sports)

  const stats = useMemo(() => {
    const totalSports = list.length
    const activeSports = list.filter((s) => s.status !== "Completed").length
    const totalParticipants = list.reduce((acc, cur) => acc + Number(cur.participants || 0), 0)
    const categories = new Set(list.map((s) => s.category)).size
    return { totalSports, activeSports, totalParticipants, categories }
  }, [list])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-slate-100 p-3 rounded-xl">
            <Trophy className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Sports Management</h2>
            <p className="text-sm text-muted-foreground">Manage sports, categories, and participants</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Sports", value: String(stats.totalSports), color: "bg-purple-100", icon: Trophy, iconColor: "text-purple-600" },
          { label: "Active Sports", value: String(stats.activeSports), color: "bg-green-100", icon: Trophy, iconColor: "text-green-600" },
          { label: "Total Participants", value: String(stats.totalParticipants), color: "bg-blue-100", icon: Users, iconColor: "text-blue-600" },
          { label: "Categories", value: String(stats.categories), color: "bg-orange-100", icon: Trophy, iconColor: "text-orange-600" },
        ].map((s) => (
          <Card key={s.label} className="border-none shadow-sm overflow-hidden rounded-2xl">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">{s.label}</p>
                  <p className="text-3xl font-bold">{s.value}</p>
                </div>
                <div className={`${s.color} p-3 rounded-xl text-white shadow-lg`}>
                  <s.icon className={`h-6 w-6 ${s.iconColor}`} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* <CrudManager
        initialItems={list}
        idKey="id"
        // CreateComponent={CreateSportDialog}
        // EditComponent={EditSportDialog}
        onCreate={(item) => setList((prev) => [item, ...prev])}
        onEdit={(item) => setList((prev) => prev.map((s) => (s.id === item.id ? item : s)))}
        onDelete={(id) => setList((prev) => prev.filter((s) => s.id !== id))}
        renderList={({ items, onEditRequested, onDeleteRequested, openCreate }) => (
          <div>
            <SportTable sports={items} onEdit={(s) => onEditRequested(s)} onDelete={(id) => onDeleteRequested(id)} onCreate={() => openCreate()} />
          </div>
        )}
      /> */}
    </div>
  )
}
