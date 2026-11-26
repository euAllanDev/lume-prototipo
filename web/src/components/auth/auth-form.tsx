"use client";

import { Check, Eye, EyeOff, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { type ChangeEventHandler, type FormEvent, type ReactNode, useState } from "react";

import { authClient } from "@/lib/auth-client";
import { passwordPolicyMessage, satisfiesPasswordPolicy } from "@/lib/auth-configuration";
import { safeReturnTo } from "@/lib/auth-redirect";
import { parseLumeCapability, type LumeCapability } from "@/lib/profiles/capabilities";

type Screen = "login" | "signup" | "recovery" | "reset" | "verify";

function Field({ label, name, type = "text", required = true, error, children, onChange }: {
  label: string; name: string; type?: string; required?: boolean; error?: string; children?: ReactNode; onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  const id = `auth-${name}`;
  return <label className="auth-field" htmlFor={id}><span>{label}{required && <b aria-hidden="true"> *</b>}</span><span className="auth-input-wrap"><input aria-describedby={error ? `${id}-error` : undefined} aria-invalid={Boolean(error)} id={id} name={name} onChange={onChange} required={required} type={type} />{children}</span>{error && <small className="auth-error" id={`${id}-error`} role="alert">{error}</small>}</label>;
}

function errorMessage(error: { code?: string; message?: string; status?: number } | null | undefined, fallback: string) {
  if (error?.code === "INVALID_EMAIL_OR_PASSWORD") return "Não foi possível entrar com estes dados.";
  if (error?.code === "USER_ALREADY_EXISTS") return "Não foi possível criar a conta com estes dados.";
  if (error?.code === "INITIAL_CAPABILITY_REQUIRED") return "Escolha como quer começar no Lume.";
  if (error?.status === 429 || error?.code === "RATE_LIMITED") return "Demasiadas tentativas. Aguarde antes de tentar novamente.";
  return fallback;
}

export function AuthForm({ screen }: { screen: Screen }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(searchParams.get("error")?.toLowerCase() === "invalid_token" ? "Este link é inválido ou expirou." : null);
  const returnTo = safeReturnTo(searchParams.get("returnTo"));
  const token = searchParams.get("token");
  const { data: currentSession } = authClient.useSession();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");
    const name = String(form.get("name") ?? "").trim();
    const initialCapability = parseLumeCapability(form.get("initialCapability"));
    setNotice(null); setError(null);
    if ((screen === "signup" || screen === "reset") && password !== confirm) { setError("As palavras-passe não coincidem."); return; }
    if ((screen === "signup" || screen === "reset") && !satisfiesPasswordPolicy(password)) { setError(passwordPolicyMessage); return; }
    if (screen === "signup" && name.length < 2) { setError("Indique o seu nome."); return; }
    if (screen === "signup" && !initialCapability) { setError("Escolha como quer começar no Lume."); return; }
    setSubmitting(true);
    try {
      if (screen === "login") {
        const result = await authClient.signIn.email({ email, password, rememberMe: Boolean(form.get("remember")) });
        if (result.error) setError(errorMessage(result.error, "Não foi possível iniciar sessão."));
        else router.replace(returnTo);
      }
      if (screen === "signup") {
        const result = await authClient.signUp.email({ name, email, password, initialCapability } as
          Parameters<typeof authClient.signUp.email>[0] & { initialCapability: LumeCapability });
        if (result.error) setError(errorMessage(result.error, "Não foi possível criar a conta."));
        else router.replace("/verificar-email");
      }
      if (screen === "recovery") {
        const result = await authClient.requestPasswordReset({ email, redirectTo: `${window.location.origin}/redefinir-senha` });
        if (result.error) setError("Não foi possível enviar instruções agora. Tente novamente mais tarde.");
        else setNotice("Se existir uma conta com este e-mail, receberá instruções para continuar.");
      }
      if (screen === "reset") {
        if (!token) { setError("Este link é inválido ou expirou. Peça uma nova recuperação."); return; }
        const result = await authClient.resetPassword({ newPassword: password, token });
        if (result.error) setError("Este link é inválido ou expirou. Peça uma nova recuperação.");
        else { setNotice("Palavra-passe atualizada. Entre novamente."); router.replace("/entrar"); }
      }
    } catch {
      setError("Não foi possível concluir esta operação. Tente novamente mais tarde.");
    } finally { setSubmitting(false); }
  }

  async function resend() {
    setSubmitting(true); setError(null); setNotice(null);
    try {
      const session = await authClient.getSession();
      if (!session.data?.user || session.data.user.emailVerified) { setNotice("Verifique o seu e-mail ou entre novamente para continuar."); return; }
      const result = await authClient.sendVerificationEmail({ email: session.data.user.email, callbackURL: `${window.location.origin}/verificar-email` });
      if (result.error) setError("Não foi possível enviar instruções agora. Tente novamente mais tarde.");
      else setNotice("Se a conta continuar pendente, receberá novas instruções em breve.");
    } catch {
      setError("Não foi possível enviar instruções agora. Tente novamente mais tarde.");
    } finally { setSubmitting(false); }
  }

  const passwordControl = <button aria-label={showPassword ? "Ocultar palavra-passe" : "Mostrar palavra-passe"} className="auth-password-toggle" onClick={() => setShowPassword(!showPassword)} type="button">{showPassword ? <EyeOff aria-hidden="true" size={18} /> : <Eye aria-hidden="true" size={18} />}</button>;
  const title = screen === "login" ? "Entre com clareza." : screen === "signup" ? "Uma conta, dois contextos." : screen === "recovery" ? "Recupere acesso, sem pressa." : screen === "reset" ? "Defina nova palavra-passe." : "Confirme o seu e-mail.";

  if (screen === "verify") return <section className="auth-form-panel"><p className="eyebrow">Conta Lume</p><h1>{title}</h1><p className="auth-intro">Pode entrar e explorar o Lume enquanto a verificação está pendente. Algumas ações futuras exigirão confirmação.</p><div className="auth-status"><Check aria-hidden="true" size={20} /><div><strong>{currentSession?.user.emailVerified ? "E-mail confirmado" : "Verificação pendente"}</strong><p>{currentSession?.user.emailVerified ? "A confirmação foi concluída com sucesso." : "Abra o link enviado para concluir esta etapa."}</p></div></div>{notice && <p className="auth-notice" role="status">{notice}</p>}{error && <p className="auth-error" role="alert">{error}</p>}{!currentSession?.user.emailVerified && <button aria-busy={submitting} className="button button-primary button-wide" disabled={submitting} onClick={resend} type="button">{submitting ? <><LoaderCircle className="auth-spinner" aria-hidden="true" size={16} /><span>Reenviando instruções</span></> : "Reenviar instruções"}</button>}<Link className="auth-return" href="/entrar">Voltar a entrar</Link></section>;

  return (
    <section className="auth-form-panel">
      <p className="eyebrow">{screen === "signup" ? "Criar conta" : "Acesso Lume"}</p>
      <h1>{title}</h1>
      <p className="auth-intro">
        {screen === "signup"
          ? "Comece num contexto no Lume e ative o segundo mais tarde na mesma conta."
          : screen === "recovery"
            ? "Indique o e-mail associado à conta."
            : screen === "reset"
              ? "Use uma combinação forte, com maiúscula e número."
              : "Use os dados da sua conta Lume."}
      </p>
      <form noValidate onSubmit={submit}>
        {screen === "signup" && <Field label="Nome" name="name" />}
        {screen !== "reset" && <Field label="E-mail" name="email" type="email" />}
        {screen !== "recovery" && (
          <Field label={screen === "reset" ? "Nova palavra-passe" : "Palavra-passe"} name="password" onChange={(event) => setPasswordValue(event.currentTarget.value)} type={showPassword ? "text" : "password"}>
            {passwordControl}
          </Field>
        )}
        {(screen === "signup" || screen === "reset") && (
          <ul aria-live="polite" className="auth-requirements">
            <li className={passwordValue.length >= 8 ? "met" : ""}><Check aria-hidden="true" size={13} /> Pelo menos 8 caracteres</li>
            <li className={/[A-Z]/.test(passwordValue) ? "met" : ""}><Check aria-hidden="true" size={13} /> Uma letra maiúscula</li>
            <li className={/\d/.test(passwordValue) ? "met" : ""}><Check aria-hidden="true" size={13} /> Um número</li>
          </ul>
        )}
        {(screen === "signup" || screen === "reset") && (
          <Field label="Confirmar palavra-passe" name="confirm" type={showPassword ? "text" : "password"}>
            {passwordControl}
          </Field>
        )}
        {screen === "signup" && (
          <fieldset className="auth-intent">
            <legend>Como quer começar?<b aria-hidden="true"> *</b></legend>
            <p id="initial-capability-help">Pode ativar a segunda capacidade mais tarde, sem criar uma nova conta.</p>
            <label>
              <input aria-describedby="initial-capability-help" name="initialCapability" required type="radio" value="client" />
              <span><strong>Quero contratar serviços</strong><small>Publique solicitações e encontre prestadores.</small></span>
            </label>
            <label>
              <input aria-describedby="initial-capability-help" name="initialCapability" required type="radio" value="provider" />
              <span><strong>Quero oferecer serviços</strong><small>Prepare ofertas e receba propostas.</small></span>
            </label>
          </fieldset>
        )}
        {screen === "login" && (
          <div className="auth-options">
            <label className="auth-check"><input name="remember" type="checkbox" /> <span>Manter sessão neste dispositivo</span></label>
            <Link href="/recuperar-senha">Esqueceu-se da palavra-passe?</Link>
          </div>
        )}
        {error && <p className="auth-error" role="alert">{error}</p>}
        {notice && <p className="auth-notice" role="status">{notice}</p>}
        <button className="button button-primary button-wide" disabled={submitting} type="submit">
          {submitting && <LoaderCircle className="auth-spinner" aria-hidden="true" size={16} />}
          {screen === "login" ? "Entrar" : screen === "signup" ? "Criar conta" : screen === "recovery" ? "Enviar instruções" : "Redefinir palavra-passe"}
        </button>
      </form>
      {screen === "login" && <p className="auth-switch">Ainda não tem conta? <Link href="/criar-conta">Criar conta</Link></p>}
      {screen === "signup" && <p className="auth-switch">Já tem conta? <Link href="/entrar">Entrar</Link></p>}
      {(screen === "recovery" || screen === "reset") && <p className="auth-switch">Lembrou-se dos dados? <Link href="/entrar">Voltar a entrar</Link></p>}
    </section>
  );
}
