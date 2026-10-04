---
name: Kaing Menglay Portfolio
description: A living orbital atelier where real interactive 3D work occupies the environment.
colors:
  canvas: "#e9e7df"
  canvas-soft: "#f3f1ea"
  ink: "#0d0e0e"
  ink-soft: "#51534f"
  line: "rgba(13, 14, 14, 0.18)"
  line-strong: "rgba(13, 14, 14, 0.42)"
  stage: "#0c0d0d"
  stage-raised: "#151616"
  stage-line: "rgba(255, 255, 255, 0.16)"
  stage-ink: "#f4f3ed"
  stage-soft: "#a7aaa3"
  signal: "#d8ff3e"
  signal-ink: "#111307"
  danger: "#ff8d82"
  dark-canvas: "#0b0c0c"
  dark-canvas-soft: "#121313"
  dark-ink: "#f2f0e8"
  dark-ink-soft: "#aaaca5"
  dark-line: "rgba(244, 243, 237, 0.16)"
  dark-line-strong: "rgba(244, 243, 237, 0.38)"
  dark-stage: "#050606"
  dark-stage-raised: "#101111"
typography:
  display:
    fontFamily: "Syne, Trebuchet MS, sans-serif"
    fontSize: "clamp(4rem, 10vw, 9rem)"
    fontWeight: 700
    lineHeight: 0.75
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Syne, Trebuchet MS, sans-serif"
    fontSize: "clamp(3rem, 6vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Syne, Trebuchet MS, sans-serif"
    fontSize: "clamp(2rem, 3.2vw, 3.8rem)"
    fontWeight: 600
    lineHeight: 0.94
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Manrope, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Manrope, Segoe UI, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  square: "0"
  circle: "50%"
spacing:
  tight: "0.35rem"
  compact: "0.5rem"
  control: "0.75rem"
  standard: "1rem"
  panel: "1.5rem"
  page-inline: "clamp(1rem, 2.7vw, 3.2rem)"
components:
  primary-action:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0.75rem 1rem"
    height: "3rem"
  primary-action-hover:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.signal-ink}"
    rounded: "{rounded.square}"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.circle}"
    size: "2.75rem"
  viewer-control:
    backgroundColor: "rgba(12, 13, 13, 0.72)"
    textColor: "{colors.stage-ink}"
    rounded: "{rounded.circle}"
    size: "3rem"
  viewer-control-active:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.signal-ink}"
    rounded: "{rounded.circle}"
    size: "3rem"
  project-selector:
    backgroundColor: "transparent"
    textColor: "{colors.stage-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "1rem 0.75rem"
  animation-control:
    backgroundColor: "transparent"
    textColor: "{colors.stage-ink}"
    rounded: "{rounded.square}"
    padding: "0.45rem 0.7rem"
    height: "2.75rem"
---

# Design System: Kaing Menglay Portfolio

## Overview

**Creative North Star: "The Living Orbital Atelier"**

This portfolio is a spatial workshop, not a conventional hero followed by project cards. Bone-white gallery light surrounds a near-black model chamber, real GLB objects occupy the visual center, and oversized outlined typography, coordinate marks, orbital rings, and a receding grid make the interface feel like a navigable creative environment.

The system balances two attitudes: a precise technical instrument and an expressive personal atelier. Syne behaves like architecture, Manrope keeps factual material quiet and legible, and acid chartreuse identifies anything live, selected, progressing, or ready for action. The interface gives visitors a clear sequence: enter the stage, switch and manipulate objects, discover animation clips, then continue into a compact account of practice, identity, and contact.

**Key Characteristics:**

- The real interactive model is the dominant artifact and the near-black exhibit chamber is its permanent stage.
- Bone-white gallery fields and black practice bands alternate in large, decisive planes.
- Acid chartreuse is the single live-state signal and portrait field.
- Hairline axes, grids, coordinates, rings, and outlined name typography create spatial depth without ornamental cards.
- Syne carries identity and architectural headings; Manrope carries explanation, labels, and controls.
- Motion feels orbital and responsive: pointer parallax, rotating rings, scanning lines, expanding gaps, and staged reveals.

