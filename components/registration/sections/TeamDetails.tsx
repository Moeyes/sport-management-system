import React from 'react'
import type { FormErrors } from '@/types/registration'
import type { TeamMember } from '@/types/team'
import { LocationDetails } from './LocationDetails'

interface TeamDetailsProps {
  teamName?: string | null;
  leaderNationalID?: string | null;
  organization?: any;
  members?: TeamMember[];
  onChange: (data: { teamName?: string; leaderNationalID?: string; organization?: any }) => void;
  errors?: Partial<FormErrors>;
}

export function TeamDetails({ teamName, leaderNationalID, organization, members = [], onChange, errors }: TeamDetailsProps) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center">Team Details</h2>
      <div className="grid grid-cols-1 gap-4">
        <label className="flex flex-col">
          <span className="text-sm font-medium">Team Name</span>
          <input
            value={teamName ?? ''}
            onChange={(e) => onChange({ teamName: e.target.value })}
            className="mt-1 px-3 py-2 rounded-md border"
            placeholder="Team name"
          />
          {errors?.teamName && <p className="text-sm text-red-600">{errors.teamName}</p>}
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium">Leader National ID</span>
          <input
            value={leaderNationalID ?? ''}
            onChange={(e) => onChange({ leaderNationalID: e.target.value })}
            className="mt-1 px-3 py-2 rounded-md border"
            placeholder="Leader national ID (optional)"
          />
          <small className="text-xs text-muted-foreground mt-1">Or pick a leader from team members below</small>

          {members.length > 0 && (
            <select
              value={leaderNationalID ?? ''}
              onChange={(e) => onChange({ leaderNationalID: e.target.value })}
              className="mt-2 px-3 py-2 rounded-md border"
            >
              <option value="">-- Select leader from members --</option>
              {members.map((m, idx) => (
                <option key={idx} value={m.nationalID ?? ''}>
                  {m.firstName} {m.lastName} {m.nationalID ? `(${m.nationalID})` : ''}
                </option>
              ))}
            </select>
          )}
        </label>

        <div>
          <span className="text-sm font-medium">Organization</span>
          <div className="mt-2">
            <LocationDetails
              selectedOrganization={organization}
              onSelect={(org) => onChange({ organization: org })}
              errors={errors}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
