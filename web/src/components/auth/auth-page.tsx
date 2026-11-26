import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense, type ReactNode } from "react";

import { AuthForm } from "@/components/auth/auth-form";
import { LogoMark } from "@/components/ui/logo-mark";

type Screen = "login" | "signup" | "recovery" | "reset" | "verify";

export function AuthPage({ screen, aside }: { screen: Screen; aside: ReactNode }) {
  return <main className="auth-page" id="main"><header className="auth-header"><Link className="brand" href="/" aria-label="Lume, início"><LogoMark eager /></Link><Link className="auth-public-link" href="/"><ArrowLeft aria-hidden="true" size={15} /> Conhecer Lume</Link></header><div className="auth-layout"><aside className="auth-aside">{aside}</aside><Suspense fallback={<section aria-busy="true" className="auth-form-panel" />}><AuthForm screen={screen} /></Suspense></div></main>;
}
