import React, { useMemo, useRef, useState } from 'react'
import type { TeamMember } from '@/types/team'
import { isWithinLength } from '@/lib/validation/validators'

interface TeamMembersProps {
  members: TeamMember[];
  onChange: (members: TeamMember[]) => void;
  errors?: Partial<Record<string, string>> | undefined;
}

type PreviewRow = {
  firstName: string;
  lastName: string;
  nationalID?: string;
  phone?: string;
  isLeader?: boolean;
  errors: string[];
}

export function TeamMembers({ members = [], onChange, errors = {} }: TeamMembersProps) {
  const [previewRows, setPreviewRows] = useState<PreviewRow[]>([])
  const fileRef = useRef<HTMLInputElement | null>(null)

  const updateMember = (index: number, patch: Partial<TeamMember>) => {
    const copy = members.slice()
    copy[index] = { ...copy[index], ...patch }
    onChange(copy)
  }

  const addMember = () => {
    onChange([...(members ?? []), { firstName: '', lastName: '', nationalID: '', isLeader: false } as TeamMember])
  }

  const removeMember = (index: number) => {
    const copy = members.slice()
    copy.splice(index, 1)
    onChange(copy)
  }

  // Local validation: per-member checks and duplicate nationalID detection
  const localErrors = useMemo(() => {
    const map: Record<number, string[]> = {}
    const idCount: Record<string, number> = {}
    members.forEach((m) => {
      const id = (m.nationalID ?? '').trim()
      if (id) idCount[id] = (idCount[id] || 0) + 1
    })

    members.forEach((m, i) => {
      const msgs: string[] = []
      if (!m.firstName?.trim()) msgs.push('First name missing')
      if (!m.lastName?.trim()) msgs.push('Last name missing')
      if (m.nationalID) {
        const id = String(m.nationalID).trim()
        if (!isWithinLength(id, 6, 20)) msgs.push('National ID must be between 6 and 20 characters')
        if (id && idCount[id] > 1) msgs.push('Duplicate national ID in team')
      }
      if (msgs.length > 0) map[i] = msgs
    })

    return map
  }, [members])

  const parseCSV = (text: string): PreviewRow[] => {
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
    if (lines.length === 0) return []
    const header = lines[0].split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/).map((h) => h.replace(/^\"|\"$/g, '').trim().toLowerCase())
    const rows: PreviewRow[] = []
    for (let i = 1; i < Math.min(lines.length, 2000); i++) {
      const parts = lines[i].split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/).map((p) => p.replace(/^\"|\"$/g, '').trim())
      const obj: any = {}
      header.forEach((h, idx) => {
        obj[h] = parts[idx] ?? ''
      })
      const row: PreviewRow = {
        firstName: obj.firstname || obj.first_name || obj['first name'] || obj['first'] || '',
        lastName: obj.lastname || obj.last_name || obj['last name'] || obj['last'] || '',
        nationalID: obj.nationalid || obj['national id'] || obj.national_id || obj.nationalID || '',
        phone: obj.phone || obj.telephone || obj.contact || '',
        isLeader: String(obj.isleader || obj.is_leader || obj.leader || '').toLowerCase() === 'true' || String(obj.isleader || obj.is_leader || obj.leader || '').trim() === '1',
        errors: [],
      }
      rows.push(row)
    }
    return rows
  }

  const validatePreviewRows = (rows: PreviewRow[]) => {
    const ids = new Map<string, number>()
    const allIDs = members.map((m) => (m.nationalID ?? '').trim()).filter(Boolean)
    rows.forEach((r) => {
      const id = (r.nationalID ?? '').trim()
      if (id) ids.set(id, (ids.get(id) || 0) + 1)
    })

    return rows.map((r) => {
      const errs: string[] = []
      if (!r.firstName.trim()) errs.push('First name missing')
      if (!r.lastName.trim()) errs.push('Last name missing')
      if (r.nationalID) {
        const id = String(r.nationalID).trim()
        if (!isWithinLength(id, 6, 20)) errs.push('National ID must be between 6 and 20 characters')
        if (ids.get(id)! > 1) errs.push('Duplicate national ID in import file')
        if (allIDs.includes(id)) errs.push('National ID conflicts with existing member')
      }
      return { ...r, errors: errs }
    })
  }

  const onFile = async (file?: File | null) => {
    if (!file) return
    const text = await file.text()
    const parsed = parseCSV(text)
    const validated = validatePreviewRows(parsed)
    setPreviewRows(validated)
  }

  const importValidRows = () => {
    const valid = previewRows.filter((r) => r.errors.length === 0).map((r) => ({ firstName: r.firstName, lastName: r.lastName, nationalID: r.nationalID ?? '', phone: r.phone ?? '', isLeader: r.isLeader ?? false } as TeamMember))
    if (valid.length > 0) {
      onChange([...(members ?? []), ...valid])
    }
    setPreviewRows([])
    if (fileRef.current) fileRef.current.value = ''
  }

  const cancelImport = () => {
    setPreviewRows([])
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center">Team Members</h2>
      <div className="space-y-4">
        {(members || []).map((m, i) => (
          <div key={i} className="p-4 rounded-lg border flex gap-3 items-start">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input value={m.firstName ?? ''} onChange={(e) => updateMember(i, { firstName: e.target.value })} placeholder="First name" className="px-2 py-1 rounded-md border" />
              <input value={m.lastName ?? ''} onChange={(e) => updateMember(i, { lastName: e.target.value })} placeholder="Last name" className="px-2 py-1 rounded-md border" />
              <input value={m.nationalID ?? ''} onChange={(e) => updateMember(i, { nationalID: e.target.value })} placeholder="National ID" className="px-2 py-1 rounded-md border" />
              <input value={m.phone ?? ''} onChange={(e) => updateMember(i, { phone: e.target.value })} placeholder="Phone (optional)" className="px-2 py-1 rounded-md border col-span-2" />
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={!!m.isLeader} onChange={(e) => updateMember(i, { isLeader: e.target.checked })} />
                <span className="text-sm">Leader</span>
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <button className="text-sm text-red-600" onClick={() => removeMember(i)}>Remove</button>
              {errors && (errors as any)[`member_${i}`] && <div className="text-sm text-red-600">{(errors as any)[`member_${i}`]}</div>}
              {localErrors[i] && localErrors[i].length > 0 && (
                <div className="text-sm text-red-600">
                  {localErrors[i].map((s) => <div key={s}>{s}</div>)}
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="text-center">
          <button type="button" className="px-4 py-2 rounded-md border" onClick={addMember}>Add Member</button>
          <input ref={fileRef} type="file" accept=".csv,text/csv" className="hidden" onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
          <button type="button" className="px-4 py-2 rounded-md border ml-2" onClick={() => fileRef.current?.click()}>Import CSV</button>
        </div>

        {previewRows && previewRows.length > 0 && (
          <div className="p-4 rounded-lg border bg-slate-50">
            <div className="mb-2 font-medium">Import Preview ({previewRows.filter(r => r.errors.length === 0).length} valid / {previewRows.length} total)</div>
            <div className="space-y-2 max-h-60 overflow-auto">
              {previewRows.map((r, idx) => (
                <div key={idx} className="p-2 rounded-md bg-white border">
                  <div className="flex justify-between">
                    <div>{r.firstName} {r.lastName} {r.nationalID ? `– ${r.nationalID}` : ''}</div>
                    <div className={`text-sm ${r.errors.length > 0 ? 'text-red-600' : 'text-green-600'}`}>{r.errors.length > 0 ? r.errors.join(', ') : 'OK'}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2 justify-end">
              <button className="px-3 py-2 rounded-md border" onClick={cancelImport}>Cancel</button>
              <button className="px-3 py-2 rounded-md border bg-primary text-white" onClick={importValidRows}>Import valid rows</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
