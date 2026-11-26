"use client";

import type { MouseEvent } from "react";

export function SkipLink() {
  function focusMain(event: MouseEvent<HTMLAnchorElement>) {
    const main = document.querySelector<HTMLElement>("main#main");
    if (!main) return;

    event.preventDefault();
    main.tabIndex = -1;
    history.pushState(null, "", "#main");
    main.focus();
    main.scrollIntoView();
  }

  return (
    <a className="skip-link" href="#main" onClick={focusMain}>
      Saltar para o conteúdo
    </a>
  );
}
