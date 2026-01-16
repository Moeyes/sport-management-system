"use client";

import { useState } from "react";
import { useParams } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { SportSelection } from "./sections/SportSelection";
import { SportCategory } from "./sections/SportCategory";
import { PositionSelector } from "./sections/PositionSelector";
import { LocationDetails } from "./sections/LocationDetails";
import { PersonalInfo } from "./sections/PersonalInfo";
import { TeamDetails } from "./sections/TeamDetails";
import { TeamMembers } from "./sections/TeamMembers";
import { RegistrationAction } from "./RegistrationAction";

import { EventCard } from "@/components/events/EventCard";
import { useEvents } from "@/hooks/useEvents";
import { useRegistrationForm } from "@/services/useRegistrationForm";
import { validateForm } from "@/lib/validation/validators";

import type { FormData as RegistrationFormData, FormErrors } from "@/types/registration";

const TOTAL_STEPS = 8;

export default function RegistrationWizard() {
  const { eventId } = useParams();
  const { events, loading: eventsLoading } = useEvents();

  const [step, setStep] = useState(1);
  const [selectedEvent, setSelectedEvent] =
    useState<(typeof events)[number] | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const { formData, setField, errors, setFormErrors } = useRegistrationForm();

  const nextStep = () =>
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));

  const prevStep = () =>
    setStep((s) => Math.max(s - 1, 1));

  const attemptAdvance = (
    dataUpdate?: Partial<RegistrationFormData>,
    stepToCheck = step
  ) => {
    const future = { ...formData, ...(dataUpdate || {}) } as RegistrationFormData;

    if (!future.firstName && future.firstNameKh) future.firstName = future.firstNameKh;
    if (!future.lastName && future.lastNameKh) future.lastName = future.lastNameKh;

    const allErrors = validateForm(future);

    const stepFieldMap: Record<number, string[]> = {
      2: ["sport"],
      3: ["category"],
      4: ["registrationType"],
      5: future.registrationType === "team" ? ["teamName"] : ["position"],
      6: ["organization"],
      7:
        future.registrationType === "team"
          ? ["teamMembers"]
          : ["firstName", "lastName", "dateOfBirth", "nationalID", "gender", "phone", "photoUpload"],
    };

    const keys = stepFieldMap[stepToCheck] ?? [];
    const filteredErrors: Partial<FormErrors> = {};

    for (const key of keys) {
      if ((allErrors as any)[key]) {
        (filteredErrors as any)[key] = (allErrors as any)[key];
      }
    }

    setField(dataUpdate || {});

    if (Object.keys(filteredErrors).length > 0) {
      setFormErrors(filteredErrors);
      setValidationMessage("សូមបំពេញព័ត៌មានដែលខ្វះមុនបន្ត។");
      return;
    }

    setFormErrors({});
    setValidationMessage(null);
    nextStep();
  };

  return (
    <div className="min-h-screen bg-white p-6 border rounded-xl shadow-sm">
      <div id="registration-wizard-top" className="max-w-4xl mx-auto">

        {validationMessage && (
          <div className="mb-4 p-3 rounded bg-red-50 border text-red-700 text-sm">
            {validationMessage}
          </div>
        )}

        <div className="mb-8 flex justify-between items-center">
          <Button variant="ghost" onClick={prevStep} disabled={step === 1}>
            ត្រលប់
          </Button>
          <Badge variant="secondary">ជំហាន {step} នៃ {TOTAL_STEPS}</Badge>
        </div>

        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {eventsLoading ? (
              <div className="h-24 bg-slate-100 animate-pulse rounded" />
            ) : (
              events.map((e, i) => (
                <EventCard
                  key={e.id}
                  event={e}
                  index={i}
                  onClick={() => {
                    setSelectedEvent(e);
                    nextStep();
                  }}
                />
              ))
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

            {step === 2 && selectedEvent && (
              <Card className="p-6">
                <SportSelection
                  event={selectedEvent}
                  selectedSport={formData.sport || ""}
                  onSelect={(sport) =>
                    attemptAdvance({ sport, sports: [sport] }, 2)
                  }
                />
              </Card>
            )}

            {step === 3 && selectedEvent && (
              <Card className="p-6">
                <SportCategory
                  event={selectedEvent}
                  selectedSport={formData.sport}
                  onSelect={(category) =>
                    attemptAdvance({ category }, 3)
                  }
                />
              </Card>
            )}

            {step === 4 && (
              <Card className="p-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Register as</h2>
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() =>
                      attemptAdvance({ registrationType: "individual" }, 4)
                    }
                  >
                    Individual
                  </Button>
                  <Button
                    onClick={() =>
                      attemptAdvance({ registrationType: "team" }, 4)
                    }
                  >
                    Team
                  </Button>
                </div>
              </Card>
            )}

            {step === 5 && formData.registrationType === "team" && (
              <Card className="p-6">
                <TeamDetails
                  teamName={formData.teamName ?? null}
                  onChange={setField}
                  errors={errors}
                />
              </Card>
            )}

            {step === 6 && formData.registrationType === "team" && (
              <Card className="p-6">
                <TeamMembers
                  members={formData.teamMembers ?? []}
                  onChange={(teamMembers) => setField({ teamMembers })}
                  errors={errors}
                />
              </Card>
            )}

            {step === 7 && formData.registrationType === "team" && (
              <Card className="p-6 text-center">
                <Button onClick={() => attemptAdvance(undefined, 7)}>
                  Continue
                </Button>
              </Card>
            )}

            {step === 5 && formData.registrationType !== "team" && (
              <Card className="p-6">
                <PositionSelector
                  formData={{ position: formData.position as any }}
                  updateFormData={(d) => setField(d)}
                  onNext={() => attemptAdvance(undefined, 5)}
                />
              </Card>
            )}

            {step === 6 && formData.registrationType !== "team" && (
              <Card className="p-6">
                <LocationDetails
                  selectedOrganization={formData.organization as any}
                  onSelect={(organization) =>
                    attemptAdvance({ organization }, 6)
                  }
                  errors={errors}
                />
              </Card>
            )}

            {step === 7 && formData.registrationType !== "team" && (
              <Card className="p-6">
                <PersonalInfo
                  formData={formData}
                  updateFormData={setField}
                  onNext={() => attemptAdvance(undefined, 7)}
                  errors={errors}
                />
              </Card>
            )}

            {step === 8 && (
              <Card className="p-6">
                <RegistrationAction
                  formData={formData as RegistrationFormData}
                  eventId={selectedEvent?.id ?? eventId ?? ""}
                />
              </Card>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
