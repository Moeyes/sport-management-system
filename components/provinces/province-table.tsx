"use client"

import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import SearchTableWrapper from "@/components/common/SearchTableWrapper"
import { useMemo } from "react"
import { EmptyState } from "@/components/common/EmptyState"
import type { Province } from "@/components/dashboard/ProvincesSection"

export function ProvinceTable({ provinces }: { provinces: Province[] }) {
  const filtered = useMemo(() => provinces, [provinces])

  if (provinces.length === 0) {
    return <EmptyState title="No provinces" description="Create a province to see rankings." actionLabel="Add Province" />
  }

  return (
    <div className="lg:col-span-2">
      <div className="lg:col-span-2 border-none shadow-sm rounded-2xl p-6">
        <div className="space-y-6">
          <SearchTableWrapper>
            {({ query, setQuery }) => (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by province name..." className="pl-10 h-11 bg-slate-50 border-slate-200 rounded-xl max-w-sm" />
              </div>
            )}
          </SearchTableWrapper>
          <div className="space-y-4">
            <SearchTableWrapper>
              {({ query }) => {
                const filtered = provinces.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))

                return (
                  <>
                    <h3 className="font-bold text-slate-800">Province Rankings ({filtered.length})</h3>
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-50/50">
                          <TableHead className="font-bold text-[10px] uppercase text-slate-400">Rank</TableHead>
                          <TableHead className="font-bold text-[10px] uppercase text-slate-400">Province</TableHead>
                          <TableHead className="font-bold text-[10px] uppercase text-slate-400">Code</TableHead>
                          <TableHead className="font-bold text-[10px] uppercase text-slate-400">Athletes</TableHead>
                          <TableHead className="font-bold text-[10px] uppercase text-slate-400">Medals</TableHead>
                          <TableHead className="font-bold text-[10px] uppercase text-slate-400">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filtered
                          .sort((a, b) => b.total - a.total)
                          .map((p, i) => (
                            <TableRow key={p.name}>
                              <TableCell className="font-black">#{i + 1}</TableCell>
                              <TableCell className="font-bold">{p.name}</TableCell>
                              <TableCell className="text-slate-500 uppercase">{p.name.slice(0, 2)}</TableCell>
                              <TableCell className="text-slate-500 font-bold">{p.athletes}</TableCell>
                              <TableCell className="text-slate-500 font-bold">{p.total}</TableCell>
                              <TableCell className="text-[#1a4cd8] font-black">{p.total}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </>
                )
              }}
            </SearchTableWrapper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProvinceTable
