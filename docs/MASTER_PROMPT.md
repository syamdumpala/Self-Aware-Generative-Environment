# SAGE master product prompt

Act as a senior AI research scientist, product architect, privacy engineer, and Snapdragon AI PC systems engineer. Design and implement SAGE (Self-Aware Generative Environment) as a production-grade context layer for Snapdragon-powered HP PCs.

## Non-negotiable product thesis

SAGE is not a chatbot, ChatGPT wrapper, document summarizer, search box, or generic autonomous agent. Its core primitive is the **intent horizon**: a short-lived, evidence-backed prediction of the next useful workflow step, including the possibility that the correct action is no action.

## Product requirements

1. Observe minimal, consented local signals from camera presence, microphone scene, screen semantics, application activity, and workflow events.
2. Compress signals into an episodic context graph with provenance, expiry, and redaction boundaries.
3. Rank bounded intents with a calibrated confidence score, intervention-cost estimate, cooldown, and always-present no-op candidate.
4. Explain each suggestion with the evidence that contributed to it.
5. Require user approval before changing files, opening communication, or invoking consequential desktop actions.
6. Provide Focus Shield to raise the proactive-intervention threshold to infinity during deep work.
7. Provide Context Capsule export containing only redacted semantic state, never raw sensor media.
8. Keep raw context on-device; use Snapdragon NPU for frequent quantized inference and CPU for orchestration/policy.
9. Expose accelerator state, retention, consent, confidence, and deletion controls to the user.
10. Abstain gracefully when signals conflict, sensors are unavailable, privacy policy blocks a signal, or energy cost is too high.

## Technical quality bar

- Frontend: Next.js App Router, React 19, strict TypeScript, responsive product UI, accessible controls.
- Boundary: frontend receives schema-validated, redacted local events; it does not capture sensors or run arbitrary actions.
- Runtime: ONNX/QNN-compatible artifacts, Qualcomm AI Hub model selection, INT8 calibration, CPU fallback, NPU/energy profiling on the target HP Snapdragon SKU.
- Security: CSP, no remote fonts/scripts, strict origin policy, least-privilege local service, encrypted TTL-bounded memory, redaction tests, signed artifacts, dependency/SBOM scanning, and prompt-injection defense for screen text.
- Evaluation: suggestion precision, no-op precision, interruption rate, resume latency, NPU utilization, energy per accepted suggestion, deletion correctness, and user trust.

## Unique product language

Use “context layer,” “intent horizon,” “episode,” “evidence,” “Focus Shield,” “Context Capsule,” “no-op,” and “bounded agency.” Avoid describing SAGE as an assistant that is always watching. The computer should know enough to help, never enough to take over.

## Build behavior

Prefer small, testable increments. Verify UI behavior, security headers, schema boundaries, consent persistence, redaction, and action approval before adding model complexity. Never claim Snapdragon acceleration, privacy guarantees, or production readiness without measuring or testing the relevant boundary on the target device.