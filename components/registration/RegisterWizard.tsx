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
import { RegistrationAction } from "./RegistrationAction";
import { EventCard } from "@/components/events/EventCard";
import { useEvents } from "@/hooks/useEvents";

export default function RegistrationWizard() {
  const { eventId } = useParams();
  const { events, loading: eventsLoading } = useEvents();
  const [ selectedEvent, setSelectedEvent ] = useState<(typeof events)[number] | null>(null);
  const [ step, setStep] = useState(1);
  const [ formData, setFormData] = useState({
    sport: "",
    category: "",
    position: "",
    leaderRole: "",
    location: "",
    name: "",
    email: "",
    phone: "",
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 7));
  const prevStep = () => {
    setStep((s) => {
      if (s === 2) setSelectedEvent(null);
      return Math.max(s - 1, 1);
    });
  };

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <Button variant="ghost" onClick={prevStep} disabled={step === 1}>
            Back
          </Button>
          <Badge variant="secondary">Step {step} of 7</Badge>
        </div>
        {/* Event selection (step 1) */}
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
                No events available.
              </div>
            )}
          </div>
        )}

        {/* Selected event preview (shown once an event is chosen) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
          >
            {step === 2 && selectedEvent &&(
              <SportSelection
                // event={selectedEvent}
                event={selectedEvent}
                selectedSport={formData.sport}
                onSelect={(sport) => {
                  updateFormData({ sport, category: "" });
                  nextStep();
                }}
              />
            )}
            {step === 3 && selectedEvent && (
              <SportCategory
                event={selectedEvent}
                selectedSport={formData.sport}
                onSelect={(category) => {
                  updateFormData({ category });
                  nextStep();
                }}
              />
            )}
            {step === 4 && (
              <PositionSelector
                formData={formData}
                updateFormData={updateFormData}
                onNext={nextStep}
              />
            )}
            {step === 5 && (
              <LocationDetails
                selectedLocation={formData.location}
                onSelect={(location) => {
                  updateFormData({ location });
                  nextStep();
                }}
              />
            )}
            {step === 6 && (
              <PersonalInfo
                formData={formData}
                updateFormData={updateFormData}
                onNext={nextStep}
              />
            )}
            {step === 7 && (
              <RegistrationAction
                formData={formData}
                eventId={selectedEvent?.id ?? eventId ?? ""}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
