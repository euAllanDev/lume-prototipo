"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

/**
 * Ações de conta no cabeçalho, conforme o estado da sessão:
 * visitantes veem "Entrar" e "Criar conta"; quem já entrou vê "Minha conta".
 * Enquanto a sessão carrega, nada é exibido para evitar mostrar o estado errado.
 */
export function HeaderAccountLinks({ variant }: { variant: "desktop" | "mobile" }) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return null;

  if (variant === "mobile") {
    return session
      ? <Link href="/conta">Minha conta</Link>
      : <><Link href="/entrar">Entrar</Link><Link href="/criar-conta">Criar conta</Link></>;
  }

  return session
    ? <Link className="header-cta" href="/conta">Minha conta <ArrowUpRight aria-hidden="true" size={15} /></Link>
    : <><Link className="header-login" href="/entrar">Entrar</Link><Link className="header-cta" href="/criar-conta">Criar conta <ArrowUpRight aria-hidden="true" size={15} /></Link></>;
}