## Colors

The palette is a high-contrast dialogue between bone-white gallery light and a near-black model theatre, with acid chartreuse reserved for living state and personal presence.

### Primary

- **Live Acid:** The sole chromatic signal. Use it for current model markers, loading and scroll progress, active viewer tools, focus outlines, highlighted words, status pulses, and portrait fields.
- **Signal Ink:** The almost-black partner used for copy and icons placed on Live Acid.

### Neutral

- **Bone Gallery:** The default page field and the light-theme ground for the opening atelier.
- **Soft Bone:** A subtly lifted gallery surface for the biographical section and mobile navigation.
- **Atelier Ink:** Primary text, dark practice fields, and the inverse fill for primary actions.
- **Graphite Note:** Secondary copy and supporting metadata on gallery surfaces.
- **Coordinate Hairlines:** Low-opacity rules for axes, grids, panel boundaries, and typographic outlines; the stronger variant is for silhouettes that must remain legible.
- **Model Void:** The live model chamber and contact field. Its raised counterpart separates selected rail items and nested chamber surfaces.
- **Chamber White:** Primary model-stage copy and objects, paired with a muted technical gray for coordinates, descriptions, and instructions.
- **Night Gallery:** Dark mode swaps the gallery canvas, soft canvas, ink, and rule values while leaving the model chamber and chartreuse signal semantically stable.
- **Alert Coral:** Error-state icon color inside the dark chamber; it is never a decorative accent.

### Named Rules

**The Live Signal Rule.** Acid chartreuse means alive, active, selected, progressing, or directly actionable; do not spend it as ambient decoration.

**The Chamber Constancy Rule.** The model theatre stays near-black in both themes so the work remains the same visual event while the surrounding gallery changes.

**The Two-World Rule.** Large bone and black planes may alternate, but intermediate gray cards must not soften the composition into a dashboard.

## Typography

**Display Font:** Syne (with Trebuchet MS and sans-serif fallbacks)  
**Body Font:** Manrope (with Segoe UI and sans-serif fallbacks)  
**Technical Coordinates:** UI monospace (with Cascadia Mono and monospace fallbacks)

**Character:** Syne is broad, geometric, and spatial; it is allowed to become scenery as well as language. Manrope stays compact and lucid for identity, factual copy, navigation, controls, and technical labels. Monospace appears only where coordinate or instrument character is useful.

### Hierarchy

- **Architectural Display** (700, fluid oversized scale, 0.75 line-height): Outlined background name typography that crosses the hero as environmental structure rather than reading copy.
- **Section Headline** (600, fluid large scale, about 0.9 line-height): Practice, about, and contact statements; tight tracking and compressed leading keep the forms monumental.
- **Hero Title** (600, fluid medium display scale, 0.94 line-height): The concise personal proposition at the left edge of the first viewport.
- **Exhibit Title** (600, compact fluid scale): The active model name centered in the chamber header and smaller titles within the system.
- **Body** (400, 1rem base, 1.6 line-height): Explanatory content, with short measures around 31–64 characters depending on context.
- **Label** (700, compact scale, tracked and usually uppercase): Navigation, status, section indexes, categories, and metadata.
- **Coordinate** (compact monospace, tracked): Sparse X/Y notations and model numbering only.

### Named Rules

**The Type-as-Structure Rule.** Oversized Syne may sit behind content, crop at the viewport edge, or appear as a one-pixel outline; it should help define space, never become a wallpaper slogan.

**The Two Voices Plus Coordinates Rule.** Use Syne for constructed display moments, Manrope for all human reading and control text, and monospace only for instrument-like coordinates.

## Layout

