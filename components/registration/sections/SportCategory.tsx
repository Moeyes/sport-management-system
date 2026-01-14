import type { Event } from "@/types";
import { Button } from "@/components/ui/button";

interface SportCategoryProps {
  event?: Event;
  selectedSport?: string;
  onSelect: (category: string) => void;
}

export function SportCategory({ event, selectedSport, onSelect }: SportCategoryProps) {
  const normalized: { id: string; name: string; categories: string[] }[] =
    (event?.sports ?? []).map((s: any) =>
      typeof s === "string"
        ? { id: s, name: s, categories: [] }
        : { id: s.id ?? s.name, name: s.name ?? String(s), categories: s.categories ?? s.category ?? [] }
    );

  const sportObj = normalized.find((s) => s.name === selectedSport);

  const categories: string[] =
    sportObj?.categories?.length
      ? sportObj.categories
      : normalized.flatMap((s) => s.categories ?? []).length
      ? normalized.flatMap((s) => s.categories ?? [])
      : ["Open"];

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-3xl font-bold">Select Category</h2>
      <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant="outline"
            className="h-16 text-lg"
            onClick={() => onSelect(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>
    </div>
  );
} 