import type { Metadata, Viewport } from "next";
import { DM_Mono, Instrument_Sans } from "next/font/google";

import { AppChrome } from "@/components/layout/app-chrome";
import { SkipLink } from "@/components/layout/skip-link";
import { MotionProvider } from "@/components/ui/motion-provider";

import { appLocale } from "@/lib/locale";

import "./globals.css";

// Tipografia do Lume: Instrument Sans em títulos e texto, DM Mono em números e rótulos técnicos.
const instrumentSans = Instrument_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-instrument", display: "swap" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-mono", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Lume | Serviços com confiança",
    template: "%s | Lume",
  },
  description:
    "Lume, um marketplace demonstrativo de serviços independentes pensado para o Brasil.",
};

export const viewport: Viewport = {
  themeColor: "#111B40",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={appLocale.language}
      className={`${instrumentSans.variable} ${dmMono.variable}`}
      data-type="software"
      data-radius="soft"
      data-ground="sand"
      data-buttons="arrow"
      data-motion=""
      suppressHydrationWarning
    >
      <body>
        <SkipLink />
        <MotionProvider>
           <AppChrome>{children}</AppChrome>
        </MotionProvider>
      </body>
    </html>
  );
}
