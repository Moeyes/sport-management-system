import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { SelectField } from "@/components/registration/SelectField";
import type { OrganizationInfo } from "@/types/participation";

import type { FormErrors } from "@/types/registration";

interface LocationDetailsProps {
  selectedOrganization?: OrganizationInfo;
  onSelect: (organization: OrganizationInfo) => void;
  errors?: Partial<FormErrors>;
}

export function LocationDetails({
  selectedOrganization,
  onSelect,
  errors,
}: LocationDetailsProps) {
  const [tempOrg, setTempOrg] = useState<OrganizationInfo | undefined>(
    selectedOrganization
  );

  const [selectedId, setSelectedId] = useState<string | undefined>(selectedOrganization?.id ?? undefined);
  const [organizations, setOrganizations] = useState<{
    id: string;
    type: 'province' | 'ministry' | string;
    name: string;
    khmerName?: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTempOrg(selectedOrganization);
    if (selectedOrganization?.id) setSelectedId(selectedOrganization.id);
  }, [selectedOrganization]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch('/api/organizations')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        const arr = Array.isArray(data) ? data : [];
        setOrganizations(arr);
        setError(null);

        // If parent provided organization info, try to resolve an id
        if (selectedOrganization) {
          const match = arr.find((o: any) => {
            if (String(selectedOrganization.type).toLowerCase() === 'ministry') return o.type === 'ministry' && (o.name === selectedOrganization.department || o.id === selectedOrganization.id);
            return o.type === 'province' && (o.name === selectedOrganization.province || o.id === selectedOrganization.id);
          });
          if (match) setSelectedId(match.id);
        }
      })
      .catch((err) => {
        console.error("Failed to load provinces", err);
        if (mounted) setError("មិនអាចផ្ទុកខេត្ដបាន");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [selectedOrganization]);

  const handleChange = (id: string) => {
    if (id === '__loading' || id === '__error') return;
    setSelectedId(id);
    const sel = organizations.find((o) => o.id === id);
    if (!sel) return;

    if (String(sel.type).toLowerCase() === 'ministry') {
      setTempOrg({ type: 'ministry', department: sel.name, id: sel.id, name: sel.name } as any);
    } else {
      setTempOrg({ type: 'province', province: sel.name, id: sel.id, name: sel.name } as any);
    }
  }; 

  const handleContinue = () => {
    const sel = organizations.find((o) => o.id === selectedId);
    if (!sel) return;

    if (String(sel.type).toLowerCase() === 'province') {
      onSelect({ type: 'province', province: sel.name, id: sel.id, name: sel.name } as any);
    } else {
      onSelect({ type: 'ministry', department: sel.name, id: sel.id, name: sel.name } as any);
    }
  };

  const ministries = organizations.filter((o) => String(o.type).toLowerCase() === 'ministry');
  const orgs = organizations.filter((o) => String(o.type).toLowerCase() === 'province');

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center">តំណាង</h2>
      <SelectField
        value={selectedId}
        onChange={handleChange}
        placeholder="ជ្រើសរើសខេត្ត ឬ ក្រសួង"
        className="h-14 rounded-xl"
        options={[
          {
            value: '__heading_ministries',
            label: (
              <div className="px-2 py-1 text-xs text-muted-foreground">ក្រសួង</div>
            ),
            disabled: true,
          },
          ...ministries.map((m) => ({ value: m.id, label: m.name })),
          {
            value: '__heading_organizations',
            label: (
              <div className="px-2 py-1 text-xs text-muted-foreground border-t mt-2">
                ខេត្ត
              </div>
            ),
            disabled: true,
          },
          ...(loading
            ? [
                {
                  value: "__loading",
                  label: "កំពុងផ្ទុកខេត្ត...",
                  disabled: true,
                },
              ]
            : []),
          ...(error ? [{ value: '__error', label: error, disabled: true }] : []),
          ...(!loading && !error
            ? orgs.map((p) => ({
                value: p.id,
                label: (
                  <div className="flex justify-between items-center">
                    {/* <span>{p.name}</span> */}
                    <span className="text-xs text-muted-foreground">{p.khmerName ?? ''}</span>
                  </div>
                ),
              }))
            : []),
        ]}
      />
      {(errors?.province || (errors as any)?.organization) && (
        <p className="text-sm text-red-600 mt-1">{errors?.province ?? (errors as any)?.organization}</p>
      )}
      <Button
        className="w-full h-12 rounded-full"
        onClick={handleContinue}
        disabled={!selectedId}
      >
        បន្ត
      </Button>
    </div>
  );
}
