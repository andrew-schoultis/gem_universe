---
name: gem-texture-fixer
description: Analyze and correct visual texture issues on a rendered gemstone, including stretching, seams, incorrect UV mapping, low resolution textures, lighting artifacts, normal map problems, and material configuration errors.
category: rendering
tags:
  - graphics
  - texture
  - materials
  - uv-mapping
  - shaders
  - gemstones

when_to_use:
  - The gem texture appears distorted.
  - Texture patterns are stretched.
  - Visible seams appear on the sphere.
  - Texture resolution looks blurry.
  - Material properties appear incorrect.
  - Reflections do not match the expected appearance.
  - Normal maps, roughness maps, or metallic maps appear incorrect.
  - A user reports that the gem "doesn't look right."

inputs:
  - Screenshot
  - Texture image
  - Material definition
  - Shader code
  - Rendering settings
  - User description

outputs:
  - Root cause analysis
  - Recommended fixes
  - Updated material settings
  - UV mapping recommendations
  - Shader improvements

capabilities:
  - image-analysis
  - rendering-analysis
  - shader-review
  - material-review
  - uv-diagnostics
---

# Gem Texture Fixer

## Purpose

This skill specializes in diagnosing and correcting gemstone texture and material issues.

The goal is to identify why a gem's appearance differs from the expected visual result and provide precise corrective actions.

---

# Common Problems

## Texture Stretching

Symptoms:

- Details appear elongated.
- Surface features vary in size across the sphere.
- Texture quality changes near poles.

Possible Causes:

- Incorrect sphere UV mapping.
- Projection mismatch.
- Improper texture coordinates.

Recommended Actions:

1. Inspect UV coordinates.
2. Verify spherical mapping.
3. Check texture sampler settings.
4. Evaluate alternative mapping methods.

---

## Visible Seams

Symptoms:

- Hard line on the sphere.
- Texture discontinuity.
- Color mismatch at UV boundary.

Possible Causes:

- Non-seamless texture.
- UV wrap issues.
- Texture edge mismatch.

Recommended Actions:

1. Verify texture wrapping mode.
2. Check UV continuity.
3. Use seamless textures.
4. Inspect texture borders.

---

## Blurry Appearance

Symptoms:

- Gem lacks detail.
- Texture appears soft.
- Sparkle patterns are unclear.

Possible Causes:

- Low resolution texture.
- Mipmap configuration.
- Texture compression artifacts.

Recommended Actions:

1. Check source texture resolution.
2. Inspect filtering settings.
3. Review compression settings.
4. Replace low-quality assets.

---

## Incorrect Reflections

Symptoms:

- Gem appears dull.
- Refraction looks unrealistic.
- Highlights are incorrect.

Possible Causes:

- Roughness settings.
- Reflection probe configuration.
- Environment map issues.
- Material setup errors.

Recommended Actions:

1. Inspect roughness values.
2. Verify environment lighting.
3. Review reflection source.
4. Validate material configuration.

---

## Normal Map Issues

Symptoms:

- Surface appears inverted.
- Facets are lit incorrectly.
- Lighting behaves unexpectedly.

Possible Causes:

- Incorrect normal map format.
- Inverted Y channel.
- Tangent space mismatch.

Recommended Actions:

1. Verify normal map orientation.
2. Check engine-specific requirements.
3. Confirm tangent generation.
4. Review shader calculations.

---

# Diagnostic Process

When invoked:

1. Gather screenshots and available assets.
2. Identify the primary visual defect.
3. Classify the problem category.
4. Determine the most likely root cause.
5. Provide ranked corrective actions.
6. Suggest material, texture, or shader changes.
7. Explain reasoning clearly.

---

# Response Format

## Problem Summary

Describe the observed texture issue.

## Root Cause

Explain the most likely cause.

## Recommended Fix

Provide the specific correction.

## Additional Improvements

List optional enhancements.

## Confidence Level

High / Medium / Low

Include justification for the confidence level.

---

# Example

User:

"The gem texture looks stretched near the top and bottom."

Analysis:

- Distortion concentrated near sphere poles.
- UV compression consistent with spherical projection artifacts.

Root Cause:

- Spherical UV mapping distortion.

Recommended Fix:

1. Adjust UV layout.
2. Consider triplanar mapping.
3. Reduce detail concentration near poles.
4. Use a texture designed for spherical projection.

Confidence Level:

High