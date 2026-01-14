import { NextResponse } from "next/server"
import path from "path"
import { promises as fs } from "fs"
import type { FormData } from "@/types/registration"

const FILE = path.join(process.cwd(), "/lib/data/mock/registrations.json")

async function readRegistrations(): Promise<any[]> {
  try {
    const raw = await fs.readFile(FILE, "utf-8")
    return JSON.parse(raw || "[]")
  } catch (e) {
    return []
  }
}

async function writeRegistrations(data: any[]) {
  await fs.writeFile(FILE, JSON.stringify(data, null, 2), "utf-8")
}

export async function GET() {
  const regs = await readRegistrations()
  return NextResponse.json(regs)
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<FormData>
    const regs = await readRegistrations()
    const id = String(Date.now())
    const now = new Date().toISOString()
    // Normalize payload to follow FormData shape
    const created = {
      id,
      registeredAt: now,
      registrationDate: now,
      // identification
      name: body.name ?? [body.firstName, body.lastName].filter(Boolean).join(" ") ?? null,
      firstName: body.firstName ?? null,
      lastName: body.lastName ?? null,
      // participation
      gender: body.gender ?? null,
      dateOfBirth: body.dateOfBirth ?? null,
      nationality: body.nationality ?? null,
      position: body.position ?? null,
      organization: body.organization ?? null,
      // contact
      phone: body.phone ?? body.phoneNumber ?? null,
      email: body.email ?? null,
      nationalID: body.nationalID ?? null,
      // event/sport
      eventId: body.eventId ?? null,
      sport: body.sport ?? (Array.isArray(body.sports) ? body.sports[0] : null),
      sports: body.sports ?? (body.sport ? [body.sport] : []),
      sportId: body.sportId ?? null,
      sportCategory: body.category ?? body.sportCategory ?? null,
      category: body.category ?? body.sportCategory ?? null,
      // location
      province: body.province ?? body.department ?? null,
      department: body.department ?? null,
      // meta
      coach: body.coach ?? null,
      assistant: body.assistant ?? null,
      ...body,
    } as any

    regs.push(created)
    await writeRegistrations(regs)
    return new Response(JSON.stringify(created), { status: 201, headers: { "Content-Type": "application/json" } })
  } catch (err) {
    console.error("Failed to save registration", err)
    return new Response(JSON.stringify({ message: "Failed to save registration" }), { status: 500, headers: { "Content-Type": "application/json" } })
  }
}
