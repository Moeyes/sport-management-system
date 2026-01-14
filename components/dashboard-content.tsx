// "use client"

// import { useState, useEffect } from "react"
// // import type { Event, Athlete, SportRecord, Medal } from "@/src/types"
// import type { Event, Athlete, SportRecord ,Medal } from "@/types"
// import {
//   Search,
//   Bell,

// } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import { useSearchParams, useRouter } from "next/navigation"
// import { DashboardBanner, StatsGrid, EventsSection, QuickActions, AthletesSection, SportsSection, ProvincesSection } from "@/components/dashboard"
// import { MedalsView } from "@/components/medals"
// import { cn } from "@/lib/utils"

// const eventsMock: any = require("../src/lib/data/mock/events.json")
// const athletesMock: any = require("../src/lib/data/mock/athletes.json")
// const medalsMock: any = require("../src/lib/data/mock/medals.json")
// const sportsMock: any = require("../src/lib/data/mock/sports.json")
// const provincesMock: any = require("../src/lib/data/mock/provinces.json")

// // Normalize mock athlete shape to internal `Athlete` type (src types expect different shape)
// const normalizeAthlete = (a: any): Athlete => ({
//   // provide required fields with safe defaults so this shape is compatible with `src/types`
//   id: String(a.id),
//   registeredAt: a.registeredAt ?? a.registrationDate ?? "",
//   eventId: String(a.eventId ?? a.event ?? ""),
//   sportId: a.sportId ?? "",
//   firstName: a.firstName ?? (a.name ? String(a.name).split(" ")[0] : ""),
//   lastName: a.lastName ?? (a.name ? String(a.name).split(" ").slice(1).join(" ") : ""),
//   dateOfBirth: a.dateOfBirth ?? "",
//   gender: (a.gender && String(a.gender).toLowerCase()) || "other",
//   province: a.province ?? "",
//   department: a.department ?? "",
//   eventType: a.eventType ?? "",
//   sports: Array.isArray(a.sports) ? a.sports : (a.sport ? [a.sport] : []),
//   position: a.position ?? "",
//   nationalID: a.nationalId ?? a.nationalID ?? "",
//   email: a.email ?? "",
//   phone: a.phone ?? "",
//   photoUrl: a.photoUrl ?? "",
//   registrationDate: a.registrationDate ?? "",
//   status: (a.status?.toString().toLowerCase() === "approved"
//     ? "approved"
//     : a.status?.toString().toLowerCase() === "rejected"
//     ? "rejected"
//     : "pending") as any,
//   medals: {
//     gold: Number(a.medals?.gold ?? 0),
//     silver: Number(a.medals?.silver ?? 0),
//     bronze: Number(a.medals?.bronze ?? 0),
//   },
// })

// const EVENTS: Event[] = (eventsMock as any) as Event[]
// const SPORTS: SportRecord[] = (sportsMock as any) as SportRecord[]
// const ATHLETES = ((athletesMock as any[]) || []).map(normalizeAthlete)
// const ATHLETES_BY_EVENT: Record<string, Athlete[]> = ((athletesMock as any[]) || []).reduce((acc, a: any) => {
//   const key = String(a.eventId ?? a.event ?? "")
//   const na = normalizeAthlete(a)
//   if (!acc[key]) acc[key] = []
//   acc[key].push(na)
//   return acc
// }, {} as Record<string, Athlete[]>)

// const INITIAL_EVENTS: Event[] = EVENTS
// const SPORTS_DATA: SportRecord[] = SPORTS
// const ATHLETES_DATA: Record<string, Athlete[]> = ATHLETES_BY_EVENT

// export function DashboardContent() {
//   const searchParams = useSearchParams()
//   const router = useRouter()

//   const eventIdFromUrl = searchParams.get("event")
//   const currentView = searchParams.get("view") || "dashboard"

//   const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS)
//   const [selectedEventId, setSelectedEventId] = useState<string | null>(eventIdFromUrl)
//   const initialMedals: Medal[] = ((medalsMock as any[]) || []).map((m) => ({
//     id: String(m.id),
//     athleteId: String(m.athleteId),
//     athleteName: m.athleteName ?? "",
//     sportId: m.sportId ?? "",
//     sportName: m.sportName ?? m.sport ?? "",
//     medalType: (m.medalType ? String(m.medalType).toLowerCase() : "gold") as any,
//     province: m.province ?? "",
//     awardedDate: m.awardedDate ?? m.date ?? "",
//     event: String(m.eventId ?? m.event ?? ""),
//   }))

//   const [medals, setMedals] = useState<Medal[]>(initialMedals)

//   useEffect(() => {
//     setSelectedEventId(eventIdFromUrl)
//   }, [eventIdFromUrl])

//   const selectedEvent = events.find((e) => e.id === selectedEventId)

