# Portfolio Claude — Project Brief

## What this is
Landing page portfolio for Lyubov Skyba (web developer). Single HTML file, dark theme, Ukrainian language.
Live: https://websitesky.github.io/portfolio/
Repo: https://github.com/websitesky/portfolio (branch: master)

**After every session → push all changes to GitHub.**

---

## Stack
- Single file: `index.html` (~2200 lines)
- Tailwind CSS via CDN (no build step)
- Vanilla JS (no frameworks)
- Google Fonts: Space Grotesk (headings) + Inter (body)
- GitHub Pages deployment (branch: master)

---

## Design system
| Token | Value |
|-------|-------|
| Brand fuchsia | `#b0006d` |
| Fuchsia glow rgba | `rgba(176,0,109,0.X)` |
| Background | `#0a0a0a` |
| Card background | `#111111` or `#1e1e1e` |
| Body text | `#9ca3af` |
| Headings | `text-white` |
| Font heading | `font-grotesk` (Space Grotesk) |
| Font body | `font-inter` (Inter) |
| Button radius | `rounded-xl` (ALL buttons — uniform) |

**Never use white backgrounds.** All sections use `#0a0a0a` or `#111111`.

---

## Page sections (in order)
1. Nav — sticky, mobile drawer menu
2. Hero — text left, video right (mobile: text top, video below)
3. Block 2 — "Впізнали свій сайт?" (problem/pain points) — light-ish card bg `#1a1a1a`
4. Block 3 — "Рішення" (solution cards, 6 cards, animated on scroll)
5. Block 4 — Services/Pricing (3D flip cards × 3)
6. Block 4.5 — "Точна вартість" (CTA card, full width)
7. Block 5 — Process timeline
8. Block 6 — Portfolio (3 cases with links)
9. Block 7 — "Про мене" (about)
10. CTA 1 — mid-page call to action
11. CTA 2 — second call to action
12. FAQ — accordion
13. Contact form — Google Sheets integration
14. Footer
15. Exit popup — shown on mouseleave (desktop) + visibilitychange/pagehide (mobile)
16. FABs — phone + Telegram (mobile fixed buttons)
17. Scroll-to-top button

---

## Key CSS classes (in `<style>` block)

```
.btn-primary     — all primary CTA buttons
                   gradient: linear-gradient(135deg, #d4007f 0%, #b0006d 55%, #7a0050 100%)
                   pulsing box-shadow animation (btn-glow 2.4s)
                   radius: rounded-xl (UNIFORM across ALL buttons)

.btn-outline     — secondary button (Отримати перший екран)
                   radius: rounded-xl

.nav-cta         — nav header button
                   radius: rounded-xl

.flip-wrapper    — 3D flip card container
.flip-front      — front face (pointer-events:none when flipped)
.flip-back       — back face

.flip-hint       — pulsing fuchsia border tag on flip cards
                   "Натисніть або наведіть для деталей ⤵"

.solution-card   — Block 3 cards (opacity:0 → .visible via IntersectionObserver)
.bullet-item     — video overlay bullets (opacity:0 → animated via .bullets-active)
.reveal          — generic scroll reveal (IntersectionObserver adds .visible)
.fab-pulse       — FAB pulse ring animation
```

---

## Key animations (@keyframes)

```css
btn-glow      — button pulsing box-shadow (0 0 14px → 0 0 32px)
bulletLaunch  — video bullets fly from video centre (translateY -90px → 0, scale 0.55→1)
cardRise      — solution cards entrance (translateY 22px → 0)
hintPulse     — flip-hint border pulse (fuchsia)
shimmer       — light sweep on button hover
fab-pulse     — FAB ring pulse
```

---

## Key JS (bottom of `<style>` section, inside `<script>`)

```js
// Mobile drawer
openMobileMenu() / closeMobileMenu()

// FAQ accordion
faqToggle(el)

// Contact form submit
handleContactSubmit(e)
const SHEETS_URL = 'PASTE_YOUR_APPS_SCRIPT_URL_HERE'
// → sends POST to Google Apps Script, mode:'no-cors'

// Flip cards
// Toggle .flipped on click; skip if click is on <a>

// Solution cards entrance
// IntersectionObserver on .solution-card → adds .visible (threshold 0.12)

// Video bullets
// IntersectionObserver on #video-bullets → adds .bullets-active (threshold 1.0)
// fires when bullet strip is FULLY in viewport

// Exit popup
// desktop: mouseleave (clientY < 10)
// mobile: visibilitychange + pagehide
// skips if contact form is already filled

// Scroll-to-top
// #scroll-top button → window.scrollTo top:0
```

---

## Contact info (real, used in code)
- Phone: `+380666027243`
- Telegram: `https://t.me/+380666027243`
- Photo: `me.png`
- Gates photo: `gates.jpg` (NOT Гейтс.jpg — Cyrillic filename not tracked by git)

---

## Portfolio links
- Case 01 (massage): https://websitesky.github.io/massage/
- Case 02 (hotel): https://nchc1.weblium.site/
- Case 03 (solar): https://websitesky.github.io/sun_batterias/

---

## Google Apps Script
File: `google-apps-script.js` (NOT deployed in GitHub Pages, for reference only)
Sheet name: 'Заявки'
Columns: Дата/Час | Ім'я | Ніша | Telegram/Телефон

---

## Git workflow
```bash
git add index.html
git commit -m "description

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
git push origin master
```
GitHub Pages deploys automatically from master branch.

---

## User preferences (important)

- **Push to GitHub after every session** — always commit + push when done
- **No white backgrounds** — all sections dark (`#0a0a0a` or `#111111`)
- **All buttons `rounded-xl`** — uniform radius, no `rounded-full` or `rounded-lg` on buttons
- **Ukrainian language** — all UI text in Ukrainian
- **Concise responses** — user prefers direct, short answers
- **Grep for Cyrillic fails** — use PowerShell `Select-String` to search Ukrainian text:
  ```powershell
  Select-String -Path "index.html" -Pattern "текст" | Select-Object LineNumber, Line
  ```

---

## Common tasks

### Find Ukrainian text
```powershell
Select-String -Path "C:\Users\slm08\Pictures\Lyubov\сайти\portfolio-claude\index.html" -Pattern "слово" | Select-Object LineNumber, Line
```

### Add new section
Insert before `</body>`, keep dark background, use existing CSS classes.

### Change button style
All buttons use `.btn-primary` class. Background/shadow controlled in CSS (not inline). Radius always `rounded-xl`.

### Fix animation not showing on mobile
- `filter: drop-shadow` is clipped by `overflow:hidden` — use `box-shadow` instead
- `!important` in CSS class overrides inline styles
- IntersectionObserver threshold 1.0 on `#video-bullets` fires when strip fully visible
