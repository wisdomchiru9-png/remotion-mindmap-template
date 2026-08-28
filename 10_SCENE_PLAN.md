# Ten-Scene Plan

This sequence is designed for a two-minute talk about productivity, attention, and Benjamin Franklin. The scene components are intentionally short and reusable; the existing `MindmapPin` composition carries the detailed Franklin map tour.

| Scene | Approx. time | Purpose | Implementation |
| --- | --- | --- | --- |
| 1. Hook | 0:00-0:10 | Interrupt the scroll with the central question about attention. | `HookTitle` with a short highlighted phrase. |
| 2. The number | 0:10-0:20 | Give the audience one memorable attention statistic. | `StatReveal` using `StatCounter`. |
| 3. The problem | 0:20-0:32 | Show the cost of fragmented attention and establish the tension. | `KineticWords`, `CardGrid`, or a short visual interruption. |
| 4. Find the map | 0:32-0:42 | Move from the modern problem into Franklin's system. | Reuse `MindmapPin` with a short target list. |
| 5. Input | 0:42-0:54 | Explain deliberate reading and choosing useful inputs. | `NewImg` with `Transition` or a focused card. |
| 6. Practice | 0:54-1:06 | Turn Franklin's virtues into a repeatable daily practice. | `CardGrid` with one virtue active at a time. |
| 7. Reflection | 1:06-1:18 | Create a quiet beat for the audience to connect the ideas to their day. | `Typewriter` or `KineticWords` over a restrained background. |
| 8. Zoom in | 1:18-1:30 | Reinforce one concrete Franklin idea with visual emphasis. | Reuse `MindmapPin` with a shorter target list. |
| 9. Synthesis | 1:30-1:48 | Bring productivity and attention back together in one takeaway. | `GlowCard`, `StatCounter`, or a compact custom composition. |
| 10. Close | 1:48-2:00 | Leave the audience with a clear action and final line. | `ClosingCTA` with `ClosingWalls`. |

## Suggested arc

Scenes 1-3 move quickly and use contrast. Scenes 4-8 slow down for the Franklin mindmap and its practical ideas. Scenes 9-10 compress the message into one takeaway and a final action.

Keep the text on screen sparse: one claim, one image, or one motion idea per scene. Use the existing helpers for entrances and exits so the pacing stays consistent across the sequence.