import { NextResponse } from 'next/server'
import type { Athlete } from '@/types'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'src/lib/data/mock/athletes.json')

export async function GET() {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf-8')
    const data = JSON.parse(raw)
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json()

    const raw = await fs.readFile(DATA_PATH, 'utf-8')
    const items = JSON.parse(raw) as any[]

    // compute next numeric id if possible
    const numericIds = items
      .map((i) => parseInt(String(i.id).replace(/[^0-9]/g, ''), 10))
      .filter((n) => !Number.isNaN(n))
    const nextId = numericIds.length ? String(Math.max(...numericIds) + 1) : String(Date.now())

    const newAthlete = {
      id: nextId,
      firstName: (payload.firstNameEn || payload.firstName || '').toUpperCase(),
      lastName: (payload.lastNameEn || payload.lastName || '').toUpperCase(),
      eventId: payload.event || payload.eventId || null,
      dateOfBirth: payload.dob || payload.dateOfBirth || '',
      gender: payload.gender || 'male',
      province: payload.province || payload.department || '',
      sports: payload.sport ? [payload.sport] : payload.sports || [],
      email: payload.email || '',
      phone: payload.phone || payload.phoneNumber || '',
      registrationDate: new Date().toISOString().split('T')[0],
      registeredAt: new Date().toISOString(),
      status: 'pending',
      medals: { gold: 0, silver: 0, bronze: 0 },
      photoUrl: payload.photoUrl || '/avatars/default.jpg',
    }

    items.push(newAthlete)
    await fs.writeFile(DATA_PATH, JSON.stringify(items, null, 2), 'utf-8')

    return NextResponse.json(newAthlete, { status: 201 })
  } catch (err) {
    console.error('Failed to write athletes JSON', err)
    return NextResponse.json({ error: 'Failed to create athlete' }, { status: 500 })
  }
}
