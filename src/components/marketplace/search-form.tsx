"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

export function SearchForm({ defaultValue = "", compact = false }: { defaultValue?: string; compact?: boolean }) {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get("q")?.toString().trim();
    router.push(value ? `/ofertas?q=${encodeURIComponent(value)}` : "/ofertas");
  }

  return (
    <form className={`search-form${compact ? " search-form-compact" : ""}`} onSubmit={handleSubmit} role="search">
      <Search aria-hidden="true" size={20} strokeWidth={1.8} />
      <label className="sr-only" htmlFor={compact ? "catalog-search" : "hero-search"}>Pesquisar serviços</label>
      <input
        defaultValue={defaultValue}
        id={compact ? "catalog-search" : "hero-search"}
        name="q"
        placeholder="De que serviço precisa?"
        type="search"
      />
      <button className="button button-primary" type="submit">Pesquisar</button>
    </form>
  );
}
