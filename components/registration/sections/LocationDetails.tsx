
import type { Province } from "@/types";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Select } from "@/components/ui/select";
import { SelectField } from "@/components/registration/SelectField";
import type { OrganizationInfo } from "@/types/participation";

import type { FormErrors } from '@/types/registration'

interface LocationDetailsProps {
  selectedOrganization?: OrganizationInfo;
  onSelect: (organization: OrganizationInfo) => void;
  errors?: Partial<FormErrors>;
}

const MINISTRIES = [
  "Ministry of Interior",
  "Ministry of National Defense",
  "Ministry of Education, Youth and Sport",
];

export function LocationDetails({
  selectedOrganization,
  onSelect,
  errors,
}: LocationDetailsProps) {
  const [tempOrg, setTempOrg] = useState<OrganizationInfo | undefined>(selectedOrganization);
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
        if (mounted) setError("មិនអាចផ្ទុកខេត្ដបាន")
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
      <h2 className="text-3xl font-bold text-center">តំណាង</h2>
      <SelectField
        value={
          tempOrg?.type === "Ministry"
            ? tempOrg.department
            : tempOrg?.province
        }
        onChange={(val: string) => {
          if (val === "__loading" || val === "__error") return;
          if (MINISTRIES.includes(val)) {
            setTempOrg({ type: "Ministry", department: val });
          } else {
            setTempOrg({ type: "Province", province: val });
          }
        }}
        placeholder="ជ្រើសរើសខេត្ត ឬ ក្រសួង"
        className="h-14 rounded-xl"
        options={[
          { value: "__heading_ministries", label: <div className="px-2 py-1 text-xs text-muted-foreground">ក្រសួង</div>, disabled: true },
          ...MINISTRIES.map(m => ({ value: m, label: m })),
          { value: "__heading_provinces", label: <div className="px-2 py-1 text-xs text-muted-foreground border-t mt-2">ខេត្ត</div>, disabled: true },
          ...(loading ? [{ value: "__loading", label: "កំពុងផ្ទុកខេត្ត...", disabled: true }] : []),
          ...(error ? [{ value: "__error", label: error, disabled: true }] : []),
          ...(!loading && !error ? provinces.map(p => ({ value: p.name, label: p.name })) : []),
        ]}
      />
      {errors?.province && <p className="text-sm text-red-600 mt-1">{errors.province}</p>}
      <Button
        className="w-full h-12 rounded-full"
        onClick={() => tempOrg && onSelect(tempOrg)}
        disabled={!tempOrg}
      >
        បន្ទាប់
      </Button>
    </div>
  );
} 