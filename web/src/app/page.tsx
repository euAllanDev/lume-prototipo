import {
  ArrowRight,
  Camera,
  Check,
  Hammer,
  Leaf,
  MapPin,
  Monitor,
  MousePointer2,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { OfferGrid } from "@/components/marketplace/offer-grid";
import { PageAnimations } from "@/components/marketplace/page-animations";
import { SearchForm } from "@/components/marketplace/search-form";
import { categories, getProvider, offers } from "@/data/marketplace";
import { getImageDimensions } from "@/lib/image-dimensions";

const categoryIcons = {
  mouse: MousePointer2,
  camera: Camera,
  hammer: Hammer,
  leaf: Leaf,
  sparkles: Sparkles,
  monitor: Monitor,
};

const heroOffers = [offers[1], offers[0], offers[2]];

export default function Home() {
  return (
    <PageAnimations>
      <main id="main">
        <section className="home-hero shell" aria-labelledby="hero-title">
          <div className="hero-copy" data-hero-copy>
            <p className="eyebrow">Serviços escolhidos com intenção</p>
            <h1 id="hero-title">A pessoa certa muda <em>tudo.</em></h1>
            <p className="hero-intro">
              Descubra profissionais independentes, compare com clareza e comece uma conversa, em todo Portugal.
            </p>
            <SearchForm />
            <div className="hero-actions">
              <Link className="button button-dark" href="/ofertas">Explorar ofertas <ArrowRight aria-hidden="true" size={17} /></Link>
              <Link className="text-link" href="/como-funciona">Perceber como funciona</Link>
            </div>
          </div>

          <div className="hero-stage" aria-label="Seleção de serviços em destaque">
            {heroOffers.map((offer, index) => {
              const provider = getProvider(offer.providerSlug);
              return (
                <Link
                  className={`hero-service-card hero-service-card-${index + 1}`}
                  data-hero-card
                  href={`/ofertas/${offer.slug}`}
                  key={offer.slug}
                >
                  <Image alt={offer.imageAlt} fetchPriority={index === 0 ? "high" : "auto"} loading="eager" sizes="(max-width: 980px) 46vw, 300px" src={offer.image} {...getImageDimensions(offer.image)} />
                  <span className="hero-card-shade" />
                  <span className="hero-card-type">{offer.category === "digital" ? "Digital" : offer.category}</span>
                  <span className="hero-card-content">
                    <strong>{offer.title}</strong>
                    <span><MapPin aria-hidden="true" size={13} /> {offer.location}</span>
                    <span className="hero-card-bottom"><span><Star aria-hidden="true" fill="currentColor" size={13} /> {provider?.rating.toFixed(1)}</span><b>{offer.price}</b></span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="category-section shell" id="foundation" aria-labelledby="categories-title">
          <div className="section-heading">
            <div><p className="eyebrow">Começar por aqui</p><h2 id="categories-title">De que precisa hoje?</h2></div>
            <p>Explore áreas práticas e criativas, com informação suficiente para escolher melhor.</p>
          </div>
          <div className="category-grid">
            {categories.map((category, index) => {
              const Icon = categoryIcons[category.icon];
              return (
                <Link className="category-item" href={`/ofertas?category=${category.slug}`} key={category.slug}>
                  <span className="category-number">0{index + 1}</span>
                  <span className="category-icon"><Icon aria-hidden="true" size={22} strokeWidth={1.6} /></span>
                  <span><strong>{category.name}</strong><small>{category.description}</small></span>
                  <ArrowRight aria-hidden="true" className="category-arrow" size={18} />
                </Link>
              );
            })}
          </div>
        </section>

        <section className="featured-section">
          <div className="shell">
            <div className="section-heading section-heading-light">
              <div><p className="eyebrow">Seleção Lume</p><h2>Trabalho que fala por si.</h2></div>
              <Link className="text-link text-link-light" href="/ofertas">Ver todas as ofertas <ArrowRight aria-hidden="true" size={16} /></Link>
            </div>
            <OfferGrid offers={offers.filter((offer) => offer.featured)} />
          </div>
        </section>

        <section className="process-section shell" id="como-funciona" aria-labelledby="process-title">
          <div className="process-intro">
            <p className="eyebrow">Clareza em cada passo</p>
            <h2 id="process-title">Menos procura.<br /><em>Mais encontro.</em></h2>
            <p>O Lume aproxima necessidades reais e talento independente, sem esconder o essencial.</p>
            <Link className="button button-primary" href="/como-funciona">Ver a experiência <ArrowRight aria-hidden="true" size={17} /></Link>
          </div>
          <ol className="process-list">
            <li><span>01</span><div><strong>Diga o que procura</strong><p>Pesquise por serviço ou navegue por uma área.</p></div><SearchIcon /></li>
            <li><span>02</span><div><strong>Compare com contexto</strong><p>Veja abordagem, localização, valor e disponibilidade.</p></div><Star aria-hidden="true" size={24} /></li>
            <li><span>03</span><div><strong>Comece uma conversa</strong><p>Escolha com confiança antes de qualquer compromisso.</p></div><ArrowRight aria-hidden="true" size={24} /></li>
          </ol>
        </section>

        <section className="customer-callout shell" aria-labelledby="customer-title">
          <div className="customer-callout-copy">
            <p className="eyebrow">Para quem procura</p>
            <h2 id="customer-title">Escolher bem começa por ver <em>o que importa.</em></h2>
            <p>Explore serviços, compare abordagens e consulte cada perfil antes de decidir o próximo passo.</p>
            <Link className="text-link" href="/para-clientes">Conhecer a experiência de cliente <ArrowRight aria-hidden="true" size={17} /></Link>
          </div>
          <div className="customer-callout-art"><Image alt="Profissional a prestar apoio junto a um computador portátil" loading="lazy" sizes="(max-width: 900px) 100vw, 45vw" src="/images/tech-support.jpg" {...getImageDimensions("/images/tech-support.jpg")} /></div>
        </section>

        <section className="provider-callout shell">
          <div className="provider-callout-art">
            <Image alt="Profissional independente a preparar trabalho digital" loading="lazy" sizes="(max-width: 800px) 100vw, 50vw" src="/images/web-design.jpg" {...getImageDimensions("/images/web-design.jpg")} />
          </div>
          <div className="provider-callout-copy">
            <p className="eyebrow">Para quem sabe fazer</p>
            <h2>O seu talento merece ser <em>bem apresentado.</em></h2>
            <p>Crie uma oferta clara, mostre a sua abordagem e seja encontrado por quem valoriza o seu trabalho.</p>
            <ul><li><Check aria-hidden="true" size={16} /> Um perfil para os dois lados do marketplace</li><li><Check aria-hidden="true" size={16} /> Informação prática antes da primeira conversa</li></ul>
            <Link className="button button-light" href="/para-prestadores">Conhecer o caminho para prestadores <ArrowRight aria-hidden="true" size={17} /></Link>
          </div>
        </section>

        <section className="final-cta shell">
          <div><p className="eyebrow">Comece por uma necessidade</p><h2>Há uma boa solução<br />à espera de ser encontrada.</h2></div>
          <Link className="button button-primary button-large" href="/ofertas">Explorar serviços <ArrowRight aria-hidden="true" size={19} /></Link>
          <span className="cta-orb" aria-hidden="true" />
        </section>
      </main>
    </PageAnimations>
  );
}

function SearchIcon() {
  return <Sparkles aria-hidden="true" size={24} />;
}
