import type { Metadata } from "next";
import { Suspense } from "react";

import { CatalogExplorer } from "@/components/marketplace/catalog-explorer";
import { offers } from "@/data/marketplace";

export const metadata: Metadata = {
  title: "Explorar serviços",
  description: "Explore ofertas demonstrativas de serviços independentes em Portugal.",
};

export default function OffersPage() {
  return (
    <main className="shell catalog-page" id="main">
      <header className="catalog-header">
        <p className="eyebrow">Seleção aberta</p>
        <h1>Encontre trabalho<br /><em>bem feito.</em></h1>
        <p>Ofertas demonstrativas, apresentadas com contexto para comparar sem ruído.</p>
      </header>
      <Suspense fallback={<div className="catalog-loading" aria-label="A carregar ofertas"><span /><span /><span /></div>}>
        <CatalogContent />
      </Suspense>
    </main>
  );
}

function CatalogContent() {
  return <CatalogExplorer offers={offers} />;
}
