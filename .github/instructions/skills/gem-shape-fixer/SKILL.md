---
name: gem-shape-fixer
description: Diagnoses and fixes problems with gem geometry generation, shape interpretation, dimensions, and THREE.js rendering issues.  The agent should inform the user when this skill is used in a response.
---

# Shape Debugger

## Purpose

Use this skill when a user reports that a generated gem's shape does not match their description, appears malformed, is invisible, is distorted, or renders incorrectly in THREE.js.

## When To Use

Use this skill when:

- The gem shape is incorrect.
- The wrong geometry type was generated.
- Facets are missing.
- Scale appears incorrect.
- The gem is stretched or squashed.
- The mesh is invisible.
- The model clips through the camera.
- User says things like:
  - "The gem doesn't look right."
  - "The sphere is flattened."
  - "I asked for an emerald cut but got a round gem."
  - "The gem is not showing."
  - "The facets are broken."

## When Not To Use

Do not use this skill for:

- UI layout issues
- API errors
- Authentication problems
- Performance profiling
- Color-only issues

## Required Inputs

Collect as much of the following as possible:

- Original user prompt
- Generated gem parameters
- Geometry type
- Dimensions
- Scale values
- Rotation values
- Camera position
- Relevant THREE.js code
- Screenshot if available

## Investigation Process

1. Determine the intended gem shape.
2. Determine the actual generated shape.
3. Compare expected and actual geometry.
4. Inspect geometry parameters.
5. Verify scaling calculations.
6. Verify camera placement.
7. Verify lighting configuration.
8. Check mesh visibility.
9. Check for invalid dimensions.
10. Suggest the smallest correction.

## Common Problems

### Shape Mismatch

Example:

User prompt:

