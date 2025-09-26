"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";

type Tenant = { id: string; name: string };
export function OrgSwitcher({ tenants, defaultTenant, onTenantSwitch }: { tenants: Tenant[]; defaultTenant: Tenant; onTenantSwitch?: (id: string) => void }) {
  const [active, setActive] = React.useState<Tenant>(defaultTenant);
  return (
    <div className="flex items-center gap-2">
      <Button size="sm" variant="outline" aria-haspopup="listbox" aria-expanded="false">{active.name}</Button>
    </div>
  );
}
