# Remotion Mindmap Template

A [Remotion](https://www.remotion.dev/) project for programmatically generating short-form "hook" videos and Ken Burns-style mindmap tours using React. Videos are assembled from reusable scene and helper components, most of which support frame-based entrance/exit timing so they can be mixed and staggered freely.

This document covers every file in `src/scenes/`, `src/helpers/`, and `src/Root.tsx`.

## Getting Started

**Install dependencies**
```console
npm i
```

**Start the Remotion Studio preview**
```console
npx remotion studio
```

**Render a video to MP4**
```console
npx remotion render
```

**Upgrade Remotion**
```console
npx remotion upgrade
```

---

## How the project fits together

- **`Root.tsx`** registers every renderable video ("Composition") and supplies its starting data (images, text, timing).
- **`scenes/`** contains full-screen scene components — each one is a complete video composition on its own.
- **`helpers/`** contains smaller, reusable building blocks (text effects, cards, badges, transitions) that scenes are built from.
- Most components follow the same entrance pattern: fade in + move/scale in over a short window (using `interpolate()`), stay visible, then optionally disappear after an `endFrame`.
- Many components accept `translate` / `scale` values that were set by hand-dragging elements inside Remotion Studio's visual editor (the `Interactive.Div` wrapper). These numbers are safe to tweak but were not chosen programmatically — expect oddly specific decimals like `translate: "235.6px -583.1px"`.

---

## Root.tsx

Registers all compositions inside a `Folder` named `"Franklin-Part-1"` (this project is part of a multi-part series; folders keep each part's scenes grouped in the Remotion Studio sidebar).

**Tip:** `//npx remotion still MindmapPin-1920x1080 thumbnail.png --frame=0` (comment at the top of the file) is a saved CLI command for generating a thumbnail image from frame 0 of a composition.

Two compositions are currently registered:

| Composition ID | Component | Duration | Notes |
|---|---|---|---|
| `MindmapPin-1920x1080` | `MindmapPin` | Auto-calculated via `calculateMindmapDuration(targets)` | The Franklin mindmap Ken Burns tour, 1920×1080 |
| `Intro` | `Intro` | 1030 frames (~34s @ 30fps) | The hook/intro scene |

The `Intro` composition has `// @ts-expect-error it works lol` above it — there's a known TypeScript prop mismatch that's being intentionally silenced rather than fixed, since it works correctly at runtime. Leave this as-is unless actually refactoring the component's prop types.

The `targets` array in `Root.tsx` defines the actual camera path for the Franklin video (9 stops: an overview, 8 labeled sections, back to overview). Most coordinates are long, non-round decimals (e.g. `325.8037357621911`) — these were almost certainly generated using the coordinate-extraction console script documented in `scenes/MindmapPin.tsx` (see below), not typed by hand.

---

## Scenes

### `scenes/Intro.tsx`
*(internal file header names it `PatternInterrupts.tsx`; exported component is `Intro`)*

The attention-grabbing opener scene — built to interrupt a viewer's scroll before their "brain can settle" (per the prop names).

- Full-screen dark purple (`#0a0510`) background.
- Displays a cropped, positioned video clip (`intro-simpsons-standard-testing.mp4`) inside a draggable `Interactive.Div`, clipped with `clipPath` to a custom frame.
- Displays one image (`Intro-books-read-b4-die.png`) via `NewImg`, visible from frame 0–90 (3 seconds).
- **A two-column layout with a `Badge` and a `CardGrid` of hook cards is built into the code but currently commented out.** As shipped, the live scene only shows the video clip and one image — the badge/card layout is available to re-enable but not active.

### `scenes/MindmapPin.tsx`
*(exports `MindmapPin`, `Target` type, and `calculateMindmapDuration()`)*

A **templatized**, fully reusable version of the Ken Burns mindmap tour — pass in a different image and target list via props and it produces an entirely new video with no code changes. This is a generalized rewrite of `helpers/MindmapZoom.tsx` (see below).

**Core mechanism:**
1. `buildKeyframes()` walks through an ordered list of `Target` objects (`{ label, x, y, scale, holdSeconds }`) and builds an explicit frame → x/y/scale timeline: for each target, it records an "arrival" frame and a "hold-end" frame.
2. `calculateMindmapDuration(targets)` runs this same logic just to return the total frame count — call this in `Root.tsx` so you never have to manually count frames when the target list changes.
3. Inside the component, three `interpolate()` calls (for camera X, Y, and scale) smoothly blend between those keyframes using `Easing.inOut(Easing.cubic)`, producing natural acceleration/deceleration instead of robotic linear movement.
4. The resulting camera values are converted into a single CSS `transform: translate(...) scale(...)` applied to the whole image layer — this *is* the pan-and-zoom effect.

**Visual layers on top of the moving background** (all positioned via hand-dragged `Interactive.Div` offsets):
- Small decorative divider lines
- "Harvard Classics" label
- A portrait image at 50% opacity (`NewImg`)
- A small uppercase "numbered headline" animated word-by-word (`KineticWords`)
- A large bold static headline
- An italic "clickbait" line typed out character-by-character with word highlighting (`Typewriter`)
- The mindmap image itself, plus a logo image overlay

**Finding target coordinates:** a commented-out block at the bottom of the file is a browser dev-console script that, when run against an embedded mindmap SVG (via an iframe), automatically locates text nodes by known labels/years and extracts their real pixel coordinates — converting them straight into ready-to-paste `Target` objects. This is the fast way to build a new `targets` array for a new mindmap image; the long-decimal coordinates already in `Root.tsx` were very likely produced this way.

---

## Helpers

### `helpers/NewImg.tsx`
A thin wrapper around Remotion's `Img` that adds visibility windowing: pass `startFrame`/`endFrame` and the image snaps to `opacity: 1` inside that window and `opacity: 0` outside it (no fade, an instant toggle). Also smart-handles image sources — a full URL (`http...`) is used directly, while a bare filename is automatically wrapped in `staticFile()` (Remotion's helper for referencing files in `public/`).

> **Known issue:** the component hardcodes `translate: "-192px 29.2px", scale: 1.057` after spreading the caller's `style` prop, meaning any `translate`/`scale` passed in via `style` is silently overridden. Repositioning currently requires editing this file directly rather than passing style props.

### `helpers/KineticWords.tsx`
Pops each word of a string in individually — scaling down from 1.6× to 1×, fading in, and sliding up slightly — staggered so each word starts `wordDelay` frames (default 6) after the previous one, creating a rapid cascading entrance. Good for short, punchy hook text rather than a slow typewriter reveal. Supports highlighting specific words in an accent color via the `highlight` prop (punctuation-insensitive matching).

> Note: the `color` prop only affects individual (non-highlighted) word spans — the outer container has its text color hardcoded to `#8f8f8f` directly in its style object.

### `helpers/Typewriter.tsx`
A character-by-character typewriter effect with a blinking cursor. More advanced than a basic version:
- **`pauseAfter`** — list specific words after which typing pauses for an extra 30 frames (for dramatic timing).
- **`highlight`** — colors specific *substrings* (not just whole words) using a dynamically built, escaped regex.
- Cursor is solid while typing, then blinks every 10 frames once typing completes.
- A code comment notes the cursor color used to be hardcoded black (invisible on dark backgrounds) and was fixed by exposing it as the `cursorColor` prop.

> **Possible bug:** the visible text is computed by slicing the string into 120-character chunks (`text.slice(start * 120, ...)`) and only rendering the current chunk. For text under 120 characters this behaves normally, but longer text may appear to reset and restart typing at each 120-character boundary rather than continuously growing. Worth testing with longer copy before relying on this for long paragraphs.

### `helpers/constants.ts`
The shared design system for the whole project:
- **`FONT_FAMILY`** — EB Garamond (serif) at weight 800, loaded via `@remotion/google-fonts` so it renders correctly during server-side video rendering. *(Not currently referenced by any file we reviewed — may be unused, or intended for a component not yet built.)*
- **`COLORS`** — background/text/accent colors, plus a set of semi-transparent "glassmorphism" colors (`glass`, `glassBorder`, `glow`, `wall`, `wallBorder`) used by `GlowCard.tsx` and `Wall.tsx`.
- **`EASINGS`** — four named cubic-bezier curves: `crispEntrance` (fast/snappy), `editorial` (smooth/symmetric), `pop` (overshoots past 1.0 for a springy bounce), `heavyOut` (simple deceleration — the most commonly used curve across the project).

### `helpers/Card.tsx`
*(file is `Card.tsx`; exports `HookCard` and the `HookCardData` type)*

A single animated card for hook-style lists (e.g. "6 books to read"). Lands with a fade + rise + scale-up entrance, then draws in a colored underline beneath its label shortly after. If `isActive`, gets a continuously pulsing glow (`Math.sin(frame / 10)`-driven) around its border.

### `helpers/CardGrid.tsx`
Lays out multiple `HookCard`s in a CSS grid (configurable columns/gap) and automatically staggers their entrance times. Also auto-cycles which card is marked "active" (glowing) every 20 frames, looping back to the first card — no manual control needed over which card highlights when.

### `helpers/GlowCard.tsx`
A generic "frosted glass" container for arbitrary content (`children`) — semi-transparent background, subtle border, soft glow shadow, using the `glass`/`glassBorder`/`glow` colors from `constants.ts`. Fades in and scales up slightly (95%→100%) on entrance. **Unrelated to `HookCard`/`CardGrid`** — a separate, general-purpose wrapper, not used inside the card-grid system.

### `helpers/MindmapZoom.tsx`
The **original, non-templatized** version of the Ken Burns mindmap effect — hardcoded to one specific image (`FSIQ.jpg`) and one hardcoded `targets` array (the earlier Franklin autobiography set, with round-number coordinates like `x: 645, y: 425`). Uses the same core keyframe/interpolation approach as `scenes/MindmapPin.tsx`.

**Notable difference:** this version includes a caption system (`buildLabelWindows`, `getCurrentLabel`) that fades a text label in and out to match whichever target is currently active — a feature that does **not** appear to have been carried over into the newer, templatized `MindmapPin.tsx`. This file looks like the predecessor that `MindmapPin.tsx` was generalized from; worth confirming with Agney whether it's still needed, or whether the caption feature should be ported into the newer component and this file retired.

### `helpers/Transitions.ts`
*(internal file header names it `helpers/AnimatedImg.tsx`; exports `Transition`)*

A large preset library of 23 named animation effects (`fadeSlideUp`, `kenBurnsIn`/`Out`, `scaleIn`, `zoomIn`/`Out`, `punchIn`, `spinIn`/`spinInFull`, `tiltIn`, `skewIn`, `wipeLeft`/`Right`/`Up`/`Down`, `irisIn`, `shakeSettle`, `blurIn`/`Out`, etc.). Unlike the other helpers, `Transition` is **not a component that wraps children** — it's a plain function that returns a `{transform, filter, clipPath}` style object, meant to be spread onto whatever element you want animated: `const style = Transition({ animation: "zoomIn", ... })`.

Notable effects:
- **`punchIn`** — a two-stage interpolation that overshoots past 100% scale before settling, for a "punchy" pop.
- **`shakeSettle`** — a damped sine wave (exponential decay) producing a shake that gradually calms to a stop, like a physical object settling after an impact.

### `helpers/StatCounter.tsx`
A small stat display: a small uppercase label (e.g. "AVG. TIME BETWEEN HOOKS") beside a large number (e.g. "22s"). Fades in and scales up from 70% on entrance.

### `helpers/Wall.tsx`
*(exports `Wall` and `ClosingWalls`)*

A "walls closing in" visual effect. `Wall` renders one colored, gradient-filled bar on a given side (`top`/`bottom`/`left`/`right`) whose visible gap shrinks as `progress` goes from 0 (open) to 1 (closed). `ClosingWalls` renders all four sides at once with a staggered start (`i * stagger`) so they don't move in perfect unison — adding a bit of organic asymmetry to the closing motion.

### `helpers/Badge.tsx`
A small pill-shaped label (e.g. "SELF EDUCATION IS A RABBIT HOLE" — see the commented-out usage in `scenes/Intro.tsx`). Fades in and rises 10px on entrance. Uses a neat color trick: the background is the same `color` prop with a `"22"` hex-alpha suffix appended (~13% opacity), giving a tinted-glass look without needing a separate background-color prop.

> Note: accepts an `icon` prop (default `"⚡"`) that is never actually rendered in the component's JSX — currently has no visible effect.

---

## Known issues / things to double-check

- **`NewImg.tsx`** — hardcoded `translate`/`scale` override any values passed via the `style` prop.
- **`Typewriter.tsx`** — 120-character chunking may cause text to visibly restart rather than continuously grow for longer strings.
- **`constants.ts`** — `FONT_FAMILY` appears unused across the reviewed files.
- **`Badge.tsx`** — `icon` prop is accepted but never rendered.
- **`MindmapZoom.tsx`** vs **`MindmapPin.tsx`** — likely predecessor/successor pair; the older file's caption feature wasn't carried over to the newer, templatized version. Worth confirming which is the source of truth going forward.

## Help

For general Remotion questions, see the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals) or the [Discord server](https://discord.gg/6VzzNDwUwV).
