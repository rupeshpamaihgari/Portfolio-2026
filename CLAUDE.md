# Portfolio-2026 — Project Context

This file is auto-loaded by Claude Code in every session. It captures the full context of the portfolio website so you don't have to re-explore the codebase.

---

## 1. Identity & About

- **Owner:** Rupesh Pamaihgari
- **Role:** Staff Product Designer @ SenseHQ — specialized in Automation products and AI Agents
- **Experience:** 10+ years bridging code and experience; productizing AI Agents, SaaS tools from 0→1, end-to-end design across 10+ platforms
- **Location:** Bangalore, Karnataka, India
- **Email:** rupesh.chaitanya@gmail.com
- **Phone:** +91 9945186854
- **LinkedIn:** https://www.linkedin.com/in/rupesh046/
- **GitHub repo:** Portfolio-2026
- **Deployed base path:** `/Portfolio-2026/` (see vite.config.js)

---

## 2. Tech Stack & Architecture

- **Framework:** React 18 + Vite 5
- **Styling:** Tailwind CSS 3 + inline styles (no CSS-in-JS library)
- **Animation:** framer-motion (newly installed) + custom CSS keyframes
- **Routing:** Hash-based, hand-rolled in `src/App.jsx` — `window.location.hash` parsed in `getPage()`
- **Fonts:** Google Fonts — `Fredoka` (headings) and `Nunito` (body)
- **No router library** (no react-router); navigation is manual via `navigate(path)` helper
- **No state management library** — local `useState` only
- **Custom hook:** `src/hooks/useInView.js` — used for scroll-triggered reveal animations

### Page Order (single-page) — `src/App.jsx`
1. `Navbar`
2. `Hero`
3. `ServicesSection`
4. `AchievementsSection`
5. `ExperienceSection`
6. `ProjectsSection_2` (note: `ProjectsSection.jsx` is dead code, unused)
7. `TestimonialsSection`
8. `AIProcessSection`
9. `CompanySection`
10. `QuestionsSection`
11. `ContactSection`
12. `Footer`

### Routes (hash-based)
- `#/` → main scrolling page
- `#/AiAgents` → `AIAgentsCasePage` (full AI Agents case study)
- `showCaseStudy` state → `CaseStudyPage` (Automations evolution case study) — opened via the AI Agents tab "View Case Study" button. **Not** linked from elsewhere.

### Dev / Build
- `npm run dev` → Vite on port `5173`
- `npm run build` → static bundle
- `npm run preview` → Vite preview on port `4173`
- `.claude/launch.json` defines both servers for the preview MCP

---

## 3. Design System

### Colors

**Base / Text**
- Background (warm beige): `rgb(234, 232, 225)` (a.k.a. `#eae8e1`)
- Primary dark text: `#1a1a1a`
- Button dark bg: `#111111` / hover `#222222`
- White: `#ffffff`
- Secondary text: `#555`, muted `#666`/`#777`/`#888`, light `#aaa`/`#bbb`

**Accent palette (used everywhere — testimonials, services, questions, agent cards)**
- Coral / Salmon: `#F4A58A`
- Light Blue: `#B8D4F8`
- Mint Green: `#B8F4D4`
- Pale Yellow: `#F8E4A0`
- Lavender: `#D4B8F8`
- Mauve Pink: `#f4c8d4`
- Cyan: `#c8f4f0`
- Soft Lavender: `#e4d4f8`
- Light Red/Pink: `#FFB8B8`
- Peach: `#FFD4A0`

**Status / Semantic**
- Success green (online dot): `#22c55e`
- LinkedIn blue: `#70b5f9`
- Scrollbar thumb: `#c5c2b8` / hover `#a09d92`

