import { User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SelectField } from "@/components/registration/SelectField";
import type { PositionInfo } from "@/types/participation";

import type { FormErrors } from '@/types/registration'

interface PositionSelectorProps {
  formData: { position?: PositionInfo };
  updateFormData: (data: any) => void;
  onNext: () => void;
  errors?: Partial<FormErrors>;
}

export function PositionSelector({
  formData,
  updateFormData,
  onNext,
  errors,
}: PositionSelectorProps) {
  const position = formData.position ?? {} as PositionInfo;

  return (
    <div className="space-y-8 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center">តួនាទីរបស់អ្នក</h2>
      {errors?.position && <p className="text-sm text-red-600 mt-1">{errors.position}</p>}
      <div className="space-y-4">
        <Card
          className={`cursor-pointer border-2 ${
            position.role === "Athlete" ? "border-primary" : ""
          }`}
          onClick={() =>
            updateFormData({ position: { role: "Athlete", coach: undefined, assistant: undefined } })
          }
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <User className="h-8 w-8 text-primary" />
              <div>
                <p className="font-bold">កីឡាករ/កីឡាការិនី</p>
                <p className="text-sm text-muted-foreground">អ្នកចូលរួមសំខាន់</p>
              </div>
            </div>

            {position.role === "Athlete" && (
              <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                <SelectField
                  value={position.athleteCategory}
                  onChange={(val: string) => updateFormData({ position: { ...position, athleteCategory: val as any } })}
                  placeholder="ជ្រើសប្រភេទ"
                  options={[
                    { value: "Male", label: "កីឡាករ" },
                    { value: "Female", label: "កីឡាការនី" },
                  ]}
                />
              </div>
            )}
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer border-2 ${
            position.role === "Leader" ? "border-primary" : ""
          }`}
          onClick={() => updateFormData({ position: { role: "Leader", coach: undefined, assistant: undefined, leaderRole: "" } })}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="font-bold">អ្នកដឹកនាំ</p>
                <p className="text-sm text-muted-foreground">អ្នកគ្រប់គ្រងក្រុម</p>
              </div>
            </div>

            {position.role === "Leader" && (
              <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                <SelectField
                  value={position.leaderRole}
                  onChange={(val: string) => updateFormData({ position: { ...position, leaderRole: val } })}
                  placeholder="ជ្រើសតួនាទី"
                  options={[
                    { value: "coach", label: "ថ្នាក់ដឹកនាំ" },
                    { value: "manager", label: "គណកម្មការបច្ចេកទេស" },
                    { value: "delegate", label: "ប្រតិភូ" },
                    { value: "team_lead", label: "អ្នកដឹកនាំក្រុម" },
                    { value: "coach_trainer", label: "គ្រូបង្វឹក" },
                  ]}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Button
        className="w-full h-12 rounded-full"
        onClick={onNext}
        disabled={!position.role || (position.role === "Athlete" && !position.athleteCategory)}
      >
        បន្ត
      </Button>
    </div>
  );
} 