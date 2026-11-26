import type { Metadata } from "next";
import { AuthPage } from "@/components/auth/auth-page";
export const metadata: Metadata = { title: "Redefinir palavra-passe" };
export default function ResetPasswordPage() { return <AuthPage screen="reset" aside={<><p className="eyebrow">Segurança da conta</p><h2>Escolhas simples, informação clara.</h2><p>Uma nova palavra-passe encerra todas as sessões ativas da conta.</p></>} />; }
