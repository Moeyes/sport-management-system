// @ts-nocheck
"use client"

import { ProvincesSection } from "@/components/dashboard"
import type { Athlete } from "@/types"

const ATHLETES: Athlete[] = [
  { id: "a1", name: "Sokha Mean", province: "Phnom Penh", sport: "Boxing", status: "Approved", medals: { gold: 1, silver: 0, bronze: 0 } },
  { id: "a2", name: "Dara Van", province: "Siem Reap", sport: "Badminton", status: "Approved", medals: { gold: 0, silver: 1, bronze: 0 } },
]

function calcProvinces(athletes: Athlete[]) {
  const provinces: Record<string, { gold: number; silver: number; bronze: number; athletes: number }> = {}
  athletes.forEach((a) => {
    if (!provinces[a.province]) provinces[a.province] = { gold: 0, silver: 0, bronze: 0, athletes: 0 }
    provinces[a.province].gold += a.medals.gold
    provinces[a.province].silver += a.medals.silver
    provinces[a.province].bronze += a.medals.bronze
    provinces[a.province].athletes += 1
  })
  return Object.entries(provinces).map(([name, stats]) => ({ name, ...stats, total: stats.gold + stats.silver + stats.bronze }))
}

export default function ProvincesPage() {
  const provinces = calcProvinces(ATHLETES)

  return (
    <div className="p-6">
      <ProvincesSection provinces={provinces} />
    </div>
  )
}
