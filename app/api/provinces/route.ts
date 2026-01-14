import { NextResponse } from "next/server";
import type { Province } from "@/types";
import provincesFromFile from "@/lib/data/mock/provinces.json";

const PROVINCES: Province[] = (provincesFromFile as any[]).map((p) => {
  const gold = Number(p.medals?.gold ?? 0);
  const silver = Number(p.medals?.silver ?? 0);
  const bronze = Number(p.medals?.bronze ?? 0);
  const total = Number(p.medals?.total ?? gold + silver + bronze);

  return {
    id: String(p.id ?? Date.now()),
    name: p.name ?? "",
    khmerName: p.khmerName ?? undefined,
    athleteCount: Number(p.athleteCount ?? 0),
    medals: {
      gold,
      silver,
      bronze,
      total,
    },
    rank: p.rank !== undefined ? Number(p.rank) : undefined,
  } as Province;
});

export async function GET() {
  return NextResponse.json(PROVINCES);
}

export async function POST(request: Request) {
  const body = await request.json();
  const id = String(Date.now());
  const gold = Number(body.medals?.gold ?? 0);
  const silver = Number(body.medals?.silver ?? 0);
  const bronze = Number(body.medals?.bronze ?? 0);
  const total = Number(body.medals?.total ?? gold + silver + bronze);

  const created: Province = {
    id,
    name: body.name ?? `Province ${id}`,
    khmerName: body.khmerName ?? undefined,
    athleteCount: Number(body.athleteCount ?? 0),
    medals: {
      gold,
      silver,
      bronze,
      total,
    },
    rank: body.rank !== undefined ? Number(body.rank) : undefined,
  };

  PROVINCES.push(created);

  return new Response(JSON.stringify(created), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
