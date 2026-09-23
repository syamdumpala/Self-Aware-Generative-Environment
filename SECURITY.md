# SAGE security baseline

This release candidate is intentionally local-first and dependency-free. It is suitable for a demo or local evaluation, not a claim of completed enterprise certification.

## Implemented

- Content Security Policy blocks network connections, remote scripts, plugins, and form submissions.
- The runtime removes external font/network dependencies.
- `server.py` serves only the three release assets and rejects repository browsing, traversal attempts, and unsupported methods.
- Security headers include `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, and `Cross-Origin-Opener-Policy`.
- Sensor consent is explicit, independently configurable, and persisted only in browser local storage.
- The interface communicates that raw sensor data remains local and exposes clear-thread controls.

## Production hardening before deployment

1. Run behind a production Windows service or reverse proxy with TLS and a fixed allowlist of origins.
2. Replace local storage consent with OS-protected policy storage bound to the user profile.
3. Add signed release artifacts, dependency/SBOM scanning, secret scanning, and reproducible builds in CI.
4. Isolate capture adapters from the UI process and apply least-privilege Windows capabilities.
5. Encrypt episode metadata at rest, enforce TTL deletion, and audit deletion failures.
6. Add redaction tests for password fields, private browsing, meetings, and sensitive applications.
7. Threat-model prompt injection through screen text and application content before enabling any action broker.
8. Require explicit approval and an audit event for every action that changes user files, sends messages, or opens external communication.
9. Never upload raw sensor data for telemetry; use aggregate opt-in metrics with differential privacy where appropriate.
10. Benchmark NPU model artifacts and power behavior on the exact HP Snapdragon SKU used for the submission.

## Threat model

| Threat | Control |
|---|---|
| Malicious page or document injects instructions | Treat screen text as untrusted evidence; never execute it directly |
| Local process reads episode data | OS ACLs, encrypted storage, short TTLs, least privilege |
| Sensor over-collection | Independent consent, redaction boundary, volatile buffers |
| UI clickjacking | CSP plus `X-Frame-Options: DENY` |
| Stale or wrong intent | No-op class, confidence threshold, cooldown, approval |
| Supply-chain compromise | Pin dependencies/artifacts, scan SBOM, sign releases |
