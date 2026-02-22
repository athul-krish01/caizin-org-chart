# PRODUCT REQUIREMENTS DOCUMENT (MVP)
## Product Name: Caizin Org Chart

**Version:** 1.1  
**Last Updated:** February 22, 2025  
**Status:** MVP Draft

---

## 1. Executive Summary

Caizin Org Chart is a single-page internal web tool that provides structured organizational visibility for HR and C-Suite leadership.

The tool enables:
1. **Macro-Level Hierarchical Explorer** (structured grouped expansion)
2. **Micro-Level Interactive Org Chart** (graph-based tree visualization)

The system is fully data-driven, dynamic in hierarchy depth, and initially powered by Excel upload.

---

## 2. Problem Statement

As the organization grows, leadership lacks clear structural visibility.

### Current State
- Employee data exists only in Excel
- No structured macro visualization
- No interactive reporting tree
- Inconsistent hierarchy naming
- No contractor vs internal visibility separation
- No structured department-level hierarchy insight

### Impact
- Executives cannot quickly understand structure
- HR cannot validate reporting balance
- Organizational changes are difficult to visualize
- Structural imbalances go unnoticed

---

## 3. Product Vision (MVP)

A clean, internal, single-page web tool with:
- Excel upload entry
- Two-tab interface:
  - Overview (Macro)
  - Org Chart (Micro)
- Fully dynamic hierarchy
- Expandable structured hierarchy
- Interactive tree visualization

The tool must adapt to:
- Any number of levels (3–7+)
- Any department naming
- Renamed hierarchy bands
- Dynamic depth

---

## 4. Application Structure

### Single Page Web Tool

#### Entry Flow
1. User uploads Excel sheet.
2. System validates and parses.
3. System builds normalized dataset.
4. User is redirected to main interface.
5. Two tabs available:
   - Overview
   - Org Chart

---

## 5. User Personas

### HR Manager
- Needs structural clarity
- Needs department-level grouping
- Needs contractor visibility
- Needs rename flexibility

### C-Suite Executive
- Needs fast hierarchy understanding
- Needs clean visual reporting lines
- Needs leadership grouping clarity
- Needs intuitive navigation

---

## 6. Functional Requirements

### 6.1 Excel Upload & Data Processing

#### Required Columns
| Column | Required | Description |
|--------|----------|-------------|
| employeeId | Yes | Unique employee identifier |
| name | Yes | Full name |
| role/title | Yes | Job title |
| department | Yes | Department name |
| level | Yes | Hierarchy band |
| reportingManagerId | Yes | Manager's employeeId |
| employmentType | No | Internal / Contractor |
| project | No | Project assignment |
| skills | No | Skills list |

#### Processing Logic (Procedural)
1. Load Excel
2. Validate required columns
3. Normalize data structure
4. Identify root node(s)
5. Build parent-child relationships
6. Generate recursive hierarchy tree
7. Generate grouping aggregations

No data modification to original file. Read-only ingestion.

### 6.2 Overview Tab (Macro Explorer)

**Purpose:** Provide structured, grouped visibility into hierarchy without visual graph complexity.

#### Section 1: Executive Snapshot
Display:
- Total headcount
- Total departments
- Total unique hierarchy levels
- Contractor count (if available)

#### Section 2: Hierarchical Explorer

**Behavior Model:** Level → Department Band → Employee Card

**Level View (Collapsed)**
Example: `Executive leadership (8)`  
In hierarchy view → Show full titles (C-Suite, Director, Manager, etc.)

Dynamic levels derived from data. No hardcoded labels.

**Expand Level**  
Shows grouping by department band:
- Engineering (5)
- Finance (2)
- Operations (3)

**Expand Department Band**  
Shows Employee Cards.

**Employee Card Fields (Macro)**
- Full Name
- Title
- Level (L1, L2, etc.) — In employee card → Show simple grade label: L0, L1, L2, etc.
- Department
- Reporting Manager
- Employment Type (optional)
- Skills (optional)

No recursive counts shown in Macro.

#### Section 3: Department Distribution
Simple headcount per department.

### 6.3 Organization Tab (Micro Org Chart)

**Purpose:** Provide interactive visual parent-child reporting structure. Graph-based hierarchy.

