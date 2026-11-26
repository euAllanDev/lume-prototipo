/**
 * Configuração regional do Lume.
 *
 * O Brasil é o mercado inicial (openspec/changes/localize-lume-brazil).
 * Idioma, moeda e país ficam centralizados aqui para que uma futura
 * expansão (por exemplo, Portugal) troque a configuração num só lugar.
 */
export const appLocale = {
  language: "pt-BR",
  currency: "BRL",
  country: "Brasil",
} as const;

const currencyFormatter = new Intl.NumberFormat(appLocale.language, {
  style: "currency",
  currency: appLocale.currency,
  maximumFractionDigits: 0,
});

/** Formata um valor inteiro na moeda do mercado, ex.: 3500 → "R$ 3.500". */
export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

/** Converte texto para minúsculas seguindo as regras do idioma do mercado. */
export function toLocaleLower(value: string): string {
  return value.toLocaleLowerCase(appLocale.language);
}
