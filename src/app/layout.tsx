// src/app/layout.tsx
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "SEZY | Votre Passerelle de Confiance Europe-Afrique",
  description: "Agence SEZY — Logistique Paris-Cotonou, Shopping Bien-être et Coaching Études. De ton colis à ton installation, on gère tout.",
  keywords: ["logistique", "Paris Cotonou", "envoi colis", "étudier en France", "shopping cosmétiques"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable}`}>
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
