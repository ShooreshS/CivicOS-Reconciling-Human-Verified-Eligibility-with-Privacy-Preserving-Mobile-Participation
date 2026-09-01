# CivicOS article reference package

This directory is the public-facing evidence and reproducibility package for the article *CivicOS: Reconciling Human-Verified Eligibility with Privacy-Preserving Mobile Participation*.

The package is designed to become one GitHub repository and one article reference. It combines release identifiers, sanitized aggregate evidence, devnet transaction identifiers, measurement methods, and limited source excerpts. It does not contain the private mobile exports, backend span logs, database credentials, identity records, ballot contents, or cryptographic secrets.

## Article scope

The retained evidence supports these bounded statements:

- build 89212 completed 50 measured-warm proof trials on an iPhone 15 Pro;
- all 61 proofs from that session passed independent offline verification;
- earlier measurements show proof generation on a Samsung S7 edge;
- a refreshed four-poll database census found four verified encrypted votes, four verified tallies, four root publications, and four final-result publications;
- all eight associated Solana devnet transactions were finalized, successful, and invoked the configured CivicOS program;
- one prospective instrumented run connected a mobile acceptance to one backend span, two receipt-inclusion checks, a verified tally, and two finalized devnet publications;
- one complete application request/response observation measured 4,195 and 560 UTF-8 bytes respectively.

These observations do not establish production reliability, population-wide device performance, backend anonymity, biometric accuracy, coercion resistance, or production capacity.

## Contents

| Path | Purpose |
|---|---|
| `evidence/evidence-summary.json` | Sanitized numerical results and source hashes used by the article |
| `evidence/devnet-transactions.json` | Public devnet transaction identifiers and verification results |
| `methods/measurement-methods.md` | Reproducible collection and interpretation rules |
| `methods/claim-evidence-map.md` | Map from article claims to package fields |
| `source-snippets/` | Narrow measurement-only excerpts with security notes |
| `scripts/verify-reference-package.mjs` | Local consistency checks with no network access |
| `CITATION.cff` | Repository citation metadata |
| `SECURITY.md` | Public-release exclusions and reporting guidance |

## Verify locally

Node.js 20 or later is recommended.

```sh
npm test
```

The verification command checks the registered observation counts, cohort gates, payload values, transaction hashes, and absence of forbidden private-data keys in the public JSON files.

## Private-to-public boundary

The following material must remain outside this repository:

- `.env` files, database URLs, service-role keys, API tokens, authorization headers, and session cookies;
- wallet seed phrases, signing keys, ceremony secrets, proving entropy, and TLS interception keys;
- raw identity, document, NFC, biometric, location, or account data;
- raw vote request bodies, ciphertexts, nullifiers, receipt commitments, and private database identifiers;
- raw mobile experiment sessions, backend span logs, packet captures, and database exports until a separate redaction review passes;
- infrastructure logs containing IP addresses, user agents, hostnames, or account identifiers.

Solana devnet transaction signatures and the devnet program identifier are included because they are public chain identifiers required for independent verification.

## Publish to the configured GitHub repository

This directory is configured with the following remote:

`https://github.com/ShooreshS/CivicOS-Reconciling-Human-Verified-Eligibility-with-Privacy-Preserving-Mobile-Participation`

Review `PUBLICATION_CHECKLIST.md`, then commit and push only after inspecting the staged files:

```sh
cd reference-repo
npm test
git status --short
git add .
git commit -m "Publish CivicOS article reference package"
git push origin main
```

Repository publication is a deliberate external action; inspect every staged file before pushing.

## Versioning and archival release

Create an immutable release tag for the submitted manuscript, for example `article-evidence-v1.0.0`. Archive that release with a DOI provider if the venue requires a persistent identifier. The article should cite the tagged release rather than an advancing default branch.
