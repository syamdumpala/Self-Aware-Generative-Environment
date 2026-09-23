# SAGE research foundation

## 1. Why this problem matters

Personal computers already contain rich context, but that context is fragmented across windows, files, sensors, notifications, and application state. Most AI experiences wait for a user-authored request and then optimize the answer. The expensive step is often earlier: reconstructing what the user is doing, why it matters, and what should happen next.

SAGE targets this gap with a context layer that turns short-lived local signals into an explicit, inspectable workflow state. Its output is not a generated conversation. It is a ranked next-step hypothesis with evidence, confidence, expiry, and a user approval boundary.

The practical value is highest in work with continuity costs: research, coding, analysis, design reviews, field work, and study. In these settings, the computer can reduce the cost of resuming work without taking ownership of the work.

## 2. Limitations of current systems

- **Prompt dependence:** chat interfaces require the user to translate a situation into a request.
- **Weak temporal memory:** assistants often see a turn or a document, not the active episode that led to it.
- **Action ambiguity:** a plausible answer does not necessarily identify the next useful operation in a desktop workflow.
- **Privacy friction:** sending raw screen, audio, or camera context to a server is difficult to justify for ambient assistance.
- **Latency and energy:** always-on cloud inference is a poor fit for low-latency, battery-sensitive sensing.
- **Trust gap:** opaque proactive behavior feels like surveillance when the contributing evidence is hidden.

## 3. Research areas SAGE combines

1. **Context-aware computing:** infer activity and situation from multimodal sensor streams.
2. **Personal AI and episodic memory:** represent events as time-bounded episodes instead of permanent transcripts.
3. **Multimodal representation learning:** align screen, speech, visual, and application-state embeddings.
4. **Small language models:** use constrained local reasoning for classification, extraction, and ranking.
5. **Human-computer interaction:** make initiative legible, reversible, and proportional to confidence.
6. **Edge intelligence:** co-design sensing, inference, memory, and power budgets around the NPU.
7. **Uncertainty calibration:** abstain when signals conflict or the expected value of intervention is low.

## 4. Existing technology and the open gap

Operating systems and major vendors are moving toward local semantic indexing, on-device copilots, activity history, and multimodal assistants. These products validate the direction, but SAGE narrows the product question to a harder and more useful primitive: **what is the next bounded workflow action, and can the computer explain why it believes that?**

SAGE is differentiated by four design choices:

- a compact context graph instead of an open-ended chat transcript;
- a prediction horizon with explicit confidence and expiry;
- evidence cards that expose the local signals behind a suggestion;
- policy-gated staging, where the system prepares work but does not silently execute consequential actions.

The result is an interaction model between automation and assistance: less passive than a dashboard, less invasive than an autonomous agent.

## 5. Product vision

> **SAGE is the private context layer that helps a Snapdragon-powered PC understand the work already in motion, predict the next useful step, and stage it for approval before the user has to ask.**

### Primary users

- Researchers resuming multi-day experiments
- Developers moving between code, logs, and issue trackers
- Analysts repeating evidence-heavy workflows
- Students returning to a study episode
- Knowledge workers who lose time reconstructing unfinished work

### Success measures

- Resume latency: time from device wake to a useful staged workspace
- Suggestion precision: accepted suggestions / shown suggestions
- Interruption cost: dismissed suggestions per active hour
- Locality: fraction of raw context processed and retained on-device
- Energy cost: NPU/CPU joules per accepted suggestion
- Trust: users can identify the evidence and clear the episode

## 6. Reactive AI versus context-aware AI

| Reactive AI | SAGE context layer |
|---|---|
| Waits for a prompt | Watches for a meaningful transition locally |
| Optimizes response quality | Optimizes next-step relevance and timing |
| Primarily linguistic context | Multimodal, temporal, and application context |
| Long conversation or cloud history | Short-lived, inspectable episodic state |
| Returns an answer | Stages an approved workflow action |
| Trust comes from refusal or policy | Trust comes from evidence, controls, and calibrated abstention |

SAGE should not become an always-on narrator. The correct behavior is often to do nothing. The intent engine therefore includes a no-op class, cooldowns, sensor consent, and an intervention utility threshold.
