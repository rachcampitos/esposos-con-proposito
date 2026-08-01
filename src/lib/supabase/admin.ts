import "server-only";
import { createClient } from "@supabase/supabase-js";

// Usa la service role key: bypassa RLS. Solo se importa desde Server Components/rutas
// que nunca se envían al navegador (el paquete "server-only" falla el build si algo
// del lado del cliente intenta importarlo).
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
    process.env.SUPABASE_SERVICE_ROLE_KEY!.trim(),
    { auth: { persistSession: false } }
  );
}
