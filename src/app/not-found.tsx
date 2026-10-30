import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell not-found" id="main">
      <div>
        <p className="eyebrow">Página não encontrada</p>
        <h1>Este caminho ainda não tem luz.</h1>
        <p>
          A página pode ter mudado ou ainda não fazer parte desta demonstração.
        </p>
        <Link className="button button-primary" href="/">
          Voltar ao Lume
        </Link>
      </div>
    </main>
  );
}
