# Public-release checklist

Complete this review before making the repository public.

- [ ] Confirm the configured GitHub remote is the intended public repository.
- [ ] Run `npm test` with Node.js 20 or later.
- [ ] Confirm `git status --short` lists only intended files.
- [ ] Confirm no `.env`, token, credential, key, private URL, or database connection file is staged.
- [ ] Confirm no raw identity, biometric, document, NFC, location, account, ballot, or session data is staged.
- [ ] Confirm no raw mobile session, server span, database export, packet capture, or TLS key is staged.
- [ ] Confirm the devnet signatures resolve to the expected program and cluster.
- [ ] Confirm all source excerpts are limited to measurement behavior and contain no authentication or deployment secrets.
- [ ] Add a repository license only after the owner selects one.
- [ ] Create an immutable release tag matching the submitted manuscript.
- [ ] Add an archive DOI or permanent release URL to the article if required.
