"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"

type Props = {
  children: (opts: { query: string; setQuery: (v: string) => void; status: string; setStatus: (v: string) => void; category: string; setCategory: (v: string) => void }) => React.ReactNode
  statusOptions?: string[]
  categoryOptions?: string[]
}

export function SearchTableWrapper({ children, statusOptions = [], categoryOptions = [] }: Props) {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("")
  const [category, setCategory] = useState("")

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="relative flex-1 min-w-50">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="pl-10 h-11 bg-slate-50 border-slate-200 rounded-xl" />
        </div>

        {statusOptions.length > 0 && (
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium">
            <option value="">All Status</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        )}

        {categoryOptions.length > 0 && (
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium">
            <option value="">All Categories</option>
            {categoryOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        )}
      </div>

      {children({ query, setQuery, status, setStatus, category, setCategory })}
    </div>
  )
}

export default SearchTableWrapper;
