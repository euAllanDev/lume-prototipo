import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

import { LogoMark } from "@/components/ui/logo-mark";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand flex items-center gap-2" href="/" aria-label="Lume, início">
          <LogoMark eager />
        </Link>

        <nav className="site-nav" aria-label="Navegação principal">
          <Link href="/explorar">Explorar</Link>
          <Link href="/como-funciona">Como funciona</Link>
          <Link href="/para-clientes">Para clientes</Link>
          <Link href="/para-prestadores">Para prestadores</Link>
        </nav>

        <div className="header-actions">
          <span className="demo-status"><span /> Modo demonstração</span>
          <Link className="header-login" href="/entrar">Entrar</Link>
          <Link className="header-login" href="/conta">Minha conta</Link>
          <Link className="header-cta" href="/criar-conta">Criar conta <ArrowUpRight aria-hidden="true" size={15} /></Link>
          <details className="mobile-menu">
            <summary aria-label="Navegação"><Menu aria-hidden="true" size={21} /></summary>
            <nav aria-label="Navegação móvel">
              <Link href="/explorar">Explorar</Link>
              <Link href="/como-funciona">Como funciona</Link>
              <Link href="/para-clientes">Para clientes</Link>
               <Link href="/para-prestadores">Para prestadores</Link>
               <Link href="/entrar">Entrar</Link>
               <Link href="/conta">Minha conta</Link>
               <Link href="/criar-conta">Criar conta</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
