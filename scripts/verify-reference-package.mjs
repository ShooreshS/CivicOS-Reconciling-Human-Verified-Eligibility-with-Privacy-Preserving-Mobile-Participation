#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), "utf8"));
const sha256 = (value) => createHash("sha256").update(value, "utf8").digest("hex");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const evidence = readJson("evidence/evidence-summary.json");
const devnet = readJson("evidence/devnet-transactions.json");

assert(evidence.schemaVersion === "civicos-public-article-evidence-v1", "Unexpected evidence schema.");
assert(evidence.primaryMobileCohort.completed === 50, "Primary mobile cohort must contain 50 completed trials.");
assert(evidence.primaryMobileCohort.attempted === 50, "Primary mobile attempt count mismatch.");
assert(evidence.primaryMobileCohort.sessionProofVerification.accepted === 61, "Offline proof verification count mismatch.");
assert(evidence.primaryMobileCohort.sessionProofVerification.examined === 61, "Offline proof examination count mismatch.");
assert(evidence.historicalFourPollCohort.qualifiedPolls === 4, "Four-poll qualification count mismatch.");
assert(evidence.historicalFourPollCohort.qualificationGatePassed === true, "Four-poll gate must pass.");
assert(evidence.historicalFourPollCohort.rootPublications === 4, "Root publication count mismatch.");
assert(evidence.historicalFourPollCohort.finalResultPublications === 4, "Final publication count mismatch.");
assert(evidence.prospectiveFunctionalRun.functionalGatePassed === true, "Prospective functional gate must pass.");
assert(evidence.prospectiveFunctionalRun.requestBodyUtf8Bytes === 4195, "Request byte count mismatch.");
assert(evidence.prospectiveFunctionalRun.responseBodyUtf8Bytes === 560, "Response byte count mismatch.");

assert(devnet.cluster === "devnet", "Transaction evidence must target devnet.");
assert(devnet.programId === evidence.historicalFourPollCohort.solanaTransactions.programId, "Program id mismatch.");
assert(devnet.transactions.length === 8, "Expected eight historical publication transactions.");
for (const transaction of devnet.transactions) {
  assert(transaction.confirmationStatus === "finalized", "Every transaction must be finalized.");
  assert(transaction.succeeded === true, "Every transaction must succeed.");
  assert(transaction.programReferenced === true, "Every transaction must reference the program.");
  assert(transaction.programInvoked === true, "Every transaction must invoke the program.");
  assert(sha256(transaction.signature) === transaction.signatureSha256, "Transaction signature hash mismatch.");
}

const forbiddenKeys = new Set([
  "user_id", "userid", "vieweruserid", "verifiedidentityid", "authorization",
  "token", "cookie", "ipaddress", "documentnumber", "mrz", "dateofbirth",
  "biometric", "credentialsecret", "identitysecret", "privatekey", "seedphrase",
  "databaseurl", "servicerolekey", "nullifier", "ciphertext", "receiptcommitment",
]);
const scan = (value, path = "$") => {
  if (Array.isArray(value)) return value.forEach((entry, index) => scan(entry, `${path}[${index}]`));
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    const normalized = key.replace(/[^a-z0-9]/gi, "").toLowerCase();
    assert(!forbiddenKeys.has(normalized), `Forbidden public-data key at ${path}.${key}.`);
    scan(child, `${path}.${key}`);
  }
};
scan(evidence);
scan(devnet);

console.log("Reference package verification passed: 50 mobile trials, 61 verified proofs, 4/4 polls, and 8/8 finalized devnet transactions.");

