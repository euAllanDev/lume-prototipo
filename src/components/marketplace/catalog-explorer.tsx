"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useDeferredValue, useState } from "react";

import { OfferGrid } from "@/components/marketplace/offer-grid";
import { categories, type ServiceMode, type ServiceOffer } from "@/data/marketplace";

export function CatalogExplorer({ initialQuery, initialCategory, offers }: {
  initialQuery: string;
  initialCategory: string;
  offers: readonly ServiceOffer[];
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [mode, setMode] = useState<"" | ServiceMode>("");
  const [sort, setSort] = useState("recommended");
  const deferredQuery = useDeferredValue(query.toLocaleLowerCase("pt-PT"));

  const filtered = offers
    .filter((offer) => !deferredQuery || `${offer.title} ${offer.summary} ${offer.location}`.toLocaleLowerCase("pt-PT").includes(deferredQuery))
    .filter((offer) => !category || offer.category === category)
    .filter((offer) => !mode || offer.mode === mode)
    .toSorted((a, b) => sort === "price" ? Number(a.price.replace(/\D/g, "")) - Number(b.price.replace(/\D/g, "")) : Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

  const hasFilters = Boolean(query || category || mode);

  function clearFilters() {
    setQuery("");
    setCategory("");
    setMode("");
  }

  return (
    <div className="catalog-layout">
      <aside className="catalog-filters" aria-label="Filtros de ofertas">
        <div className="filter-title"><SlidersHorizontal aria-hidden="true" size={18} /><strong>Filtrar resultados</strong></div>
        <label>Pesquisar<div className="input-with-icon"><Search aria-hidden="true" size={17} /><input onChange={(event) => setQuery(event.target.value)} placeholder="Palavra-chave" type="search" value={query} /></div></label>
        <label>Categoria<select onChange={(event) => setCategory(event.target.value)} value={category}><option value="">Todas as categorias</option>{categories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label>
        <fieldset><legend>Modalidade</legend>{(["", "Presencial", "Remoto", "Híbrido"] as const).map((item) => <button className={mode === item ? "filter-option active" : "filter-option"} key={item || "all"} onClick={() => setMode(item)} type="button">{item || "Todas"}</button>)}</fieldset>
        {hasFilters && <button className="clear-button" onClick={clearFilters} type="button"><X aria-hidden="true" size={15} /> Limpar filtros</button>}
      </aside>
      <section aria-live="polite" className="catalog-results">
        <div className="results-toolbar"><p><strong>{filtered.length}</strong> {filtered.length === 1 ? "oferta encontrada" : "ofertas encontradas"}</p><label>Ordenar por<select onChange={(event) => setSort(event.target.value)} value={sort}><option value="recommended">Recomendadas</option><option value="price">Menor valor inicial</option></select></label></div>
        {filtered.length ? <OfferGrid offers={filtered} /> : <div className="empty-state"><span><Search aria-hidden="true" size={28} /></span><h2>Não encontrámos uma combinação certa.</h2><p>Experimente outra palavra ou remova um dos filtros.</p><button className="button button-primary" onClick={clearFilters} type="button">Limpar pesquisa</button></div>}
      </section>
    </div>
  );
}
