import { ArrowLeft, ArrowRight, Check, Clock3, MapPin, ShieldCheck, Star } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { OfferGrid } from "@/components/marketplace/offer-grid";
import { categories, getOffer, getProvider, offers } from "@/data/marketplace";

export function generateStaticParams() {
  return offers.map((offer) => ({ slug: offer.slug }));
}

type OfferPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: OfferPageProps): Promise<Metadata> {
  const { slug } = await params;
  const offer = getOffer(slug);
  return offer ? { title: offer.title, description: offer.summary } : {};
}

export default async function OfferDetailPage({ params }: OfferPageProps) {
  const { slug } = await params;
  const offer = getOffer(slug);
  if (!offer) notFound();
  const provider = getProvider(offer.providerSlug);
  if (!provider) notFound();
  const category = categories.find((item) => item.slug === offer.category);
  const relatedOffers = offers.filter((item) => item.slug !== offer.slug && item.category === offer.category).slice(0, 3);

  return (
    <main className="shell detail-page" id="main">
      <Link className="back-link" href="/ofertas"><ArrowLeft aria-hidden="true" size={16} /> Voltar às ofertas</Link>
      <div className="detail-grid">
        <article className="detail-main">
          <div className="detail-image"><Image alt={offer.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 70vw" src={offer.image} /><span>{offer.mode}</span></div>
          <div className="detail-copy">
            <p className="eyebrow">{category?.name ?? offer.category} · {offer.subcategory}</p>
            <h1>{offer.title}</h1>
            <p className="detail-lead">{offer.summary}</p>
            <div className="detail-divider" />
            <h2>O que está incluído</h2>
            <ul className="included-list">{offer.includes.map((item) => <li key={item}><Check aria-hidden="true" size={17} /> {item}</li>)}</ul>
            <div className="demo-card"><ShieldCheck aria-hidden="true" size={20} /><p><strong>Informação demonstrativa</strong><br />Perfil, avaliações, valor e disponibilidade são fictícios. Não existe verificação profissional ou transação real.</p></div>
          </div>
        </article>
        <aside className="detail-sidebar">
          <span className="detail-label">Valor indicativo</span><strong className="detail-price">{offer.price}</strong>
          <div className="detail-facts"><div><MapPin aria-hidden="true" size={18} /><span><small>Área aproximada</small><strong>{offer.location}</strong></span></div><div><Clock3 aria-hidden="true" size={18} /><span><small>Disponibilidade</small><strong>{offer.availability}</strong></span></div></div>
          <Link className="button button-primary button-wide" href={`/prestadores/${provider.slug}`}>Conhecer {provider.name.split(" ")[0]} <ArrowRight aria-hidden="true" size={17} /></Link>
          <button aria-disabled="true" className="button button-secondary button-wide" disabled type="button">Contato indisponível na demonstração</button>
          <p className="sidebar-note">Não há contatos, propostas ou contratação nesta demonstração.</p>
          <div className="sidebar-provider"><span className="provider-avatar provider-avatar-large">{provider.initials}</span><div><strong>{provider.name}</strong><span>{provider.role}</span><span className="rating"><Star aria-hidden="true" fill="currentColor" size={13} /> {provider.rating.toFixed(1)} · {provider.reviews} avaliações demonstrativas</span></div></div>
        </aside>
      </div>
      {relatedOffers.length > 0 && <section className="detail-related"><div className="section-heading"><div><p className="eyebrow">Na mesma categoria</p><h2>Outras ofertas para comparar</h2></div><Link className="text-link" href={`/ofertas?category=${offer.category}`}>Ver {category?.name ?? "categoria"} <ArrowRight aria-hidden="true" size={16} /></Link></div><OfferGrid offers={relatedOffers} /></section>}
    </main>
  );
}
