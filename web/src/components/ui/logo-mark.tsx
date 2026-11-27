import Image from "next/image";

/** Logo do Lume em SVG (public/images/brand), nítido em qualquer tamanho e densidade de tela. */
export function LogoMark({ eager = false }: { eager?: boolean }) {
  return (
    <span className="brand-mark" aria-hidden="true">
      <Image
        src="/images/brand/lume-logo.svg"
        alt=""
        width={104}
        height={29}
        unoptimized
        fetchPriority={eager ? "high" : "auto"}
        loading={eager ? "eager" : "lazy"}
      />
    </span>
  );
}
