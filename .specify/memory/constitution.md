<!-- 
SYNC IMPACT REPORT
Version change: N/A → 1.0.0
Added sections: All principles and sections as defined below
Templates requiring updates: 
- .specify/templates/plan-template.md ✅ reviewed
- .specify/templates/spec-template.md ✅ reviewed  
- .specify/templates/tasks-template.md ✅ reviewed
- .specify/templates/commands/*.md ⚠ pending - no commands found
Follow-up TODOs: None
-->
# HeroUI MCP Server Constitution

## Core Principles

### Library-First Architecture
Every feature starts as a standalone library; Libraries must be self-contained, independently testable, documented; Clear purpose required - no organizational-only libraries

### CLI Interface via MCP
Every library exposes functionality via MCP (Model Context Protocol); Text in/out protocol: stdin/args → stdout, errors → stderr; Support JSON + human-readable formats

### Test-First (NON-NEGOTIABLE)
TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced

### Integration Testing for MCP
Focus areas requiring integration tests: New tool contract tests, MCP protocol compliance, Inter-service communication, UI component integration

### Observability & Performance
Structured logging required for MCP operations; Performance monitoring for UI component rendering; Resource usage tracking for canvas operations

## TypeScript & MCP Compliance
All code must use TypeScript strict mode; MCP protocol version compatibility required; Fastify framework conventions; Zod schema validation for all inputs

## Development Workflow & MCP Integration
All MCP tools must follow naming convention (HERO_[TYPE]_[NUMBER]); Code review requires MCP protocol compliance verification; Automated tests must pass before merge; MCP server integration testing required

## Governance
All PRs must verify MCP protocol compliance; All UI components must follow accessibility standards; Breaking changes to MCP protocol require deprecation notice; Use project documentation for runtime development guidance

**Version**: 1.0.0 | **Ratified**: 2025-06-13 | **Last Amended**: 2025-11-08
