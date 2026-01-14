import { NextResponse } from "next/server";
import type { Medal } from "@/types";

// Load seed medals from mock JSON so API mirrors mock data
const medalsMock: any[] = require("../../../src/lib/data/mock/medals.json");

const MEDALS: Medal[] = (medalsMock || []).map((m) => ({
  id: String(m.id),
  athleteId: String(m.athleteId ?? m.athlete ?? ""),
  athleteName: m.athleteName ?? "",
  sportId: m.sportId ?? "",
  sportName: m.sportName ?? m.sport ?? "",
  medalType: (m.medalType ? String(m.medalType).toLowerCase() : "gold") as any,
  province: m.province ?? "",
  awardedDate: m.awardedDate ?? m.date ?? "",
  event: String(m.eventId ?? m.event ?? ""),
}));

export async function GET() {
  return NextResponse.json(MEDALS);
}

export async function POST(request: Request) {
  const body = await request.json();
  const id = String(Date.now());
  const created = { id, ...(body as Partial<Medal>) };
  return new Response(JSON.stringify(created), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
