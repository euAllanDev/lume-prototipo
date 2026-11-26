import Link from "next/link";
import { Menu } from "lucide-react";

import { HeaderAccountLinks } from "@/components/layout/header-account-links";
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
          <HeaderAccountLinks variant="desktop" />
          <details className="mobile-menu">
            <summary aria-label="Navegação"><Menu aria-hidden="true" size={21} /></summary>
            <nav aria-label="Navegação móvel">
              <Link href="/explorar">Explorar</Link>
              <Link href="/como-funciona">Como funciona</Link>
              <Link href="/para-clientes">Para clientes</Link>
              <Link href="/para-prestadores">Para prestadores</Link>
              <HeaderAccountLinks variant="mobile" />
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
