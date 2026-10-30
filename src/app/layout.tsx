import type { Metadata, Viewport } from "next";

import { SimulationBanner } from "@/components/layout/simulation-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Lume | Serviços com confiança",
    template: "%s | Lume",
  },
  description:
    "Lume, um marketplace demonstrativo de serviços independentes pensado para Portugal.",
};

export const viewport: Viewport = {
  themeColor: "#f4f2ed",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-PT">
      <body>
        <a className="skip-link" href="#main">
          Saltar para o conteúdo
        </a>
        <SimulationBanner />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
