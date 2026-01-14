"use client";

import { useEffect } from "react";

/**
 * Focuses the provided element ref when Alt+<key> is pressed (case-insensitive).
 * Skips focusing if the user is typing in an input/textarea or contentEditable.
 */
export function useAltFocus(ref: { current: HTMLElement | null } | null, key = "e") {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === key || e.key === key.toUpperCase())) {
        const active = document.activeElement as HTMLElement | null;
        if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable)) return;
        e.preventDefault();
        ref?.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [ref, key]);
}
