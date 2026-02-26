export interface Evento {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  isPast?: boolean;
}

export const EVENTOS: Evento[] = [
  {
    id: "encuentro-marzo-2026",
    title: "Encuentro Cuaresmal de Parejas: Comunicación que Transforma",
    date: "15 de Marzo, 2026",
    time: "5:00 PM - 8:00 PM",
    location: "Colegio Reina del Mundo, La Molina",
    description:
      "En este tiempo de Cuaresma, los invitamos a un encuentro especial para reconectar como pareja y como comunidad. Reflexionaremos juntos sobre la comunicación que transforma: escuchar antes de responder, perdonar antes de exigir, y amar como Cristo nos ama.",
  },
  {
    id: "retiro-junio-2026",
    title: "Retiro Anual de Parejas 2026",
    date: "20-21 de Junio, 2026",
    time: "Sábado 8:00 AM - Domingo 1:00 PM",
    location: "Por confirmar",
    description:
      "Nuestro retiro anual de fin de semana. Un tiempo para reconectarnos como esposos, reflexionar y crecer juntos en la fe.",
  },
  {
    id: "retiro-junio-2025",
    title: "Retiro de Parejas 2025",
    date: "Junio, 2025",
    time: "",
    location: "Lima",
    description:
      "Nuestro primer retiro como comunidad. Una experiencia transformadora donde descubrimos cómo la fe fortalece nuestro matrimonio y nuestra familia.",
    isPast: true,
  },
];
