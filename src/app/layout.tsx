import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import "./globals.css";

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
  title: "Esposos con Propósito — Directorio",
  description: "Directorio de la comunidad de matrimonios ECP",
  metadataBase: new URL("https://esposos-con-proposito-mld7.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${lora.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
