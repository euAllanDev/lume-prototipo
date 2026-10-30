import { ArrowLeft, ArrowRight, Clock3, MapPin, Star } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { OfferGrid } from "@/components/marketplace/offer-grid";
import { getProvider, offers, providers } from "@/data/marketplace";

export function generateStaticParams() {
  return providers.map((provider) => ({ slug: provider.slug }));
}

type ProviderPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ProviderPageProps): Promise<Metadata> {
  const { slug } = await params;
  const provider = getProvider(slug);
  return provider ? { title: provider.name, description: provider.bio } : {};
}

export default async function ProviderPage({ params }: ProviderPageProps) {
  const { slug } = await params;
  const provider = getProvider(slug);
  if (!provider) notFound();
  const providerOffers = offers.filter((offer) => offer.providerSlug === provider.slug);

  return (
    <main className="shell profile-page" id="main">
      <Link className="back-link" href="/ofertas"><ArrowLeft aria-hidden="true" size={16} /> Voltar às ofertas</Link>
      <section className="profile-hero">
        <div className="profile-avatar">{provider.initials}</div>
        <div className="profile-title"><p className="eyebrow">Perfil demonstrativo</p><h1>{provider.name}</h1><p>{provider.role}</p><div><span><MapPin aria-hidden="true" size={15} /> {provider.location}</span><span><Clock3 aria-hidden="true" size={15} /> {provider.responseTime}</span></div></div>
        <div className="profile-rating"><strong>{provider.rating.toFixed(1)}</strong><span><Star aria-hidden="true" fill="currentColor" size={17} /> {provider.reviews} avaliações</span><small>Dados demonstrativos</small></div>
      </section>
      <div className="profile-content">
        <section><p className="eyebrow">Sobre</p><h2>Experiência com uma abordagem próxima.</h2><p className="profile-bio">{provider.bio}</p><div className="skill-list">{provider.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></section>
        <aside className="profile-note"><strong>Antes de avançar</strong><p>Informação declarada e não verificada pela plataforma. Esta página serve apenas para avaliação visual do conceito.</p></aside>
      </div>
      {providerOffers.length > 0 && <section className="profile-offers"><div className="section-heading"><div><p className="eyebrow">Serviços</p><h2>Ofertas publicadas</h2></div><Link className="text-link" href="/ofertas">Explorar todas <ArrowRight aria-hidden="true" size={16} /></Link></div><OfferGrid offers={providerOffers} /></section>}
    </main>
  );
}
