import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Option {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

interface SelectFieldProps {
  value?: string | undefined;
  onChange: (val: string) => void;
  placeholder?: string;
  options: Option[];
  className?: string;
}

export function SelectField({
  value,
  onChange,
  placeholder = "Select...",
  options,
  className,
}: SelectFieldProps) {
  return (
    <Select value={value} onValueChange={(val) => onChange(val)}>
      <SelectTrigger className={className ?? "h-12 rounded-md"}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
