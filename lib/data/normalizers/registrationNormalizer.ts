import type { FormData } from '@/types/registration'

// Simple slug helper (same behavior as events route)
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export function ensureArrayOfStrings(value: unknown): string[] {
  if (!value) return []
  if (Array.isArray(value)) return value.map(String)
  return [String(value)]
}

export function normalizeOrganization(org: any) {
  if (!org) return { type: null, province: null, department: null }
  if (typeof org === 'object') {
    return {
      type: org.type ?? null,
      province: org.province ?? null,
      department: org.department ?? null,
    }
  }
  // primitive value (string)
  return { type: org, province: null, department: null }
}

export function normalizePosition(pos: any) {
  if (!pos) return { role: null, coach: null, assistant: null }
  if (typeof pos === 'object') {
    return {
      role: pos.role ?? pos ?? null,
      coach: pos.coach ?? null,
      assistant: pos.assistant ?? null,
    }
  }
  return { role: pos ?? null, coach: null, assistant: null }
}

// Build a normalized team object from registration payload
export function normalizeTeam(body: any) {
  const membersRaw = Array.isArray(body.teamMembers) ? body.teamMembers : []
  const members = membersRaw.map((m: any) => ({
    firstName: m.firstName ?? null,
    lastName: m.lastName ?? null,
    firstNameKh: m.firstNameKh ?? null,
    lastNameKh: m.lastNameKh ?? null,
    nationalID: m.nationalID ?? null,
    dateOfBirth: m.dateOfBirth ?? null,
    gender: m.gender ?? null,
    phone: (typeof m.phone === 'string' ? m.phone.trim() : m.phone) ?? null,
    position: m.position ?? null,
    organization: normalizeOrganization(m.organization ?? body.organization ?? null),
    photoUrl: m.photoUrl ?? null,
    isLeader: !!m.isLeader,
  }))

  const sports = ensureArrayOfStrings(body.sports ?? (body.sport ? [body.sport] : []))
  const primary = sports.length ? sports[0] : (body.sport ?? null)

  return {
    name: body.teamName ?? body.name ?? 'Unnamed Team',
    eventId: body.eventId ?? null,
    sport: primary ?? null,
    sports,
    sportId: primary ? slug(String(primary)) : null,
    sportCategory: body.category ?? body.sportCategory ?? null,
    organization: normalizeOrganization(body.organization ?? null),
    leaderNationalID: body.leaderNationalID ?? null,
    members,
    status: body.status ?? 'pending',
    createdAt: new Date().toISOString(),
  } as any
}
export function normalizeRegistration(body: Partial<FormData>) {
  const sports = ensureArrayOfStrings((body as any).sports ?? (body as any).sport ? (body as any).sports ?? [ (body as any).sport ] : [])

  const primarySport = sports && sports.length ? sports[0] : (body.sport ?? null)

  const category = (body as any).category ?? null

  const sanitizedPhone = typeof body.phone === 'string' ? body.phone.trim() : body.phone ?? null

  return {
    firstName: body.firstName ?? null,
    lastName: body.lastName ?? null,
    firstNameKh: body.firstNameKh ?? null,
    lastNameKh: body.lastNameKh ?? null,
    dateOfBirth: body.dateOfBirth ?? null,
    gender: body.gender ?? null,
    nationality: body.nationality ?? null,
    nationalID: body.nationalID ?? null,
    phone: sanitizedPhone,
    position: normalizePosition((body as any).position),
    organization: normalizeOrganization((body as any).organization),
    eventId: body.eventId ?? null,

    // Sport fields
    sport: primarySport ?? null,
    sports,
    sportId: primarySport ? slug(String(primarySport)) : null,
    sportCategory: category ?? (body as any).sportCategory ?? null,

    // Team-related fields supported on registration
    registrationType: (body as any).registrationType ?? 'individual',
    teamId: (body as any).teamId ?? null,
    teamName: (body as any).teamName ?? null,
    isTeamLeader: (body as any).isTeamLeader ?? false,

    // File/photo
    photoUrl: (body as any).photoUrl ?? null,

    // Keep any extra fields untouched for now
    ...((body as any).extra ? (body as any).extra : {}),
  } as any
}
