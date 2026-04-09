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
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  const [mounted, setMounted] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("fetching user...");
        const userData = await getMe();
        setUser(userData);
      } catch (err) {
        logout();
      } finally {
        setLoadingUser(false);
      }
    };

    if (!user) {
      fetchUser();
    } else {
      console.log("user:", user);
      console.log("loadingUser:", loadingUser);
      setLoadingUser(false);
    }
  }, [user, setUser, logout]);

  if (!mounted || loadingUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <p className="text-sm animate-pulse">Initializing System...</p>
      </div>
    );
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
