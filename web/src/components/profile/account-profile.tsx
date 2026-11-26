"use client";

import { Check, LoaderCircle, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge, Button, Input, Textarea } from "@/components/ui/primitives";
import type { LumeCapability } from "@/lib/profiles/capabilities";

export type AccountData = {
  profile: {
    displayName: string;
    bio: string | null;
    capabilities: LumeCapability[];
  };
  account: {
    email: string;
    emailVerified: boolean;
  };
};

const capabilityLabels: Record<LumeCapability, string> = {
  client: "Cliente",
  provider: "Prestador",
};

export function accountErrorMessage(status: number): string {
  if (status === 401) return "Sua sessão expirou. Entre novamente para continuar.";
  if (status === 400) return "Revise os campos destacados e tente novamente.";
  return "Não foi possível concluir a operação. Tente novamente.";
}

export function withCapabilities(data: AccountData, capabilities: LumeCapability[]): AccountData {
  return { ...data, profile: { ...data.profile, capabilities } };
}

export function AccountProfile() {
  const [data, setData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activating, setActivating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function loadProfile(signal?: AbortSignal) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/profile", { cache: "no-store", signal });
      if (!response.ok) throw new Error(accountErrorMessage(response.status));
      setData(await response.json() as AccountData);
    } catch (loadError) {
      if (loadError instanceof DOMException && loadError.name === "AbortError") return;
      setError(loadError instanceof Error ? loadError.message : accountErrorMessage(500));
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/profile", { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(accountErrorMessage(response.status));
        return await response.json() as AccountData;
      })
      .then(setData)
      .catch((loadError: unknown) => {
        if (loadError instanceof DOMException && loadError.name === "AbortError") return;
        setError(loadError instanceof Error ? loadError.message : accountErrorMessage(500));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  async function saveProfile(formData: FormData) {
    if (!data || saving) return;
    setSaving(true);
    setError(null);
    setNotice(null);
    const displayName = String(formData.get("displayName") ?? "");
    const bio = String(formData.get("bio") ?? "");
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName, bio }),
      });
      if (!response.ok) throw new Error(accountErrorMessage(response.status));
      const payload = await response.json() as Pick<AccountData, "profile">;
      setData({ ...data, profile: payload.profile });
      setNotice("Perfil atualizado.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : accountErrorMessage(500));
    } finally {
      setSaving(false);
    }
  }

  async function activate(capability: LumeCapability) {
    if (!data || activating) return;
    setActivating(true);
    setError(null);
    setNotice(null);
    try {
      const response = await fetch("/api/capabilities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ capability }),
      });
      if (!response.ok) throw new Error(accountErrorMessage(response.status));
      const payload = await response.json() as { capabilities: LumeCapability[] };
      setData(withCapabilities(data, payload.capabilities));
      setNotice(`Capacidade de ${capabilityLabels[capability].toLowerCase()} ativada.`);
    } catch (activationError) {
      setError(activationError instanceof Error ? activationError.message : accountErrorMessage(500));
    } finally {
      setActivating(false);
    }
  }

  if (loading) {
    return <div aria-busy="true" aria-live="polite" className="account-state"><LoaderCircle aria-hidden="true" className="auth-spinner" /> Carregando sua conta...</div>;
  }

  if (!data) {
    return <div className="account-state account-state-error" role="alert"><p>{error}</p><Button onClick={() => void loadProfile()} variant="secondary">Tentar novamente</Button></div>;
  }

  const missingCapability: LumeCapability | null = data.profile.capabilities.includes("client")
    ? data.profile.capabilities.includes("provider") ? null : "provider"
    : "client";

  return (
    <div className="account-grid">
      <section className="account-panel account-profile-panel">
        <div className="account-panel-heading"><span><UserRound aria-hidden="true" /></span><div><p className="eyebrow">Apresentação</p><h2>Seu perfil Lume</h2></div></div>
        <form action={saveProfile} className="account-form">
          <Input defaultValue={data.profile.displayName} label="Nome de apresentação" maxLength={120} name="displayName" required />
          <Textarea defaultValue={data.profile.bio ?? ""} hint="Opcional. Até 1000 caracteres." label="Apresentação pessoal" maxLength={1000} name="bio" rows={7} />
          <Button disabled={saving} type="submit">{saving ? "Salvando..." : "Salvar alterações"}</Button>
        </form>
      </section>

      <aside className="account-side">
        <section className="account-panel">
          <p className="eyebrow">Conta</p><h2>Informação básica</h2>
          <dl className="account-facts"><div><dt>E-mail</dt><dd>{data.account.email}</dd></div><div><dt>Estado</dt><dd>{data.account.emailVerified ? "E-mail verificado" : "Verificação pendente"}</dd></div></dl>
          <p className="account-help">O e-mail é gerenciado pela autenticação e não faz parte do perfil público.</p>
        </section>
        <section className="account-panel account-capabilities">
          <p className="eyebrow">Capacidades</p><h2>Como você usa o Lume</h2>
          <div className="capability-list">{data.profile.capabilities.map((capability) => <Badge key={capability} tone="success"><Check aria-hidden="true" size={13} /> {capabilityLabels[capability]}</Badge>)}</div>
          {missingCapability ? <><p>Você também pode atuar como {capabilityLabels[missingCapability].toLowerCase()} nesta mesma conta.</p><Button disabled={activating} onClick={() => void activate(missingCapability)} type="button" variant="secondary">{activating ? "Ativando..." : `Ativar ${capabilityLabels[missingCapability].toLowerCase()}`}</Button></> : <p>As duas capacidades comerciais estão ativas.</p>}
          <small>Por enquanto, a ativação é permanente. Nenhuma permissão administrativa é concedida.</small>
        </section>
      </aside>
      <div aria-live="polite" className="account-feedback">{error && <p className="account-error" role="alert">{error}</p>}{notice && <p className="account-success">{notice}</p>}</div>
    </div>
  );
}
