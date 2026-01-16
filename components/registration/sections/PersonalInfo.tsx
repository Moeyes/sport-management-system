import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/registration/SelectField";
import { PhotoUpload } from "@/components/registration/PhotoUpload";
import type { FormData as RegistrationFormData } from "@/types/registration";

import type { FormErrors } from '@/types/registration'

interface PersonalInfoProps {
  formData: Partial<RegistrationFormData>;
  updateFormData: (data: Partial<RegistrationFormData>) => void;
  onNext: () => void;
  errors?: Partial<FormErrors>;
}

export function PersonalInfo({
  formData,
  updateFormData,
  onNext,
  errors,
}: PersonalInfoProps) {
  return (
    <div className="space-y-6 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center">ព័ត៌មានផ្ទាល់ខ្លួន</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          placeholder="គោត្តនាម"
          value={formData.firstNameKh ?? ""}
          onChange={(e) => updateFormData({ firstNameKh: e.target.value })}
        />
        <Input
          placeholder="នាម"
          value={formData.lastNameKh ?? ""}
          onChange={(e) => updateFormData({ lastNameKh: e.target.value })}
        />
        <div>
          <Input
            placeholder="គោត្តនាម​​​ (អក្សរឡាតាំង)"
            value={formData.firstName ?? ""}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
          />
          {errors?.firstName && <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <Input
            placeholder="នាម​ (អក្សរឡាតាំង)"
            value={formData.lastName ?? ""}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
          />
          {errors?.lastName && <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          value={formData.gender ?? undefined}
          onChange={(val: string) => updateFormData({ gender: val as any })}
          placeholder="ភេទ"
          options={[
            { value: "Male", label: "ប្រុស" },
            { value: "Female", label: "ស្រី" },
          ]}
        />

        <SelectField
          value={formData.nationality ?? undefined}
          onChange={(val: string) => updateFormData({ nationality: val as any })}
          placeholder="ប្រភេទឯកសារជាតិសញ្ជាតិ"
          options={[
            { value: "IDCard", label: "អត្តសញ្ញាណប័ណ្ណ" },
            { value: "BirthCertificate", label: "វិញ្ញាបនបត្រកំណើត" },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Input
            type="date"
            placeholder="ថ្ងៃខែឆ្នាំកំណើត"
            value={formData.dateOfBirth ?? ""}
            onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
          />
          {errors?.dateOfBirth && <p className="text-sm text-red-600 mt-1">{errors.dateOfBirth}</p>}
        </div>
        <div>
          <Input
            placeholder="លេខអត្តសញ្ញាណជាតិ"
            value={formData.nationalID ?? ""}
            onChange={(e) => updateFormData({ nationalID: e.target.value })}
          />
          {errors?.nationalID && <p className="text-sm text-red-600 mt-1">{errors.nationalID}</p>}
        </div>
      </div>

      <div>
        <Input
          placeholder="ទូរស័ព្ទ"
          value={formData.phone ?? ""}
          onChange={(e) => updateFormData({ phone: e.target.value })}
        />
        {errors?.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
      </div>

      <div className="flex items-center gap-4">
        <PhotoUpload
          file={(formData.photoUpload as File) ?? null}
          onChange={(f) => updateFormData({ photoUpload: f ?? null })}
        />
        {formData.photoUrl && (
          <div className="text-sm text-muted-foreground">បានផ្ទុកឡើង</div>
        )}
      </div>
      {errors?.photoUpload && <p className="text-sm text-red-600 mt-1">{errors.photoUpload}</p>}

      <Button
        className="w-full h-12 rounded-full"
        onClick={onNext}
        disabled={!(formData.firstName || formData.lastName || formData.firstNameKh || formData.lastNameKh)}
      >
        បន្ត
      </Button>
    </div>
  );
}