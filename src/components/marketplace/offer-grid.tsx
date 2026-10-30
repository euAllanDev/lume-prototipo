"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { ServiceOffer } from "@/data/marketplace";
import { OfferCard } from "./offer-card";

export function OfferGrid({ offers }: { offers: readonly ServiceOffer[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div className="offer-grid" layout>
      <AnimatePresence initial={false} mode="popLayout">
        {offers.map((offer, index) => (
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
            key={offer.slug}
            transition={{ delay: Math.min(index * 0.04, 0.16), duration: 0.28 }}
          >
            <OfferCard offer={offer} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