#### Structural Model
**Root**
- Employee with no reportingManagerId
- Rendered at top (CEO)
- Multiple roots allowed (rare)

Tree built recursively. Unlimited depth.

#### Org Chart Behavior

**Expand / Collapse (Node Level)**  
Each node supports:
- Expand (show direct reports)
- Collapse (hide children)

Only direct children appear on expand. Recursive expansion allowed.

**Expand All / Collapse All**  
Global controls:
- Expand All
- Collapse All

Must handle performance gracefully.

**Canvas Interaction**
- Drag (pan)
- Optional zoom
- Smooth rendering
- No edge crossing
- Balanced spacing

**Filtering Controls**
- All
- Internal Only
- Contractor Only
- Caizin Only (if applicable)

Filtering recalculates tree dynamically. Handles orphan nodes gracefully.

#### Node Card Specification (Micro)

Each node displays:

**Visual**
- Circular avatar
- If no image → initials placeholder (Example: Athul Krishna → AK)

**Required Fields**
- Full Name
- Title
- Department
- Reporting Manager
- Level (L1, L2, etc.) — linked to the org hierarchy but only show the grade (L1, L2) not full name here
- Project(s)

**Optional Fields**
- Employment Type Badge
- Skills

**Direct Reports Indicator**  
Small badge: 👥 5 — Indicates direct reports only.

#### Node Interaction
**Click Node**  
Preferred MVP: Focus tree on selected node — Show subtree centered.  
Optional future: Side drawer detail panel.

#### Layout Rules
- CEO at top
- Direct reports below
- Clean connectors
- Equal spacing
- Consistent card width
- Adaptive layout based on children

---

## 7. Non-Functional Requirements

- Clean enterprise UI
- Minimal design
- Responsive layout
- Smooth rendering up to ~300 employees
- No hardcoded levels
- No page reload for interactions
- Local deployment for MVP

---

## 8. Architecture Principles

### Separation of Concerns

**Data Layer:**
- Parsing
- Normalization
- Tree building

**Aggregation Layer:**
- Level grouping
- Department grouping

**UI Layer:**
- Macro rendering
- Micro graph rendering

**Graph Layer:**
- React Flow rendering only
- No business logic inside graph

---

## 9. Edge Cases

- **Missing manager** → secondary root
- **Circular reporting** → detect and block
- **Duplicate employeeId** → validation error
- **Department missing** → "Unassigned"
- **Level renamed** → auto-display new label
- **Filter removes parent** → recalc tree roots

---

## 10. Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js |
| Styling | Tailwind CSS |
| UI | shadcn/ui |
| Graph | React Flow |
| State | React local state |
| Data Source | Phase 1: Dummy JSON / Phase 2: Excel → JSON parser |
| Version Control | Git |

---

## 11. Build Phases

| Phase | Deliverables |
|-------|--------------|
| **Phase 1** | Project scaffold, dummy data, data engine, macro explorer |
| **Phase 2** | Org chart rendering, expand/collapse logic, filtering |
| **Phase 3** | Excel upload integration |
| **Phase 4** | UI refinement, validation |

---

## 12. Success Criteria

- Excel upload works
- Macro explorer groups correctly
- Org tree renders dynamic depth
- Expand/collapse stable
- Filtering stable
- No hardcoded assumptions
- Executives understand structure in < 2 minutes

---

## 13. Out of Scope

- Editing hierarchy
- Drag-and-drop restructuring
- Authentication
- HR integration
- Salary analytics
- Succession planning
- Permissions

---

## Appendix

### A.1 Glossary
- **Org Chart:** Organizational chart; a diagram showing the structure of an organization and the relationships between roles.
- **Node:** A single employee or role in the chart.
- **Branch:** A subtree of the org (e.g., a department or team).
- **Macro Explorer:** Structured, grouped hierarchical view (Overview tab).
- **Micro Org Chart:** Interactive graph-based tree visualization (Org Chart tab).
- **Level Band:** A hierarchy tier (e.g., C-Suite, Director, Manager); displayed as L0, L1, L2, etc.

### A.2 References
- Project repository: caizin-org-chart
- Design system: shadcn/ui
- Graph library: React Flow

### A.3 Revision History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-02-22 | — | Initial PRD |
| 1.1 | 2025-02-22 | — | MVP content incorporation |
