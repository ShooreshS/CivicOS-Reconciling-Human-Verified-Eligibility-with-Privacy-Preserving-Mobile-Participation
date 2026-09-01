# Claim-to-evidence map

| Article claim | Public package field | Evidence class | Limit |
|---|---|---|---|
| Fifty measured-warm iPhone trials completed | `primaryMobileCohort.completed` | measured | one iPhone model |
| All 61 session proofs verified offline | `primaryMobileCohort.sessionProofVerification` | independently replayed | fixed synthetic witness |
| Proof generation ran on Samsung S7 edge | `legacyAndroidCohorts` | retained legacy measurement | small cohorts and missing OS metadata |
| Four registered polls contain verified votes and tallies | `historicalFourPollCohort` | read-only database census plus verifier | selected historical cohort |
| Four polls completed root and final publication | `historicalFourPollCohort` and `devnet-transactions.json` | database records plus devnet RPC checks | development network |
| One prospective path connected app, backend, database, receipt, and chain checks | `prospectiveFunctionalRun` | exact run-ID join plus contextual database-time join | one observation |
| Complete request and response measured 4,195 and 560 bytes | `prospectiveFunctionalRun` | application-boundary byte count | one observation; excludes wire framing |
| Backend cannot be described as an anonymous observer | manuscript architecture and privacy analysis | source/schema inspection | no runtime traffic audit yet |

The SHA-256 values bind the public summaries to retained private sources without publishing those sources. Possession of a hash does not independently reveal the private content.

