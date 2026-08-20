# Robotics Data Layer

The data layer separates robotics knowledge by vendor and capability so the eventual model can learn both shared industrial concepts and vendor-specific behaviour.

## Domains

- `common/` - robotics fundamentals, kinematics, frames, motion, I/O, alarms, safety concepts, cells and workflows
- `fanuc/` - HandlingTool, TP/KAREL, registers, frames, I/O, alarms, commissioning and FANUC-specific workflows
- `abb/` - RAPID, controllers, frames, I/O, programming and ABB-specific workflows
- `kuka/` - KRL, controllers, frames, I/O, programming and KUKA-specific workflows
- `yaskawa/` - INFORM, controllers, jobs, frames, I/O and Yaskawa-specific workflows
- `universal-robots/` - URScript, PolyScope, cobot workflows and UR-specific concepts
- `applications/` - machine tending, press/stamping, welding, pick-and-place, vision, palletising and similar applications
- `integration/` - PLC, fieldbus, sensors, vision, safety systems and cell integration
- `maintenance/` - diagnostics, preventive maintenance and troubleshooting

## Rule

Do not mix raw source documents, generated examples and validated training examples in the same directory. Provenance and validation status must be retained for every dataset item.
