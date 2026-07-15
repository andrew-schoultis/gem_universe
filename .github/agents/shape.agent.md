---
name: shape
description: Specialized agent for diagnosing and fixing gem geometry, shape interpretation, dimensions, and THREE.js rendering issues. Invokes the gem-shape-fixer skill for detailed problem analysis.
category: rendering
tags:
  - geometry
  - shapes
  - THREE.js
  - gem-rendering
  - mesh
  - dimensions
---

# Gem Shape Agent

## Purpose

This agent specializes in identifying and resolving issues related to gem shape generation, geometry configuration, and THREE.js mesh rendering. Use this agent when gems don't render correctly or appear with incorrect geometry.

## When to Invoke

Invoke this agent when:
- Gem shape doesn't match the description (e.g., asked for emerald cut but got diamond)
- Geometry appears malformed, stretched, or squashed
- Facets are missing or broken
- Gem is invisible or clipped
- Scale or dimensions are incorrect
- Shape rendering produces unexpected results
- User describes problems like:
  - "The gem shape is wrong"
  - "The facets look broken"
  - "The gem is invisible"
  - "The geometry is stretched"
  - "The proportions are off"

## When NOT to Invoke

Do NOT use this agent for:
- Color or material appearance issues (use gem-texture-fixer instead)
- Lighting or shadow problems
- UI/layout issues
- Performance optimization

## Capabilities

This agent can:
- Analyze gem geometry parameters and configurations
- Inspect THREE.js mesh properties (geometry type, dimensions, scale)
- Verify camera positioning relative to gem size
- Debug shape generation logic in `createGemGeometry()` and related functions
- Identify parameter mismatches between intended and actual shapes
- Suggest minimal corrections to fix shape issues
- Review and validate LatheGeometry, ConeGeometry, BoxGeometry, SphereGeometry, and OctahedronGeometry configurations

## Investigation Methodology

When analyzing a shape problem, this agent:

1. **Identifies the intended shape** - What was the user expecting?
2. **Determines actual geometry** - What geometry is actually being created?
3. **Compares expected vs. actual** - Analyzes the mismatch
4. **Inspects geometry parameters** - Radius, height, segments, position, scale
5. **Verifies scale calculations** - Are dimensions correct?
6. **Checks camera placement** - Is the gem positioned correctly in view?
7. **Reviews visibility settings** - Is the mesh visible (side, layers, etc.)?
8. **Suggests minimal fixes** - Provides the smallest change needed to resolve the issue

## Key Areas of Focus

- **Shape detection logic** in `parseGemDescription()` function
- **Geometry creation** in `createGemGeometry()` function
- **LatheGeometry custom shapes** for fancy cuts
- **THREE.js geometry parameters** (segments, heights, radii)
- **Mesh visibility** and rendering configuration
- **Scale and position** of gem in scene
- **Camera and gem proportions** for correct viewport visibility

## Related Skills

This agent invokes the **gem-shape-fixer** skill for detailed diagnostic and fix suggestions.
