import { NextResponse } from "next/server"
import type { Sport } from "@/types"
import sportsFromFile from "@/lib/data/mock/sports.json"

const normalizeStatus = (s: any) => {
  if (!s) return "upcoming";
  const st = String(s).toLowerCase();
  if (["active", "upcoming", "ongoing", "completed"].includes(st)) return st as any;
  return "upcoming";
}

const SPORTS: Sport[] = (sportsFromFile as any[]).map((s) => ({
  id: String(s.id ?? Date.now()),
  name: s.name ?? String(s.id ?? ""),
  category: typeof s.category === "string" ? s.category : (Array.isArray(s.category) ? s.category.join(", ") : String(s.category ?? "")),
  description: s.description ?? "",
  maxParticipants: Number(s.maxParticipants ?? 0),
  currentParticipants: Number(s.currentParticipants ?? 0),
  startDate: s.startDate ?? "",
  endDate: s.endDate ?? "",
  venue: s.venue ?? "",
  status: normalizeStatus(s.status) as any,
  icon: s.icon ?? "",
}))

export async function GET() {
  return NextResponse.json(SPORTS)
}

export async function POST(request: Request) {
  const body = await request.json()
  const id = String(Date.now())
  const created: Sport = {
    id,
    name: body.name ?? `sport-${id}`,
    category: body.category ?? "",
    description: body.description ?? "",
    maxParticipants: Number(body.maxParticipants ?? 0),
    currentParticipants: Number(body.currentParticipants ?? 0),
    startDate: body.startDate ?? "",
    endDate: body.endDate ?? "",
    venue: body.venue ?? "",
    status: normalizeStatus(body.status) as any,
    icon: body.icon ?? "",
  }
  SPORTS.push(created)
  return new Response(JSON.stringify(created), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  })
}
