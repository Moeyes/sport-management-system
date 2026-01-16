import { NextResponse } from "next/server"
import path from "path"
import { promises as fs } from "fs"
import type { FormData } from "@/types/registration"

const FILE = path.join(process.cwd(), "/lib/data/mock/registrations.json")

async function readRegistrations(): Promise<any[]> {
  try {
    const raw = await fs.readFile(FILE, "utf-8")
    const parsed = JSON.parse(raw || "[]")
    if (Array.isArray(parsed)) return parsed
    // If file contains a single object, normalize to an array
    if (parsed && typeof parsed === 'object') return [parsed]
    return []
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

// helper extracted for tests and reuse
export async function createTeamAndMemberRegistrations(body: any) {
  const { normalizeTeam, normalizeRegistration } = await import('@/lib/data/normalizers/registrationNormalizer')
  const teamsFile = path.join(process.cwd(), '/lib/data/mock/teams.json')
  const teamsRaw = await fs.readFile(teamsFile, 'utf-8')
  const teamsArr = JSON.parse(teamsRaw || '[]')

  const teamData = normalizeTeam(body)
  const teamId = String(Date.now())
  const teamRecord = { id: teamId, ...teamData }
  teamsArr.push(teamRecord)
  await fs.writeFile(teamsFile, JSON.stringify(teamsArr, null, 2), 'utf-8')

  // create registration entries for each team member
  const members = body.teamMembers ?? []
  const regsArr = await readRegistrations()
  const now = new Date().toISOString()
  for (const m of members) {
    const memberPayload = { ...body, ...m, registrationType: 'team', teamId, teamName: teamRecord.name }
    const normMember = normalizeRegistration(memberPayload as Partial<FormData>)
    const memberCreated = {
      id: String(Date.now()) + String(Math.floor(Math.random() * 1000)),
      registeredAt: now,
      photoUrl: null,
      ...normMember,
    } as any
    regsArr.push(memberCreated)
  }
  await writeRegistrations(regsArr)
  return teamRecord
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || ''
    let body: Partial<FormData> = {}
    let photoUrl: string | null = null

    if (contentType.includes('multipart/form-data')) {
      const fd = await request.formData()
      const payload = fd.get('payload') as string | null
      if (payload) {
        try {
          body = JSON.parse(payload)
        } catch (e) {
          console.warn('Failed to parse payload JSON', e)
          body = {}
        }
      }

      const file = fd.get('photo') as any
      if (file && typeof file.arrayBuffer === 'function') {
        // basic server-side checks and save to /public/uploads
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
        await fs.mkdir(uploadsDir, { recursive: true })
        const buffer = Buffer.from(await file.arrayBuffer())

        // basic mime/type check (if available) and size limit
        const mime = file.type || ''
        const maxSize = 2 * 1024 * 1024 // 2MB
        if (mime && !mime.startsWith('image/')) {
          return new Response(JSON.stringify({ message: 'Uploaded file must be an image.' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
        }
        if (buffer.length > maxSize) {
          return new Response(JSON.stringify({ message: 'Image size must be 2MB or smaller.' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
        }

        const filename = `${Date.now()}-${(file.name ?? 'upload.jpg').replace(/[^a-zA-Z0-9.-]/g, '_')}`
        const filepath = path.join(uploadsDir, filename)
        await fs.writeFile(filepath, buffer)
        photoUrl = `/uploads/${filename}`
      }
    } else {
      body = (await request.json()) as Partial<FormData>
    }

    const regsRaw = await readRegistrations()
    const regs = Array.isArray(regsRaw) ? regsRaw : []
    const id = String(Date.now())
    const now = new Date().toISOString()

    // Normalize the incoming payload so the stored data is consistent and easy to consume
    // Import normalization helper to keep mapping logic centralized
    const { normalizeRegistration } = await import('@/lib/data/normalizers/registrationNormalizer')
    const normalized = normalizeRegistration(body as Partial<FormData>)

    // Helpful debug output in dev to inspect normalized payload (safe-guarded)
    if (process.env.NODE_ENV !== 'production') {
      try {
        console.debug('normalized registration:', JSON.stringify(normalized))
      } catch (_e) {
        // ignore serialization errors in debug
      }
    }

    // If this is a team registration, create a team record and member registrations
    if ((body as any).registrationType === 'team') {
      try {
        const team = await createTeamAndMemberRegistrations(body)
        return new Response(JSON.stringify(team), { status: 201, headers: { "Content-Type": "application/json" } })
      } catch (err) {
        console.error('Failed to create team and member registrations', err)
        return new Response(JSON.stringify({ message: 'Failed to create team' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
      }
    }

    const created = {
      id,
      registeredAt: now,
      photoUrl: photoUrl ?? (body.photoUrl ?? null),
      ...normalized,
      ...((body as any).extra ? (body as any).extra : {}),
    } as any

    regs.push(created)
    await writeRegistrations(regs)
    return new Response(JSON.stringify(created), { status: 201, headers: { "Content-Type": "application/json" } })
  } catch (err) {
    console.error("Failed to save registration", err)
    return new Response(JSON.stringify({ message: "Failed to save registration" }), { status: 500, headers: { "Content-Type": "application/json" } })
  }
}