The layout is an orbital field rather than a stack of cards. A fixed header floats over the opening stage; beneath it, the first viewport uses a spacious two-column composition with concise identity copy and actions at left and a large portrait/status field at right. Oversized outlined name typography, a perspective grid, cross-axis, rings, and restrained pointer parallax bind the pair into one environment. The live exhibit chamber follows immediately as the first section below the hero, creating a clear transition from personal presence to interactive proof.

The exhibit is a dark rectangular theatre with a three-part header, a dominant viewer, circular tools on the chamber edge, and a horizontal model rail plus inspector below. Its rail makes switching models feel like moving through objects in one space, not navigating separate project pages. Subsequent sections use large split planes, ruled lists, circular practice diagrams, and one central contact orbit.

Page gutters are fluid and the hero is bounded by a generous wide-screen container so its copy and portrait remain balanced on large displays. At the stacked threshold the header becomes a two-column bar, navigation becomes an overlaid ruled panel, the hero becomes copy then portrait in normal flow, and the exhibit remains the immediate next section at full available width. The exhibit inspector reorganizes independently at compact widths. On small phones the viewer stays tall, its tools move to a centered bottom row, project choices remain horizontally scrollable, and content grids collapse to one column. Circular theme and menu controls retain a 44px target.

**The Proof-After-Presence Rule.** The opening viewport belongs to identity and portrait; the uninterrupted model chamber must appear immediately afterward as the first proof section, never separated by unrelated content.

**The Mobile Story Rule.** Preserve the sequence copy → portrait → viewer on mobile. Do not hide the portrait or move unrelated content between the portrait and model.

**The Rail, Not Cards Rule.** Repeated projects belong to one ruled selector rail attached to the shared viewer; do not create a grid of independent project cards.

## Elevation & Depth

Depth is primarily structural: background name outlines, coordinate lines, receding perspective grids, concentric rings, tonal stage gradients, overlapping planes, and pointer-responsive offsets create a navigable field. The near-black exhibit receives one broad shadow to detach it from the bone gallery. Overlay surfaces use compact functional shadows and blur only when they physically float above content.

### Shadow Vocabulary

- **Exhibit Chamber** (`0 28px 80px rgba(0,0,0,.22)`): The only strong ambient shadow, used to make the live 3D theatre read as a physical object in the gallery.
- **Mobile Navigation** (`0 18px 50px rgba(0,0,0,.16)`): Functional separation for the open navigation panel.
- **Live Halo** (`0 0 0 5px color-mix(in srgb, var(--signal) 18%, transparent)`): A state halo around small live dots, not general elevation.

### Named Rules

**The One Heavy Object Rule.** The exhibit chamber is the only surface with a large ambient shadow; ordinary sections and rail cells remain flat.

**The Drawn Depth Rule.** Prefer lines, rings, perspective, overlap, and tonal gradients before adding another shadow.

## Shapes

The system uses a deliberate geometric split. Architectural fields, the exhibit chamber, actions, rail cells, labels, animation chips, selects, and content bands are square. Circles belong to orbital diagrams, status dots, portrait guides, and compact viewer or header tools. The juxtaposition makes the chamber feel engineered while the surrounding environment feels in motion.

Hairline borders are structural and usually run edge-to-edge. The supplied portrait is contained in a hard rectangular crop with circular guides behind the figure. The live model sits above a flattened elliptical ground ring, reinforcing three-dimensional presence without imitating a product pedestal.

**The Circle Has a Job Rule.** Use circles only for orbit, live state, compact icon controls, or portrait geometry; never round rectangular content containers for softness.

**The Hard Frame Rule.** Stage, rail, action, field, and section boundaries stay square and precise.

## Components

### Primary Action

- **Character:** A compact black instrument with an intentionally expanding arrow gap.
- **Shape:** Square with a 3rem minimum height.
- **Default:** Atelier Ink on Bone Gallery with bold Manrope text.
- **Hover / Focus:** Hover changes to Live Acid, switches to Signal Ink, and lengthens the icon gap; focus uses the shared 3px Live Acid outline with a 4px offset.

### Icon Buttons

