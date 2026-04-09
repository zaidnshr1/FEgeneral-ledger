"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { getMe } from "@/services/auth.service";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMe();
        useAuthStore.getState().setUser(user);
      } catch {
        useAuthStore.getState().logout();
      } finally {
        setLoadingUser(false);
      }
    };

    const { user } = useAuthStore.getState();

    if (!user) {
      fetchUser();
    } else {
      setLoadingUser(false);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <p className="text-sm animate-pulse">Initializing System...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}
