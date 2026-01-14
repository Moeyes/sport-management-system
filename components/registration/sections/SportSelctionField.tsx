//SportSelection
"use client"

import { FieldLabel, FormRow } from "@/components/registration/FormField"
import { Input } from "@/components/ui/input"
import { NativeSelect } from "@/components/ui/native-select"
import { useEffect } from "react"

const EVENTS: Record<string, string[]> = {
  "32nd SEA GAMES": ["Athletics", "Ball Games"],
  "National Youth Sports": ["Traditional Sport", "Athletics"],
}

export function SportSelection({ formState, setFormState }: any) {
  // When event changes, reset sport/position/leader fields
  useEffect(() => {
    if (!formState.event) setFormState({ ...formState, sport: "", position: "", coach: "", assistant: "" })
  }, [formState.event])

  useEffect(() => {
    if (!formState.sport) setFormState({ ...formState, position: "", coach: "", assistant: "" })
  }, [formState.sport])

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Event & Sport</h3>
        <p className="text-sm text-muted-foreground">ជ្រើសរវាងព្រឹត្តិការណ៍ និងកីឡា</p>
      </div>

      <FormRow>
        <div>
          <FieldLabel label="Event" khmer="ព្រឹត្តិការណ៍" />
          <NativeSelect required value={formState.event} onChange={(e) => setFormState({ ...formState, event: e.target.value })} className="w-full">
            <option value="">Select event</option>
            {Object.keys(EVENTS).map((ev) => (
              <option key={ev} value={ev}>{ev}</option>
            ))}
          </NativeSelect>
        </div>

        <div>
          <FieldLabel label="Sport" khmer="កីឡា" />
          <NativeSelect required disabled={!formState.event} value={formState.sport} onChange={(e) => setFormState({ ...formState, sport: e.target.value })} className="w-full">
            <option value="">Select sport</option>
            {(EVENTS[formState.event] || []).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </NativeSelect>
        </div>

        <div>
          <FieldLabel label="Position" khmer="តួនាទី" />
          <NativeSelect required disabled={!formState.sport} value={formState.position} onChange={(e) => setFormState({ ...formState, position: e.target.value })} className="w-full">
            <option value="">Select position</option>
            <option value="Athlete">Athlete</option>
            <option value="Leader">Leader</option>
          </NativeSelect>
        </div>

        {/* <div>
          <FieldLabel label="Event Type" khmer="ប្រភេទព្រឹត្តិការណ៍" />
          <Input value={formState.eventType} onChange={(e) => setFormState({ ...formState, eventType: e.target.value })} />
        </div> */}
      </FormRow>

      {/* If leader selected, show coach and assistant selectors */}
      {formState.position === 'Leader' && (
        <FormRow>
          <div>
            <FieldLabel label="Coach" khmer="គ្រូបង្វឹក" />
            <NativeSelect value={formState.coach} onChange={(e) => setFormState({ ...formState, coach: e.target.value })} className="w-full">
              <option value="">Select coach</option>
              <option value="Coach A">Coach A</option>
              <option value="Coach B">Coach B</option>
            </NativeSelect>
          </div>

          <div>
            <FieldLabel label="Assistant" khmer="ជំនួយការ" />
            <NativeSelect value={formState.assistant} onChange={(e) => setFormState({ ...formState, assistant: e.target.value })} className="w-full">
              <option value="">Select assistant</option>
              <option value="Assistant A">Assistant A</option>
              <option value="Assistant B">Assistant B</option>
            </NativeSelect>
          </div>
        </FormRow>
      )}
    </section>
  )
}
