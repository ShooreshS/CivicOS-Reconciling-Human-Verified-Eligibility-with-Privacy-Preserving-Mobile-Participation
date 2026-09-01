# Measurement methods

## Mobile proof measurements

The build-89212 benchmark uses a fixed synthetic witness for the packaged depth-32 vote circuit. It records artifact loading, witness construction, proof generation, total time, proof shape and hash, and in-process sampled memory. The primary summary includes the 50 measured-warm observations. One first-process diagnostic and ten warmups are included only in the independent 61-proof verification count.

Nearest-rank P95 and sample standard deviation are used. A first-process run is not described as a reboot-separated cold trial.

## Application payload bytes

The instrumented mobile vote path serializes the exact application JSON before `fetch`. It records UTF-8 bytes for the complete request, proof envelope, proof object, public inputs, encrypted-vote envelope, and receipt commitment. After parsing the response, it records the compact response JSON byte count and HTTP status. It stores counts only, not request or response bodies.

The retained prospective run provides one complete observation:

| Component | UTF-8 bytes |
|---|---:|
| Complete request | 4,195 |
| Complete response | 560 |
| Proof envelope | 2,319 |
| Proof object | 708 |
| Public-input envelope | 1,133 |
| Encrypted-vote envelope | 1,272 |
| Receipt commitment | 66 |

One observation establishes the size of that accepted exchange. It does not estimate a distribution. A 30-observation cohort is needed only if the article reports variability across different accepted payloads.

To collect 30 observations, perform 30 distinct accepted submissions using unique eligible poll/credential scopes. Export the privacy-safe mobile sessions and run the backend summarizer over every session. Repeated submission of the same credential to the same poll is invalid because the poll nullifier must be unique.

## HTTP and TLS wire bytes

Application counts do not include HTTP headers, TLS records, retransmissions, or connection setup. Those values must be collected outside the app and backend:

1. Run a controlled HTTPS inspection proxy such as mitmproxy, Proxyman, or Charles on a test workstation.
2. Configure the test phone's Wi-Fi proxy to that workstation and trust only the temporary test certificate.
3. Perform authorized submissions against the isolated test backend.
4. Export sanitized HTTP-flow statistics and a packet capture for TLS-record and retransmission analysis.
5. Delete the temporary certificate authority private key after collection.

Raw captures, authorization headers, cookies, certificate keys, and bodies remain private. Only aggregate byte counts, tool versions, capture hashes, and redaction results belong in the public package.

Railway application logs do not by themselves provide complete device-to-service TLS and retransmission measurements. A controlled endpoint proxy or network capture is required for those values.

## PostgreSQL row and relation bytes

PostgreSQL supplies row and relation sizes. The included script `scripts/measure-postgres-storage.sql` runs `VACUUM (ANALYZE)` and reports:

- `pg_column_size` minimum, mean, and maximum row bytes;
- heap bytes;
- index bytes;
- auxiliary/TOAST bytes;
- total relation bytes;
- PostgreSQL version, page size, relation settings, and index definitions.

Run it against a dedicated database or disposable branch:

```sh
psql "$DATABASE_URL" -f scripts/measure-postgres-storage.sql \
  > e4-postgres-static-size.txt
```

The four-poll database is sufficient for an observed-row-size sample, but it is too small for stable heap/index overhead per row. The proposed 1,000, 100,000, and 1,000,000-row fixtures are scale-characterization datasets and belong to a dedicated database. They are not required to establish that the current implementation works.

## Interpretation for the feasibility article

The current 4,195-byte request and 560-byte response may be reported as one measured application exchange. Wire-level and large-dataset PostgreSQL measurements should remain named future work unless the article makes network-cost or storage-capacity claims. They should not block the scoped mobile and end-to-end feasibility result.
