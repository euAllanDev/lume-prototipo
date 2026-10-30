import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

import { LogoMark } from "@/components/ui/logo-mark";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand flex items-center gap-2" href="/" aria-label="Lume, início">
          <LogoMark />
          <span>Lume</span>
        </Link>

        <nav className="site-nav" aria-label="Navegação principal">
          <Link href="/#foundation">Destaques</Link>
          <Link href="/ofertas">Explorar</Link>
          <Link href="/#como-funciona">Como funciona</Link>
        </nav>

        <div className="header-actions">
          <span className="demo-status"><span /> Modo demonstração</span>
          <Link className="header-cta" href="/ofertas">Encontrar serviço <ArrowUpRight aria-hidden="true" size={15} /></Link>
          <Link className="mobile-menu" href="/ofertas" aria-label="Explorar serviços"><Menu aria-hidden="true" size={21} /></Link>
        </div>
      </div>
    </header>
  );
}
