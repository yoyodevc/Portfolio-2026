# John Fredrick N. Lim, in print

A portfolio drawn entirely in code as a risograph sheet. Twelve isometric rooms, one for each part of my work, sit together on one printed poster. The page prints itself in, then the camera tours the rooms in order and a chapter card with the details eases in whenever it settles.

Open `index.html` in any modern browser. That's the whole site.

- **Size:** 103539 bytes, one file
- **Network:** exactly one request (the page itself). No images, data-URI images, font files, libraries or external scripts. Canvas 2D only.
- **Text:** the only text on the page is the chapter card, set in system serif fonts.

## Controls

| Input | What it does |
| --- | --- |
| Drag | Pan, with inertia |
| Scroll or pinch | Zoom, anchored on the cursor or fingers |
| Double-click a room | Fly to it |
| Arrow keys | Pan |
| `+` / `-` | Zoom |
| `0` | Fit the whole sheet |
| `C` | Show or hide the chapter card |

Any input pauses the tour. It picks up again from wherever you are after a few quiet seconds.

If your system asks for reduced motion, the camera flies are shorter with no zoom swoop, the card fades without sliding and the linework boils more slowly.

## The rooms

The quotes come from the copy on my previous portfolio (`src/data` and the section components), lightly tidied for casing and punctuation.

| Chapter | Title | Quote on the card |
| --- | --- | --- |
| I | Hello, I’m John | “Educator and tech enthusiast who loves learning and building things. I teach by day and explore web and mobile development by curiosity, chasing better tools, better craft, and experiences worth caring about.” |
| II | Engineering with Intention | “I’m drawn to work where design and engineering overlap. I care about things like transition timing, focus management, and whether a form error is actually helpful. Not because perfection is the goal, but because users notice when something feels right.” |
| III | Hatchify | “Graduated with a focus on software engineering fundamentals, algorithms, and systems programming. Completed a capstone project on a remote real-time monitoring system and automated egg incubator.” |
| IV | The Lecture Hall | “Taught core programming and technology subjects while actively contributing to student development inside and outside the classroom. Built genuine rapport with students through mentorship, org advising, and a shared passion for esports.” |
| V | The Press Room | “Served as adviser for the local publication organization, guiding students in editorial and organizational work.” |
| VI | Game Night | “Fostered strong student engagement as an esports coach, creating a space that made learning feel approachable and motivating.” |
| VII | The Hackathon | “Mentored students in hackathon competitions and supported an international student throughout their academic journey.” |
| VIII | Freelance | “Designed and developed end-to-end solutions independently, from requirements gathering to deployment.” |
| IX | PokéClash | “An API-based Pokémon stat battle simulator, emphasizing data fetching, handling, and dynamic content rendering. I designed it with a retro theme inspired by classic Pokémon games.” |
| X | To-do List | “A secure cross-platform to-do app built for users who value privacy and control. All tasks, categories, and personal data are stored locally on-device using IndexedDB, with no cloud syncing, tracking, or external data collection.” |
| XI | Calculator | “A privacy-first calculator that keeps every calculation and history entry stored locally on your device. Nothing is uploaded, tracked, or shared.” |
| XII | Let’s Work Together | “I’m open to full-time roles, freelance projects, and interesting collaborations. If you have something worth building, I’d like to hear about it.” |

The recurring motif is my teal coffee mug with a red band. It appears in every room, sometimes obvious (on a desk) and sometimes hidden (drawn in chalk, printed on a drying sheet, a pixel poster, a postage stamp, tucked between trophies).

## The four inks

| Ink | Hex | Screen angle | Used for |
| --- | --- | --- | --- |
| Sunflower | `#FFB511` | 0° | warm light, wood, lamp pools |
| Bright Red | `#F15060` | 14° | accents, skin warmth, the gown |
| Teal | `#00838A` | 76° | walls, glass, the mug, plants (with Sunflower) |
| Federal Blue | `#3D5588` | 45° | linework, shadows, hair, the key plate |

Every other colour on the sheet (greens, oranges, browns, purples) only exists where two plates overprint.

## How the print simulation works

1. **Screens as seamless tiles.** Each ink has an integer screen vector, for example (4,1). The dot lattice built from (a,b) and (-b,a) repeats on the pixel grid every (a²+b²)/gcd(a,b) pixels, so each rotated screen can be pre-rendered once per tone level as a seamless tile and used as a canvas pattern. Dots get a little seeded jitter in size and position, and a few go missing.
2. **Ten tone levels.** Densities snap to ten steps. Level ten is a solid with random ink dropout and faint roller streaks. Because tones are stepped, light (lamp pools, the heat lamp in the incubator, window light, string lights, the sun) is drawn as concentric halftone rings, never gradients.
3. **Knock-out and overprint.** Every filled shape first knocks a hole in whatever is behind it by filling with paper, then each plate is laid down with `multiply`. Overlaps inside a shape produce the secondary colours. Lines and shadows overprint without knocking out.
4. **Misregistration.** Each plate is shifted by its own small offset, so edges show slivers of paper on one side and overlap on the other, and the registration marks in the margins fringe in four colours.
5. **Paper and ink density.** The paper is a seeded tile of grain and fibres. After a room is printed, a soft mottle pass lifts the ink unevenly, the way a drum runs slightly dry.
6. **Boiling linework.** Lines are filled, tapered strokes lifted at corners like a hand contour. Every point passes through a displacement field keyed to a boil variant. Each room is baked in three variants and they cycle at 3 Hz, so the linework breathes like animation on twos. All randomness is seeded, so the sheet draws the same way on every load.
7. **People.** Figures share one skeleton (about 7.5 heads tall) with keyframed pose clips: walk, sit, type, read, drink, write, point, teach at the board, raise a hand, game, cheer, press, feed paper, think and sleep. Bodies are tapered volumes for limbs, a spine-driven torso and a three-quarter head, then dressed in shirts, hoodies, coats, skirts, a graduation gown and cap. Limbs and torsos carry a band of shadow on the side away from the light, and clothes get collars, buttons, pockets and folds. Faces get brows, eyes, a nose, a mouth and ears up close. They follow looping paths through their rooms and are redrawn on twos (12 fps) into a layer that shares the room's dot screen.
8. **Performance.** Rooms are recorded once as drawing operations and baked into cached bitmaps a slice at a time per frame, at a level of detail chosen by zoom (up to three), with only the nearest high-resolution rooms kept in memory (three, or two on a phone). The paper, margins and rooms are cached as one layer and only redrawn when the camera or boil frame changes. People are the only thing redrawn on a timer.

## Where it lives

This folder sits in `public/`, so Vite copies it into the build as is and the page is published at `/riso/` next to the React site, which it does not touch. To make it the main site instead, serve `index.html` from this folder as the root page.
