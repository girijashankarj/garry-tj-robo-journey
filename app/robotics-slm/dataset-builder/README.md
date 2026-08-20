# Robotics SLM Dataset Builder

Converts **reviewed** inventory records into canonical training examples.

The builder does not call an LLM and does not invent answers. It creates structured candidates from source material for human review. This keeps the first dataset auditable and avoids treating unverified source text as ground truth.

## Workflow

```text
inventory.jsonl
      |
      v
review filter
      |
      v
source document
      |
      v
candidate extraction
      |
      v
canonical JSONL
      |
      v
human validation
      |
      v
train / validation / test
```

## Eligibility rules

A source must explicitly be marked `training_eligible: true` and `review_status: reviewed` or `verified` before the builder emits it.

High-risk content is emitted with `safety: high-risk` and must receive an additional qualified review before entering training data.

## Future stages

- Instruction/response generation from approved knowledge
- Cross-vendor equivalent-question generation
- Deduplication
- Leakage detection between train and test
- Dataset balancing by vendor and capability
- Human review UI
- Benchmark/evaluation set generation
