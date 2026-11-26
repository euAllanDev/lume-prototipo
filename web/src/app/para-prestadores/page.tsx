import type { Metadata } from "next";
import { ArrowRight, Eye, FileText, LayoutPanelTop } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Para prestadores",
  description: "Conheça a proposta do Lume para profissionais independentes.",
};

const principles = [
  [FileText, "Uma proposta compreensível", "Título, escopo, modalidade, área e condições iniciais ajudam a enquadrar o serviço."],
  [LayoutPanelTop, "Uma presença coerente", "Perfil e ofertas pertencem à mesma leitura, em vez de aparecerem como peças soltas."],
  [Eye, "Visibilidade com contexto", "A descoberta aproxima o seu trabalho de pessoas que já estão a procurar uma solução."],
] as const;

export default function ProvidersPage() {
  return (
    <main id="main">
      <section className="provider-intro shell" aria-labelledby="providers-title">
        <div className="provider-intro-photo"><Image alt="Profissional a trabalhar concentrado num projeto digital" fill priority sizes="(max-width: 900px) 100vw, 50vw" src="/images/web-design.jpg" /></div>
        <div className="provider-intro-copy"><p className="eyebrow">Para prestadores</p><h1 id="providers-title">O trabalho já tem valor. Falta-lhe um lugar para ser <em>bem entendido.</em></h1><p>O Lume procura dar forma à apresentação de serviços independentes, com espaço para explicar a abordagem e a informação prática.</p><Link className="button button-light" href="/como-funciona">Ver como funciona <ArrowRight aria-hidden="true" size={17} /></Link></div>
      </section>

      <section className="provider-principles shell" aria-labelledby="principles-title"><div className="provider-principles-title"><p className="eyebrow">Uma presença profissional</p><h2 id="principles-title">Clareza para quem apresenta. Contexto para quem procura.</h2></div><div className="provider-principles-list">{principles.map(([Icon, title, text], index) => <article key={title}><span>0{index + 1}</span><Icon aria-hidden="true" size={21} /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

      <section className="provider-frame shell"><div className="provider-frame-copy"><p className="eyebrow">O que está a ser construído</p><h2>Uma forma mais cuidada de tornar serviços <em>encontráveis.</em></h2><p>Publicar ofertas, gerir informação e iniciar contactos ainda não estão disponíveis. Esta página apresenta a direção da experiência, não uma promessa de resultados.</p><Link className="text-link" href="/ofertas">Ver ofertas públicas existentes <ArrowRight aria-hidden="true" size={17} /></Link></div><div className="provider-frame-art"><Image alt="Mãos a trabalhar com ferramentas de reparação em madeira" fill sizes="(max-width: 900px) 100vw, 42vw" src="/images/home-repair.jpg" /></div></section>
    </main>
  );
}
