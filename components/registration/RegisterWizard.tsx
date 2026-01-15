import { useState } from "react";
import { useParams } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SportSelection } from "./sections/SportSelection";
import { SportCategory } from "./sections/SportCategory";
import { PositionSelector } from "./sections/PositionSelector";
import { LocationDetails } from "./sections/LocationDetails";
import { PersonalInfo } from "./sections/PersonalInfo";
import { useRegistrationForm } from "@/services/useRegistrationForm";
import { RegistrationAction } from "./RegistrationAction";
import { EventCard } from "@/components/events/EventCard";
import { useEvents } from "@/hooks/useEvents";
import type { FormData as RegistrationFormData } from "@/types/registration";
import { validateForm } from "@/lib/validation/validators";
import type { FormErrors } from "@/types/registration";

export default function RegistrationWizard() {
  const { eventId } = useParams();
  const { events, loading: eventsLoading } = useEvents();
  const [ selectedEvent, setSelectedEvent ] = useState<(typeof events)[number] | null>(null);
  const [ step, setStep] = useState(1);
  // use shared registration form hook
  const { formData, setField, errors, validate, setFormErrors } = useRegistrationForm();

  const nextStep = () => setStep((s) => Math.min(s + 1, 7));
  const prevStep = () => {
    setStep((s) => {
      if (s === 2) setSelectedEvent(null);
      return Math.max(s - 1, 1);
    });
  };

  const updateFormData = (data: Partial<RegistrationFormData>) => {
    setField(data);
  };

  const stepFieldMap: Record<number, string[]> = {
    2: ['sport', 'selectedSport', 'sports'],
    3: ['sport', 'sports'],
    4: ['position'],
    5: ['province', 'organization'],
    6: ['firstName', 'lastName', 'dateOfBirth', 'nationalID', 'gender', 'phone', 'photoUpload'],
  };

  const attemptAdvance = (dataUpdate?: Partial<RegistrationFormData>, stepToCheck = step) => {
    const future = { ...formData, ...(dataUpdate || {}) } as RegistrationFormData;
    const e = validateForm(future);

    const keysToCheck = stepFieldMap[stepToCheck] ?? [];

    // Only surface errors that are relevant to this step (avoid showing all errors globally)
    const filteredErrors: Partial<FormErrors> = {};
    if (keysToCheck.length > 0) {
      for (const [k, v] of Object.entries(e)) {
        if (keysToCheck.includes(k)) {
          (filteredErrors as any)[k] = v;
        }
      }
    }

    setField(dataUpdate || {});

    if (Object.keys(filteredErrors).length > 0) {
      setFormErrors(filteredErrors);
      return;
    }

    // No relevant errors for this step; clear step errors and advance
    setFormErrors({});
    nextStep();
  };


  return (
    <div className="min-h-screen bg-[#fafafa] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <Button variant="ghost" onClick={prevStep} disabled={step === 1}>
            ត្រលប់
          </Button>
          <Badge variant="secondary">ជំហាន {step} នៃ 7</Badge>
        </div>
        {step === 1 && (
          <div className="mb-6">
            {eventsLoading ? (
              <div className="h-28 rounded-lg bg-slate-100 animate-pulse" />
            ) : events.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {events.map((e, i) => (
                  <EventCard
                    key={e.id}
                    event={e}
                    index={i}
                    onClick={() => {
                      setSelectedEvent(e);
                      nextStep();
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-slate-50 p-6 text-center">
                មិនមានព្រឹត្តិការណ៍ទេ។
              </div>
            )}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
          >
            {step === 2 && selectedEvent &&(
              <SportSelection
                event={selectedEvent}
                selectedSport={formData.sport || ""}
                onSelect={(sport) => {
                  attemptAdvance({ sport }, 2);
                }}
              />
            )}
            {step === 3 && selectedEvent && (
              <SportCategory
                event={selectedEvent}
                selectedSport={formData.sport}
                onSelect={(category) => {
                  attemptAdvance({ category } as Partial<RegistrationFormData>, 3);
                }}
              />
            )}
            {step === 4 && (
              <PositionSelector
                formData={{ position: formData.position as any }}
                updateFormData={(data) => updateFormData({ position: { ...(formData.position as any), ...(data.position ?? data) } })}
                onNext={() => attemptAdvance(undefined, 4)}
              />
            )}
            {step === 5 && (
              <LocationDetails
                selectedOrganization={formData.organization as any}
                onSelect={(organization) => {
                  attemptAdvance({ organization }, 5);
                }}
                errors={errors as Partial<FormErrors>}
              />
            )}
            {step === 6 && (
              <PersonalInfo
                formData={formData as any}
                updateFormData={updateFormData}
                onNext={() => attemptAdvance(undefined, 6)}
                errors={errors as Partial<FormErrors>}
              />
            )}
            {step === 7 && (
              <RegistrationAction
                formData={formData as RegistrationFormData}
                eventId={selectedEvent?.id ?? eventId ?? ""}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
