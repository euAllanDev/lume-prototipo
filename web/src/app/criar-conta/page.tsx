import type { Metadata } from "next";
import { AuthPage } from "@/components/auth/auth-page";
export const metadata: Metadata = { title: "Criar conta" };
export default function CreateAccountPage() { return <AuthPage screen="signup" aside={<><p className="eyebrow">Conta única</p><h2>Trabalho que se adapta ao seu momento.</h2><p>No Lume, a mesma conta acompanha quem procura um serviço e quem tem experiência para o prestar.</p></>} />; }
