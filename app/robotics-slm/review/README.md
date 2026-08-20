# Robotics SLM Review Tool

A local, dependency-free review workflow for dataset candidates.

## Workflow

```text
review queue JSONL
       ↓
review.py --interactive
       ↓
approved / rejected / needs_revision
       ↓
reviewed dataset JSONL
       ↓
coverage + training pipeline
```

The reviewer must explicitly approve an example before it can count toward dataset coverage.

For safety-critical examples, technical and safety review are separate fields. Approval is not equivalent to certification for live robot operation.

## Commands

```bash
python3 app/robotics-slm/review/review.py \
  --input app/robotics-slm/datasets/v0.1/fanuc-review-queue.jsonl \
  --output app/robotics-slm/datasets/v0.1/fanuc-reviewed.jsonl
```

Use `--auto-pending` to copy existing decisions and only prompt for pending records.
