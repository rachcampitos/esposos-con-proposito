"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, LogOut, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface HeaderProps {
  showAdd?: boolean;
}

export function Header({ showAdd = false }: HeaderProps) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-cream-dark/60 bg-cream/90 backdrop-blur-md shadow-soft">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/directorio" className="flex items-center gap-2 text-primary">
          <Heart className="h-5 w-5 fill-secondary stroke-secondary" />
          <span className="font-heading text-lg font-semibold tracking-tight">
            Esposos con Propósito
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {showAdd && (
            <Link
              href="/directorio/nuevo"
              className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
              <Plus className="h-4 w-4" />
              Agregar
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-text-light transition-colors hover:bg-primary/5 hover:text-primary"
          >
            <LogOut className="h-4 w-4" />
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}
