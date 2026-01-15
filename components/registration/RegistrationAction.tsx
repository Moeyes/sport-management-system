import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useState } from "react";
import { validateForm, hasErrors } from "@/lib/validation/validators";
import type { FormData as RegistrationFormData } from "@/types/registration";

interface RegistrationActionProps {
  formData: RegistrationFormData;
  eventId: string;
} 

export function RegistrationAction({
  formData,
  eventId,
}: RegistrationActionProps) {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [createdId, setCreatedId] = useState<string | null>(null);

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      // Validate before submit
      const errors = validateForm(formData as RegistrationFormData);
      if (hasErrors(errors)) {
        const messages = Object.values(errors).filter(Boolean).join(' ');
        setError(messages || 'សូមដោះស្រាយកំហុសក្នុងទម្រង់មុនពេលបញ្ចូន។');
        return;
      }

      const payload = { ...formData, eventId } as any;

      let res: Response;
      if (formData.photoUpload) {
        const fd = new FormData();
        fd.append('payload', JSON.stringify(payload));
        fd.append('photo', formData.photoUpload as File);
        res = await fetch('/api/registrations', { method: 'POST', body: fd });
      } else {
        res = await fetch('/api/registrations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error('ការដាក់ស្នើការចុះឈ្មោះបរាជ័យ');
      const data = await res.json();
      setCreatedId(data.id ?? null);
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message ?? "ការដាក់ស្នើបរាជ័យ");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center space-y-6 py-10">
        <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto" />
        <h2 className="text-4xl font-bold">បានចុះឈ្មោះ!</h2>
        <p className="text-muted-foreground">អ្នកបានរៀបចំរួចសម្រាប់ {formData.sport}។</p>
        {createdId && <p className="text-sm">លេខសម្គាល់ការចុះឈ្មោះ: {createdId}</p>}
        <Button variant="outline" onClick={() => setLocation("/")}>ទៅទំព័រដើម</Button>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6 py-10">
      <h2 className="text-2xl font-bold">តើអ្នកបានត្រៀមបញ្ចូនទេ?</h2>
      <p className="text-muted-foreground">ពិនិត្យព័ត៌មានរបស់អ្នក ហើយបញ្ជាក់ដើម្បីបញ្ចប់ការចុះឈ្មោះ។</p>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-3 justify-center">
        <Button variant="ghost" onClick={() => setLocation("/")}>បោះបង់</Button>
        <Button onClick={submit} disabled={loading} className="bg-primary text-white">
          {loading ? "កំពុងបញ្ជូន..." : "បញ្ជាក់ និង ចុះឈ្មោះ"}
        </Button>
      </div>
    </div>
  );
}