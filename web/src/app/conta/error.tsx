"use client";

import { Button } from "@/components/ui/primitives";

export default function AccountError({ reset }: { reset: () => void }) {
  return <main className="account-page" id="main"><div className="shell account-state account-state-error" role="alert"><h1>Não foi possível abrir a conta.</h1><Button onClick={reset}>Tentar novamente</Button></div></main>;
}
