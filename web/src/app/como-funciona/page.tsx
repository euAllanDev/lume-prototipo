import type { Metadata } from "next";
import { ArrowRight, BriefcaseBusiness, Search, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Como funciona",
  description: "Conheça o percurso de descoberta de serviços no Lume.",
};

const customerSteps = [
  ["01", "Parta de uma necessidade", "Pesquise um serviço ou comece por uma categoria."],
  ["02", "Leia com contexto", "Compare proposta, modalidade, área, valor indicativo e disponibilidade."],
  ["03", "Conheça quem está por trás", "Abra o perfil público e veja a informação declarada antes de avançar."],
] as const;

const providerSteps = [
  ["01", "Dê forma ao serviço", "Uma oferta clara reúne escopo, modalidade e informação prática."],
  ["02", "Construa presença", "O perfil ajuda a enquadrar competências e área de atuação."],
  ["03", "Prepare o próximo passo", "Publicação e contacto serão introduzidos apenas quando estiverem disponíveis."],
] as const;

export default function HowItWorksPage() {
  return (
    <main id="main">
      <section className="how-intro shell" aria-labelledby="how-title">
        <div>
          <p className="eyebrow">Como funciona</p>
          <h1 id="how-title">Menos ruído.<br /><em>Mais contexto.</em></h1>
        </div>
        <p>O Lume organiza informação pública sobre serviços independentes para tornar a descoberta mais simples e consciente.</p>
      </section>

      <section className="how-editorial shell" aria-label="Uma forma mais clara de descobrir serviços">
        <div className="how-editorial-image"><Image alt="Pessoa a trabalhar numa mesa com computador e materiais de projeto" fill priority sizes="(max-width: 900px) 100vw, 52vw" src="/images/web-design.jpg" /></div>
        <blockquote>“Antes de escolher, é útil poder ver a proposta inteira.”</blockquote>
        <p>Por isso, cada oferta reúne o essencial numa só leitura: quem presta, o que propõe, onde atua e em que condições iniciais.</p>
      </section>

      <section className="journey-section shell" aria-labelledby="journey-title">
        <div className="journey-heading"><p className="eyebrow">Dois pontos de vista</p><h2 id="journey-title">A mesma plataforma,<br />dois caminhos <em>claros.</em></h2></div>
        <div className="journey-columns">
          <article className="journey-track">
            <header><Search aria-hidden="true" size={22} /><p>Para clientes</p><h3>Descobrir com tempo para comparar.</h3></header>
            <ol>{customerSteps.map(([number, title, text]) => <li key={number}><span>{number}</span><div><strong>{title}</strong><p>{text}</p></div></li>)}</ol>
            <Link className="text-link" href="/para-clientes">Ver experiência de cliente <ArrowRight aria-hidden="true" size={16} /></Link>
          </article>
          <article className="journey-track journey-track-dark">
            <header><BriefcaseBusiness aria-hidden="true" size={22} /><p>Para prestadores</p><h3>Apresentar trabalho com mais clareza.</h3></header>
            <ol>{providerSteps.map(([number, title, text]) => <li key={number}><span>{number}</span><div><strong>{title}</strong><p>{text}</p></div></li>)}</ol>
            <Link className="text-link text-link-light" href="/para-prestadores">Ver experiência de prestador <ArrowRight aria-hidden="true" size={16} /></Link>
          </article>
        </div>
      </section>

      <section className="institutional-note shell"><UserRound aria-hidden="true" size={20} /><p><strong>Uma experiência em evolução.</strong> Exploração de ofertas e consulta de perfis estão disponíveis nesta demonstração. Publicação, contactos e propostas ainda não fazem parte do produto.</p><Link className="button button-primary" href="/ofertas">Explorar ofertas <ArrowRight aria-hidden="true" size={17} /></Link></section>
    </main>
  );
}
