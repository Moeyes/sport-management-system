import { User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PositionSelectorProps {
  formData: { position: string; leaderRole: string };
  updateFormData: (data: any) => void;
  onNext: () => void;
}

export function PositionSelector({
  formData,
  updateFormData,
  onNext,
}: PositionSelectorProps) {
  return (
    <div className="space-y-8 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center">Your Role</h2>
      <div className="space-y-4">
        <Card
          className={`cursor-pointer border-2 ${
            formData.position === "athlete" ? "border-primary" : ""
          }`}
          onClick={() =>
            updateFormData({ position: "athlete", leaderRole: "" })
          }
        >
          <CardContent className="p-6 flex items-center gap-4">
            <User className="h-8 w-8 text-primary" />
            <div>
              <p className="font-bold">Athlete</p>
              <p className="text-sm text-muted-foreground">Main participant</p>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer border-2 ${
            formData.position === "leader" ? "border-primary" : ""
          }`}
          onClick={() => updateFormData({ position: "leader" })}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="font-bold">Leader</p>
                <p className="text-sm text-muted-foreground">Team management</p>
              </div>
            </div>
            {formData.position === "leader" && (
              <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                <Select
                  onValueChange={(val) => updateFormData({ leaderRole: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coach">Head Coach</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Button
        className="w-full h-12 rounded-full"
        onClick={onNext}
        disabled={!formData.position}
      >
        Continue
      </Button>
    </div>
  );
}