
import type { Province } from "@/types";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LocationDetailsProps {
  selectedLocation: string;
  onSelect: (location: string) => void;
}

const MINISTRIES = [
  "Ministry of Interior",
  "Ministry of National Defense",
  "Ministry of Education, Youth and Sport",
];

export function LocationDetails({
  selectedLocation,
  onSelect,
}: LocationDetailsProps) {
  const [tempLocation, setTempLocation] = useState(selectedLocation);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("/api/provinces")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setProvinces(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to load provinces", err);
        if (mounted) setError("Failed to load provinces");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center">Representation</h2>
      <Select onValueChange={setTempLocation} value={tempLocation}>
        <SelectTrigger className="h-14 rounded-xl">
          <SelectValue placeholder="Select Province or Ministry" />
        </SelectTrigger>
        <SelectContent>
          <div className="px-2 py-1 text-xs text-muted-foreground">Ministries</div>
          {MINISTRIES.map((m) => (
            <SelectItem key={m} value={m}>
              {m}
            </SelectItem>
          ))}

          <div className="px-2 py-1 text-xs text-muted-foreground border-t mt-2">Provinces</div>

          {loading && (
            <SelectItem key="loading" value="__loading" disabled>
              Loading provinces...
            </SelectItem>
          )}

          {error && (
            <SelectItem key="error" value="__error" disabled>
              {error}
            </SelectItem>
          )}

          {!loading && !error && provinces.map((p) => (
            <SelectItem key={p.id} value={p.name}>
              {p.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        className="w-full h-12 rounded-full"
        onClick={() => onSelect(tempLocation)}
        disabled={!tempLocation}
      >
        Next
      </Button>
    </div>
  );
}