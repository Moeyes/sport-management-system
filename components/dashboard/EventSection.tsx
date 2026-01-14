import { CreateEventDialog } from "@/components/events";
import { EventCard } from "@/components/events/EventCard";

import type { Event } from "@/types";

export function EventsSection({
  events,
  onCreate,
  onSelect,
}: {
  events: Event[];
  onCreate: (e: Event) => void;
  onSelect: (id: string | null) => void;
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-800">Events</h3>
        <CreateEventDialog onCreate={onCreate} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={() => onSelect(event.id)}
            index={0}
          />
        ))}
      </div>
    </>
  );
}
