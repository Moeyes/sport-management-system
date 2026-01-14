import React from "react"
import { Topbar } from "@/components/layout/topbar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Topbar />
      <main className="p-6 flex-1 overflow-auto bg-slate-50">{children}</main>
    </div>
  )
}
