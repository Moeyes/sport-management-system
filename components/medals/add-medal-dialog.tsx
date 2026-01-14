"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectTriggerInput, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { Participation, Event } from "@/types"
import { useState } from "react"

interface AddMedalDialogProps {
  athletes: Participation[]
  events: Event[]
  onAdd: (data: { athleteId: string; eventId: string; date: Date; medalType: string; sport: string }) => void
}

export function AddMedalDialog({ athletes, events, onAdd }: AddMedalDialogProps) {
  const [open, setOpen] = useState(false)
  const [athleteId, setAthleteId] = useState("")
  const [eventId, setEventId] = useState("")
  const [date, setDate] = useState<Date>()
  const [medalType, setMedalType] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!athleteId || !eventId || !date || !medalType) return

    const selectedAthlete = athletes.find((a) => a.id === athleteId)

    onAdd({
      athleteId,
      eventId,
      date,
      medalType,
      sport: selectedAthlete?.sportId || "N/A",
    })

    setOpen(false)
    setAthleteId("")
    setEventId("")
    setDate(undefined)
    setMedalType("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#1a4cd8] hover:bg-blue-700 rounded-xl gap-2 h-11">
          <Plus className="h-4 w-4" /> Add Medal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Medal Award</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="athlete" className="text-sm font-semibold">
              Select Athlete
            </Label>
            <Select value={athleteId} onValueChange={setAthleteId}>
              <SelectTriggerInput id="athlete">
                <SelectValue placeholder="Select athlete" />
              </SelectTriggerInput>
              <SelectContent className="rounded-xl">
                {athletes.map((athlete) => (
                  <SelectItem key={athlete.id} value={athlete.id}>
                    {athlete.name} ({athlete.province})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="event" className="text-sm font-semibold">
              Select Event
            </Label>
            <Select value={eventId} onValueChange={setEventId}>
              <SelectTriggerInput id="event">
                <SelectValue placeholder="Select event" />
              </SelectTriggerInput>
              <SelectContent className="rounded-xl">
                {events.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold">Award Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-11 rounded-xl bg-slate-50 border-slate-200",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-xl" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="medal" className="text-sm font-semibold">
              Medal Type
            </Label>
            <Select value={medalType} onValueChange={setMedalType}>
              <SelectTriggerInput id="medal">
                <SelectValue placeholder="Select medal type" />
              </SelectTriggerInput>
              <SelectContent className="rounded-xl">
                <SelectItem value="Gold">Gold</SelectItem>
                <SelectItem value="Silver">Silver</SelectItem>
                <SelectItem value="Bronze">Bronze</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-xl h-11 border-slate-200"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#1a4cd8] hover:bg-blue-700 rounded-xl h-11 px-8">
              Save Award
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
