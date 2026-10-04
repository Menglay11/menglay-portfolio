# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML5, CSS3, and vanilla JavaScript using Google's `<model-viewer>` web component. No framework or build system. Relative paths must remain compatible with GitHub Pages.

## Users

Portfolio visitors evaluating Kaing Menglay's 3D modelling, animation, Blender, software-development, problem-solving, and interactive-web work.

## Product Purpose

A personal digital exhibition that puts Kaing Menglay's real GLB work at the center, explains his confirmed education and interests, and provides a direct email contact path.

## Positioning

The portfolio demonstrates 3D work through a single focused interactive viewer with project switching and clip-aware animation controls, rather than relying on static renders or unsupported claims.

## Operating Context

Visitors explore five supplied GLB files on desktop or mobile, rotate and zoom each model, inspect animation clips when present, learn about Kaing Menglay, and contact him by email.

## Capabilities and Constraints

- Load only one GLB at a time and handle rapid project switching, slow loads, invalid files, missing files, and WebGL limitations.
- Detect animation clips from each loaded file rather than hard-coding clip names.
- Support light and dark themes with a light default and a persisted visitor choice.
- Keep project content in an editable JavaScript data array.
- Preserve all supplied GLB files unchanged.
- Do not present model-download controls.
- Do not fabricate achievements, project details, social URLs, qualifications, statistics, techniques, timelines, or inspirations.

## Brand Commitments

- Identity: Kaing Menglay.
- Tone: creative, technical, modern, professional, and concise.
- The actual 3D work must remain visually dominant.
- The supplied portrait appears in the hero as a transparent-background cutout.
- Structural inspiration may come from the supplied reference site, but its code, content, assets, branding, and exact design must not be copied.

## Evidence on Hand

- Five supplied GLB files: `Animation.glb`, `Blender_First.glb`, `Car.glb`, `Cup.glb`, and `firstCharacterWithAnimation.glb`.
- Supplied portrait photograph.
- Confirmed personal information and introduction from the project brief.
- No confirmed GitHub or LinkedIn URLs; both must remain clearly marked placeholders.

## Product Principles

- Lead with the work: make the interactive model the immediate proof.
- Keep claims strictly grounded in supplied information.
- Make every model state understandable and recoverable.
- Support keyboard, touch, mouse, reduced motion, and 200% zoom.
- Keep maintenance straightforward through data-driven projects and documented file replacement.

## Accessibility & Inclusion

Semantic HTML, skip navigation, visible focus, keyboard-operable navigation and controls, 44px touch targets, high-contrast themes, aria-live status messaging, reduced-motion support, responsive layouts, and useful no-JavaScript/WebGL fallbacks are required.
