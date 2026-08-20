# Robotics SLM

A commercial-oriented Small Language Model project for industrial robotics and automation.

## Scope

The initial domain covers:

- FANUC
- ABB
- KUKA
- Yaskawa
- Universal Robots
- Other industrial and collaborative robots
- Robot programming and commissioning
- PLC and robot integration
- Machine tending
- Press/stamping automation
- Welding
- Pick and place
- Machine vision integration
- Safety and risk concepts
- Troubleshooting and maintenance
- Offline programming and simulation
- Industrial terminology and shop-floor workflows

## Architecture

```text
Existing Robo Journey knowledge
            |
            v
     Data extraction
            |
            v
   Normalised robotics schema
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
     Local/API inference
```

## Project principles

1. Build the dataset and evaluation system before training a serious model.
2. Prefer authoritative and legally usable sources.
3. Keep vendor-specific knowledge separated from common robotics concepts.
4. Treat robot programs and safety procedures as high-risk technical content requiring validation.
5. Measure the model against deterministic robotics tasks, not generic chatbot benchmarks.
6. Keep the first model small enough to train and evaluate on developer hardware where practical.

## Data domains

See `data/` for the planned domain boundaries and schemas.

## Planned milestones

- [ ] Define canonical robotics knowledge schema
- [ ] Inventory existing Robo Journey content
- [ ] Build source ingestion pipeline
- [ ] Create instruction/response dataset format
- [ ] Create robotics evaluation benchmark
- [ ] Establish a small baseline model
- [ ] Train first SLM prototype
- [ ] Compare SLM vs RAG baseline vs general LLM
- [ ] Package inference API

## Important

This project is a research and product-development effort. Generated robot programs or safety-related recommendations must be reviewed by qualified personnel before use on physical equipment.
