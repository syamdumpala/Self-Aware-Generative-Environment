# SAGE

## Self-Aware Generative Environment

SAGE is a privacy-first context layer for Snapdragon-powered HP PCs. It observes short-lived local signals, builds a compact working-state representation, and predicts the next useful step in an active workflow without requiring a prompt.

This repository contains a competition-ready product prototype and the technical narrative around it.

## Prototype

The production frontend is now the React/Next.js App Router application in `frontend/`. It implements the on-device pipeline surface:

`signals -> local context graph -> intent horizon -> user-approved action`

Run it with `npm install` and `npm run dev` from `frontend/`, then open `http://localhost:3000`. No network request or external model is used by the local UI surface.

The original root `index.html` remains as a zero-dependency recovery surface for offline judging. It is not the primary product frontend.

## Advanced features

SAGE is intentionally not another chat window. Its differentiator is a controllable **intent horizon**: a short-lived prediction of what the user may do next, with evidence, confidence, and a no-intervention path.

- **Focus Shield:** pause proactive suggestions while preserving local sensing. This is a user-owned attention boundary, not a hidden mute state.
- **Context Capsule:** export a compact `sage-context-capsule/v1` JSON episode on demand. The capsule contains signals, intent, confidence, and retention metadata, never raw camera, microphone, or screen data.
- **Evidence-weighted intent:** the interface shows why a prediction exists instead of presenting an unexplained answer.
- **Calibrated abstention:** the production ranker always includes `no-op`, cooldown, confidence separation, and intervention-cost checks. SAGE can decide that doing nothing is the most intelligent action.
- **Sensor-level consent:** camera, microphone, screen understanding, and episode retention are independently controlled and stored locally.
- **Bounded agency:** SAGE stages work for approval; it never silently opens files, sends communication, or changes user data.
- **Graceful accelerator fallback:** model execution can move between Snapdragon NPU, CPU, and optional GPU bursts while exposing runtime state.
- **Episode memory, not surveillance:** the context graph is time-bounded, inspectable, clearable, and designed around the current work episode rather than a permanent personal profile.

### Why SAGE is unique

Most AI products optimize for the quality of a generated response after a prompt. SAGE optimizes for the quality and timing of a **bounded intervention before a prompt**, while making uncertainty and evidence visible. The product primitive is not chat, search, summarization, or autonomous action. It is a private, explainable bridge from context to the next approved workflow step.

The strongest differentiator is the combination of initiative and restraint:

`multimodal context -> episodic graph -> calibrated intent / no-op -> evidence -> user approval`

This gives SAGE a defensible position in the AI PC category: an operating layer for continuity, not an assistant that competes for attention.

## Repository map

- `frontend/app`: production React/Next.js context cockpit
- `frontend/next.config.ts`: security headers and runtime configuration
- `frontend/package.json`: pinned frontend dependencies and scripts
- `index.html`, `styles.css`, `app.js`: zero-dependency recovery surface
- `docs/RESEARCH.md`: research foundation, product thesis, and innovation analysis
- `docs/ARCHITECTURE.md`: system architecture, data flow, Snapdragon execution plan, and model strategy
- `docs/DEMO.md`: three-minute live demo and judge Q&A
- `docs/SUBMISSION.md`: competition-ready abstract, problem, solution, impact, and roadmap

## Build direction

The browser prototype is intentionally deterministic. The production path is a Windows companion service with local capture adapters, ONNX Runtime/QNN execution, Qualcomm AI Hub model artifacts, and a policy-gated action broker. See the architecture document for the staged implementation plan.

## Design principles

1. Local by default: raw camera, microphone, and screen frames do not leave the device.
2. Evidence before action: every prediction exposes the signals that contributed to it.
3. Bounded agency: SAGE suggests and stages actions; the user approves consequential actions.
4. Friction reduction: the system helps continue work, rather than starting another conversation.
5. Graceful degradation: if a sensor or accelerator is unavailable, the product remains useful.

## Production frontend contract

The Next.js surface owns presentation and user policy, not sensor capture. A production Windows companion service must provide signed local events through a same-origin boundary, validate every event against a schema, and keep raw camera, microphone, and screen data outside the browser process. The frontend accepts only redacted evidence, confidence, provenance, and bounded action descriptors.

This separation makes SAGE production-shaped: the browser cannot silently access sensors or execute arbitrary desktop actions, while the local service can be independently permissioned, tested, and accelerated on Snapdragon.

## Run and verify

```powershell
python server.py
```

Open `http://127.0.0.1:8765/index.html`, then run the release tests with:

```powershell
pytest
```
