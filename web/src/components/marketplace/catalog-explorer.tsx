"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useDeferredValue, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { OfferGrid } from "@/components/marketplace/offer-grid";
import { categories, type ServiceOffer } from "@/data/marketplace";
import { defaultOfferFilters, filterOffers, filtersFromSearchParams, searchParamsFromFilters, type OfferFilters } from "@/features/offers/catalog";

const availabilityLabels = { available: "Disponível", scheduled: "Agenda definida" } as const;
const sortLabels = { relevance: "Em destaque", "price-asc": "Menor preço", "price-desc": "Maior preço", recent: "Mais recente" } as const;

export function CatalogExplorer({ offers }: { offers: readonly ServiceOffer[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const filters = filtersFromSearchParams(new URLSearchParams(searchParams.toString()));
  const deferredQuery = useDeferredValue(filters.q);
  const results = filterOffers(offers, { ...filters, q: deferredQuery });
  const subcategories = [...new Set(offers.filter((offer) => !filters.category || offer.category === filters.category).map((offer) => offer.subcategory))].toSorted();
  const activeFilters = Object.entries(filters).filter(([key, value]) => value && key !== "sort") as [keyof OfferFilters, string][];

  function update(next: Partial<OfferFilters>) {
    const value = { ...filters, ...next };
    if (next.category !== undefined && next.category !== filters.category) value.subcategory = "";
    const query = searchParamsFromFilters(value);
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function clearAll() { update(defaultOfferFilters); }
  function removeFilter(key: keyof OfferFilters) { update({ [key]: "" } as Partial<OfferFilters>); }

  const controls = (
    <div className="catalog-filter-controls">
      <label>Pesquisar
        <span className="input-with-icon"><Search aria-hidden="true" size={17} /><input onChange={(event) => update({ q: event.target.value })} placeholder="Palavra-chave" type="search" value={filters.q} /></span>
      </label>
      <label>Categoria
        <select onChange={(event) => update({ category: event.target.value })} value={filters.category}>
          <option value="">Todas as categorias</option>{categories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
        </select>
      </label>
      <label>Subcategoria
        <select disabled={!subcategories.length} onChange={(event) => update({ subcategory: event.target.value })} value={filters.subcategory}>
          <option value="">Todas as subcategorias</option>{subcategories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>
      <fieldset><legend>Modalidade</legend><span className="modality-options">{(["", "Presencial", "Remoto", "Híbrido"] as const).map((item) => <button aria-pressed={filters.mode === item} className={filters.mode === item ? "filter-option active" : "filter-option"} key={item || "all"} onClick={() => update({ mode: item })} type="button">{item || "Todas"}</button>)}</span></fieldset>
      <label>Localização
        <input onChange={(event) => update({ location: event.target.value })} placeholder="Ex.: São Paulo" type="search" value={filters.location} />
      </label>
      <fieldset><legend>Preço indicativo</legend><span className="price-range"><input aria-label="Preço mínimo" inputMode="numeric" min="0" onChange={(event) => update({ minPrice: event.target.value })} placeholder="Mínimo" type="number" value={filters.minPrice} /><input aria-label="Preço máximo" inputMode="numeric" min="0" onChange={(event) => update({ maxPrice: event.target.value })} placeholder="Máximo" type="number" value={filters.maxPrice} /></span></fieldset>
      <label>Disponibilidade
        <select onChange={(event) => update({ availability: event.target.value as OfferFilters["availability"] })} value={filters.availability}>
          <option value="">Qualquer disponibilidade</option><option value="available">Disponível</option><option value="scheduled">Agenda definida</option>
        </select>
      </label>
    </div>
  );

  return (
    <div className="catalog-layout">
      <aside className="catalog-filters" aria-label="Filtros de ofertas"><div className="filter-title"><SlidersHorizontal aria-hidden="true" size={18} /><strong>Filtrar resultados</strong></div>{controls}{activeFilters.length > 0 && <button className="clear-button" onClick={clearAll} type="button"><X aria-hidden="true" size={15} /> Limpar tudo</button>}</aside>
      <div className="catalog-mobile-filter"><button className="button button-secondary" onClick={() => dialogRef.current?.showModal()} type="button"><SlidersHorizontal aria-hidden="true" size={17} /> Filtros{activeFilters.length ? ` (${activeFilters.length})` : ""}</button><dialog aria-label="Filtros de ofertas" ref={dialogRef}><div className="mobile-filter-heading"><strong>Filtros</strong><button aria-label="Fechar filtros" onClick={() => dialogRef.current?.close()} type="button"><X aria-hidden="true" size={20} /></button></div>{controls}<div className="mobile-filter-actions"><button className="button button-ghost" onClick={clearAll} type="button">Limpar</button><button className="button button-primary" onClick={() => dialogRef.current?.close()} type="button">Ver {results.length} resultados</button></div></dialog></div>
      <section aria-busy={filters.q !== deferredQuery} aria-live="polite" className="catalog-results">
        <div className="results-toolbar"><p><strong>{results.length}</strong> {results.length === 1 ? "oferta encontrada" : "ofertas encontradas"}</p><label>Ordenar por<select onChange={(event) => update({ sort: event.target.value as OfferFilters["sort"] })} value={filters.sort}>{Object.entries(sortLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label></div>
        {activeFilters.length > 0 && <div className="active-filter-list" aria-label="Filtros ativos">{activeFilters.map(([key, value]) => <button key={key} onClick={() => removeFilter(key)} type="button">{key === "availability" ? availabilityLabels[value as keyof typeof availabilityLabels] : key === "category" ? categories.find((item) => item.slug === value)?.name : value}<X aria-hidden="true" size={13} /></button>)}<button className="active-filter-clear" onClick={clearAll} type="button">Limpar tudo</button></div>}
        {results.length ? <OfferGrid eagerCount={2} offers={results} /> : <div className="empty-state"><span><Search aria-hidden="true" size={28} /></span><h2>Não encontramos ofertas com esses critérios.</h2><p>Altere a pesquisa ou remova filtros para voltar a explorar.</p><button className="button button-primary" onClick={clearAll} type="button">Limpar filtros</button></div>}
      </section>
    </div>
  );
}
