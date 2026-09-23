# SAGE

## Self-Aware Generative Environment

SAGE is a privacy-first context layer for Snapdragon-powered HP PCs. It observes short-lived local signals, builds a compact working-state representation, and predicts the next useful step in an active workflow without requiring a prompt.

This repository contains a competition-ready product prototype and the technical narrative around it.

## Prototype

Open `index.html` in a browser. The interface is a static demo shell that simulates the on-device pipeline:

`signals -> local context graph -> intent horizon -> user-approved action`

Use **Simulate next intent** to move the demo from passive sensing to a ranked, explainable suggestion. No network request or external model is used by the prototype.

## Repository map

- `index.html`, `styles.css`, `app.js`: interactive SAGE context cockpit
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
