"use client";

import { ArrowUpRight, MapPin, Star } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { getProvider, type ServiceOffer } from "@/data/marketplace";
import { getImageDimensions } from "@/lib/image-dimensions";

export function OfferCard({ offer, priority = false }: { offer: ServiceOffer; priority?: boolean }) {
  const provider = getProvider(offer.providerSlug);
  const reduceMotion = useReducedMotion();

  if (!provider) return null;

  return (
    <motion.article
      className="offer-card"
      layout={!reduceMotion}
      transition={{ duration: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
      whileHover={reduceMotion ? undefined : { y: -2 }}
    >
      <Link aria-label={`${offer.title}, ${offer.price}`} className="offer-card-link" href={`/ofertas/${offer.slug}`}>
        <div className="offer-image-wrap">
          <Image
            alt={offer.imageAlt}
            className="offer-image"
            fetchPriority={priority ? "high" : "auto"}
            loading={priority ? "eager" : "lazy"}
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
            src={offer.image}
            {...getImageDimensions(offer.image)}
          />
          <span className="offer-mode">{offer.mode}</span>
          <span className="offer-arrow"><ArrowUpRight aria-hidden="true" size={18} /></span>
        </div>
        <div className="offer-body">
          <div className="provider-line">
            <span className="provider-avatar">{provider.initials}</span>
            <span>{provider.name}</span>
            <span className="rating"><Star aria-hidden="true" fill="currentColor" size={13} /> {provider.rating.toFixed(1)}</span>
          </div>
          <h3>{offer.title}</h3>
          <p>{offer.summary}</p>
          <div className="offer-meta">
            <span><MapPin aria-hidden="true" size={15} /> {offer.location}</span>
            <strong>{offer.price}</strong>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
