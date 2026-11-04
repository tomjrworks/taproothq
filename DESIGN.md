# Taproot Labs design system

The canonical record of this design is the vault note `decisions/taproot/2026-11-02-taproot-labs-site-design-lock.md`. If this file and that note disagree, the note wins. This file describes the code as shipped, in `src/components/labs/` and `src/app/(labs)/`.

It covers the Labs pages only: `/`, `/about`, `/services`, `/work`. Taproot's product marketing under `/taproot` and the app routes keep their own look.

The design is locked. Changing the look needs Tom. Rejected directions are listed in the lock note under "Rejected along the way", so check there before proposing one.

## Brand rules

- Never black. The darkest color is bark, `#3D3529`. Dark mode is bark, not forest and not black.
- Every page headline is one Fraunces line, with its last words in the italic accent.
- No fabricated assets. The mark is `/images/taproot-logo.png` with "Taproot Labs" typed beside it.
- The code drawings are final. No generated engravings.

## Tokens

Set as CSS variables by `ThemeShell`, from `T` in `tokens.ts`.

| Variable | Light | Dark (bark) |
| --- | --- | --- |
| `--bg`, `--paper` | `#EAE5D6` | `#3D3529` |
| `--ink`, `--rule` | `#3D3529` | `#EEE8D6` |
| `--muted` | `#6E6555` | `#BDB4A0` |
| `--hair` | `rgba(61,53,41,.28)` | `rgba(238,232,214,.26)` |
| `--accent`, `--btn` | `#1A5C32` | `#B3D99F` |
| `--btn-ink` | `#EFEBDF` | `#3D3529` |
| `--card` | `#F1ECE0` | `#463D30` |
| `--mark-bg` | transparent | `#EEE8D6` |

## Type

Fonts load in `(labs)/layout.tsx`. The helper classes live in `labs.css`.

| Class | Family | Settings | Used for |
| --- | --- | --- | --- |
| `f-fr` | Fraunces | opsz 144, SOFT 50, WONK 0 | Headlines, step text, numerals |
| `f-ar` + `caps` | Archivo | uppercase, 0.14em tracking | Labels and buttons, 10-12px, semibold |
| `f-ar-cond` | Archivo | wdth 68, extrabold, uppercase | Section heads and card heads |
| `f-s4` | Source Serif 4 | normal | Body, captions, form fields |

- Home headline: `clamp(56px,13vw,200px)`. Other page headlines: `clamp(50px,7.6vw,116px)`. Both at leading 0.92, tracking -0.03em.
- Section heads: 46px, 70px from `md`. Card heads: 36px.
- `.f-fr em` and `.f-s4 em` undo the `opsz` that `globals.css` sets on every `em`. Removing them changes the italic accent words.

Shared class strings are in `tokens.ts`: `W`, `label`, `btn`, `condensed`, `input`, plus the `field` style.

## Layout

- Container `W`: `mx-auto max-w-[1280px] px-5 md:px-10`.
- Content uses a 12-column grid from `md`. Contact and Work split 5 and 7. Services alternates a 5-column text block with a 7-column plate.
- The header is 66px high. Under `md` the nav drops to its own row below the header.
- Platform range is 390px to 1440px, with no horizontal scroll at any width.

## Components

From `Frame.tsx`:

- `Frame`: the page shell. Header, nav, the contact section (every page but Work), the orchard footer.
- `Masthead`: double rule, caps strip, the serif and italic headline, a closing rule.
- `SectionHead`: double rule, condensed title, optional italic aside.
- `Plate`: a figure in a ruled frame, with a "Fig. n" caption.
- `Drawing`: a scene sized to its own proportions, without a fade, for use inside a `Plate`.
- `Rule`, `DoubleRule`: the 1px rule, and the 3px and 1px pair that opens every section.

Elsewhere in `src/components/labs/`:

- `Mark`: the sprout mark with "Taproot Labs" beside it.
- `Engraving`: renders a scene from `sketch.ts`.
- `Backdrop`: the home page's seed endpaper.
- `Reveal`, `DrawRule`: entrance motion for a block and for a rule.
- `ThemeShell`, `ThemeToggle`: theme state and the DARK / LIGHT pill.
- `ContactForm`, `AskToSeeForm`: the two forms.
- `FormCard`, `Honeypot`, `SubmitButton`, `SendError`, `SentNote`, `useLabsForm`: the parts both forms share.
- `labsMetadata`: the whole `Metadata` for a Labs page. A segment that sets `openGraph` without `images` drops the share card, so no Labs file sets `openGraph` any other way.

