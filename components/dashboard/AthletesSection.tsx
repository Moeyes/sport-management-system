// @ts-nocheck
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Eye, Pencil, Trash2, User} from "lucide-react"
import type { Athlete } from "@/types"
import { useMemo, useState, useEffect } from "react"
import CrudManager from "@/components/common/CrudManager"
import CreateAthleteDialog from "@/components/athletes/create-athlete-dialog"
import SectionHeader from "@/components/dashboard/SectionHeader"
import StatsGrid from "@/components/dashboard/StateGrid"

export function AthletesSection({ athletes }: { athletes: Athlete[] }) {
  const [list, setList] = useState<Athlete[]>(athletes)
  const total = list.length
  const approved = list.filter((a) => a.status === "Approved").length
  const pending = list.filter((a) => a.status === "Pending").length
  const rejected = list.filter((a) => a.status === "Rejected").length

  useEffect(() => {
    setList(athletes)
  }, [athletes])

  return (
    <div className="space-y-6">
      <SectionHeader
        icon={<User className="h-6 w-6 text-slate-600" />}
        title="Athletes Management"
        subtitle="Manage athlete registrations and profiles"
        actions={<Button className="bg-[#1a4cd8] hover:bg-blue-700 rounded-xl gap-2 h-11">Register Athlete</Button>}
      />

      <StatsGrid
        items={[
          { label: "Total Athletes", value: String(total), color: "bg-blue-100" },
          { label: "Approved", value: String(approved), color: "bg-green-100" },
          { label: "Pending", value: String(pending), color: "bg-yellow-100" },
          { label: "Rejected", value: String(rejected), color: "bg-red-100" },
        ]}
      />

        <CrudManager
          initialItems={list}
          idKey="id"
          CreateComponent={(props: any) => <CreateAthleteDialog {...props} />}
          onCreate={(item: Athlete) => setList((prev: Athlete[]) => [item, ...prev])}
          renderList={({ items, openCreate }: { items: Athlete[]; openCreate: () => void }) => (
            <Card className="border-none shadow-sm rounded-2xl p-6 space-y-6">
              <div className="flex flex-wrap gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search athletes..." className="pl-10 h-11 bg-slate-50 border-slate-200 rounded-xl" />
                </div>
                <select className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium">
                  <option>All Status</option>
                </select>
                <select className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium">
                  <option>All Provinces</option>
                </select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-800">Athletes List ({items.length})</h3>
                  <button onClick={() => openCreate()} className="bg-[#1a4cd8] hover:bg-blue-700 rounded-xl gap-2 h-11 inline-flex items-center px-4 text-white">Register Athlete</button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                      <TableHead className="font-bold text-[10px] uppercase text-slate-400">Name</TableHead>
                      <TableHead className="font-bold text-[10px] uppercase text-slate-400">Province</TableHead>
                      <TableHead className="font-bold text-[10px] uppercase text-slate-400">Sport</TableHead>
                      <TableHead className="font-bold text-[10px] uppercase text-slate-400">Status</TableHead>
                      <TableHead className="font-bold text-[10px] uppercase text-slate-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((a) => (
                      <TableRow key={a.id} className="group transition-colors">
                        <TableCell className="font-bold text-slate-700">{a.name}</TableCell>
                        <TableCell className="text-slate-500 font-medium">{a.province}</TableCell>
                        <TableCell className="text-slate-500 font-medium">{a.sport}</TableCell>
                        <TableCell>
                          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none rounded-lg px-3 py-1 text-[10px]">{a.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-slate-50 hover:bg-slate-100">
                              <Eye className="h-4 w-4 text-slate-500" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-slate-50 hover:bg-slate-100">
                              <Pencil className="h-4 w-4 text-slate-500" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-slate-50 hover:bg-slate-100">
                              <Trash2 className="h-4 w-4 text-slate-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          )}
        />
    </div>
  )
}
