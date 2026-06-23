import { MatrimonioForm } from "@/components/MatrimonioForm";
import { Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UnirsePage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-2xl px-4 py-8">

        {/* Header simple */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-text-light transition hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Inicio
          </Link>
          <div className="flex items-center gap-2 text-primary">
            <Heart className="h-4 w-4 fill-secondary stroke-secondary" />
            <span className="font-heading text-sm font-semibold">
              Esposos con Propósito
            </span>
          </div>
        </div>

        <h2 className="font-heading mb-2 text-2xl font-semibold text-primary">
          Agregar nuestro matrimonio
        </h2>
        <p className="mb-6 text-sm text-text-light">
          Completa los datos para aparecer en el directorio ECP.
        </p>

        <div className="glass-card rounded-2xl p-6 shadow-soft-lg">
          <MatrimonioForm redirectTo="/" successMessage="¡Gracias! Su matrimonio fue agregado al directorio." />
        </div>

      </div>
    </div>
  );
}