Client components import class strings from `tokens.ts`, never from `Frame.tsx`.

## Buttons and labels

- `btn`: Archivo caps, 12px, semibold, `rounded-[4px]`, on `--btn` with `--btn-ink`.
- Form submit: full width, `py-4`, `rounded-[5px]`, Archivo caps, 12px, bold, 0.18em tracking.
- `label`: Archivo caps, 11px, semibold. A required field marks itself with an asterisk in `--accent`.

## Form states

Both forms post JSON to `POST /api/contact` and sit in a `FormCard`: `--card` background, a 1.5px `--rule` border, 4px along the top. The card carries `data-clarity-mask="true"`, because the sent state echoes the visitor's email.

| State | What shows |
| --- | --- |
| Idle | The fields as designed. The submit button stays disabled until hydration, because a native submit would post a form body to a JSON route |
| Sending | The button reads "Sending" and is disabled, the form has `aria-busy="true"`, the fields stay as typed |
| Sent | The card's contents become "Thanks, we got it" in the card head style, plus one Source Serif line in `--muted`. Contact says "We'll write back to {email}." Work says "We'll write back to {email} to set up a call." Focus moves to the heading |
| Error | One Source Serif line under the button with `role="alert"`, in `--ink`: "That didn't send. Try again, or write to tom@taproothq.com." The address is a `mailto:` link. Fields keep their values and the button re-enables. A too-fast submit shows this same line |
| Field validation | Native browser messages from `required`, `type="email"` and `maxLength` |

The server's rules, and the limits the forms share with it, are in `src/lib/contact.ts` and `src/app/api/contact/route.ts`.

## Art

Scenes are drawn in code in `sketch.ts`. Each has its own seed, so changing one can't change another.

| Scene | Seed | Where | How |
| --- | --- | --- | --- |
| `orchard` | 11 | Footer, every page | Full width, `h-[clamp(240px,30vw,470px)]`, fades at the bottom |
| `workshop` | 57 | About | Full width, `h-[clamp(220px,27vw,420px)]`, fades at the bottom |
| `bg-endpaper` | 331 | Behind the home first screen | Opacity 0.14, masked to fade out from 50% down |

Lines use `currentColor` and leaves fill with `--paper`, so every drawing follows the theme. Services figures are plain wireframe line drawings in `Plate`s.

## Theme

- Cookie `labs-theme=dark|light`, `path=/`, one year, `SameSite=Lax`. Written by `ThemeToggle`.
- `(labs)/layout.tsx` reads the cookie and passes `initial` to `ThemeShell`, so the first paint is already right. No cookie means light. Labs pages therefore render dynamically.
- `ThemeShell` lives in the layout, not in `Frame`, so it survives navigation between pages.
- On mount it adopts the cookie if that differs from `initial`, which covers a cached layout restored by Back.

## Motion

- `Reveal`: fades up 22px on entering the view, 0.8s, once.
- `DrawRule`: scales from the left on entering the view, 1.1s, once.
- Reduced motion is handled only in `labs.css`, through `[data-labs-motion]`. **Never branch the markup on `useReducedMotion()`.** It is null on the server and true on the client's first render, so the server ships the hidden starting styles and hydration never patches them.

## Copy rules

- Plain words. No seeds, roots or growing as metaphors.
- No colons and no em dashes.
- Never name Claude for AI.
- Services never point at our own products. The apps aren't shown publicly, so Work is an "Ask to see our work" form.
- Positioning: our own SaaS products, plus contract work for companies, including hands-on AI training.

## Routes

| Path | What |
| --- | --- |
| `/`, `/about`, `/services`, `/work` | Labs, in `src/app/(labs)/` |
| `/taproot/*` | Taproot product marketing, in `src/app/taproot/` |
| `/privacy`, `/terms` | At the root, in `src/app/(marketing)/` |
| `/sign-in`, `/sign-up`, `/onboarding/*`, `/dashboard/*`, `/auth/*`, `/api/*` | The app, unchanged |

Old marketing paths redirect to `/taproot/*` with a 308, from the table in `redirects.mjs`. `/signup` redirects to `/sign-up`. `/about` is not redirected, because it belongs to Labs now.

## Share cards

`src/app/opengraph-image.png` and `twitter-image.png` are a 1200x630 snapshot of `/`, in light, with reduced motion. `/taproot` keeps the Taproot card in `src/app/taproot/`. If the home page's first screen changes, retake the snapshot.
