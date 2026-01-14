import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from "lucide-react"
import type { Event } from "@/types"

interface EventTableProps {
  events: Event[]
  onSelect?: (id: string) => void
  onEdit?: (event: Event) => void
  onDelete?: (id: string) => void
}

export function EventTable({ events, onSelect, onEdit, onDelete }: EventTableProps) {
  return (
    <Card className="border-none shadow-sm rounded-2xl p-6">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/50">
            <TableHead className="font-bold text-[10px] uppercase text-slate-400">Event</TableHead>
            <TableHead className="font-bold text-[10px] uppercase text-slate-400">Dates</TableHead>
            <TableHead className="font-bold text-[10px] uppercase text-slate-400">Sports</TableHead>
            <TableHead className="font-bold text-[10px] uppercase text-slate-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((ev) => (
            <TableRow key={ev.id} className="cursor-pointer" onClick={() => onSelect?.(ev.id)}>
              <TableCell className="font-bold">{ev.name}</TableCell>
              <TableCell className="text-slate-500">{ev.startDate} - {ev.endDate}</TableCell>
              <TableCell className="text-slate-500">{(ev.sports ?? []).map((s: any) => (typeof s === 'string' ? s : s?.name ?? '')).join(', ')}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400" onClick={(e) => { e.stopPropagation(); onEdit?.(ev) }}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-red-600" onClick={(e) => { e.stopPropagation(); onDelete?.(ev.id) }}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
