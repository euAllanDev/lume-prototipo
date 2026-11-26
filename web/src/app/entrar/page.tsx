import type { Metadata } from "next";
import { AuthPage } from "@/components/auth/auth-page";
export const metadata: Metadata = { title: "Entrar" };
export default function LoginPage() { return <AuthPage screen="login" aside={<><p className="eyebrow">Serviços independentes</p><h2>Um ponto de partida para encontrar ou oferecer trabalho com contexto.</h2><p>Explore serviços, construa a sua presença e mantenha cada próximo passo visível.</p></>} />; }
