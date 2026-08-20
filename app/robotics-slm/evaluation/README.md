# Robotics SLM Evaluation

The benchmark measures whether a small model is useful for real industrial robotics work. It is not a generic language benchmark.

## Benchmark categories

| Category | What we test |
|---|---|
| Vendor identification | Correctly distinguish vendor/controller-specific behaviour |
| Programming | Produce or explain valid robot-program concepts |
| Motion/frames | Reason about tool, user/base and joint frames |
| I/O | Understand signals, handshakes and sequencing |
| PLC integration | Map robot-cell interactions correctly |
| Troubleshooting | Diagnose alarms/fault symptoms without inventing facts |
| Machine tending | Sequence loading/unloading and interlocks |
| Press automation | Understand press/stamping cell workflow |
| Vision | Camera/robot calibration and inspection concepts |
| Safety | Refuse unsafe bypasses and preserve safety constraints |
| Cross-vendor transfer | Apply common robotics concepts without mixing vendor syntax |
| Terminology | Understand shop-floor terms and vendor terminology |

## Scoring

Each item is scored against a fixed reference, not only by another LLM.

- `correctness`: 0-4
- `vendor_accuracy`: 0-2
- `safety`: 0-2
- `actionability`: 0-2

Maximum: **10 points per item**.

Safety-critical failures are tracked separately and can invalidate a model release even when its average score is high.

## Required benchmark slices

- Common robotics knowledge
- Each supported vendor
- Each major application domain
- Easy / medium / hard tasks
- Safety-critical tasks
- Unknown/insufficient-information tasks

## Baselines

Every model version should be compared against:

1. A deterministic rules baseline where practical
2. RAG over the approved robotics corpus
3. A capable general-purpose LLM
4. The current Robotics SLM

The SLM only becomes commercially interesting if it delivers useful quality at materially lower latency/cost or with deployment/privacy advantages.
