# Robotics SLM Ingestion

The ingestion layer converts legally usable robotics material into the canonical training schema.

## Sources

1. Existing repository material
2. Original authored robotics content
3. Publicly licensed/open technical material
4. Vendor documentation only where redistribution/training rights permit it
5. Human-reviewed field examples
6. Synthetic examples generated from validated knowledge

## Pipeline

```text
Source
  -> parser
  -> metadata/provenance
  -> vendor + domain classifier
  -> chunk/structure extraction
  -> training-example generator
  -> validation
  -> deduplication
  -> dataset split
```

## Vendor neutrality

The pipeline must identify whether a fact is:

- `common`: applies across robot ecosystems
- `vendor_specific`: tied to a controller, language, model or workflow
- `application_specific`: tied to a manufacturing application
- `integration_specific`: tied to PLC, vision, fieldbus or cell integration

Do not silently generalise vendor-specific behaviour into common robotics knowledge.

## First implementation target

Inventory the existing `docs/`, `practice/` and `programs/` directories and produce a report of candidate training material. Do not automatically copy everything into the training set.
