import assert from "node:assert/strict";
import test from "node:test";

import { renderToStaticMarkup } from "react-dom/server";

import {
  AccountProfile,
  accountErrorMessage,
  type AccountData,
  withCapabilities,
} from "../src/components/profile/account-profile";

test("account interface exposes an accessible loading state", () => {
  const html = renderToStaticMarkup(<AccountProfile />);
  assert.match(html, /aria-busy="true"/);
  assert.match(html, /Carregando sua conta/);
});

test("capability response updates interface state without replacing account identity", () => {
  const account: AccountData = {
    profile: { displayName: "Pessoa Lume", bio: null, capabilities: ["client"] },
    account: { email: "private@lume.test", emailVerified: false },
  };
  const updated = withCapabilities(account, ["client", "provider"]);
  assert.deepEqual(updated.profile.capabilities, ["client", "provider"]);
  assert.equal(updated.account, account.account);
  assert.deepEqual(account.profile.capabilities, ["client"]);
});

test("account interface distinguishes expired sessions and recoverable errors", () => {
  assert.match(accountErrorMessage(401), /sessão expirou/);
  assert.match(accountErrorMessage(500), /Tente novamente/);
});
