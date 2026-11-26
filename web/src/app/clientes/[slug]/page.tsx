import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPublicClientProfileBySlug } from "@/lib/profiles/public-server";

export const instant = false;

type ClientPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ClientPageProps): Promise<Metadata> {
  const profile = await getPublicClientProfileBySlug((await params).slug);
  return profile ? { title: profile.displayName, description: profile.bio ?? `Perfil de ${profile.displayName} no Lume.` } : {};
}

export default async function ClientPage({ params }: ClientPageProps) {
  const profile = await getPublicClientProfileBySlug((await params).slug);
  if (!profile) notFound();
  const initials = profile.displayName.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  return <main className="shell profile-page" id="main"><Link className="back-link" href="/"><ArrowLeft aria-hidden="true" size={16} /> Voltar ao início</Link><section className="profile-hero profile-hero-real"><div className="profile-avatar">{initials}</div><div className="profile-title"><p className="eyebrow">Perfil de cliente</p><h1>{profile.displayName}</h1><p>Conta Lume</p></div></section><div className="profile-content"><section><p className="eyebrow">Sobre</p><h2>Apresentação</h2>{profile.bio ? <p className="profile-bio">{profile.bio}</p> : <p className="profile-empty">Esta pessoa ainda não adicionou uma apresentação.</p>}</section></div></main>;
}
