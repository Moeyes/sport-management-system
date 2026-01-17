// @ts-nocheck
"use client"

import type { SportRecord } from "@/types"

const SPORTS_DATA: SportRecord[] = [
  { id: "s1", name: "Basketball", category: "Team Sports", participants: "144/12", status: "Completed" },
  { id: "s2", name: "Swimming", category: "Aquatics", participants: "96/8", status: "Ongoing" },
  { id: "s3", name: "Athletics", category: "Track & Field", participants: "128/16", status: "Ongoing" },
]

export default function SportsPage() {
  return (
    <div className="p-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Sports</h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-sm text-slate-500">
              <th className="pb-2">Name</th>
              <th className="pb-2">Category</th>
              <th className="pb-2">Participants</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {SPORTS_DATA.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="py-3 font-medium">{s.name}</td>
                <td className="py-3 text-slate-500">{s.category}</td>
                <td className="py-3 text-slate-500">{s.participants}</td>
                <td className="py-3 text-slate-500">{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
