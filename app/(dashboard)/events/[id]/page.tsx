// @ts-nocheck
// import { notFound } from "next/navigation"
// import { loadEventById } from "@/lib/data/loaders/event.loader"
// import { athletes as athletesMock, medals as medalsMock } from "@/lib/data/loaders/dataLoader"
// import EventDetailClient from "@/components/events/event-detail"

// export default async function EventDetailPage({ params }: { params: { id: string } }) {
//   const event = await loadEventById(params.id)
//   if (!event) return notFound()

//   // load mock athletes & medals for the event (these are small mock datasets)

//   const normalizeAthlete = (a: any) => ({
//     id: String(a.id),
//     name: `${a.firstName ?? a.name ?? ""} ${a.lastName ?? ""}`.trim(),
//     province: a.province ?? "",
//     sport: Array.isArray(a.sports) && a.sports.length ? a.sports[0] : (a.sport ?? ""),
//     status: (a.status?.toString().toLowerCase() === "approved"
//       ? "Approved"
//       : a.status?.toString().toLowerCase() === "rejected"
//       ? "Rejected"
//       : "Pending") as any,
//     medals: {
//       gold: Number(a.medals?.gold ?? 0),
//       silver: Number(a.medals?.silver ?? 0),
//       bronze: Number(a.medals?.bronze ?? 0),
//     },
//   })

//   const athletes = athletesMock.filter((a) => String(a.eventId) === params.id).map(normalizeAthlete)

//   const medals = (medalsMock as any[])
//     .filter((m) => String(m.eventId) === params.id || String(m.event) === params.id)
//     .map((m) => ({ id: String(m.id), athleteId: String(m.athleteId), eventId: String(m.eventId ?? m.event), date: m.awardedDate ?? m.date ?? "", medalType: (m.medalType ? String(m.medalType).charAt(0).toUpperCase() + String(m.medalType).slice(1) : "Gold") as any, sport: m.sportName ?? m.sport ?? "" }))

//   return (
//     <div className="p-6">
//       <EventDetailClient event={{ ...event, sports: (event as any).sports ?? [] }} athletes={athletes} medals={medals} />
//     </div>
//   )
// }
