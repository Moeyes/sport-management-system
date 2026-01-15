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

    const { province, department, coach, assistant, position: positionInBody, organization: orgInBody, ...rest } = body as any

    const organization = typeof orgInBody === 'object'
      ? {
          type: orgInBody.type ?? null,
          province: orgInBody.province ?? province ?? null,
          department: orgInBody.department ?? department ?? null,
        }
      : {
          type: orgInBody ?? null,
          province: province ?? department ?? null,
          department: department ?? null,
        }

    const position = typeof positionInBody === 'object'
      ? {
          role: positionInBody.role ?? positionInBody ?? null,
          coach: positionInBody.coach ?? coach ?? null,
          assistant: positionInBody.assistant ?? assistant ?? null,
        }
      : {
          role: positionInBody ?? null,
          coach: coach ?? null,
          assistant: assistant ?? null,
        }

    const created = {
      id,
      registeredAt: now,
      firstName: body.firstName ?? null,
      lastName: body.lastName ?? null,
      gender: body.gender ?? null,
      dateOfBirth: body.dateOfBirth ?? null,
      nationality: body.nationality ?? null,
      position,
      organization,
      nationalID: body.nationalID ?? null,
      eventId: body.eventId ?? null,
      phone: body.phone ?? null,
      sport: body.sport ?? (Array.isArray(body.sports) ? body.sports[0] : null),
      sports: body.sports ?? (body.sport ? [body.sport] : []),
      photoUrl: photoUrl ?? (body.photoUrl ?? null),
      ...rest,
    } as any

    regs.push(created)
    await writeRegistrations(regs)
    return new Response(JSON.stringify(created), { status: 201, headers: { "Content-Type": "application/json" } })
  } catch (err) {
    console.error("Failed to save registration", err)
    return new Response(JSON.stringify({ message: "Failed to save registration" }), { status: 500, headers: { "Content-Type": "application/json" } })
  }
}
