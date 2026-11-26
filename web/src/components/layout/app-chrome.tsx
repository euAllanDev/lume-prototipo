"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { SimulationBanner } from "@/components/layout/simulation-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const authRoutes = new Set([
  "/entrar",
  "/criar-conta",
  "/recuperar-senha",
  "/redefinir-senha",
  "/verificar-email",
]);

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (authRoutes.has(pathname)) return children;

  return <><SimulationBanner /><SiteHeader />{children}<SiteFooter /></>;
}
