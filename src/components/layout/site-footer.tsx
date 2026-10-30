import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { LogoMark } from "@/components/ui/logo-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link className="brand" href="/"><LogoMark /><span>Lume</span></Link>
          <p>Serviços independentes,<br />escolhidos com mais clareza.</p>
          <span className="footer-demo">Demonstração sem operações reais</span>
        </div>
        <div className="footer-links"><strong>Descobrir</strong><Link href="/ofertas">Todas as ofertas</Link><Link href="/#categories-title">Categorias</Link><Link href="/#como-funciona">Como funciona</Link></div>
        <div className="footer-links"><strong>Para profissionais</strong><span>Apresentar serviços</span><span>Responder a pedidos</span><span>Perfil público</span></div>
        <div className="footer-manifesto"><p>Talento local.<br /><em>Impacto próximo.</em></p><Link href="/ofertas" aria-label="Explorar serviços"><ArrowUpRight aria-hidden="true" size={22} /></Link></div>
      </div>
      <div className="shell footer-bottom"><span>© 2026 Lume · Protótipo para Portugal</span><span>Dados, perfis e avaliações fictícios</span></div>
    </footer>
  );
}
