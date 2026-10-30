import type { Metadata } from "next";
import { Suspense } from "react";

import { CatalogExplorer } from "@/components/marketplace/catalog-explorer";
import { categories, offers } from "@/data/marketplace";

export const metadata: Metadata = {
  title: "Explorar serviços",
  description: "Explore ofertas demonstrativas de serviços independentes em Portugal.",
};

type OffersPageProps = {
  searchParams: Promise<{ q?: string | string[]; categoria?: string | string[] }>;
};

export default function OffersPage({ searchParams }: OffersPageProps) {
  return (
    <main className="shell catalog-page" id="main">
      <header className="catalog-header">
        <p className="eyebrow">Seleção aberta</p>
        <h1>Encontre trabalho<br /><em>bem feito.</em></h1>
        <p>Ofertas demonstrativas, apresentadas com contexto para comparar sem ruído.</p>
      </header>
      <Suspense fallback={<div className="catalog-loading" aria-label="A carregar ofertas"><span /><span /><span /></div>}>
        <CatalogContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function CatalogContent({ searchParams }: OffersPageProps) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const category = typeof params.categoria === "string" && categories.some((item) => item.slug === params.categoria) ? params.categoria : "";

  return <CatalogExplorer initialCategory={category} initialQuery={query} offers={offers} />;
}
