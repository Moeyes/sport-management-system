import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PersonalInfoProps {
  formData: { name: string; phone: string };
  updateFormData: (data: any) => void;
  onNext: () => void;
}

export function PersonalInfo({
  formData,
  updateFormData,
  onNext,
}: PersonalInfoProps) {
  return (
    <div className="space-y-6 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center">Personal Info</h2>
      <Input
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => updateFormData({ name: e.target.value })}
      />
      <Input
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => updateFormData({ phone: e.target.value })}
      />
      <Button
        className="w-full h-12 rounded-full"
        onClick={onNext}
        disabled={!formData.name}
      >
        Complete
      </Button>
    </div>
  );
}