import Image from "next/image";

export function LogoMark({ eager = false }: { eager?: boolean }) {
  return (
    <span
      className="brand-mark"
      aria-hidden="true"
    >
      <Image
        src="/images/logo.png"
        alt="Lume logo"
        width={104}
        height={58}
        fetchPriority={eager ? "high" : "auto"}
        loading={eager ? "eager" : "lazy"}
        sizes="104px"
      />
    </span>
  );
}
