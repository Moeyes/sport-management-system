"use client";

import { useEffect, useState } from 'react';
import { useEvents } from '@/hooks/useEvents';

// NOTE: The project does not include a global EventContext, so this hook
// derives the currently selected event from the route id or the first
// available event returned by `useEvents`.
export function useSelectedEvent(routeEventId?: string) {
  const { events, loading: eventsLoading } = useEvents();
  const [event, setEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = () => {
      setLoading(true);
      try {
        const preferredId = routeEventId ?? (events.length ? events[0].id : null);
        const found = events.find((e: any) => e.id === preferredId) ?? null;
        if (active) setEvent(found);
      } catch (err) {
        console.error('Failed to select event', err);
        if (active) setEvent(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => { active = false; };
  }, [events, routeEventId]);

  return { event, loading: loading || eventsLoading };
}