**Gradients (Services section card backgrounds)**
- Product Design: `linear-gradient(135deg, #F4A58A 0%, #F8D4B8 50%, #FFF5EE 100%)`
- UX Research: `linear-gradient(135deg, #B8D4F8 0%, #D4C5F8 50%, #F0ECFF 100%)`
- Leadership: `linear-gradient(135deg, #FFB8B8 0%, #FFD4A0 50%, #FFF5E8 100%)`
- Design System: `linear-gradient(135deg, #B8F4D4 0%, #B8E8F8 50%, #EDFFF5 100%)`
- Domains: `linear-gradient(135deg, #D4B8F8 0%, #B8D4F8 50%, #E8F4FF 100%)`

**No CSS custom properties** (`--var`) defined — all values are hardcoded inline or in `tailwind.config.js`.

### Typography
- **Body:** `'Nunito', sans-serif` (weights 300, 400, 500, 600, 700)
- **Headings (h1–h6):** `'Fredoka', sans-serif` (weights 400, 500, 600, 700)
- Tailwind extends `inter: ['Inter', 'sans-serif']` but Inter is not actively used.
- Weights observed: 300, 400, 450, 500, 600, 650, 700, 750
- Letter-spacing: headings `-0.02em` to `-0.04em`; body `-0.01em`; eyebrows `+0.06em` to `+0.12em` uppercase
- Responsive sizes via `clamp()` — e.g. hero title `clamp(38px, 4.2vw, 60px)`, section titles `clamp(30px, 3.5vw, 48px)`, body `clamp(15px, 1.8vw, 17px)`

### Spacing & Layout
- **Max content width:** `1200px` (Tailwind `maxWidth.content`)
- **Section horizontal padding:** `0 32px` desktop / `0 20px` mobile (`@media max-width: 768px`)
- **Section vertical padding:** `80–120px` top/bottom
- **Footer:** `80px` top, `48px` bottom
- **Common gaps:** `4, 6, 8, 12, 14, 16, 20, 24, 28, 32, 36px`

### Border Radius
- Pill / fully rounded: `999px` (buttons, tabs, badges, chips)
- Cards: `20px` (standard), `24px` (large), `28px` (hero/contact), `32px` (special)
- Small: `12px` (inputs), `14px` (small cards), `16px` (icons)
- Tiny: `8px`, `4px`, `3px` (scrollbar), `2px` (lines)
- Circles / avatars: `50%`

### Shadows
- Cards default: `0 2px 16px rgba(0,0,0,0.06)`
- Card hover: `0 20px 60px rgba(0,0,0,0.1)`
- Dark button hover: `0 8px 24px rgba(0,0,0,0.15)`
- Navbar on scroll: `0 1px 12px rgba(0,0,0,0.04)`

### Buttons (global utility classes)
- `.btn-dark` — bg `#111`, color `#fff`, padding `12px 28px`, font `14px / 500`, radius `999px`, hover bg `#222` + translateY(-1px)
- `.btn-light` — transparent bg, `1.5px solid #1a1a1a`, padding `11px 28px`, font `14px`, radius `999px`, hover bg `rgba(26,26,26,0.05)`

### Navbar
- Fixed, height `72px`
- Scrolled bg: `rgba(234,232,225,0.92)` with `backdrop-filter: blur(16px)` and `1px solid rgba(0,0,0,0.06)` bottom border
- Desktop links: `14px`, active `#111 / 600` with pill bg `rgba(0,0,0,0.06)`, inactive `#555 / 450`, padding `7px 14px`, radius `999px`
- Mobile menu: bg `rgba(234,232,225,0.98)`, blur 16px, link size `16px`, radius `12px`

### Animations (defined globally in `src/index.css`)
- Keyframes: `marquee`, `marqueeReverse`, `scalePulse`, `pulse`, `pulseDot`, `fadeInUp`, `fadeIn`, `float`, `caseStudyFadeIn`, `caseStudyBounce`, `caseStudyPulse`
- Utilities: `.animate-marquee`, `.animate-marquee-slow`, `.animate-marquee-reverse`, `.animate-fadeInUp`, `.animate-fadeIn`, `.animate-float`, `.animate-pulse-dot`
- Scroll reveal: `.reveal` → `.reveal.visible` (0.65s cubic-bezier(0.33,1,0.68,1), 24px translate)
- Stagger: `.reveal-stagger` (children delays 0.05s, 0.15s, 0.25s, 0.35s)
- Tailwind animations: `marquee 20s`, `marquee-reverse 25s`, `marquee-slow 25s`, `pulse-dot 2s`, `fadeInUp 0.7s`

