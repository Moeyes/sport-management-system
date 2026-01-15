import type { Event } from "@/types";
import type { FormErrors } from '@/types/registration'

interface SportSelectionProps {
  event?: Event;
  selectedSport: string;
  onSelect: (sport: string) => void;
  errors?: Partial<FormErrors>;
}

const SPORTS: { id: string; name: string; categories: string[] }[] = [
  { id: "athletics", name: "Athletics", categories: [] },
  { id: "football", name: "Football", categories: [] },
  { id: "boxing", name: "Boxing", categories: [] },
  { id: "swimming", name: "Swimming", categories: [] },
  { id: "badminton", name: "Badminton", categories: [] },
  { id: "volleyball", name: "Volleyball", categories: [] },
  { id: "taekwondo", name: "Taekwondo", categories: [] },
];

export function SportSelection({ event, selectedSport, onSelect, errors }: SportSelectionProps) {
  const raw = event?.sports ?? SPORTS;
  const sports = raw.map((s: any) =>
    typeof s === "string"
      ? { id: s, name: s, categories: [] }
      : { id: s.id ?? s.name, name: s.name ?? String(s), categories: s.categories ?? s.category ?? [] }
  );

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">ជ្រើសរើសកីឡា</h2>
        <p className="text-muted-foreground text-lg">
          ជ្រើសប្រកួតដែលអ្នកចង់ចូលរួម
        </p>
        {errors?.sport && <p className="text-sm text-red-600 mt-1">{errors.sport}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {sports.map((sport) => (
          <button
            key={sport.id}
            onClick={() => onSelect(sport.name)}
            className={`flex flex-col items-center justify-center rounded-2xl border-2 p-6 transition-all hover:border-primary hover:bg-primary/5 ${
              selectedSport === sport.name
                ? "border-primary bg-primary/5"
                : "border-border bg-card"
            }`}
          >
            <span className="font-semibold">{sport.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}