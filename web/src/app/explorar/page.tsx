import { ArrowRight, Compass, Search } from "lucide-react";
import Link from "next/link";

import { OfferGrid } from "@/components/marketplace/offer-grid";
import { SearchForm } from "@/components/marketplace/search-form";
import { categories, offers } from "@/data/marketplace";

export const metadata = { title: "Descobrir serviços", description: "Encontre serviços demonstrativos por necessidade, área ou categoria." };

const suggestions = [
  { label: "Resolver algo em casa", category: "casa" },
  { label: "Dar forma a um projecto", category: "digital" },
  { label: "Cuidar de um espaço", category: "jardim" },
];

export default function ExplorePage() {
  return <main id="main">
    <section className="explore-hero"><div className="shell"><p className="eyebrow">Descoberta de serviços</p><h1>Comece pelo que<br /><em>precisa agora.</em></h1><p>Pesquise serviços demonstrativos, compare condições e conheça quem os apresenta.</p><SearchForm /></div></section>
    <section className="shell explore-paths"><div className="section-heading"><div><p className="eyebrow">Explorar por caminho</p><h2>Uma boa procura começa com contexto.</h2></div><Link className="text-link" href="/ofertas">Ver catálogo completo <ArrowRight aria-hidden="true" size={16} /></Link></div><div className="explore-suggestions">{suggestions.map((item, index) => <Link href={`/ofertas?category=${item.category}`} key={item.category}><span>0{index + 1}</span><strong>{item.label}</strong><ArrowRight aria-hidden="true" size={18} /></Link>)}</div></section>
    <section className="shell explore-categories"><div><p className="eyebrow">Categorias</p><h2>Escolha uma área</h2></div><div className="category-grid">{categories.map((category, index) => <Link className="category-item" href={`/ofertas?category=${category.slug}`} key={category.slug}><span className="category-number">0{index + 1}</span><span><strong>{category.name}</strong><small>{category.description}</small></span><ArrowRight aria-hidden="true" className="category-arrow" size={17} /></Link>)}</div></section>
    <section className="explore-selection"><div className="shell"><div className="section-heading section-heading-light"><div><p className="eyebrow"><Compass aria-hidden="true" size={14} /> Para começar</p><h2>Ofertas em destaque</h2></div><Link className="text-link text-link-light" href="/ofertas">Comparar todas <ArrowRight aria-hidden="true" size={16} /></Link></div><OfferGrid offers={offers.filter((offer) => offer.featured)} /></div></section>
    <section className="shell explore-catalog-cta"><Search aria-hidden="true" size={25} /><div><strong>Já sabe o que procura?</strong><p>Use filtros por preço, modalidade, localização e disponibilidade no catálogo.</p></div><Link className="button button-primary" href="/ofertas">Abrir catálogo</Link></section>
  </main>;
}