- **Character:** Circular utility controls that punctuate the otherwise hard-edged header.
- **Shape:** A 2.75rem circle, establishing the required 44px header-control target.
- **Default:** Transparent with a hairline border.
- **Hover / Focus:** Hover inverts to Atelier Ink on Bone Gallery and rotates slightly; theme icon states crossfade and rotate within the fixed circle.

### Navigation

- **Style:** Fixed three-part header with square KM mark, centered uppercase links, live viewer status, theme control, and mobile menu control.
- **State:** Desktop links reveal a one-pixel underline from the left. The scrolled header gains a translucent canvas, hairline boundary, and 18px backdrop blur.
- **Mobile:** Links become full-width ruled rows inside an overlaid Soft Bone panel; the active indicator becomes a vertical rule.

### Exhibit Chamber

- **Character:** The signature near-black object theatre and the heaviest visual mass on the page.
- **Frame:** Square, strongly shadowed, and divided by low-contrast chamber hairlines.
- **Viewer:** Uses a radial black-to-charcoal field, center axes, an elliptical ground ring, coordinate labels, stable loading/error overlays, and a full-height model-viewer surface.
- **Responsive behavior:** Central floating theatre on wide screens; full-width theatre in the mobile narrative flow.

### Viewer Controls

- **Shape:** Three 3rem circular tools stacked on the right edge of the viewer, then arranged in a row near the bottom on small screens.
- **Default:** Translucent black with chamber hairline borders and blur.
- **Hover / Selected:** Fill Live Acid, use Signal Ink, and scale slightly. Desktop tooltips emerge toward the chamber interior; mobile suppresses them.

### Project Rail

- **Style:** Five square cells attached directly below the viewer, each carrying an index, compact Syne title, and circular state mark.
- **State:** Hover and active states lift the cell tonally; active state adds a 2px Live Acid baseline and live halo.
- **Behavior:** Horizontal overflow is intentional at narrow widths so the viewer remains singular and project selection remains direct.

### Animation Controls

- **Style:** Square outlined chips, playback controls, and a square speed field inside the exhibit inspector.
- **State:** Hover and selected clips invert to Live Acid with Signal Ink; unavailable animation content remains quiet chamber-gray copy.
- **Behavior:** Clip buttons are generated from the active GLB rather than hard-coded.

### Portrait Field

- **Style:** The supplied transparent portrait sits on Live Acid with one-pixel dark framing and concentric circular guides.
- **Use:** A large right-column field in the opening stage and a full-height split-panel image in the about section.
- **Responsive behavior:** The opening portrait remains visible between hero copy and the viewer on mobile.

## Do's and Don'ts

### Do:

- **Do** keep a real interactive GLB as the dominant visual artifact in the opening experience.
- **Do** use Live Acid for live, active, selected, progressing, focused, or portrait-field roles.
- **Do** build depth with coordinate hairlines, perspective grids, rings, overlap, and restrained parallax.
- **Do** preserve the singular exhibit chamber and its attached horizontal model rail.
- **Do** let Syne headings behave like architecture while keeping factual copy concise in Manrope.
- **Do** keep light and dark themes role-equivalent, all controls keyboard-visible, and circular theme/menu controls at least 44px.
- **Do** preserve reduced-motion behavior by removing parallax, long reveals, and continuous orbital movement when requested.

### Don't:

- **Don't** turn the portfolio into a conventional hero followed by a grid of project cards.
- **Don't** introduce a second decorative accent or use chartreuse on passive decoration that could be mistaken for state.
- **Don't** brighten the model chamber in light mode or flatten it into the surrounding gallery canvas.
- **Don't** round rectangular stages, rail cells, buttons, fields, or content panels into a soft SaaS-card language.
- **Don't** add shadows to every surface; the exhibit chamber must remain the one heavy object.
- **Don't** remove the portrait from the first mobile viewport sequence or place it after the viewer.
- **Don't** use Syne for long reading text or monospace for general labels and prose.
