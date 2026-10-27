import { describe, expect, test } from "bun:test";
import {
  type SlatePayload,
  createIdentity,
  identityToIssuer,
  signSlate,
} from "../.openslate/packages/core/src/index";
import { keptToken } from "./keep-unchanged";

const signer = createIdentity({ name: "Researcher" });
const other = createIdentity({ name: "Someone else" });

function slate(
  issuedAt: string,
  stance: "endorse" | "oppose" = "endorse",
  identity = signer,
): string {
  const payload: SlatePayload = {
    v: 1,
    issuer: identityToIssuer(identity),
    issued_at: issuedAt,
    positions: [
      {
        subject: {
          title: "Prop 1",
          kind: "measure",
          jurisdiction: "us/ca",
          election: "2026-11-03",
        },
        stance,
      },
    ],
  };
  return signSlate(payload, identity.keyPair.secretKey);
}

describe("keptToken", () => {
  const published = slate("2026-10-20T00:00:00Z");

  test("keeps the published token when only issued_at moved", () => {
    expect(keptToken(slate("2026-10-26T00:00:00Z"), published)).toBe(published);
  });

  test("publishes the fresh token when the content changed", () => {
    const fresh = slate("2026-10-26T00:00:00Z", "oppose");
    expect(keptToken(fresh, published)).toBe(fresh);
  });

  test("publishes the fresh token for a new slate", () => {
    const fresh = slate("2026-10-26T00:00:00Z");
    expect(keptToken(fresh, undefined)).toBe(fresh);
  });

  test("never keeps another signer's token", () => {
    const fresh = slate("2026-10-26T00:00:00Z");
    expect(keptToken(fresh, slate("2026-10-20T00:00:00Z", "endorse", other))).toBe(fresh);
  });

  test("never keeps a token that doesn't verify", () => {
    const fresh = slate("2026-10-26T00:00:00Z");
    const broken = `${published.slice(0, -4)}AAAA`;
    expect(keptToken(fresh, broken)).toBe(fresh);
  });
});
