# Robotics Chatbot

A product-facing chatbot built around the **Robotics SLM** being developed in `app/robotics-slm/`.

The chatbot is a separate application layer. The SLM remains the model/training project; this app provides the user experience, orchestration, retrieval, provenance, safety controls and eventually inference.

## Product goal

Provide a vendor-aware industrial robotics assistant that can help users understand, program, troubleshoot and design robot-cell workflows across multiple robot ecosystems.

Supported target ecosystems include FANUC, ABB, KUKA, Yaskawa/Motoman, Universal Robots, Kawasaki, Stäubli, DENSO, Epson, Omron/Adept and future vendors.

## Architecture

```text
User
  |
  v
Robotics Chatbot UI
  |
  v
Chat API / Orchestrator
  |
  +-------------------+
  |                   |
  v                   v
Vendor/domain      Approved robotics
router             knowledge / RAG
  |                   |
  +---------+---------+
            v
      Robotics SLM
            |
            v
   Response validator
            |
     +------+------+
     |             |
 provenance     safety gate
     |             |
     +------+------+
            v
          User
```

## Key product behaviour

### Vendor-aware

If a question requires vendor-specific syntax and the vendor/controller is missing, the chatbot should ask for the missing context instead of guessing.

### Common vs vendor-specific knowledge

The chatbot should distinguish a common robotics concept from its vendor implementation. It must not present FANUC syntax as universal robot syntax.

### Provenance

Where factual answers depend on approved source material, the response should expose source/provenance information.

### Unknown handling

The chatbot should explicitly say when the approved corpus does not contain enough information. It should not fabricate controller commands, alarm meanings or machine-specific I/O mappings.

### Safety

Safety-critical requests must follow the Robotics SLM safety policy. The chatbot must not provide procedures for bypassing safety systems or defeating interlocks. Physical robot operation requires qualified personnel and site/OEM procedures.

## Planned stack

- Frontend: TypeScript + React
- API: Node.js + TypeScript
- Model service: Python where required by the selected SLM runtime
- Retrieval: approved robotics corpus
- Deployment: local development first; AWS/edge/private deployment evaluated later

## Development phases

### Phase 0 - Shell

- [ ] Create React/TypeScript chat UI
- [ ] Create Node.js/TypeScript API
- [ ] Add streaming response contract
- [ ] Add vendor/domain context selector
- [ ] Add conversation state

### Phase 1 - Baseline

- [ ] Connect approved robotics RAG baseline
- [ ] Add citations/provenance
- [ ] Add safety policy layer
- [ ] Add unknown-answer behaviour
- [ ] Run robotics evaluation benchmark

### Phase 2 - Robotics SLM

- [ ] Connect first Robotics SLM inference endpoint
- [ ] Compare SLM vs RAG vs general LLM
- [ ] Add model routing by task/vendor
- [ ] Add latency and token/cost metrics

### Phase 3 - Industrial workflows

- [ ] Program explanation/review
- [ ] Alarm troubleshooting
- [ ] PLC handshake assistance
- [ ] Cell sequence analysis
- [ ] Machine-tending workflow assistance
- [ ] OLP/simulation assistance
- [ ] Vision integration assistance

### Phase 4 - Commercial prototype

- [ ] Authentication and tenant isolation
- [ ] Conversation/project history
- [ ] Customer-specific knowledge bases
- [ ] Audit logs
- [ ] Usage analytics
- [ ] Deployment options: cloud/private/edge

## Relationship with Robotics SLM

```text
app/robotics-slm/
    = research, data, training, evaluation and model

app/robotics-chatbot/
    = product UI, API, orchestration and user experience
```

The chatbot must remain usable with an RAG/general-LLM baseline before the custom SLM is production-ready. This lets us validate the product independently from model-training progress.

## Current status

**Phase 0 - Shell: PENDING**

The project contract and architecture are defined. Implementation has not started yet.
