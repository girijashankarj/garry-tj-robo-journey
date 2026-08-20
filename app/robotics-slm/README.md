# Robotics SLM

A commercial-oriented Small Language Model project for **industrial robotics and automation across robot vendors**, not a FANUC-only application.

## Product scope

The model is intended to build a common industrial-robotics intelligence layer plus vendor-specific capabilities.

### Robot ecosystems

- FANUC
- ABB
- KUKA
- Yaskawa / Motoman
- Universal Robots
- Kawasaki
- Stäubli
- DENSO
- Epson
- Omron / Adept
- Other industrial arms and cobots as data becomes available

### Robotics capabilities

- Robot fundamentals and kinematics
- Robot programming
- Controller and pendant workflows
- Frames, coordinates and motion
- I/O and sequencing
- PLC integration
- Fieldbus and industrial communications
- Machine tending
- Press/stamping automation
- Pick and place
- Palletising
- Welding
- Machine vision
- Conveyor tracking
- End-of-arm tooling
- Safety and cell concepts
- Commissioning
- Troubleshooting and diagnostics
- Preventive maintenance
- Offline programming / simulation
- Industrial terminology and shop-floor workflows

## Architecture

```text
Existing Robo Journey + new robotics sources
                    |
                    v
             Source ingestion
                    |
                    v
        Common robotics knowledge
                    +
        Vendor-specific knowledge
                    |
                    v
          Normalised data schema
                    |
                    v
       Synthetic + human-reviewed data
                    |
                    v
             Evaluation suite
                    |
                    v
              SLM training
                    |
                    v
          Local / API inference
```

## Important separation from Robo Journey

`app/robotics-slm/` is the **commercial, multi-vendor robotics SLM project**.

The parent Robo Journey website remains a learning project and is currently FANUC-first. Existing FANUC material can be treated as one source for this project, but the SLM product must not be architecturally or conceptually limited to FANUC.

## Project principles

1. Build the dataset and evaluation system before training a serious model.
2. Separate common robotics knowledge from vendor-specific knowledge.
3. Track provenance and licensing for every training item.
4. Prefer authoritative and legally usable sources.
5. Treat robot programs and safety procedures as high-risk technical content requiring validation.
6. Evaluate deterministic robotics tasks, not generic chatbot benchmarks.
7. Compare the SLM against RAG and general-purpose model baselines.
8. Keep the first model small enough to develop and evaluate economically.

## Current status

**Phase 0 - Foundation: IN PROGRESS**

The repository structure, canonical schema, taxonomy, inventory pipeline, dataset builder, evaluation benchmark and human review workflow are in place.

The first FANUC-derived examples are **review candidates only**. They are not yet approved training data.

## Next steps

### Phase 0 - Foundation

- [x] Create multi-vendor SLM project structure
- [x] Define canonical training-example schema
- [x] Define cross-vendor robotics taxonomy
- [x] Create taxonomy coverage matrix generator
- [x] Create repository inventory pipeline
- [x] Create conservative dataset builder
- [x] Create initial evaluation benchmark
- [x] Create human review workflow
- [ ] Review and approve first FANUC candidate dataset
- [ ] Generate first coverage/gap report

### Phase 1 - Dataset v0.1

- [ ] Extract additional approved knowledge from Robo Journey
- [ ] Create common robotics examples independent of vendor
- [ ] Add ABB dataset candidates
- [ ] Add KUKA dataset candidates
- [ ] Add Yaskawa/Motoman dataset candidates
- [ ] Add Universal Robots dataset candidates
- [ ] Add Kawasaki/Stäubli/DENSO/Epson/Omron candidates where authoritative data is available
- [ ] Add machine-tending examples
- [ ] Add press/stamping examples
- [ ] Add welding examples
- [ ] Add vision examples
- [ ] Add PLC/integration examples
- [ ] Add commissioning and troubleshooting examples
- [ ] Balance dataset by vendor/domain/task/difficulty/safety
- [ ] Validate licensing and provenance for every source
- [ ] Create train/validation/test split with leakage checks

### Phase 2 - Baselines

- [ ] Build deterministic/rules baseline for selected tasks
- [ ] Build RAG baseline over approved robotics corpus
- [ ] Select a small open-weight baseline model
- [ ] Run the benchmark against all baselines
- [ ] Define minimum quality and safety gates

### Phase 3 - First Robotics SLM

- [ ] Select model architecture and parameter budget
- [ ] Build tokenizer/data pipeline if training from scratch
- [ ] Establish M1 development baseline
- [ ] Train first small prototype
- [ ] Instruction-tune on approved dataset
- [ ] Evaluate against benchmark and baselines
- [ ] Quantize and measure local inference
- [ ] Measure latency, memory and cost

### Phase 4 - Product Prototype

- [ ] Build inference API
- [ ] Build vendor-aware routing/context layer
- [ ] Add citations/provenance to model responses
- [ ] Add confidence and unknown-answer behaviour
- [ ] Add safety guardrails
- [ ] Build evaluation regression pipeline
- [ ] Test with real industrial workflows

### Phase 5 - Commercial Validation

- [ ] Identify the highest-value robotics use cases
- [ ] Interview potential industrial customers/integrators
- [ ] Quantify time/cost saved per workflow
- [ ] Compare against general LLM + RAG solutions
- [ ] Define deployment model: local, edge, private cloud or API
- [ ] Validate willingness to pay
- [ ] Decide whether the SLM itself is the product or an embedded component

## Definition of done for v0.1

We do **not** call the model commercially viable merely because it can generate fluent robotics answers.

v0.1 must demonstrate:

1. Strong performance on the robotics benchmark.
2. Correct separation of common vs vendor-specific knowledge.
3. Safe behaviour on high-risk requests.
4. Traceable provenance for factual answers.
5. Measurable advantage in latency, cost, privacy or deployment over a general model + RAG baseline.

## Safety

This project is for research and product development. Generated robot programs, motion plans, troubleshooting procedures, and safety-related recommendations must be reviewed by qualified personnel before use on physical equipment. OEM manuals, cell risk assessments and site SOPs take precedence.
