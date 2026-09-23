# SAGE / competition submission content

## Project title

**SAGE: Self-Aware Generative Environment**

## Abstract

SAGE is a privacy-first context layer for Snapdragon-powered HP PCs. Instead of waiting for a typed request, SAGE observes short-lived local signals from the active desktop workflow, compresses them into an episodic context graph, and predicts the next useful bounded action. A calibrated intent engine exposes the evidence behind each suggestion, respects a no-op outcome, and stages approved work without silently taking over. Quantized vision, audio, embedding, and small-language models are mapped to the Snapdragon NPU, while the CPU manages policy and encrypted local memory. SAGE demonstrates a new AI PC interaction model: context-aware, low-power, explainable, and human-controlled.

## Problem statement

Today, a user returning to complex work must manually reconstruct the state of the project. Existing assistants can answer questions after a prompt, but they rarely understand the temporal and multimodal context of a desktop episode. Cloud-first ambient intelligence introduces latency, power cost, and privacy concerns. The opportunity is to make the PC context-aware without making it intrusive.

## Solution

SAGE builds an ephemeral local representation of the user's active episode. It combines application and workflow events with privacy-filtered screen, audio-scene, and presence signals. A context graph links the active project, recent artifacts, unresolved markers, and current task. An intent engine ranks a small taxonomy of next steps and either abstains or presents an evidence card. The user can stage, dismiss, or clear the proposed action.

## Technical implementation

The prototype is a deterministic context cockpit that demonstrates the end-to-end interaction. The production plan uses Windows capture adapters, an encrypted TTL-bounded SQLite event store, compact local embeddings, ONNX Runtime with a QNN execution path, and Qualcomm AI Hub artifacts selected for the target Snapdragon SKU. INT8 quantization, static shapes, operator validation, and physical-device profiling are part of deployment acceptance.

The main loop is:

`capture -> filter -> embed -> link episode -> rank intent -> explain evidence -> approve -> stage`

The NPU handles recurring model inference. CPU resources manage orchestration, policy, memory, and UI. The GPU is reserved for optional burst workloads. No raw camera, microphone, or screen data needs to leave the device.

## Innovation

SAGE is not a chatbot, summarizer, search box, or generic agent wrapper. Its product primitive is the **intent horizon**: a transparent prediction of the next useful workflow step, constrained by time, evidence, uncertainty, consent, and action policy. It changes the PC from a command executor into a context-aware environment while preserving user agency.

## Impact

SAGE can reduce resume friction for researchers, developers, analysts, students, and other users whose work spans multiple applications and days. It also provides a practical pattern for privacy-preserving personal AI: keep raw context local, retain only what is useful, show why a prediction was made, and make intervention reversible.

## Future roadmap

- Expand from fixed intents to personalized, calibrated workflow policies
- Add device-aware energy scheduling and thermal budgets
- Support cross-device handoff using encrypted semantic state, not raw media
- Learn from explicit accept/dismiss feedback with on-device personalization
- Validate accessibility benefits for users with attention, memory, or motor constraints
- Publish reproducible latency, energy, precision, and retention benchmarks

## Quality gate

### Technical implementation

Buildable as a staged Windows companion: adapters and policy first, model richness second. The prototype avoids pretending that a web page is a device deployment.

### Innovation

Strongest when framed as a new interaction primitive with evidence and bounded action, not as a claim that SAGE invented multimodal AI.

### Snapdragon optimization

Explicit NPU placement, QNN/AI Engine deployment, quantization, and target-device profiling are required for the final claim. CPU fallback protects the demo but does not replace device evidence.

### Impact

The value proposition is measurable: resume latency, accepted-suggestion precision, interruption rate, energy per suggestion, and user trust.

### Presentation

Lead with a single research continuation scenario. Show context, prediction, evidence, approval, and privacy controls in sequence. End with the NPU/power argument and the design principle: the computer should know enough to help, never enough to take over.
