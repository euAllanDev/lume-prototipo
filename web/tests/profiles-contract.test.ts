import assert from "node:assert/strict";
import test from "node:test";

import { user } from "../src/lib/db/schema/auth";
import { lumeProfile, lumeProfileCapability } from "../src/lib/db/schema/profiles";
import { parseLumeCapability } from "../src/lib/profiles/capabilities";
import { toPublicClientProfile, toPublicProviderProfile } from "../src/lib/profiles/public-dto";

test("commercial capabilities are separate from identity and administration", () => {
  assert.equal("role" in user, false);
  assert.equal("admin" in user, false);
  assert.ok(lumeProfile.userId);
  assert.ok(lumeProfile.publicSlug);
  assert.ok(lumeProfileCapability.capability);
});

test("capability parser accepts only approved commercial values", () => {
  assert.equal(parseLumeCapability("client"), "client");
  assert.equal(parseLumeCapability("provider"), "provider");
  assert.equal(parseLumeCapability("admin"), null);
  assert.equal(parseLumeCapability(["client", "provider"]), null);
});

test("public profile DTOs expose only contextual allowlists", () => {
  const privateSource = {
    displayName: "Pessoa Lume",
    photoUrl: null,
    bio: "Apresentação",
    city: "Porto",
    region: "Norte",
    email: "private@lume.test",
    phone: "+351000000000",
    fullAddress: "Rua privada",
    latitude: 41.1,
    longitude: -8.6,
    password: "never",
    publicSlug: "pessoa-private-id",
  };
  assert.deepEqual(toPublicClientProfile(privateSource), {
    displayName: "Pessoa Lume",
    photoUrl: null,
    bio: "Apresentação",
  });
  assert.deepEqual(toPublicProviderProfile(privateSource), {
    displayName: "Pessoa Lume",
    photoUrl: null,
    bio: "Apresentação",
    city: "Porto",
    region: "Norte",
  });
  assert.equal("publicSlug" in toPublicProviderProfile(privateSource), false);
});
