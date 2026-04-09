"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Building,
  Book,
  FileText,
  History,
  BookUser,
} from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ElementType;
};

const adminPusatLinks: NavLink[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: Building },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/accounts", label: "Chart of Accounts", icon: Book },
  { href: "/dashboard/reports", label: "Reports", icon: FileText },
  { href: "/dashboard/audit-logs", label: "Audit Logs", icon: History },
];

const adminProjectLinks: NavLink[] = [
  { href: "/dashboard", label: "Project Overview", icon: LayoutDashboard },
  { href: "/dashboard/journals", label: "Journal Entries", icon: BookUser },
];

export default function Sidebar() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  const navLinks =
    user?.role === "ADMIN_PUSAT" ? adminPusatLinks : adminProjectLinks;

  return (
    <aside className="flex flex-col w-64 bg-white border-r border-slate-300">
      <div className="flex items-center justify-center h-16 border-b border-slate-300">
        <h2 className="text-xl font-bold tracking-wider text-slate-800">
          GENLEDGER
        </h2>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-none transition-colors",
              pathname === link.href
                ? "bg-slate-200 text-slate-900"
                : "text-slate-600 hover:bg-slate-100",
            )}
          >
            <link.icon className="w-5 h-5 mr-3" />
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
