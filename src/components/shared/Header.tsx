"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";

export default function Header() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, logout } = useAuthStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout Success",
      description: "You have been successfully logged out.",
    });
    router.push("/login");
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
            {user?.role.replace("_", " ")}
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
