"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle, Calendar } from "lucide-react"
import type { Event } from "@/types"

const SPORTS_LIST: string[] = ["Athletics", "Ball Games", "Martial Arts", "Traditional Sport", "Recreational Sport"]

export function CreateEventDialog({ onCreate }: { onCreate: (event: Event) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    sports: [] as string[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreate({
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
    })
    setOpen(false)
    setFormData({ name: "", startDate: "", endDate: "", sports: [] })
  }

  const toggleSport = (sport: string) => {
    setFormData((prev) => ({
      ...prev,
      sports: prev.sports.includes(sport) ? prev.sports.filter((s) => s !== sport) : [...prev.sports, sport],
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#1a4cd8] hover:bg-[#1a4cd8]/90 text-white gap-2 px-6 rounded-xl shadow-lg shadow-blue-200">
          <PlusCircle className="h-4 w-4" /> Create Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-3xl p-8 border-none">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold text-slate-800">Create New Event</DialogTitle>
          <p className="text-sm text-muted-foreground">Fill in the details to launch a new sports competition.</p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-bold text-slate-700">
              Event Name
            </Label>
            <Input
              id="name"
              required
              placeholder="e.g. 33rd SEA GAMES"
              className="rounded-xl border-slate-200 bg-slate-50 focus:bg-white h-12 transition-all"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start" className="text-sm font-bold text-slate-700">
                Start Date
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="start"
                  type="date"
                  required
                  className="rounded-xl border-slate-200 bg-slate-50 h-12 pl-10"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="end" className="text-sm font-bold text-slate-700">
                End Date
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="end"
                  type="date"
                  required
                  className="rounded-xl border-slate-200 bg-slate-50 h-12 pl-10"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-bold text-slate-700">Sport Categories</Label>
            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              {SPORTS_LIST.map((sport) => (
                <div key={sport} className="flex items-center space-x-3">
                  <Checkbox
                    id={sport}
                    checked={formData.sports.includes(sport)}
                    onCheckedChange={() => toggleSport(sport)}
                    className="h-5 w-5 rounded-md border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor={sport} className="text-sm font-medium text-slate-600 cursor-pointer">
                    {sport}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="flex-1 h-12 rounded-xl font-bold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-[2] h-12 bg-[#1a4cd8] hover:bg-[#1a4cd8]/90 text-white rounded-xl font-bold"
            >
              Create Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
