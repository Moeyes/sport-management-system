"use client";

import { useEffect, useState } from "react";

import type { Event } from "../types";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (mounted) setEvents(data ?? data.events ?? []);
      } catch (err) {
        // keep silent; consumer components should handle empty state
        console.error("useEvents: failed to load events", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return { events, loading } as const;
}
