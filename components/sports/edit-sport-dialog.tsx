"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { SportRecord, SportStatus } from "@/types"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: SportRecord | null
  onSave: (s: SportRecord) => void
}

export function EditSportDialog({ open, onOpenChange, item, onSave }: Props) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [participants, setParticipants] = useState("")
  const [status, setStatus] = useState<SportStatus>("Ongoing")

  useEffect(() => {
    if (item) {
      setName(item.name)
      setCategory(item.category)
      setParticipants(item.participants)
      setStatus(item.status)
    }
  }, [item])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!item) return
    const updated: SportRecord = {
      id: item.id,
      name,
      category,
      participants: participants || "0",
      status,
    }
    onSave(updated)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Sport</DialogTitle>
          <DialogDescription>Update the sport details.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-1">
            <label className="text-sm font-medium">Sport Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium">Category</label>
            <Input value={category} onChange={(e) => setCategory(e.target.value)} required />
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium">Participants</label>
            <Input value={participants} onChange={(e) => setParticipants(e.target.value)} type="number" />
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as SportStatus)} className="h-11 px-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium">
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditSportDialog
