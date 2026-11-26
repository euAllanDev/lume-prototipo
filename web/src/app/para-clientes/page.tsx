import type { Metadata } from "next";
import { ArrowRight, ListFilter, MapPin, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { OfferGrid } from "@/components/marketplace/offer-grid";
import { offers } from "@/data/marketplace";

export const metadata: Metadata = {
  title: "Para clientes",
  description: "Descubra e compare ofertas de serviços com clareza no Lume.",
};

const reasons = [
  [ListFilter, "Descoberta que começa por si", "Pesquise uma necessidade ou explore áreas de serviço sem depender de recomendações fechadas."],
  [MapPin, "Informação para situar", "Veja modalidade e área aproximada para perceber se uma oferta faz sentido para o seu contexto."],
  [UserRound, "Perfis antes do próximo passo", "Consulte a apresentação pública, experiência declarada e ofertas associadas a cada prestador."],
] as const;

export default function ClientsPage() {
  return (
    <main id="main">
      <section className="audience-hero audience-hero-client shell" aria-labelledby="clients-title">
        <div className="audience-hero-copy"><p className="eyebrow">Para clientes</p><h1 id="clients-title">Uma escolha mais calma começa por uma <em>boa leitura.</em></h1><p>Encontre serviços independentes e compare o que cada pessoa propõe, sem atalhos nem promessas vazias.</p><div className="hero-actions"><Link className="button button-primary" href="/ofertas">Explorar ofertas <ArrowRight aria-hidden="true" size={17} /></Link><Link className="text-link" href="/como-funciona">Perceber como funciona</Link></div></div>
        <div className="audience-hero-photo"><Image alt="Pessoa a trabalhar num espaço luminoso com computador portátil" fill priority sizes="(max-width: 900px) 100vw, 46vw" src="/images/photography.jpg" /></div>
      </section>

      <section className="client-reading shell" aria-labelledby="client-reading-title"><div><p className="eyebrow">O que pode consultar</p><h2 id="client-reading-title">Contexto antes de qualquer decisão.</h2></div><div className="client-reading-list">{reasons.map(([Icon, title, text], index) => <article key={title}><span>0{index + 1}</span><Icon aria-hidden="true" size={22} /><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="client-offers"><div className="shell"><div className="section-heading section-heading-light"><div><p className="eyebrow">Por onde começar</p><h2>Ofertas para ler<br />com atenção.</h2></div><Link className="text-link text-link-light" href="/ofertas">Ver catálogo completo <ArrowRight aria-hidden="true" size={16} /></Link></div><OfferGrid offers={offers.slice(0, 3)} /></div></section>

      <section className="institutional-note shell"><UserRound aria-hidden="true" size={20} /><p><strong>O próximo passo continua nas suas mãos.</strong> Esta demonstração permite explorar informação pública. Contacto, contratação e pagamento ainda não estão disponíveis.</p><Link className="button button-primary" href="/ofertas">Começar a explorar <ArrowRight aria-hidden="true" size={17} /></Link></section>
    </main>
  );
}
