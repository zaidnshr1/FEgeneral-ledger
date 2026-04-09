"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuthStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));

  const handleLogout = async () => {
    try {
      await logout();

      toast.success("Logout Success", {
        description: "You have been successfully logged out.",
      });

      router.push("/login");
    } catch (error) {
      toast.error("Logout Failed");
    }
  };

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-slate-300">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">
          GenLedger Dashboard
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium">{user?.fullName}</p>
          <p className="text-xs text-slate-500">
            {user?.role?.replace("_", " ")}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="rounded-none"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