//   const getAllAthletes = () => {
//     const combined: Record<string, Athlete> = {}
//     Object.values(ATHLETES_DATA)
//       .flat()
//       .forEach((a) => {
//         const medals = a.medals ?? { gold: 0, silver: 0, bronze: 0 }
//         if (combined[a.id]) {
//           const cm = combined[a.id]
//           cm.medals = cm.medals ?? { gold: 0, silver: 0, bronze: 0 }
//           cm.medals.gold = (cm.medals.gold ?? 0) + medals.gold
//           cm.medals.silver = (cm.medals.silver ?? 0) + medals.silver
//           cm.medals.bronze = (cm.medals.bronze ?? 0) + medals.bronze
//         } else {
//           combined[a.id] = { ...a, medals: { gold: medals.gold, silver: medals.silver, bronze: medals.bronze } }
//         }
//       })
//     return Object.values(combined)
//   }

//   const currentAthletes = selectedEventId ? ATHLETES_DATA[selectedEventId] || [] : getAllAthletes()

//   const getProvinceStats = () => {
//     const provinces: Record<string, { gold: number; silver: number; bronze: number; athletes: number }> = {}
//     currentAthletes.forEach((a) => {
//       if (!provinces[a.province]) provinces[a.province] = { gold: 0, silver: 0, bronze: 0, athletes: 0 }
//       const medals = a.medals ?? { gold: 0, silver: 0, bronze: 0 }
//       provinces[a.province].gold += medals.gold
//       provinces[a.province].silver += medals.silver
//       provinces[a.province].bronze += medals.bronze
//       provinces[a.province].athletes += 1
//     })
//     return Object.entries(provinces).map(([name, stats]) => ({
//       name,
//       ...stats,
//       total: stats.gold + stats.silver + stats.bronze,
//     }))
//   }

//   const renderAthletesView = () => <AthletesSection athletes={currentAthletes} />

//   const renderSportsView = () => <SportsSection sports={SPORTS_DATA} />

//   const renderProvincesView = () => <ProvincesSection provinces={getProvinceStats()} />

//   const handleSelectEvent = (id: string | null) => {
//     if (id) {
//       router.push(`/?event=${id}&view=dashboard`)
//     } else {
//       router.push(`/`)
//     }
//     setSelectedEventId(id)
//   }

//   const statsItems: any[] = [
//     { label: "Athletes", value: getAllAthletes().length },
//     { label: "Sports", value: SPORTS.length },
//     { label: "Provinces", value: (provincesMock as any[]).length },
//     { label: "Medals", value: medals.length },
//   ]

//   return (
//     <div className="flex flex-col flex-1 bg-slate-50/50 min-h-screen">
//       <header className="h-16 border-b bg-white flex items-center justify-between px-8 sticky top-0 z-20">
//         <div className="flex items-center gap-4 flex-1">
//           <div className="relative w-full max-w-md">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input placeholder="Search athletes..." className="pl-10 bg-slate-50 border-none h-10 rounded-xl" />
//           </div>
//         </div>
//         <div className="flex items-center gap-6">
//           <button className="relative p-2 rounded-full hover:bg-slate-50 transition-colors">
//             <Bell className="h-5 w-5 text-muted-foreground" />
//             <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-red-500 text-[10px] text-white rounded-full flex items-center justify-center border-2 border-white">
//               3
//             </span>
//           </button>
//           <div className="flex items-center gap-3 pl-4 border-l">
//             <div className="text-right hidden sm:block">
//               <p className="text-sm font-bold">Admin User</p>
//               <p className="text-[10px] text-muted-foreground">Administrator</p>
//             </div>
//             <div className="h-9 w-9 rounded-full bg-[#1a4cd8] flex items-center justify-center text-white font-bold text-sm">
//               A
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="p-8 space-y-8">
//         {(currentView === "dashboard" || !currentView) && (
//           <>
//             <DashboardBanner />

//             <StatsGrid items={statsItems} />

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-2 space-y-6">
//                 <EventsSection events={events} onCreate={(e) => setEvents([e, ...events])} onSelect={(id) => handleSelectEvent(id)} />
//               </div>

//               <div className="space-y-6">
//                 <QuickActions />
//               </div>
//             </div>
//           </>
//         )}

//         {eventIdFromUrl && currentView === "athletes" && renderAthletesView()}
//         {eventIdFromUrl && currentView === "medals" && (
//           <MedalsView events={events} athletes={currentAthletes} selectedEventId={selectedEventId} medals={medals} setMedals={setMedals} />
//         )}
//         {eventIdFromUrl && currentView === "provinces" && renderProvincesView()}

//         {!eventIdFromUrl && currentView === "athletes" && renderAthletesView()}
//         {!eventIdFromUrl && currentView === "medals" && (
//           <MedalsView events={events} athletes={currentAthletes} selectedEventId={selectedEventId} medals={medals} setMedals={setMedals} />
//         )}
//         {currentView === "sports" && renderSportsView()}
//         {!eventIdFromUrl && currentView === "provinces" && renderProvincesView()}
//       </main>
//     </div>
//   )
// }
