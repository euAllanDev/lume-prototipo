import type { Metadata, Viewport } from "next";

import { AppChrome } from "@/components/layout/app-chrome";
import { SkipLink } from "@/components/layout/skip-link";
import { MotionProvider } from "@/components/ui/motion-provider";

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
  themeColor: "#111B40",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-PT">
      <body>
        <SkipLink />
        <MotionProvider>
           <AppChrome>{children}</AppChrome>
        </MotionProvider>
      </body>
    </html>
  );
}
