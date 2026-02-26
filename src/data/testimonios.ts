export interface Testimonio {
  id: string;
  quote: string;
  couple: string;
  years: string;
  image?: string;
}

export const TESTIMONIOS: Testimonio[] = [
  {
    id: "1",
    quote:
      "El retiro nos ayudó a ver nuestro matrimonio con otros ojos. Aprendimos que los conflictos no son el enemigo, sino una oportunidad para crecer juntos de la mano de Dios.",
    couple: "Pareja de la comunidad",
    years: "8 años de casados",
  },
  {
    id: "2",
    quote:
      "Pensábamos que nuestro matrimonio estaba bien. Pero descubrimos que Dios no nos llama a un matrimonio 'normal' — nos llama a la santidad juntos. Esta comunidad nos ayudó a entender eso.",
    couple: "Pareja de la comunidad",
    years: "12 años de casados",
  },
  {
    id: "3",
    quote:
      "Ver a otras parejas enfrentar los mismos desafíos nos hizo sentir menos solos. Saber que caminamos juntos en esto hace toda la diferencia.",
    couple: "Pareja de la comunidad",
    years: "5 años de casados",
  },
];
