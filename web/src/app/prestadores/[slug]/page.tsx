import { ArrowLeft, ArrowRight, Clock3, MapPin, Star } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { OfferGrid } from "@/components/marketplace/offer-grid";
import { getProvider, offers } from "@/data/marketplace";
import { findPublicProviderProfileBySlug } from "@/lib/profiles/public-server";

export const instant = false;

type ProviderPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ProviderPageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const provider = await findPublicProviderProfileBySlug(slug);
  if (provider) return { title: provider.displayName, description: provider.bio ?? `Perfil de ${provider.displayName} no Lume.` };
  const demoProvider = getProvider(slug);
  return demoProvider ? { title: demoProvider.name, description: demoProvider.bio } : {};
}

export default async function ProviderPage({ params }: ProviderPageProps) {
  const slug = (await params).slug;
  const provider = await findPublicProviderProfileBySlug(slug);
  if (!provider) {
    const demoProvider = getProvider(slug);
    if (!demoProvider) notFound();
    const demoOffers = offers.filter((offer) => offer.providerSlug === demoProvider.slug);
    return <main className="shell profile-page" id="main"><Link className="back-link" href="/ofertas"><ArrowLeft aria-hidden="true" size={16} /> Voltar às ofertas</Link><section className="profile-hero"><div className="profile-avatar">{demoProvider.initials}</div><div className="profile-title"><p className="eyebrow">Perfil demonstrativo</p><h1>{demoProvider.name}</h1><p>{demoProvider.role}</p><div><span><MapPin aria-hidden="true" size={15} /> {demoProvider.location}</span><span><Clock3 aria-hidden="true" size={15} /> {demoProvider.responseTime}</span></div></div><div className="profile-rating"><strong>{demoProvider.rating.toFixed(1)}</strong><span><Star aria-hidden="true" fill="currentColor" size={17} /> {demoProvider.reviews} avaliações</span><small>Dados demonstrativos</small></div></section><div className="profile-content"><section><p className="eyebrow">Sobre</p><h2>Experiência com uma abordagem próxima.</h2><p className="profile-bio">{demoProvider.bio}</p><div className="skill-list">{demoProvider.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></section><aside className="profile-note"><strong>Antes de avançar</strong><p>Informação fictícia, não associada a uma conta real. Esta página serve apenas à demonstração do catálogo.</p></aside></div>{demoOffers.length > 0 && <section className="profile-offers"><div className="section-heading"><div><p className="eyebrow">Serviços</p><h2>Ofertas demonstrativas</h2></div><Link className="text-link" href="/ofertas">Explorar todas <ArrowRight aria-hidden="true" size={16} /></Link></div><OfferGrid offers={demoOffers} /></section>}</main>;
  }
  const initials = provider.displayName.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  const location = [provider.city, provider.region].filter(Boolean).join(", ");

  return (
    <main className="shell profile-page" id="main">
      <Link className="back-link" href="/ofertas"><ArrowLeft aria-hidden="true" size={16} /> Voltar às ofertas</Link>
      <section className="profile-hero">
        <div className="profile-avatar">{initials}</div>
        <div className="profile-title"><p className="eyebrow">Perfil de prestador</p><h1>{provider.displayName}</h1><p>Prestador no Lume</p>{location && <div><span><MapPin aria-hidden="true" size={15} /> {location}</span></div>}</div>
      </section>
      <div className="profile-content">
        <section><p className="eyebrow">Sobre</p><h2>Apresentação</h2>{provider.bio ? <p className="profile-bio">{provider.bio}</p> : <p className="profile-empty">Este prestador ainda não adicionou uma apresentação.</p>}</section>
        <aside className="profile-note"><strong>Informação do perfil</strong><p>Apresentação declarada pela pessoa. O Lume não afirma verificação profissional.</p></aside>
      </div>
    </main>
  );
}
