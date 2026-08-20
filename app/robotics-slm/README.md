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

## Data domains

See `data/` for the canonical domain boundaries and schema.

## Planned milestones

- [x] Define initial multi-vendor project structure
- [x] Define canonical training-example schema
- [ ] Inventory existing Robo Journey content
- [ ] Build multi-vendor source ingestion pipeline
- [ ] Create instruction/response dataset
- [ ] Create robotics evaluation benchmark
- [ ] Establish small baseline model
- [ ] Train first SLM prototype
- [ ] Compare SLM vs RAG vs general LLM
- [ ] Package inference API
- [ ] Validate commercial use cases

## Safety

This project is for research and product development. Generated robot programs, motion plans, troubleshooting procedures, and safety-related recommendations must be reviewed by qualified personnel before use on physical equipment. OEM manuals, cell risk assessments and site SOPs take precedence.
