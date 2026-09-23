# SAGE competition demo

## Three-minute live script

### 0:00-0:25 / establish the problem

Open with the PC waking into the SAGE context cockpit.

> "Most assistants wait for a prompt. But when I return to a research project, the real cost is reconstructing the thread: which file mattered, what I left unresolved, and what should happen next. SAGE is a local context layer for that moment."

Point to the private mode indicator and Snapdragon NPU status. State that the browser prototype is deterministic; the production architecture maps each signal and model to local execution.

### 0:25-1:05 / show sensing without surveillance

Call out the four signal cards: presence, audio scene, screen focus, and application activity.

> "SAGE does not need a transcript of my life. It needs small, short-lived signals: I am present, the workspace is quiet, this research window is active, and three related windows form one episode. Raw signals stay on the PC, and sensitive surfaces can be paused or redacted."

Scroll to the episodic thread. Explain TTL and the clear-thread control.

### 1:05-1:55 / reveal the intent horizon

Click **Simulate next intent**.

> "Now SAGE crosses an intent boundary. It predicts that the next useful step is to open the variance notebook beside the benchmark notes. The important part is not the sentence. The important part is the evidence: continuity, unresolved work, and the trace on screen."

Point to the confidence and evidence weights. Explain that the production ranker includes a no-op class and abstains when signals conflict.

### 1:55-2:30 / show bounded agency

Click **Stage workspace**.

> "SAGE stages the workspace, but it does not silently execute a consequential action. I can approve, dismiss, or clear the thread. This is the difference between an ambient operating layer and an autonomous agent that acts on assumptions."

Click **Dismiss suggestion** or **Clear thread** if time permits to make reversibility visible.

### 2:30-3:00 / Snapdragon close

> "Snapdragon matters because this loop must be available continuously without turning the battery into a server budget. The NPU handles frequent quantized vision, audio, embedding, and small-model inference. The CPU owns routing, policy, and encrypted local memory. The GPU is optional for burst analysis."
>
> "SAGE changes the computer from a place where I ask for help into an environment that understands the work already in motion, predicts one useful next step, and gives control back to me."

## Demo reliability checklist

- Preload a fixed fixture set; do not depend on network access during the pitch.
- Keep the deterministic browser prototype available as a visual fallback.
- Prepare a screen recording of the same flow on the Snapdragon device.
- Show a real NPU utilization/power capture only if measured on the target hardware.
- Avoid claiming that the prototype's browser JavaScript is accelerated by the NPU.
- Have a one-click reset for the intent card and memory thread.

## Judge Q&A

### Why does this require Snapdragon?

The product requires low-latency inference across multiple signals while the PC is on battery. Snapdragon's heterogeneous CPU/GPU/NPU design enables frequent quantized feature extraction and ranking locally, reducing network dependence, latency, and raw-data exposure. The claim is validated by device profiling, not by assuming every workload belongs on the NPU.

### What is the innovation?

The innovation is the interaction primitive: an evidence-backed, time-bounded intent horizon for desktop work. SAGE combines multimodal context, episodic memory, calibrated prediction, and policy-gated staging. It is not a chat wrapper and it is not an opaque autonomous agent.

### How is it different from Copilot or ChatGPT?

Those systems are optimized around a request and a generated response. SAGE is optimized around workflow continuity: it infers whether an intervention is warranted, explains the local evidence, and stages a bounded action. A language model can be one component, but conversation is not the product surface.

### How will you deploy this?

Start with a Windows companion service and desktop surface. Use local adapters, ONNX/QNN-compatible artifacts from Qualcomm AI Hub, an encrypted TTL-bounded event store, and a policy broker. Roll out the classifier taxonomy before richer generation, and measure latency, energy, precision, and interruption cost on the target HP Snapdragon SKU.

### What if the prediction is wrong?

SAGE includes a no-op class, confidence thresholds, cooldowns, evidence display, dismiss/clear controls, and approval before consequential actions. A wrong suggestion should be cheap to reject and should improve future calibration without uploading raw context.

### Is this surveillance?

The product's contract is local, minimal, and inspectable. Sensors are independently consented, raw data is ephemeral, sensitive applications default to pause/redaction, episodes expire, and users can clear them. The product should never hide the fact that sensing is active.
