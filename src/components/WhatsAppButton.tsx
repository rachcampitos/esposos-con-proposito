"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "51999999999"; // placeholder — replace with coordinator's number
const WHATSAPP_MESSAGE = "Hola, me interesa saber más sobre Esposos con Propósito";

interface Props {
  label?: string;
  className?: string;
  variant?: "primary" | "floating";
}

export function WhatsAppButton({
  label = "Escríbenos por WhatsApp",
  className = "",
  variant = "primary",
}: Props) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  if (variant === "floating") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-medium text-white transition-all hover:bg-[#20BD5A] hover:shadow-lg active:scale-95 ${className}`}
    >
      <MessageCircle className="h-5 w-5" />
      {label}
    </a>
  );
}
