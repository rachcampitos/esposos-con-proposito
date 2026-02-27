import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTransitionWrapper } from "@/components/PageTransitionWrapper";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Esposos con Propósito | Comunidad de matrimonios en la fe",
  description:
    "Comunidad de esposos del Colegio Reina del Mundo, unidos por el sacramento del matrimonio, caminando juntos en la fe.",
  keywords: [
    "esposos con propósito",
    "matrimonio católico",
    "comunidad de esposos",
    "reina del mundo",
    "la molina",
    "retiro de parejas",
    "pastoral familiar",
  ],
  openGraph: {
    title: "Esposos con Propósito",
    description:
      "Comunidad de esposos unidos por el sacramento del matrimonio, caminando juntos en la fe.",
    type: "website",
    locale: "es_PE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${lora.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Header />
        <PageTransitionWrapper>
          <main>{children}</main>
        </PageTransitionWrapper>
        <Footer />
      </body>
    </html>
  );
}
