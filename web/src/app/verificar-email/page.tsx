import type { Metadata } from "next";
import { AuthPage } from "@/components/auth/auth-page";
export const metadata: Metadata = { title: "Verificar e-mail" };
export default function VerifyEmailPage() { return <AuthPage screen="verify" aside={<><p className="eyebrow">Quase lá</p><h2>Uma confirmação antes de avançar.</h2><p>A verificação confirma contacto, mas não impede acesso à conta ou áreas públicas.</p></>} />; }
