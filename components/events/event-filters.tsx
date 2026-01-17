// @ts-nocheck
// "use client"

// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectTriggerInput, SelectValue } from "@/components/ui/select"
// import { Search } from "lucide-react"
// import type { Sport } from "@/types"
// import { useState } from "react"

// interface EventFiltersProps {
//   sports?: Sport[]
//   onSearch?: (q: string) => void
//   onSportChange?: (sport: string | null) => void
// }

// export function EventFilters({ sports = [], onSearch, onSportChange }: EventFiltersProps) {
//   const [query, setQuery] = useState("")
//   const [sport, setSport] = useState<string | null>(null)

//   const handleSearch = () => onSearch?.(query)

//   return (
//     <div className="flex flex-wrap gap-3 items-center">
//       <div className="relative min-w-[200px] flex-1">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//         <Input
//           placeholder="Search events..."
//           className="pl-10 h-11 bg-slate-50 border-slate-200 rounded-xl"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") handleSearch()
//           }}
//         />
//       </div>

//       <Select value={sport ?? ""} onValueChange={(v) => { setSport(v || null); onSportChange?.(v || null) }}>
//         <SelectTriggerInput className="min-w-[150px]">
//           <SelectValue placeholder="All Sports" />
//         </SelectTriggerInput>
//         <SelectContent className="rounded-xl">
//           <SelectItem value="">All Sports</SelectItem>
//           {sports.map((s) => (
//             <SelectItem key={s} value={s}>{s}</SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       <Button variant="outline" className="h-11 rounded-xl" onClick={handleSearch}>
//         Filter
//       </Button>
//     </div>
//   )
// }
