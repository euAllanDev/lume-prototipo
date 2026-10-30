"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP);

export function PageAnimations({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .from("[data-hero-copy] > *", { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.08 })
        .from("[data-hero-card]", { autoAlpha: 0, y: 36, rotate: 0, scale: 0.94, duration: 0.85, stagger: 0.1 }, "-=0.42")
        .from("[data-hero-orb]", { autoAlpha: 0, scale: 0.7, duration: 1 }, "-=0.8");

      if (window.matchMedia("(min-width: 981px)").matches) {
        gsap.to("[data-depth='far']", { yPercent: -4, duration: 4.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      }
    });

    return () => media.revert();
  }, { scope });

  return <div ref={scope}>{children}</div>;
}