### Standard Transitions
- Quick: `0.2s ease`
- Card hover: `0.3s ease`
- Navbar/accordion: `0.4s ease`
- Reveal: `0.65s cubic-bezier(0.33, 1, 0.68, 1)`
- Springy: `cubic-bezier(0.34, 1.4, 0.64, 1)`

### Tailwind Config Extension
```js
colors: { bg: 'rgb(234,232,225)', primary: '#1a1a1a', secondary: '#555555', muted: '#888888' }
borderRadius: { '2xl': '20px', '3xl': '24px' }
maxWidth: { content: '1200px' }
```

---

## 4. Section Content (verbatim)

### Hero (`src/components/Hero.jsx`)
- Badge: "Product Designer with 10+ years Experience" (green dot `#22c55e`)
- Title: **"Rupesh Pamaihgari"**
- Subtitle: "Staff Product Designer @SenseHQ, Specialized in Automation products and AI Agents"
- Bio: "10+ years bridging code and experience — productizing AI Agents, SaaS tools from 0→1, and leading end-to-end design across 10+ platforms."
- CTAs: `See Work` (scrolls #projects), `Contact` (scrolls #contact)
- Media: `/HeroImageVideo.mp4` (looped, muted, flipped `scaleX(-1)`)

### Services (`src/components/ServicesSection.jsx`)
5 tabs:
1. **Domains** (🌍) — HR Tech, Travel & Transportation, Public Sector, Productivity, Gaming & Spatial Computing
2. **Product Design** (🎨) — Figma, Miro, Lovable, Claude, Cursor, NotebookLM, Maze, ProtoPie
3. **UX Research** (🔍) — Usertesting.com, Maze, Claude, NotebookLM, Amplitude, Sigma, Microsoft Clarity
4. **Leadership** (⚡) — 4 team size, 3 yrs leadership exp
5. **Design System** (🧩) — Navigation, Form Components, Chart Viz (contributed); AI Components, Card Components, Slots (owned)

Top stats: `11+` Years Experience, `15+` 0→1 SaaS Products, `7` Startup Exp, `4` Enterprise Exp

### Achievements (`src/components/AchievementsSection.jsx`)
Section heading: "International Awards & Recognitions"
1. **2019 — MIT Reality Virtually Hackathon** 🏆 (`#F4A58A`) — Accudrive, Boston, MA. Link: devpost.com/software/accudrive
2. **2022 — Bayer Integrated Digital Label Hackathon** 🥇 (`#B8D4F8`)
3. **2016 — HackerEarth Game Dev Hackathon Winner** 🎮 (`#B8F4D4`)
4. **2× Sense Internal Star Award** ⭐ (`#F8E4A0`) — Best Collaboration & Contribution to Success
Right column video: `/Achievements.mp4` (416px height, flipped)

### Experience (`src/components/ExperienceSection.jsx`)
Sticky arc-based scroll timeline on desktop, vertical card stack on mobile. 4 eras:

1. **2021–Present · Staff Product Designer @ SenseHQ** (`#F8E4A0`, 🤖)
   - "Joined as Lead Product Designer, grew into Staff. Led end-to-end design across 10+ products including Automations and AI recruiter agents which contributes to about 80% of Sense's revenue."
   - Metrics: `80%` reduction in time-to-hire, `1M+` candidates engaged, `$5M+` booked ARR
2. **2019–2021 · Sr Product Designer @ Betterplace** (`#B8F4D4`, 🤝)
   - Founding designer; background verification, attendance apps
   - Metrics: `4.4` app rating, `100K+` downloads, `$1M+` revenue
3. **2015–2019 · UI/UX Designer @ Unisys** (`#B8D4F8`, 🌍)
   - Clients: SaS Cargo, DigiYatra, Singapore Airport, Delta Airlines
4. **2013 · Games & AR/VR Developer** (`#F4A58A`, 🎮)
   - Metrics: `3+` international awards, `500K+` users engaged, `4` team managed

### Projects (`src/components/ProjectsSection_2.jsx`)
Eyebrow "SELECTED WORK" / title "Projects". 7 tabs:
- `ai-agents` — **AI Agents** (full implementation with orbital agent diagram)
- `automations` — **Automations** (full implementation with workflow blocks)
- `analytics` — Analytics (placeholder; coming soon)
- `design-system` — Design System (placeholder)
- `mobile` — Mobile (3 projects: Attendance App, Attendance Admin, Jobs App)
- `arvr` — AR/VR (5 projects: HoloLens Home Designer, Bayer Digital Label, Alina, Accudrive, "Where Is My Way" game)
- `vibe-codes` — **Vibe Coding** (Portfolio V2, Claude Code Experiments, Rapid Prototypes)

**AI Agents tab** — 6 satellite agents around a center "AI Recruiter" orchestrator:
- `senseiq` 🧠 (intelligence/scoring) `#B8D4F8`
- `listbuild` 🔗 / Matching Agent (sourcing) `#B8F4D4`
- `voice` 🎙 / Voice Agent (engagement) `#F4A58A`
- `screen` ✅ / Screening / Evaluation Agent `#D4B8F8`
- `data` 📊 / Data Agent (Jarvis) `#c8f4f0`
- center 🤖 / AI Recruiter (Grace) `#F8E4A0`
Headline metrics: `30–81%` time-to-hire reduction, `1M+` candidates/year, `50K+` hrs saved (HCA), `404K` meetings YTD, `$4.6M` Post-Pilot ARR, `11.1 hrs` fastest fill.
"View Case Study" button → opens `CaseStudyPage` (Automations evolution).

**Automations tab** — 4-node workflow strip + metrics:
- Trigger ▶ (`#B8F4D4`), AI Evaluation 🧠 (`#B8D4F8`), Action ⚡ (`#F4A58A`), Output ✅ (`#F8E4A0`)
- Metrics: `70%` candidate response growth, `97%` QoQ workflow growth, `1,101` active workflows, `199` agencies, `10×` journeys per customer, `3×` recruiter capacity (Carvana)

**Design System tab metrics:** `30+` contributed components, `15` owned, `WCAG AA`, `10` AI-native prompt components. Link to spaced-out.github.io/ui-design-system Storybook.

### Testimonials (`src/components/TestimonialsSection.jsx`)
4 cards, marquee-slow scroll. 5-star (`#F4A58A`). Card style: `#fff`, radius `20px`, padding `28px`, shadow `0 2px 20px rgba(0,0,0,0.06)`, avatar 40×40 circle.
1. **Arun Purohit** — Co-Founder & PDO, iSootra Designs (`#F4A58A`)
2. **Vamsi Batchu** — Sr. Product Design Manager, Rocket (`#B8D4F8`)
3. **Alex Rosen** — Co-Founder/Product, Sense (`#B8F4D4`)
4. **Deepak Panda** — Director of Product, Sense (`#F8E4A0`)

### AI Process (`src/components/AIProcessSection.jsx`)
Circular dial with 4 phase dots (340×340 px container, 148 px orbit radius, 56 px dots):
1. **Research & Discovery** — Claude, NotebookLM — 3 hrs → 20 min (`#F4A58A`)
2. **Ideation & Validation** — Lovable, Claude Code — 4 hrs → 1 hr (`#B8D4F8`)
3. **Final Designs** — Cursor, Figma MCP — 3–4 hrs saved per handoff (`#B8F4D4`)
4. **Documentation & Handoff** — Claude Cowork — 8–10 hrs/week saved (`#F8E4A0`)

Mobile quote (dark): "AI didn't replace my design skills. It replaced my **busywork** — so I can spend more time on strategy and user thinking." • Total: ~8–10 hrs saved/week

### Company / Impact (`src/components/CompanySection.jsx`)
- Big stat: **12 hrs** saved per week (animated entrance), 4-color accent bar `#F4A58A / #B8D4F8 / #B8F4D4 / #F8E4A0`
- Tool stack pills (12): Claude 🤖, NotebookLM 📓, Lovable 💜, Claude Code ⚡, Cursor 🖱️, Figma 🎨, Figma MCP 🔌, Claude Cowork 🤝, Framer 🖼️, Notion 📋, Hotjar 🔥, Miro 🗺️

### Questions (`src/components/QuestionsSection.jsx`)
4-column flip-card grid on desktop, accordion on mobile. 8 Q&As (each tied to an accent color):
1. **How do you use AI in your day-to-day?** (`#F4A58A`)
2. **How do you collaborate with engineers?** (`#B8D4F8`)
3. **Can you walk through an end-to-end design process you owned?** (`#B8F4D4`)
4. **What's your B2B and AI product experience?** (`#F8E4A0`)
5. **How has AI compressed your discovery & execution?** (`#D4B8F8`)
6. **How do you set design direction without managing people?** (`#f4c8d4`)
7. **What's the most challenging design problem you've solved?** (`#c8f4f0`)
8. **Tell us about your background and experience.** (`#e4d4f8`)

Flip card: perspective 900px, height 240px, back face `#111` rotated 180°, transition 0.58s cubic-bezier(0.33,1,0.68,1).

### Contact (`src/components/ContactSection.jsx`)
Dark `#111111` section, radius `28px`, padding `clamp(40px, 6vw, 72px)`.
- Availability badge: "Available for Hire" (green pulsing dot)
- Heading: **"AI Powered Product Designer"**
- Subtext: "Automations & AI Agents Expert"
- Contact card: email, phone, location, LinkedIn
- Right image: `ContactSection.png` with `scalePulse 11.82s ease-in-out infinite`
- **Code I Live By** (4 principles): Embrace Challenges 💪 / Never Stop Learning 📚 / Creative Excellence ✨ / Be Transparent 🔍

### Values (`src/components/ValuesSection.jsx`)
Same 4 principles as above, white card variant — radius `20px`, padding `32px 28px`, icon circle `52×52` radius `14px`, accent line `3px × 32px` bottom.

### Footer (`src/components/Footer.jsx`)
- Border-top `1px solid rgba(0,0,0,0.08)`
- Padding `80px top / 48px bottom`
- Logo `17px / 700`, social links `13.5px / 450 / #777`, copyright `13px / #aaa`

---

## 5. Case Studies (full content)

### 5a. AI Agents for Recruitment — `src/components/CaseStudy/AIAgentsCasePage.jsx`
Route: `#/AiAgents` (not currently linked from the UI — only reachable by URL).

**Hero meta:** Role: Staff Product Designer · Timeline: 2022–Present · Company: SenseHQ
**Hero description:** "A deep dive into the six specialized AI agents that power autonomous talent acquisition — from intelligent matching to voice screening and orchestrated hiring."
**Summary KPIs:** `30–81%` time-to-hire reduction · `1M+` candidates/year · `50K+` hours saved (HCA Healthcare alone)

For each of the 6 agents (SenseIQ, Matching, Voice, Screening, Data/Jarvis, AI Recruiter/Grace) the page has: **Context · Why (3) · Research (3) · Constraints (3) · Guardrails (4–6) · Variations (3) · Impact (4 metrics)**. Each agent has a color and icon — see "AI Agents tab" satellite list in §4.

Key per-agent impact highlights:
- **SenseIQ**: list time `seconds` vs 15–20 min · 297 lists in month 1 · 87 unique workflows · 50+ agencies
- **Matching**: 20/100 qualified evals · 50 top matches/job · 12,821 matched in one deployment · 3× weekly starts (Carvana)
- **Voice**: 60% calls over 8 min · 2 min engagement time · 7 min full screen · 3× candidates/day
- **Screening**: 33 min app→score · 20/100 qualified · 0 manual ATS entries · 8/10 default threshold
- **Data (Jarvis)**: 97% QoQ workflow growth · 10 s diagnostic time · 1,101 active workflows · 199 agencies
- **AI Recruiter (Grace)**: 11.1 hrs fastest fill (BGSF) · $5M+ ARR · 50K+ hrs saved (HCA) · 404K meetings YTD (175% YoY)

### 5b. Evolution of AI Automation Agent — `src/components/CaseStudy/CaseStudyPage.jsx`
Reached via `showCaseStudy` state from the AI Agents tab "View Case Study" button.

**Hero meta:** Lead Product Designer · 2021–Present · Sense.com
**About Sense:** "Enterprise Talent Engagement Platform used by staffing agencies; System of Engagement that bi-directionally syncs with ATS, automating communication across the talent lifecycle."

**Step nav (6):** Introduction → Phase 1: Siloed → Phase 2: Unification → Phase 3: Intelligence → Phase 4: Agentic → Outcomes
**Personas (3):** The Recruiter "The Busy Bee" · Ops Manager "The Architect" · Candidate "The Talent"
**Use case pillars (4):** Sourcing & Attraction · Candidate Engagement · Recruiter Efficiency · Employee Engagement

**Phase 1 (2021):** Journeys 1.0, Chatbot Builder 1.0, List Builder 1.0, Bulk Messaging — all siloed. Outcomes: 50 agencies, 297 lists, 87 workflows, $1,900/mo savings per cluster.

**Phase 2 (Workflow Builder 2.0):** 4 node categories (Action / Logical / ATS / Smart). 11 documented user flows with embedded Google Drive video previews. Metrics: 10M/day capacity, 8s trigger latency, 9s comm latency, 97% QoQ growth, 1,101 workflows, 199 agencies, 3× capacity (Carvana), 40% conversion lift, 96.6% CSAT.

**Phase 3 (Intelligence Layer):** Ask AI (generative copy), AI Lister (natural language search), Jarvis (conversational analytics). Limitations: still assistive not autonomous; text-only; brains disconnected.

**Phase 4 (Agentic Shift — Grace):** Multimodal Agent Builder + Grace sub-agents — Discover (Sourcer), Voice (Screener with DQM), Evaluation (Judge with Fit Score 1–10, three modes). Auto-Submission flow: Trigger → Discover → Multimodal → Evaluation → ATS Record.

**2025–2026 wins:** 11.1 hrs hard-fill (BGSF) · 50K+ hrs saved (HCA) · TalentBurst Glassdoor 2.0 → 4.2 · 107 referrals/45 days (Dietitians On Demand) · 3× starts (Carvana) · $4.6M post-pilot ARR.

**Themes:** Solving the "Black Hole" of communication · "Glass Box" design philosophy · Future = True Agentic AIR by 2026.

---

## 6. Notable Quirks & Conventions

- `src/components/ProjectsSection.jsx` is **dead code** — not imported anywhere. The active version is `ProjectsSection_2.jsx`.
- `AIAgentsCasePage` is reachable only via the URL hash `#/AiAgents` — there's no in-app link to it.
- `src/utils/asset.js` resolves asset paths with the Vite base (`/Portfolio-2026/`) — use it for any new image/video imports.
- No CSS modules; styles are inline, Tailwind utility classes, or global rules in `src/index.css`.
- Mobile breakpoint is `max-width: 768px`.
- Reveal animation is driven by the `useInView` hook + `.reveal` / `.reveal.visible` CSS classes.
- Hash navigation helper `navigate(path)` in `App.jsx` always scrolls to top.

---

## 7. Working Conventions for Claude

- Prefer editing existing files over creating new ones.
- Match existing styling patterns: inline `style={{ ... }}` objects on most components; reach for Tailwind classes only when the surrounding component already uses them.
- When adding accent colors, draw from the palette in §3 — don't introduce new hexes unless asked.
- Headings = Fredoka; body = Nunito. Never swap these unless told.
- Animations should reuse the keyframes already defined in `index.css` when possible.
- Use the Vite preview MCP (`preview_start` with "Dev Server") to verify UI changes — never ask the user to test in the browser themselves.
