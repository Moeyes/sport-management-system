import { NextResponse } from "next/server"
import path from "path"
import { promises as fs } from "fs"
import type { Team } from '@/types/team'

const FILE = path.join(process.cwd(), '/lib/data/mock/teams.json')

async function readTeams(): Promise<any[]> {
  try {
    const raw = await fs.readFile(FILE, 'utf-8')
    const parsed = JSON.parse(raw || '[]')
    if (Array.isArray(parsed)) return parsed
    if (parsed && typeof parsed === 'object') return [parsed]
    return []
  } catch (e) {
    return []
  }
}

async function writeTeams(data: any[]) {
  await fs.writeFile(FILE, JSON.stringify(data, null, 2), 'utf-8')
}

export async function GET(request: Request) {
  const teams = await readTeams()
  // support ?eventId= query
  const url = new URL(request.url)
  const eventId = url.searchParams.get('eventId')
  const filtered = eventId ? teams.filter(t => t.eventId === eventId) : teams
  return NextResponse.json(filtered)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const teams = await readTeams()
    const id = String(Date.now())
    const created: Team = {
      id,
      name: body.name ?? body.teamName ?? 'Unnamed Team',
      eventId: body.eventId ?? null,
      sport: body.sport ?? (Array.isArray(body.sports) ? body.sports[0] : null),
      sportId: (body.sport ?? (Array.isArray(body.sports) ? body.sports[0] : null)) ? String(body.sport ?? (Array.isArray(body.sports) ? body.sports[0] : null)).toLowerCase().replace(/[^a-z0-9]+/g, '-') : null,
      sportCategory: body.sportCategory ?? body.category ?? null,
      organization: body.organization ?? null,
      leaderNationalID: body.leaderNationalID ?? null,
      members: Array.isArray(body.members) ? body.members : [],
      createdAt: new Date().toISOString(),
      status: body.status ?? 'pending',
    }

    teams.push(created)
    await writeTeams(teams)
    return NextResponse.json(created, { status: 201 })
  } catch (err) {
    console.error('Failed to create team', err)
    return new Response(JSON.stringify({ message: 'Failed to create team' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
