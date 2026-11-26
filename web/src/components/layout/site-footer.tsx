import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { LogoMark } from "@/components/ui/logo-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link className="brand" href="/"><LogoMark /></Link>
          <p>Serviços independentes,<br />escolhidos com mais clareza.</p>
          <span className="footer-demo">Demonstração sem operações reais</span>
        </div>
        <div className="footer-links"><strong>Descobrir</strong><Link href="/ofertas">Todas as ofertas</Link><Link href="/explorar">Categorias e sugestões</Link><Link href="/como-funciona">Como funciona</Link></div>
        <div className="footer-links"><strong>Escolher um caminho</strong><Link href="/para-clientes">Para clientes</Link><Link href="/para-prestadores">Para prestadores</Link><Link href="/explorar">Explorar ofertas</Link></div>
        <div className="footer-manifesto"><p>Talento local.<br /><em>Impacto próximo.</em></p><Link href="/explorar" aria-label="Explorar serviços"><ArrowUpRight aria-hidden="true" size={22} /></Link></div>
      </div>
      <div className="shell footer-bottom"><span>© 2026 Lume · Protótipo para Portugal</span><span>Dados, perfis e avaliações fictícios</span></div>
    </footer>
  );
}
