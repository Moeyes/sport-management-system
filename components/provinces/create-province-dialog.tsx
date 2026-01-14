"use client"

import { useState } from "react"
import { CreateEntityDialog } from "@/components/common/CreateEntityDialog"
import { Input } from "@/components/ui/input"
import type { Province } from "@/components/dashboard/ProvincesSection"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (p: Province) => void
}

export function CreateProvinceDialog({ open, onOpenChange, onCreate }: Props) {
  const [name, setName] = useState("")
  const [athletes, setAthletes] = useState("")
  const [gold, setGold] = useState(0)
  const [silver, setSilver] = useState(0)
  const [bronze, setBronze] = useState(0)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const total = gold + silver + bronze
    const province: Province = { name, athletes: Number(athletes || 0), gold, silver, bronze, total }
    onCreate(province)
    setName("")
    setAthletes("")
    setGold(0)
    setSilver(0)
    setBronze(0)
  }

  return (
    <CreateEntityDialog open={open} onOpenChange={onOpenChange} title="Create Province" description="Add a new province and its initial stats." onSubmit={handleSubmit} submitLabel="Create">
      <div className="grid gap-1">
        <label className="text-sm font-medium">Province Name</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-medium">Athletes</label>
        <Input value={athletes} onChange={(e) => setAthletes(e.target.value)} type="number" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="grid gap-1">
          <label className="text-sm font-medium">Gold</label>
          <Input value={String(gold)} onChange={(e) => setGold(Number(e.target.value || 0))} type="number" />
        </div>
        <div className="grid gap-1">
          <label className="text-sm font-medium">Silver</label>
          <Input value={String(silver)} onChange={(e) => setSilver(Number(e.target.value || 0))} type="number" />
        </div>
        <div className="grid gap-1">
          <label className="text-sm font-medium">Bronze</label>
          <Input value={String(bronze)} onChange={(e) => setBronze(Number(e.target.value || 0))} type="number" />
        </div>
      </div>
    </CreateEntityDialog>
  )
}

export default CreateProvinceDialog
