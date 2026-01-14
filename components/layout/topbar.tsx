"use client"

import { Search, Bell } from "lucide-react"

export function Topbar({ title }: { title?: string }) {
  return (
    <header className="flex items-center justify-between gap-4 p-4 border-b bg-white">
      <div>
        <h2 className="text-lg font-semibold">{title || "Dashboard"}</h2>
        <p className="text-sm text-muted-foreground">Overview & quick actions</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-lg p-2">
          <Search className="w-4 h-4 text-slate-400" />
          <input className="bg-transparent outline-none text-sm" placeholder="Search..." />
        </div>
        <button className="rounded-lg p-2 hover:bg-slate-100">
          <Bell className="w-5 h-5 text-slate-600" />
        </button>
      </div>
    </header>
  )
}
