"use client"

import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import type { SportRecord } from "@/types"
import { useMemo, useState } from "react"
import { ProvinceTable } from "@/components/provinces/province-table"
import { CreateProvinceDialog } from "@/components/provinces/create-province-dialog"
import SectionHeader from "@/components/dashboard/SectionHeader"
import StatsGrid from "@/components/dashboard/StateGrid"

export type Province = {
  name: string
  gold: number
  silver: number
  bronze: number
  athletes: number
  total: number
}

export function ProvincesSection({ provinces }: { provinces: Province[] }) {
  const [open, setOpen] = useState(false)
  const [list, setList] = useState<Province[]>(provinces)

  function handleCreate(p: Province) {
    setList((prev) => [p, ...prev])
    setOpen(false)
  }

  const stats = useMemo(() => {
    const totalProvinces = list.length
    const totalAthletes = list.reduce((s, p) => s + p.athletes, 0)
    const totalMedals = list.reduce((s, p) => s + p.total, 0)
    const avgMedals = (totalMedals / Math.max(1, list.length)).toFixed(1)
    return { totalProvinces, totalAthletes, totalMedals, avgMedals }
  }, [list])

  return (
    <div className="space-y-6">
      <SectionHeader
        icon={<svg className="h-6 w-6 text-slate-400" />}
        title="Province Statistics"
        subtitle="View province rankings and performance"
        actions={
          <>
            <button className="h-11 px-4 rounded-xl border border-blue-600 text-blue-600">Export</button>
            <button onClick={() => setOpen(true)} className="bg-[#1a4cd8] hover:bg-blue-700 rounded-xl gap-2 h-11 inline-flex items-center px-4 text-white">
              <Plus className="h-4 w-4" /> <span>Add Province</span>
            </button>
          </>
        }
      />

      <StatsGrid
        items={[
          { label: "Total Provinces", value: String(stats.totalProvinces), color: "bg-blue-100" },
          { label: "Total Athletes", value: String(stats.totalAthletes), color: "bg-green-100" },
          { label: "Total Medals", value: String(stats.totalMedals), color: "bg-purple-100" },
          { label: "Avg Medals/Province", value: String(stats.avgMedals), color: "bg-orange-100" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden relative p-8 h-full bg-white">
          <div className="flex flex-col h-full justify-center space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-black text-slate-800">#1</span>
              <div className="bg-yellow-100 p-2 rounded-xl">
                <svg className="h-8 w-8 text-yellow-500" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-black text-slate-900">Phnom Penh</h3>
              <p className="text-xl font-bold text-slate-400">ភ្នំពេញ</p>
            </div>
            <div className="space-y-3 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-bold">Athletes:</span>
                <span className="text-xl font-black">1</span>
              </div>
              <div className="flex gap-3">
                <span className="text-sm">1</span>
                <span className="text-sm">0</span>
                <span className="text-sm">0</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-slate-500 font-bold">Total Medals:</span>
                <span className="text-4xl font-black text-[#1a4cd8]">1</span>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-full -mr-12 -mt-12 blur-2xl" />
        </Card>

        <ProvinceTable provinces={list} />
      </div>

      <CreateProvinceDialog open={open} onOpenChange={setOpen} onCreate={handleCreate} />
    </div>
  )
}
