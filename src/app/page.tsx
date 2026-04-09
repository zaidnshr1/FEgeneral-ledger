import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-2xl p-8 mx-4 space-y-6 border rounded-none bg-white border-slate-300 dark:bg-slate-950 dark:border-slate-700">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            GenLedger System
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            System Record: General Ledger. Centralized financial data
            synchronization between Head Office and Site Projects.
          </p>
        </div>

        <div className="flex justify-center">
          <Button asChild className="px-8 rounded-none w-full sm:w-auto">
            <Link href="/login">Enter System</Link>
          </Button>
        </div>

        <footer className="pt-4 text-center border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} GenLedger. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
