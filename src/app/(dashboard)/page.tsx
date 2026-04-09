// src/app/(dashboard)/page.tsx
"use client";

import { useAuthStore } from "@/store/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">System Overview</h1>
      <Card className="rounded-none">
        <CardHeader>
          <CardTitle>Welcome to GenLedger</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700">
            Hello, <span className="font-semibold">{user.fullName}</span>. You
            are logged in as an{" "}
            <span className="font-semibold">{user.role.replace("_", " ")}</span>
            .
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Select a module from the sidebar to begin system operations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
