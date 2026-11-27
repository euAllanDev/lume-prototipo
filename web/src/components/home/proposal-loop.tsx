"use client";

import { useEffect } from "react";

/**
 * A animação da proposta aberta na home: o botão "Aceitar proposta" é pressionado,
 * o resultado aparece, a cena descansa e recomeça. Com movimento reduzido, mostra o resultado fixo.
 */
export function ProposalLoop({ targetId }: { targetId: string }) {
  useEffect(() => {
    const proposal = document.getElementById(targetId);
    if (!proposal) return;

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      proposal.setAttribute("data-accepted", "");
      return;
    }

    const timers: number[] = [];
    const run = () => {
      proposal.removeAttribute("data-accepted");
      timers.push(window.setTimeout(() => proposal.setAttribute("data-accepted", ""), 1600));
    };

    run();
    const interval = window.setInterval(run, 6000);

    return () => {
      window.clearInterval(interval);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [targetId]);

  return null;
}
