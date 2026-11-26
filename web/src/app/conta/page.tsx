import { AccountProfile } from "@/components/profile/account-profile";
import { requireSession } from "@/lib/authorization";

export const instant = false;

export default async function AccountPage() {
  await requireSession("/conta");
  return (
    <main className="account-page" id="main">
      <header className="shell account-hero"><p className="eyebrow">Minha conta</p><h1>Uma identidade.<br /><em>Dois caminhos.</em></h1><p>Gerencie sua apresentação e suas capacidades comerciais sem duplicar perfil ou conta.</p></header>
      <div className="shell"><AccountProfile /></div>
    </main>
  );
}
