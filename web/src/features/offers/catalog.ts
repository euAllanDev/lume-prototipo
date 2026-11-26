import { categories, type OfferAvailability, type ServiceMode, type ServiceOffer } from "@/data/marketplace";

export type OfferSort = "relevance" | "price-asc" | "price-desc" | "recent";

export type OfferFilters = {
  q: string;
  category: string;
  subcategory: string;
  mode: "" | ServiceMode;
  location: string;
  minPrice: string;
  maxPrice: string;
  availability: "" | OfferAvailability;
  sort: OfferSort;
};

export const defaultOfferFilters: OfferFilters = {
  q: "", category: "", subcategory: "", mode: "", location: "", minPrice: "", maxPrice: "", availability: "", sort: "relevance",
};

const modes = ["Presencial", "Remoto", "Híbrido"] as const;
const availabilityValues = ["available", "scheduled"] as const;
const sorts = ["relevance", "price-asc", "price-desc", "recent"] as const;

function single(params: URLSearchParams, key: string) { return params.get(key)?.trim() ?? ""; }
function normalized(value: string) { return value.trim().replace(/\s+/g, " "); }

export function filtersFromSearchParams(params: URLSearchParams): OfferFilters {
  const category = single(params, "category");
  const minPrice = single(params, "minPrice");
  const maxPrice = single(params, "maxPrice");
  return {
    q: normalized(single(params, "q")),
    category: categories.some((item) => item.slug === category) ? category : "",
    subcategory: normalized(single(params, "subcategory")),
    mode: modes.includes(single(params, "mode") as ServiceMode) ? single(params, "mode") as ServiceMode : "",
    location: normalized(single(params, "location")),
    minPrice: Number.isFinite(Number(minPrice)) && Number(minPrice) >= 0 ? minPrice : "",
    maxPrice: Number.isFinite(Number(maxPrice)) && Number(maxPrice) >= 0 ? maxPrice : "",
    availability: availabilityValues.includes(single(params, "availability") as OfferAvailability) ? single(params, "availability") as OfferAvailability : "",
    sort: sorts.includes(single(params, "sort") as OfferSort) ? single(params, "sort") as OfferSort : "relevance",
  };
}

export function searchParamsFromFilters(filters: OfferFilters) {
  const params = new URLSearchParams();
  const entries = Object.entries(filters).filter(([, value]) => value && value !== "relevance");
  for (const [key, value] of entries) params.set(key, value);
  return params.toString();
}

export function filterOffers(offers: readonly ServiceOffer[], filters: OfferFilters) {
  const query = filters.q.toLocaleLowerCase("pt-PT");
  const location = filters.location.toLocaleLowerCase("pt-PT");
  const min = filters.minPrice ? Number(filters.minPrice) : undefined;
  const max = filters.maxPrice ? Number(filters.maxPrice) : undefined;
  return offers.filter((offer) => {
    const haystack = [offer.title, offer.summary, offer.subcategory, offer.location, categories.find((item) => item.slug === offer.category)?.name ?? ""].join(" ").toLocaleLowerCase("pt-PT");
    return (!query || haystack.includes(query)) && (!filters.category || offer.category === filters.category) && (!filters.subcategory || offer.subcategory === filters.subcategory) && (!filters.mode || offer.mode === filters.mode) && (!location || offer.location.toLocaleLowerCase("pt-PT").includes(location)) && (min === undefined || offer.priceFrom >= min) && (max === undefined || offer.priceFrom <= max) && (!filters.availability || offer.availabilityStatus === filters.availability);
  }).toSorted((a, b) => {
    if (filters.sort === "price-asc") return a.priceFrom - b.priceFrom;
    if (filters.sort === "price-desc") return b.priceFrom - a.priceFrom;
    if (filters.sort === "recent") return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
    return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
  });
}
