# Cross-Vendor Robotics Taxonomy

This taxonomy is the semantic backbone of the Robotics SLM. It separates concepts that should transfer across robot manufacturers from concepts that must remain vendor-specific.

## Design rule

**Concept first, syntax second.**

Example:

- Common concept: "tool coordinate frame"
- FANUC implementation: Tool Frame / UTOOL
- ABB implementation: Tooldata
- KUKA implementation: TOOL / BASE concepts
- Yaskawa implementation: tool coordinates
- UR implementation: TCP / feature concepts

The model must understand the shared concept without falsely claiming that the vendor implementations are identical.

## Top-level taxonomy

1. `robot-fundamentals`
   - robot types
   - axes / joints
   - degrees of freedom
   - workspace
   - payload / reach
   - repeatability / accuracy
   - TCP / end effector

2. `kinematics-and-coordinate-systems`
   - forward kinematics
   - inverse kinematics
   - joint space
   - Cartesian space
   - world/base frame
   - tool frame
   - user/work/object frame
   - orientation
   - configuration

3. `motion-and-trajectory`
   - joint motion
   - linear motion
   - circular motion
   - speed / acceleration
   - blending / approximation
   - singularities
   - collision considerations

4. `programming-and-controllers`
   - program structure
   - variables / registers
   - subprograms
   - loops / conditions
   - controller state
   - teach pendant workflows
   - vendor programming languages

5. `io-and-sequencing`
   - digital I/O
   - analogue I/O
   - robot/PLC handshake
   - permissives
   - interlocks
   - cycle state machines
   - fault/reset flows

6. `industrial-integration`
   - PLC
   - Ethernet/IP
   - PROFINET
   - EtherCAT
   - Modbus
   - OPC UA
   - field devices
   - safety PLC

7. `end-of-arm-tooling`
   - grippers
   - vacuum
   - weld guns
   - tool changers
   - pneumatic/hydraulic tooling
   - tool I/O

8. `machine-vision`
   - 2D vision
   - 3D vision
   - inspection
   - localisation
   - calibration
   - hand-eye concepts
   - camera/robot coordinate transforms

9. `applications`
   - machine tending
   - press/stamping
   - pick-and-place
   - palletising
   - welding
   - assembly
   - dispensing
   - packaging
   - material handling
   - inspection

10. `commissioning`
    - installation
    - mastering / calibration
    - TCP setup
    - frame setup
    - I/O validation
    - dry run
    - cycle validation
    - production handover

11. `troubleshooting-and-maintenance`
    - alarms
    - fault isolation
    - diagnostic signals
    - mechanical symptoms
    - preventive maintenance
    - recovery procedures
    - root-cause analysis

12. `simulation-and-offline-programming`
    - digital cell models
    - reachability
    - cycle-time estimation
    - collision checking
    - OLP
    - virtual commissioning

13. `safety`
    - risk assessment
    - safeguarding
    - emergency stop
    - protective stop
    - interlocks
    - safety-rated monitoring
    - safe operating procedures

14. `manufacturing-cell`
    - cycle design
    - takt time
    - fixtures
    - conveyors
    - sensors
    - material flow
    - quality checks
    - production states

## Vendor layer

Vendor-specific knowledge lives below the common taxonomy:

- `vendors/fanuc`
- `vendors/abb`
- `vendors/kuka`
- `vendors/yaskawa`
- `vendors/universal-robots`
- `vendors/kawasaki`
- `vendors/staubli`
- `vendors/denso`
- `vendors/epson`
- `vendors/omron`

Each vendor layer should map its terminology, controller, programming language, frame model, I/O model and diagnostic conventions back to the common taxonomy.

## Application layer

Applications should also be vendor-neutral. A machine-tending example should be expressible as a common cell workflow and then specialised into FANUC/ABB/KUKA/etc. implementations.

## Dataset balance target

The initial dataset should avoid becoming a FANUC-heavy model merely because FANUC material is easiest to obtain. Track coverage by:

- vendor
- common vs vendor-specific knowledge
- application
- difficulty
- safety level
- task type

A future dataset report should expose these distributions before every training run.
