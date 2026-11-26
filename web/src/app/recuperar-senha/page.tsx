import type { Metadata } from "next";
import { AuthPage } from "@/components/auth/auth-page";
export const metadata: Metadata = { title: "Recuperar palavra-passe" };
export default function RecoverPasswordPage() { return <AuthPage screen="recovery" aside={<><p className="eyebrow">Acesso à conta</p><h2>Retome quando estiver pronto.</h2><p>Enviaremos instruções apenas quando a conta existir, sem revelar esse resultado.</p></>} />; }
