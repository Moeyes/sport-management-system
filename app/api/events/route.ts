import { NextResponse } from "next/server"
import type { Event } from "@/types/event"
import eventsFromFile from "@/lib/data/mock/events.json"

// Helper: simple slug generator
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function normalizeSport(s: any) {
  if (!s) return null;
  if (typeof s === "string") return { id: slug(s), name: s, categories: [], status: "Upcoming" } as any;
  return {
    id: s.id ?? slug(s.name ?? String(s)),
    name: s.name ?? String(s),
    categories: s.categories ?? (s.category ? (Array.isArray(s.category) ? s.category : [s.category]) : []),
    status: s.status ?? "Upcoming",
  } as any;
}

// Initialize in-memory store from JSON file and normalize shape
const EVENTS: Event[] = (eventsFromFile as any[]).map((e) => ({
  id: e.id ?? String(Date.now()),
  name: e.name,
  startDate: e.startDate,
  endDate: e.endDate,
  status: e.status,
  sports: Array.isArray(e.sports) ? e.sports.map((s: any) => normalizeSport(s)) : [],
}));

export async function GET() {
  return NextResponse.json(EVENTS)
}

export async function POST(request: Request) {
  const body = await request.json()
  const id = String(Date.now())
  const created = {
    id,
    ...(body as Partial<Event>),
    sports: Array.isArray((body as any).sports) ? (body as any).sports.map((s: any) => normalizeSport(s)) : [],
  }
  EVENTS.push(created as Event)
  return new Response(JSON.stringify(created), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  })
}
