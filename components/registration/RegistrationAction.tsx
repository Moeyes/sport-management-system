import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useState } from "react";

interface RegistrationActionProps {
  formData: any;
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
      const payload = { ...formData, eventId };
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to submit registration");
      const data = await res.json();
      setCreatedId(data.id ?? null);
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message ?? "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center space-y-6 py-10">
        <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto" />
        <h2 className="text-4xl font-bold">Registered!</h2>
        <p className="text-muted-foreground">You are all set for {formData.sport}.</p>
        {createdId && <p className="text-sm">Registration ID: {createdId}</p>}
        <Button variant="outline" onClick={() => setLocation("/")}>Go Home</Button>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6 py-10">
      <h2 className="text-2xl font-bold">Ready to submit?</h2>
      <p className="text-muted-foreground">Review your details and confirm to complete registration.</p>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-3 justify-center">
        <Button variant="ghost" onClick={() => setLocation("/")}>Cancel</Button>
        <Button onClick={submit} disabled={loading} className="bg-primary text-white">
          {loading ? "Submitting..." : "Confirm & Register"}
        </Button>
      </div>
    </div>
  );
}