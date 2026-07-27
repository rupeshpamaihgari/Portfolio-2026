import { asset } from '../../../../utils/asset'
import { UserFlowsSelector } from '../../CaseStudyPage'
import { AccordionCanvasMock, CodeFirstDslMock, WizardStepMock } from '../../explorationMocks'
import { AGENTS } from '../../agentsData'
import { PALETTE } from '../SlideLayouts'

/* Some agentsData.js entries name-check their own AIAgentsCasePage label
   inside a research/constraint body. When reused here under a different
   product name, swap the label so the copy stays consistent with this
   deck's own naming — agentsData.js itself is left untouched. */
function relabelStrategy(agent, from, to) {
  const swap = (s) => s.split(from).join(to)
  const swapItem = (item) => (typeof item === 'string' ? swap(item) : { ...item, body: swap(item.body) })
  return {
    research: agent.research.map(swapItem),
    constraints: agent.constraints.map(swapItem),
    guardrails: agent.guardrails.map(swap),
    variations: agent.variations.map(swapItem),
  }
}

/* Four slides — research, constraints, guardrails, variations — from an
   agentsData.js-shaped object. Mirrors aiAgentsDeck.jsx's agentToPart
   pattern; `idPrefix` keys the slide ids, `label` seeds nav labels. */
function strategySlides(idPrefix, label, data) {
  return [
    { id: `${idPrefix}-research`, kicker: 'Research & Ideation', navLabel: `${label} — research & ideation`, title: 'What the research told us.', layout: 'card-grid', content: { cards: data.research } },
    { id: `${idPrefix}-constraints`, kicker: 'Constraints', navLabel: `${label} — constraints`, title: 'What we had to design around.', layout: 'card-grid', content: { cards: data.constraints } },
    { id: `${idPrefix}-guardrails`, kicker: 'Guardrails', navLabel: `${label} — guardrails & principles`, title: 'The rules the agent cannot break.', layout: 'list', content: { items: data.guardrails } },
    { id: `${idPrefix}-variations`, kicker: 'Design Variations', navLabel: `${label} — variations explored`, title: 'Three directions we built and tested.', layout: 'card-grid', content: { cards: data.variations, numbered: true, minWidth: 280 } },
  ]
}

/* Four quadrants formed by two independent variables in every AI Lister
   request: how clearly the recruiter knows what they want, and how
   confident the system is that it understood. Mirrors the same content
   in CaseStudyPage.jsx's ConfidenceQuadrant. */
const CONFIDENCE_QUADRANTS = [
  {
    label: 'The Fast Path',
    userConf: 'User confident', aiConf: 'AI confident',
    prompt: '"Find me Java developers in San Francisco available now who haven\'t been contacted in 6 months."',
    response: 'Generates the filter set immediately and shows the interpreted criteria as confirmation chips — no clarification needed before returning the list.',
  },
  {
    label: 'The Assist',
    userConf: 'User unsure', aiConf: 'AI confident',
    prompt: '"I need someone... technical, I think? Maybe backend, based near our SF office."',
    response: 'Recognises enough signal to infer intent, and shows it back as an editable suggestion — "Did you mean: Backend Engineers within 25 miles of San Francisco?" — before running.',
  },
  {
    label: 'The Check',
    userConf: 'User confident', aiConf: 'AI unsure',
    prompt: '"Find candidates with an active PMP-Advanced-Tier 2 certification."',
    response: 'Flags low confidence when a term has no reliable schema mapping, shows its best approximate match, and offers a one-click switch to the manual filter builder.',
  },
  {
    label: 'The Guide',
    userConf: 'User unsure', aiConf: 'AI unsure',
    prompt: '"Find me someone good for the role — not really sure what to look for."',
    response: 'Falls back to the Guided Filter Builder, surfacing the job description\'s key requirements as starting filters instead of guessing blindly.',
  },
]

/* ─────────────────────────────────────────────────────────────
   Evolution of AI Automation Agent — presentation deck.

   Condensed counterpart to CaseStudyPage.jsx. Every slide carries a
   `source` field pointing at the scroll-mode section it distils, so
   the two can be reconciled when the case study is edited.
───────────────────────────────────────────────────────────── */

const img = (p) => asset(`/illustrations/case-study/${p}`)
const vid = (p) => asset(`/videos/${p}`)

/* ── Part 1 — Introduction ───────────────────────────────────── */

const intro = {
  id: 'intro',
  label: 'Introduction',
  accent: PALETTE[0],
  sourceStep: 1,
  slides: [
    {
      id: 'cover',
      layout: 'title',
      navLabel: 'Evolution of AI Automation Agent',
      title: 'Evolution of AI Automation Agent',
      source: 'Step1 · Hero',
      content: {
        eyebrow: 'Case Study',
        heading: 'Evolution of AI Automation Agent',
        subtitle: 'A journey from siloed tools to autonomous AI teammates in talent acquisition.',
        meta: [
          { label: 'Role', value: 'Lead Product Designer' },
          { label: 'Timeline', value: '2021 – Present' },
          { label: 'Company', value: 'Sense.com' },
        ],
      },
    },
    {
      id: 'context',
      kicker: 'Project Context',
      navLabel: 'About Sense & this project',
      title: 'A system of engagement for the whole talent lifecycle.',
      layout: 'split-media',
      source: 'Step1 · Project Context',
      content: {
        blocks: [
          { title: 'About Sense', body: 'An enterprise Talent Engagement Platform used by staffing agencies to accelerate hiring. It syncs bi-directionally with an ATS and automates communication across the entire candidate lifecycle.' },
          { title: 'About this project', body: 'Four years of product evolution — from disconnected point solutions to a fully autonomous AI Recruiter. This is the story of how each layer was designed, and what each one failed to solve.' },
        ],
        media: { kind: 'image', src: img('Step_1_HeroImage.png'), alt: 'Sense platform overview' },
      },
    },
    {
      id: 'personas',
      kicker: 'Key Personas',
      navLabel: 'Three users, conflicting needs',
      title: 'Three users pulling in different directions.',
      layout: 'card-grid',
      source: 'Step1 · Key Personas',
      content: {
        lede: 'Designing this evolution meant balancing the conflicting needs of three distinct users — every feature that helped one could easily burden another.',
        cards: [
          { title: 'The Recruiter — "The Busy Bee"', body: 'The end user. Lives in the inbox and the phone. Needs speed above all: fewer clicks, fewer tools, fewer things to remember.', accent: PALETTE[0], image: img('avatar1.png'), imageShape: 'circle' },
          { title: 'The Ops Manager — "The Architect"', body: 'The builder. Configures workflows for the whole agency. Needs power, reusability and visibility into what is running where.', accent: PALETTE[1], image: img('avatar2.png'), imageShape: 'circle' },
          { title: 'The Candidate — "The Talent"', body: 'The recipient. Never sees the product, only its output. Needs timely, relevant, human-feeling communication — and never to be ghosted.', accent: PALETTE[2], image: img('avatar3.png'), imageShape: 'circle' },
        ],
        minWidth: 280,
        imageSize: 56,
      },
    },
    {
      id: 'ecosystem',
      kicker: 'The Ecosystem',
      navLabel: 'Four pillars of use cases',
      title: 'Four pillars the platform has to cover.',
      layout: 'card-grid',
      source: 'Step1 · The Ecosystem of Use Cases',
      content: {
        cards: [
          { title: 'Sourcing & Attraction', body: 'Reactivating dormant candidate databases, referral automation and chatbot screening.', image: img('Sourcing.png') },
          { title: 'Candidate Engagement', body: 'Post-application acknowledgments, interview reminders and status updates that prevent ghosting.', image: img('Candidate_Engagement.png') },
          { title: 'Recruiter Efficiency', body: 'Automated interview scheduling, candidate scoring and bulk messaging at scale.', image: img('Efficiency.png') },
          { title: 'Employee Engagement', body: 'Onboarding workflows, NPS surveys and assignment-end redeployment.', image: img('Employee Engagement.png') },
        ],
        imageSize: 64,
      },
    },
    {
      id: 'hero-usecase',
      kicker: 'Hero Use Case',
      navLabel: 'Auto-Submission: the benchmark',
      title: 'One use case, carried through all four phases.',
      layout: 'split-media',
      source: 'Step1 · Hero Use Case: Auto-Submission',
      content: {
        blocks: [
          { title: 'The problem', body: 'Recruiters spent hours manually searching the database for candidates matching a new job order, calling them one by one, and screening each before submitting to a client.' },
          { title: 'The goal', body: 'A system that detects a new job, identifies the best matches, screens them via voice or chat, and submits qualified profiles — with zero human intervention.' },
        ],
        media: { kind: 'image', src: img('Auto-Submissoin.png'), alt: 'Auto-submission flow diagram' },
        caption: 'Auto-Submission became the yardstick: every phase is measured by how much of this loop it could close.',
      },
    },
    {
      id: 'my-role',
      kicker: 'My Role',
      navLabel: 'Role & cross-functional collaboration',
      title: 'Solving the right problem before pushing a pixel.',
      layout: 'split-media',
      source: 'Step1 · My Role & Cross-Functional Collaboration',
      content: {
        blocks: [
          { title: 'What I owned', body: 'As Staff Product Designer for the Workflow Builder, I set the system architecture, the canvas interaction model, the node library and the design principles the team built against.' },
          { title: 'The framework', body: 'The calendar looked chaotic, but the process was not: Research → Define → Validate ⟷ Design ⟷ Prototype → Build → QA test → Launch. The two-way arrows are where most of the work actually happened.' },
        ],
        gallery: [
          { src: img('collaboration.png'), alt: 'Cross-functional collaboration framework', caption: 'Who I worked with, and on what.' },
          { src: img('Collaboration_Calendar.png'), alt: 'A typical week of collaboration', caption: 'A typical week — chaotic on the surface, structured underneath.' },
        ],
      },
    },
    {
      id: 'roadmap',
      kicker: 'The Arc',
      navLabel: 'Four phases at a glance',
      title: 'Four phases, four bottlenecks removed.',
      layout: 'process-flow',
      source: 'Overview of Steps 2–5',
      content: {
        lede: 'Each phase solved the constraint the previous one exposed. The through-line is the steady removal of the recruiter as connective tissue between tools.',
        steps: [
          { title: 'Phase 1 · Siloed', body: '2021. Four point solutions. The recruiter is the integration layer.' },
          { title: 'Phase 2 · Unified', body: 'Workflow Builder 2.0. One canvas, modular nodes, real branching.' },
          { title: 'Phase 3 · Intelligent', body: 'Ask AI, AI Lister, Jarvis. Assistive intelligence on top of the canvas.' },
          { title: 'Phase 4 · Agentic', body: 'Grace and the sub-agents. The system acts, the recruiter supervises.' },
        ],
      },
    },
  ],
}

/* ── Part 2 — Phase 1 ────────────────────────────────────────── */

const phase1 = {
  id: 'phase1',
  label: 'Phase 1: Siloed Products',
  accent: PALETTE[1],
  sourceStep: 2,
  slides: [
    {
      id: 'p1-divider',
      layout: 'section-divider',
      navLabel: 'Phase 1 — the era of siloed products',
      title: 'Phase 1: Siloed Products',
      source: 'Step2 · Divider',
      content: {
        number: '01',
        label: 'The era of siloed products',
        thesis: 'Powerful tools that could not talk to each other — and a recruiter stuck in the middle doing the talking.',
      },
    },
    {
      id: 'p1-context',
      kicker: 'The Context',
      navLabel: 'Engage 1.0, 2021',
      title: 'Point solutions with no central nervous system.',
      layout: 'statement',
      source: 'Step2 · The Context (2021)',
      content: {
        body: 'When I joined Sense, the ecosystem was defined by Engage 1.0. The platform offered genuinely powerful capabilities — but they operated as point solutions: separate tools that each solved a specific problem while lacking any shared layer to pass data between them.',
        paragraphs: ['Nothing was broken, exactly. Everything just stopped at its own edge.'],
      },
    },
    {
      id: 'p1-journeys',
      kicker: 'Journeys 1.0',
      navLabel: 'Journeys 1.0 — linear automation',
      title: 'The automation engine that could not see.',
      layout: 'bullets-impact',
      source: 'Step2 · 1. Journeys 1.0',
      content: {
        cards: [
          { title: 'What it did', body: 'The primary automation engine — linear sequences of emails or SMS fired from a trigger such as "Candidate Applied".' },
          { title: 'Context blind', body: 'A journey was merely a list of events. No native branching logic, so it could not respond to anything the candidate actually did.' },
          { title: 'The clutter problem', body: 'Because assets were not reusable, customers built hundreds of duplicate touchpoints. Cloning whole workflows produced unmanageable systems.' },
        ],
        impact: {
          label: 'The Impact',
          statement: 'Automation that could send, but could not react.',
          footnote: 'Every conditional decision fell back to a human reading a report and starting the next journey by hand.',
        },
        media: { kind: 'image', src: img('phase1/Journeys_1.png'), alt: 'Journeys 1.0 interface' },
        caption: 'Journeys 1.0 — a linear list of events with no branching.',
      },
    },
    {
      id: 'p1-chatbot',
      kicker: 'Chatbot Builder 1.0',
      navLabel: 'Chatbot Builder 1.0',
      title: 'Conversations on rails.',
      layout: 'media',
      source: 'Step2 · Chatbot Builder 1.0',
      content: {
        lede: 'A tool for building conversational screening and feedback flows — rigid by design. Limited logic with no nested branches, no text piping to personalise questions, and no validation for emails or phone numbers.',
        media: { kind: 'scroll', src: img('phase1/Chatbot_1.png'), alt: 'Chatbot Builder 1.0' },
      },
    },
    {
      id: 'p1-lists',
      kicker: 'List Builder 1.0',
      navLabel: 'List Builder 1.0',
      title: 'Lists trapped inside the journeys that used them.',
      layout: 'media',
      source: 'Step2 · List Builder 1.0',
      content: {
        lede: 'The engine defining who to contact — but tightly coupled. Lists were built inside a specific journey rather than existing as independent, reusable assets. No Boolean power, and constant confusion between static and dynamic "Smart Lists".',
        media: { kind: 'scroll', src: img('phase1/Lists_1.png'), alt: 'List Builder 1.0' },
      },
    },
    {
      id: 'p1-messaging',
      kicker: 'Messaging',
      navLabel: 'Messaging — the isolated island',
      title: 'An island with no bridge back.',
      layout: 'media',
      source: 'Step2 · Messaging (Bulk Outreach)',
      content: {
        lede: 'A console for 1:1 texting and mass SMS broadcasts. Data from a text conversation could not easily trigger a follow-up journey — it was entirely disconnected from the broader automation strategy.',
        media: { kind: 'scroll', src: img('phase1/Messaging_1.png'), alt: 'Messaging interface' },
      },
    },
    {
      id: 'p1-before',
      kicker: 'The "Before" State',
      navLabel: 'Auto-Submission: the manual nightmare',
      title: 'The recruiter was the API between four tools.',
      layout: 'bullets-impact',
      source: 'Step2 · The Auto-Submission Struggle',
      content: {
        cards: [
          { title: 'Manual list', body: 'Build a static candidate list in List Builder using limited filters — no Boolean, no reuse.' },
          { title: 'Disconnected content', body: 'Open Chatbot Builder, create a bot from scratch with no reusability, and copy the web link by hand.' },
          { title: 'The blast', body: 'Move to Messaging and paste that link into a bulk SMS.' },
          { title: 'The black hole', body: 'Once sent, automation stopped. The recruiter downloaded CSV reports from the chatbot to find who passed.' },
        ],
        impact: {
          label: 'The Impact',
          statement: 'Four tools, zero shared memory. Every submission cost a recruiter an afternoon.',
          footnote: 'This is the "human middleware" problem that the next three phases exist to dismantle.',
        },
      },
    },
    {
      id: 'p1-contribution',
      kicker: 'Our Contribution',
      navLabel: 'Modularity — the Lego block strategy',
      title: 'Make the pieces independent before connecting them.',
      layout: 'split-media',
      source: 'Step2 · Our Contribution + Reusable Lists video',
      content: {
        blocks: [
          { title: 'Chatbot 2.0 & List Builder 2.0', body: 'We led the redesign of both, introducing modularity: chatbots and lists became independent objects that could be attached to many workflows instead of living inside one.' },
          { title: 'Why it mattered', body: 'This was the foundational "Lego block" strategy. Without reusable assets, the unified canvas of Phase 2 would have inherited the same duplication problem at a larger scale.' },
        ],
        media: { kind: 'video', src: vid('ai/reusable-lists.mov') },
        caption: 'Reusable lists — built once, attached anywhere.',
      },
    },
    {
      id: 'p1-surveys',
      kicker: 'Reusable Surveys',
      navLabel: 'Reusable surveys',
      title: 'The same principle, applied to content.',
      layout: 'media',
      source: 'Step2 · Reusable Surveys',
      content: {
        lede: 'Surveys followed lists out of their silo — authored once, then referenced by any workflow that needed them.',
        media: { kind: 'video', src: vid('ai/survey-creation.mov') },
      },
    },
    {
      id: 'p1-outcomes',
      kicker: 'Phase 1 Outcomes',
      navLabel: 'Phase 1 outcomes — List 2.0 impact',
      title: 'Modularity paid off in the first month.',
      layout: 'metric-wall',
      source: 'Step2 · Phase 1 Outcomes',
      content: {
        metrics: [
          { value: '50', label: 'Active agencies in month one' },
          { value: '297', label: 'Lists created' },
          { value: '87', label: 'Unique workflows driven' },
          { value: '$1,900', label: 'Monthly infra saving per cluster' },
        ],
        bullets: [
          ['ATS List Sync', 'Praised as a "game changer" and "a better version of CSV uploads."'],
          ['Pacific Companies', 'Addressed the use case directly, cutting the hundreds of duplicate assets customers had been managing.'],
          ['The remaining gap', 'Assets were now reusable — but there was still no single surface on which to compose them.'],
        ],
      },
    },
  ],
}

/* ── Part 3 — Phase 2 ────────────────────────────────────────── */

const phase2 = {
  id: 'phase2',
  label: 'Phase 2: Unification',
  accent: PALETTE[2],
  sourceStep: 3,
  slides: [
    {
      id: 'p2-divider',
      layout: 'section-divider',
      navLabel: 'Phase 2 — the unification',
      title: 'Phase 2: Unification',
      source: 'Step3 · Divider',
      content: {
        number: '02',
        label: 'The unification',
        thesis: 'Workflow Builder 2.0 — one canvas where every reusable piece could finally be composed into a single, visible flow.',
      },
    },
    {
      id: 'p2-overview',
      kicker: 'Overview',
      navLabel: 'Team, timeline & my contribution',
      title: 'Eighteen months from concept to GA.',
      layout: 'card-grid',
      source: 'Step3 · PHASE2_CARDS overview',
      content: {
        cards: [
          { title: 'Role', body: 'Lead → Staff Product Designer. Owned the end-to-end design of the builder.', accent: PALETTE[2] },
          { title: 'Team', body: '1 PM · 4 engineers · 1 researcher.', accent: PALETTE[1] },
          { title: 'Duration', body: '2022 → 2024. Eighteen months to general availability.', accent: PALETTE[3] },
          { title: 'My contribution', body: 'System architecture, canvas interaction model, node library and the design principles.', accent: PALETTE[0] },
        ],
      },
    },
    {
      id: 'p2-problem',
      kicker: 'The Problem',
      navLabel: 'Human middleware',
      title: 'Recruiters were the integration layer.',
      layout: 'split-media',
      source: 'Step3 · What We Were Solving',
      content: {
        blocks: [
          { title: 'The manual process', body: 'Every hire required a person to carry context between tools — reading one screen, retyping into another, remembering what had already been sent to whom.' },
          { title: 'The hypothesis', body: 'If the tools shared one canvas and one data model, the recruiter stops being connective tissue and starts being a supervisor. Everything after this phase depends on that being true.' },
        ],
        media: { kind: 'image', src: asset('/ManualProcess.png'), alt: 'Manual hiring workflow — recruiter as human middleware between disconnected tools' },
        caption: 'The manual hiring workflow — a recruiter carrying context between disconnected tools.',
      },
    },
    {
      id: 'p2-criteria',
      kicker: 'Success Criteria',
      navLabel: 'Success criteria set before launch',
      title: 'What we agreed to be judged on.',
      layout: 'card-grid',
      source: 'Step3 · Success criteria',
      content: {
        lede: 'Set before a line of code was written, so the definition of success could not drift as the build got hard.',
        cards: [
          { title: 'Adoption', body: '1,000+ active workflows by Q3 2025.', accent: PALETTE[2] },
          { title: 'Depth', body: '10 active journeys per customer — proving it was used broadly, not just once.', accent: PALETTE[1] },
          { title: 'Performance', body: 'Sub-10-second execution at a capacity of 10M automations per day.', accent: PALETTE[0] },
        ],
        media: { kind: 'scroll', src: img('phase2/Workflow_Integrations.png'), alt: 'Workflow integrations map' },
      },
    },
    {
      id: 'p2-research',
      kicker: 'Research',
      navLabel: 'Field evidence',
      title: 'What we saw in the field.',
      layout: 'card-grid',
      source: 'Step3 · Field Evidence',
      content: {
        cards: [
          { title: 'Field observation', body: 'Shadowed 8 ops managers across 4 agencies. Found 40+ near-duplicate Journeys in a single account — each a copy made because editing the original was too risky.' },
          { title: 'Recruiter interviews', body: '12 of 14 recruiters could not describe what their own active journeys did without opening each one individually.' },
          { title: 'Jobs to be done', body: 'The job was never "send a message." It was "know where every candidate is, and make sure nobody stalls."' },
        ],
      },
    },
    {
      id: 'p2-quote',
      kicker: 'The Insight',
      navLabel: 'The quote that set the direction',
      title: 'One sentence set the whole direction.',
      layout: 'quote',
      source: 'Step3 · Research callout',
      content: {
        quote: 'I wish I could just see the whole flow at once.',
        attribution: 'Ops Manager, staffing agency (8-person team)',
        note: 'Everything that followed — the canvas, the node library, progressive disclosure — is an answer to this one request. Visibility was the feature.',
      },
    },
    {
      id: 'p2-competitors',
      kicker: 'Competitors',
      navLabel: 'Competitive landscape',
      title: 'Everyone owned a slice. Nobody owned the loop.',
      layout: 'card-grid',
      source: 'Step3 · Competitor Analysis',
      content: {
        cards: [
          { title: 'Paradox (Olivia)', body: 'Bet on conversational hiring. Strong at high-volume hourly screening — but text-only, with a shallow automation layer underneath.', accent: PALETTE[0] },
          { title: 'Converz AI', body: 'Bet on voice. Genuinely good calls, but no workflow surface to place those calls inside.', accent: PALETTE[1] },
          { title: 'Humanly', body: 'Bet on screening and analytics. Useful insight, limited autonomy — it reported rather than acted.', accent: PALETTE[3] },
          { title: 'Sense (the target)', body: 'The only player positioned to combine multi-modal engagement with a real automation engine and ATS-grade data sync.', accent: PALETTE[2] },
        ],
        minWidth: 280,
      },
    },
    {
      id: 'p2-gaps',
      kicker: 'Market Gaps',
      navLabel: 'The seven industry blindspots',
      title: 'Seven gaps nobody in the category had closed.',
      layout: 'card-grid',
      source: 'Step3 · The 7 Critical Market Gaps',
      content: {
        numbered: true,
        minWidth: 230,
        cards: [
          { title: 'The multi-modal void', body: 'Text or voice, never both with shared memory.' },
          { title: 'Shallow personalisation', body: 'Merge fields dressed up as personalisation.' },
          { title: 'Limited autonomy', body: 'Assistants that suggest, never systems that act.' },
          { title: 'Broken learning loops', body: 'Outcomes never fed back into targeting.' },
          { title: 'Shallow analytics', body: 'Dashboards showing what happened, never why.' },
          { title: 'DEI & bias automation', body: 'Bias monitoring bolted on, not designed in.' },
          { title: 'Integration friction', body: 'ATS sync that broke the moment schemas drifted.' },
        ],
      },
    },
    {
      id: 'p2-killed',
      kicker: 'Exploration',
      navLabel: 'Directions we killed',
      title: 'Three directions we built and threw away.',
      layout: 'card-grid',
      source: 'Step3 · Directions We Killed',
      content: {
        lede: 'Each was prototyped far enough to fail honestly. Naming why they died is what made the canvas defensible.',
        cards: [
          { title: 'Accordion Node Canvas', badge: 'Killed', Mock: AccordionCanvasMock, mockBg: '#f0ede8', accent: PALETTE[0], body: 'Collapsing steps into stacked accordions preserved density but destroyed the exact thing users asked for: seeing the whole flow at once.' },
          { title: 'Code-First DSL', badge: 'Killed', Mock: CodeFirstDslMock, mockBg: '#1e1e1e', accent: PALETTE[1], body: 'Maximum expressive power, but it made the product unusable for the ops managers who actually build workflows.' },
          { title: 'Wizard / Step-by-step', badge: 'Killed', Mock: WizardStepMock, mockBg: '#f0ede8', accent: PALETTE[3], body: 'Excellent for a first workflow, hopeless for the fifth. It optimised onboarding at the cost of every day after.' },
        ],
        minWidth: 290,
      },
    },
    {
      id: 'p2-inspiration',
      kicker: 'Inspiration',
      navLabel: 'What we borrowed from the market',
      title: 'Five products worth stealing from.',
      layout: 'card-grid',
      source: 'Step3 · Market Inspiration',
      content: {
        lede: 'Marketing automation had already solved visual flow-building. Rather than reinvent it, we studied what each product got right and what it cost them.',
        cards: [
          { title: 'Mailchimp Customer Journeys', banner: asset('/Market/Mailchimp.png'), accent: PALETTE[0], body: 'Clearest mental model for branching — one trigger fanning out into audience paths. Became the "trigger → branch → action" backbone of our canvas.' },
          { title: 'Ortto (Autopilot)', banner: asset('/Market/Ortto.png'), accent: PALETTE[1], body: 'The most fluid canvas interaction. Validated that a canvas, not a list, is the right paradigm — and inspired our icon-coded node cards.' },
          { title: 'ActiveCampaign', banner: asset('/Market/ActiveCampaign.png'), accent: PALETTE[2], body: 'Deepest conditional logic and goal-based exits. Inspired our Logical Nodes and the idea that a workflow should know when it is done.' },
          { title: 'GetResponse', banner: asset('/Market/GetResponse.png'), accent: PALETTE[3], body: 'Time-delay nodes with calendar-aware scheduling. Our Delay and Smart Schedule nodes borrow directly, as does channel mixing inside one flow.' },
          { title: 'Klaviyo Flows', banner: asset('/Market/klaviyo.png'), accent: PALETTE[4], body: 'Best-in-class inline analytics — performance data shown on the node itself, not in a separate report.' },
        ],
        minWidth: 290,
      },
    },
    {
      id: 'p2-canvas',
      kicker: 'Solution',
      navLabel: 'Why the canvas won',
      title: 'Why the canvas won.',
      layout: 'bullets-impact',
      source: 'Step3 · Why the Canvas Won',
      content: {
        cards: [
          { title: 'Whole-flow visibility', body: 'The entire journey visible on one surface — the literal answer to the research quote that set our direction.' },
          { title: 'Modular nodes', body: 'Every Phase 1 asset became a node. The Lego blocks finally had a board to sit on.' },
          { title: 'Drag and drop', body: 'Restructuring a flow became a gesture rather than a rebuild, which is what made iteration cheap enough to actually happen.' },
        ],
        impact: {
          label: 'Design Principles',
          statement: 'Modularity · Visual Clarity · Progressive Disclosure',
          footnote: 'Declared up front and used as the tie-breaker in every subsequent argument about density versus power.',
        },
      },
    },
    {
      id: 'p2-canvas-demo',
      kicker: 'The Canvas',
      navLabel: 'Workflow Builder 2.0 in motion',
      title: 'Workflow Builder 2.0.',
      layout: 'media',
      source: 'Step3 · sense-workflows-video',
      content: {
        media: { kind: 'video', src: vid('ai/sense-workflows-video.mp4') },
        caption: 'One canvas, four node categories, real branching logic.',
      },
    },
    {
      id: 'p2-nodes',
      kicker: 'Nodes',
      navLabel: 'The four node categories',
      title: 'A node library that could scale.',
      layout: 'card-grid',
      source: 'Step3 · Understanding the Nodes',
      content: {
        cards: [
          { title: 'Action nodes — "the doers"', body: 'Send an email, fire an SMS, launch a chatbot, book a meeting. Anything the system does to the outside world.', accent: PALETTE[0] },
          { title: 'Logical nodes — "the brains"', body: 'Branches, delays, conditions and loops. The layer Journeys 1.0 never had.', accent: PALETTE[1] },
          { title: 'ATS integrations', body: 'Read and write candidate records directly, keeping Sense and the ATS in sync in both directions.', accent: PALETTE[2] },
          { title: 'Smart nodes', body: 'The extension point that Phase 3 and Phase 4 intelligence would later plug straight into.', accent: PALETTE[3] },
        ],
        media: { kind: 'scroll', src: img('phase2/NodePanel.png'), alt: 'Workflow node panel' },
        minWidth: 280,
      },
    },
    {
      id: 'p2-anatomy',
      kicker: 'Node Anatomy',
      navLabel: 'Anatomy of a node — V3',
      title: 'Three versions to get one card right.',
      layout: 'card-grid',
      source: 'Step3 · Ideation Behind the Node Structure',
      content: {
        lede: 'V1 and V2 were rejected for the same reason in different ways: they could not stay readable as the node library grew. V3 is built to absorb new node types without a redesign.',
        /* The three versions are the point of this slide, so they lead —
           large, one row, clearly labelled — with the four-point breakdown
           of what V3 actually does compact underneath. */
        galleryPosition: 'top',
        gallery: [
          { src: asset('/Nodecards/Workflow Cards_V1.png'), alt: 'Node card version 1 — rejected', caption: 'V1 — rejected', aspect: '4 / 3' },
          { src: asset('/Nodecards/Workflow Cards_V2.png'), alt: 'Node card version 2 — rejected', caption: 'V2 — rejected', aspect: '4 / 3' },
          { src: asset('/Nodecards/Workflow Cards_V3.png'), alt: 'Node card version 3 — adopted', caption: 'V3 — adopted', aspect: '4 / 3' },
        ],
        numbered: true,
        minWidth: 220,
        cards: [
          { title: 'Medium & module band', body: 'A coloured band identifying channel and module at a glance, before any text is read.' },
          { title: 'Node code + custom name', body: 'A stable system code alongside the user\'s own label, so a flow stays debuggable after being renamed.' },
          { title: 'Content preview text', body: 'The first line of the actual message, so you can audit a flow without opening every node.' },
          { title: 'Functional chips', body: 'Scalable slots for conditions, delays and integrations — the reason V3 survived Phases 3 and 4 unchanged.' },
        ],
        impact: {
          label: 'Why V3 Won',
          statement: 'The only version that stayed readable as the library grew.',
          footnote: 'Both AI nodes in Phase 3 and the agent nodes in Phase 4 shipped inside this same card structure without modification.',
        },
      },
    },
    {
      id: 'p2-flows',
      kicker: 'User Flows',
      navLabel: 'How workflows are built (11 flows)',
      title: 'Eleven flows, from empty canvas to activated workflow.',
      layout: 'custom',
      source: 'Step3 · UserFlowsSelector',
      render: () => <UserFlowsSelector />,
    },
    {
      id: 'p2-autosubmission',
      kicker: 'Use Case',
      navLabel: 'Auto-Submission on the canvas',
      title: 'Auto-Submission, rebuilt as five nodes.',
      layout: 'process-flow',
      source: 'Step3 · Solving Auto-Submission',
      content: {
        lede: 'The same use case from Phase 1 — now a single flow instead of four tools and a recruiter.',
        steps: [
          { title: 'Trigger node', body: 'Fires the moment a new job order lands.' },
          { title: 'Job match node', body: 'Pulls candidates matching the requirement.' },
          { title: 'Looping logic', body: 'Iterates the matched set without duplicating the flow.' },
          { title: 'Screening node', body: 'Runs the chatbot or survey and captures the result.' },
          { title: 'Writeback node', body: 'Pushes qualified candidates straight into the ATS.' },
        ],
        media: { kind: 'scroll', src: img('phase2/AutoSubmissionFull.png'), alt: 'Full auto-submission workflow', pan: true },
      },
    },
    {
      id: 'p2-tradeoffs',
      kicker: 'Trade-offs',
      navLabel: 'Constraints we navigated',
      title: 'What we knowingly did not fix.',
      layout: 'card-grid',
      source: 'Step3 · Constraints We Navigated',
      content: {
        cards: [
          { title: 'Legacy tech from Journeys 1.0', body: 'We had to stay backwards-compatible with existing customer journeys, which constrained the data model more than we wanted.' },
          { title: 'Deferred real-time co-editing', body: 'Multi-user editing was cut to hit GA. Ops teams coordinated manually for the first year.' },
          { title: 'Node depth capped at 50', body: 'A pragmatic performance ceiling. It affected almost nobody, but it was a real limit we chose.' },
          { title: 'The Boolean burden stayed', body: 'List building still required Boolean fluency. We knew it, shipped anyway, and it became the opening problem of Phase 3.' },
        ],
      },
    },
    {
      id: 'p2-impact',
      kicker: 'Impact',
      navLabel: 'Results & reflections',
      title: 'Ten million automations a day.',
      layout: 'metric-wall',
      source: 'Step3 · Results & Reflections',
      content: {
        metrics: [
          { value: '10M/day', label: 'Automation capacity' },
          { value: '8s', label: 'Trigger latency' },
          { value: '9s', label: 'Communication latency' },
          { value: '97%', label: 'QoQ workflow growth' },
        ],
        bullets: [
          ['Adoption', '1,101 active workflows across 199 agencies — past the 1,000 target set at kickoff.'],
          ['Depth', 'Hit the 10-active-journeys-per-customer goal, proving breadth of use rather than a single showcase flow.'],
          ['Customer ROI', 'Carvana tripled weekly starts; conversion lifted 40%; CSAT reached 96.6%.'],
        ],
      },
    },
    {
      id: 'p2-limitations',
      kicker: 'Limitations',
      navLabel: 'Limitations of Phase 2',
      title: 'A powerful canvas with a blunt brain.',
      layout: 'card-grid',
      source: 'Step3 · Limitations of Phase 2',
      content: {
        stacked: true,
        cards: [
          { title: 'The Boolean burden', banner: img('phase2/booleanBurden.png'), bannerFit: 'contain', accent: PALETTE[2], body: 'Building a list still meant constructing Boolean strings — a skill most recruiters did not have and should not have needed.' },
          { title: '"Dumb" logic', banner: img('phase2/DumbLogic.png'), bannerFit: 'contain', accent: PALETTE[1], body: 'Branches could only test explicit fields. The system could route a candidate but never judge one.' },
          { title: 'Data blind spots', banner: img('phase2/Blind.png'), bannerFit: 'contain', accent: PALETTE[0], body: 'Workflows ran at scale, but diagnosing why one underperformed still meant exporting to a spreadsheet.' },
        ],
        impact: {
          label: 'The Realisation',
          statement: 'We had built the nervous system. It had no intelligence.',
          footnote: 'Each of these three limitations became a Phase 3 product: AI Lister, Ask AI and Jarvis.',
        },
      },
    },
  ],
}

/* ── Part 4 — Phase 3 ────────────────────────────────────────── */

const phase3 = {
  id: 'phase3',
  label: 'Phase 3: Intelligence Layer',
  accent: PALETTE[4],
  sourceStep: 4,
  slides: [
    {
      id: 'p3-divider',
      layout: 'section-divider',
      navLabel: 'Phase 3 — the intelligence layer',
      title: 'Phase 3: Intelligence Layer',
      source: 'Step4 · Divider',
      content: {
        number: '03',
        label: 'The intelligence layer',
        thesis: 'Ask AI, AI Lister and Jarvis — intelligence layered onto the canvas, each one answering a Phase 2 limitation directly.',
      },
    },
    {
      id: 'p3-pivot',
      kicker: 'The Pivot',
      navLabel: 'From automation to intelligence',
      title: 'Automation was solved. Judgement was not.',
      layout: 'statement',
      source: 'Step4 · The Pivot',
      content: {
        body: 'Phase 2 gave customers a reliable execution engine. What it could not do was decide anything. Every branch tested a field that a human had already filled in; every list was only as good as the Boolean string behind it.',
        paragraphs: ['Phase 3 attacked that gap with three targeted products — one for content, one for targeting, one for analysis. All three were assistive by design, and that decision is exactly what set the ceiling we hit at the end of this phase.'],
      },
    },
    {
      id: 'p3-senseiq',
      kicker: 'Interaction Design',
      navLabel: 'Defining the AI interactions',
      title: 'First step is to finalise interaction of NLP input.',
      layout: 'media',
      source: 'Step4 · Defining Interactions First',
      content: {
        lede: 'Before any model work, we specified the interaction grammar: where AI is offered, how a suggestion is accepted, amended or rejected, and what the fallback is when it gets things wrong.',
        media: { kind: 'video', src: vid('workflow/senseiq-interactions.mp4') },
      },
    },
    {
      id: 'p3-askai',
      kicker: 'Ask AI',
      navLabel: 'Ask AI — helping recruiters build workflows',
      title: 'How Ask AI helped in workflows?',
      layout: 'split-media',
      source: 'Step4 · Ask AI',
      content: {
        blocks: [
          { title: 'The problem', body: 'Ops managers building a workflow would get stuck mid-task — "How do I add a path node?", "What do blackout settings do?" — with no way to find out without leaving the canvas to search docs or ping a teammate.' },
          { title: 'The solution', body: 'Ask AI answers in plain English, right inside the builder. Ask "how do I add a path node?" and it walks through the exact steps for where you are in the canvas — steps the user then follows directly, in the same screen.' },
          { title: 'Guided, not generated', body: 'We designed the interaction model around answering questions, not generating content: a contextual entry point, procedural step-by-step responses, and a clear fallback when a question falls outside the canvas.' },
        ],
        media: { kind: 'video', src: vid('ai/ask-ai.mov') },
      },
    },
    {
      id: 'p3-askai-embedded-chat',
      kicker: 'Ask AI',
      navLabel: 'A direction we tried: embedded chat',
      title: 'A direction we tried: embedded chat.',
      layout: 'media',
      source: 'Step4 · Ask AI — Embedded Chat exploration',
      content: {
        lede: 'Before finalising the floating window, we prototyped an embedded chat variant — closer to how Google Gemini sits inside Docs — pinned directly into the page layout rather than floating above it.',
        media: { kind: 'image', src: img('phase3/EmbeddedChat.png'), alt: 'Embedded chat variant of Ask AI, docked into the page layout' },
        caption: 'Why we didn\'t ship it: not all of our product pages are fully responsive, and we also support a Chrome extension surface — an embedded panel would have needed a reserved layout slot everywhere and broken inside the extension\'s constrained viewport. The floating window worked everywhere without either dependency.',
      },
    },
    {
      id: 'p3-lister',
      kicker: 'AI Lister',
      navLabel: 'AI Lister — solving the Boolean burden',
      title: 'AI Lister: describe the candidate, get the list.',
      layout: 'split-media',
      source: 'Step4 · AI Lister Agent',
      content: {
        blocks: [
          { title: 'The problem', body: 'The Boolean burden we shipped with in Phase 2. Constructing a query took 15–20 minutes and a skill most recruiters had never been trained in.' },
          { title: 'The solution', body: 'Natural-language search. The recruiter types "Java developers in SF available now"; the system generates the filter set and shows it back for verification.' },
          { title: 'The design rule', body: 'Always surface the interpreted criteria. A list you cannot audit is a list you cannot trust — and an untrusted list gets rebuilt by hand.' },
        ],
        media: { kind: 'video', src: vid('ai/ai-listers.mov') },
      },
    },
    ...(() => {
      const [research, ...rest] = strategySlides('p3-lister', 'AI Lister', relabelStrategy(AGENTS.find((a) => a.id === 'senseiq'), 'SenseIQ', 'AI Lister'))
      const quadrant = {
        id: 'p3-lister-quadrant',
        kicker: 'Research & Ideation',
        navLabel: 'AI Lister — the confidence matrix',
        title: 'Mapping the confidence matrix.',
        layout: 'quadrant',
        source: 'Step4 · AI Lister Research (confidence quadrants)',
        content: {
          lede: 'Two things vary independently in every request: how clearly the recruiter knows what they want, and how confident the system is that it understood. Four combinations, four different responses.',
          quadrants: CONFIDENCE_QUADRANTS,
        },
      }
      return [research, quadrant, ...rest]
    })(),
    {
      id: 'p3-jarvis',
      kicker: 'Jarvis',
      navLabel: 'Jarvis — the data agent',
      title: 'Jarvis: ask the dashboard a question.',
      layout: 'split-media',
      source: 'Step4 · Jarvis (The Data Agent)',
      content: {
        blocks: [
          { title: 'The problem', body: 'Analytics were passive. They showed what happened, never why — and extracting anything actionable meant exporting to Excel.' },
          { title: 'The solution', body: 'Conversational analytics. Ask why a workflow is underperforming and get a cited, diagnostic answer in about ten seconds.' },
          { title: 'Trust by citation', body: 'A confident wrong answer is worse than an uncertain right one. Jarvis always names its data source and time window.' },
        ],
        media: { kind: 'video', src: vid('ai/jarvis.mov') },
      },
    },
    ...strategySlides('p3-jarvis', 'Jarvis', AGENTS.find((a) => a.id === 'data')),
    {
      id: 'p3-limitations',
      kicker: 'Limitations',
      navLabel: 'The co-pilot ceiling',
      title: 'The co-pilot ceiling.',
      layout: 'card-grid',
      source: 'Step4 · Limitations of Phase 3',
      content: {
        lede: 'All three products worked. All three still required a human to press the button — which meant we had made the bottleneck faster without removing it.',
        stacked: true,
        cards: [
          { title: 'Assistive, not autonomous', banner: img('phase3/Human Bottleneck.png'), bannerFit: 'contain', accent: PALETTE[4], body: 'Every AI action needed a recruiter to trigger and approve it. The human bottleneck moved but never disappeared.' },
          { title: 'The execution gap', banner: img('phase3/Execution gap.png'), bannerFit: 'contain', accent: PALETTE[1], body: 'The system could read and write text but had no sensory capability — it could not make a call, hear an answer or handle a voicemail.' },
          { title: 'Disconnected brains', banner: img('phase3/DisconnectedBrains.png'), bannerFit: 'contain', accent: PALETTE[2], body: 'Ask AI, AI Lister and Jarvis each had their own context. Nothing one learned was available to the others.' },
        ],
        impact: {
          label: 'The Realisation',
          statement: 'Three smart assistants with no shared memory is not a teammate.',
          footnote: 'Phase 4 exists to give the intelligence one memory, one voice and the authority to act on its own.',
        },
      },
    },
  ],
}

/* ── Part 5 — Phase 4 ────────────────────────────────────────── */

const phase4 = {
  id: 'phase4',
  label: 'Phase 4: Agentic Shift',
  accent: PALETTE[3],
  sourceStep: 5,
  slides: [
    {
      id: 'p4-divider',
      layout: 'section-divider',
      navLabel: 'Phase 4 — the agentic shift',
      title: 'Phase 4: Agentic Shift',
      source: 'Step5 · Divider',
      content: {
        number: '04',
        label: 'The agentic shift',
        thesis: 'Grace and her sub-agents — the point where the system stops suggesting and starts acting.',
      },
    },
    {
      id: 'p4-evolution',
      kicker: 'The Final Evolution',
      navLabel: 'From co-pilot to colleague',
      title: 'From co-pilot to colleague.',
      layout: 'media',
      source: 'Step5 · The Final Evolution',
      content: {
        lede: 'The shift is smaller than it sounds and bigger than it looks: the same canvas, the same nodes — but the system now holds context across channels and is authorised to make the next move itself.',
        media: { kind: 'image', src: img('phase4/FullyAutonomous flow.png'), alt: 'Fully autonomous agentic flow' },
      },
    },
    {
      id: 'p4-discover',
      kicker: 'Step 1 · Sourcing',
      navLabel: 'Discover Agent (the Sourcer)',
      title: 'Discover Agent — the Sourcer.',
      layout: 'media',
      source: 'Step5 · Discover Agent',
      content: {
        lede: 'Deep Match surfaces the strongest candidates from the database without a manual search — combining skills, location, availability and behavioural signals, and stopping at a goal the agency sets.',
        media: { kind: 'image', src: img('phase4/discover.png'), alt: 'Discover Agent interface' },
      },
    },
    ...strategySlides('p4-discover', 'Discover Agent', AGENTS.find((a) => a.id === 'matching')),
    {
      id: 'p4-builder',
      kicker: 'Step 2 · Screening',
      navLabel: 'Voice Agent — the Multimodal Agent Builder',
      title: 'Built on the Multimodal Agent Builder.',
      layout: 'bullets-impact',
      source: 'Step5 · Step 2: Voice Agent (Multimodal Agent Builder foundation)',
      content: {
        lede: 'Legacy bots were rigid — if a candidate on SMS said "Can you call me?", the bot broke because it had no memory or voice capability. The Voice Agent is built on a no-code Multimodal Agent Builder designed to fix exactly that.',
        cards: [
          { title: 'Block-based architecture', body: 'Agents assembled from composable blocks rather than configured through forms — the Lego principle, applied one level up.' },
          { title: 'Context store', body: 'The shared memory Phase 3 lacked. What the voice agent hears is available to the evaluator without a handoff.' },
          { title: 'Dynamic flow', body: 'The agent chooses its next step at runtime based on what actually happened, instead of following a path drawn in advance.' },
        ],
        impact: {
          label: 'The Unlock',
          statement: 'One shared memory across text, voice and evaluation.',
          footnote: 'This is the single architectural change that separates an assistant from an agent.',
        },
      },
    },
    {
      id: 'p4-voice',
      kicker: 'Sub-Agent',
      navLabel: 'Voice Agent (the Screener)',
      title: 'Voice Agent — the Screener.',
      layout: 'media',
      source: 'Step5 · Voice Agent',
      content: {
        lede: 'Calls candidates and screens them with questions the Dynamic Question Module generates from the job description at runtime. It always discloses that it is AI, always allows escalation to a human, and switches to SMS when voice fails.',
        media: { kind: 'video', src: vid('ai/voice-agent.mov') },
        caption: 'Dynamic questions generated from the job description, with retry and voicemail handling built in.',
      },
    },
    ...strategySlides('p4-voice', 'Voice Agent', AGENTS.find((a) => a.id === 'voice')),
    {
      id: 'p4-evaluation',
      kicker: 'Step 3 · Decision',
      navLabel: 'Evaluation Agent (the Judge)',
      title: 'Evaluation Agent — the Judge.',
      layout: 'split-media',
      source: 'Step5 · Evaluation Agent',
      content: {
        blocks: [
          { title: 'Fit Score 1–10', body: 'A structured score across six dimensions, always shown with the evidence behind each one. Early versions returned a bare number and recruiters simply did not believe it.' },
          { title: 'Three modes', body: 'Resume-only for speed, transcript-only for communication-led roles, and combined for accuracy — the last improving qualification precision by 34%.' },
          { title: 'Configurable threshold', body: 'Crossing the bar triggers an ATS writeback automatically. Below it, the candidate routes to a human review queue rather than disappearing.' },
        ],
        media: { kind: 'image', src: img('phase4/Evaluation Summary.png'), alt: 'Evaluation summary' },
      },
    },
    ...strategySlides('p4-evaluation', 'Evaluation Agent', AGENTS.find((a) => a.id === 'screening')),
    {
      id: 'p4-grace',
      kicker: 'Step 4 · Orchestration',
      navLabel: 'Grace — the AI Recruiter',
      title: 'Grace does not do the work. She delegates it.',
      layout: 'split-media',
      source: 'Step5 · Step 4: Grace (AI Recruiter)',
      content: {
        blocks: [
          { title: 'The concept', body: 'When a job order arrives, Grace activates the Discover Agent, deploys the Voice Agent, instructs the Evaluation Agent, and closes with an ATS writeback — without a recruiter logging in.' },
          { title: 'Why framing mattered', body: 'Research showed recruiters trusted Grace far more when she was framed as a supervised colleague than as a tool to operate. We changed the UI language from "configure agent" to "set goals for Grace" and adoption moved.' },
        ],
        media: { kind: 'image', src: img('phase4/HeroImage.png'), alt: 'Grace, the AI Recruiter' },
      },
    },
    ...strategySlides('p4-grace', 'Grace', AGENTS.find((a) => a.id === 'ai-recruiter')),
    {
      id: 'p4-autosubmission',
      kicker: 'Use Case',
      navLabel: 'Auto-Submission, fully autonomous',
      title: 'Auto-Submission, finally without a human.',
      layout: 'process-flow',
      source: 'Step5 · Step 5: Auto-Submission in the Agentic World',
      content: {
        lede: 'The same use case from Phase 1, where it cost a recruiter an afternoon across four tools.',
        steps: [
          { title: 'Trigger — the Watcher', body: 'Grace detects the new job order and sets the run goals.' },
          { title: 'Sourcing — the Hand-off', body: 'Discover Agent returns the ranked candidate set.' },
          { title: 'Engagement — Multimodal', body: 'Voice and text screening with one shared context.' },
          { title: 'Decision — the Closer', body: 'Evaluation scores, then writes the submission to the ATS.' },
        ],
        media: { kind: 'video', src: vid('ai/air2.mov') },
      },
    },
    {
      id: 'p4-human-loop',
      kicker: 'Human in the Loop',
      navLabel: 'Human in the loop — the safety valve',
      title: 'Autonomy does not mean invisibility.',
      layout: 'media',
      source: 'Step5 · Step 6: Human in the Loop',
      content: {
        lede: 'Every candidate the agents aren\'t fully confident about routes to a Needs Review queue — with the full evidence trail attached, and the recruiter always holding the final call.',
        media: { kind: 'image', src: asset('/illustrations/case-study/phase4/HumanInLoop_Pipeline.png'), alt: 'Candidate pipeline showing candidates that need recruiter review, and the review side panel with supporting information and recruiter actions' },
        caption: 'Left: the Candidate Pipeline — Applied, Auto-Screened, Needs Review, Shortlisted, Rejected. Right: opening a candidate surfaces the full case and one-click actions. A recruiter never has to trust a black-box score — they see exactly why, and can override it in one click.',
      },
    },
    {
      id: 'p4-outcomes',
      kicker: 'Phase 4 Outcomes',
      navLabel: 'Phase 4 outcomes',
      title: 'What autonomy actually delivered.',
      layout: 'metric-wall',
      source: 'Step5 · Phase 4 Outcomes & Impact',
      content: {
        metrics: [
          { value: '11.1 hrs', label: 'Fastest hard-role fill (BGSF)' },
          { value: '20/100', label: 'Qualified evaluations per sourced candidate' },
          { value: '60%', label: 'Cold calls lasting over 8 minutes' },
          { value: '$5M+', label: 'Booked ARR from the AI Recruiter line' },
        ],
        bullets: [
          ['Unprecedented speed', 'A role that historically took days was filled in 11.1 hours end to end.'],
          ['Productivity', 'Over 50,000 hours of manager time saved at HCA Healthcare alone.'],
          ['Scheduling scale', '404,507 meetings booked YTD — a 175% year-on-year increase.'],
        ],
      },
    },
  ],
}

/* ── Part 6 — Outcomes ───────────────────────────────────────── */

const outcomes = {
  id: 'outcomes',
  label: 'Outcomes & Impact',
  accent: PALETTE[5],
  sourceStep: 6,
  slides: [
    {
      id: 'out-divider',
      layout: 'section-divider',
      navLabel: 'Outcomes & impact',
      title: 'Outcomes & Impact',
      source: 'Step6 · Divider',
      content: {
        number: '05',
        label: 'Outcomes & impact',
        thesis: 'Four years, four phases, and one use case that finally runs itself.',
      },
    },
    {
      id: 'out-summary',
      kicker: 'Summary',
      navLabel: 'The four-year arc',
      title: 'From tools a recruiter operates to a team they supervise.',
      layout: 'media',
      source: 'Step6 · Outcomes & Impact intro',
      content: {
        lede: 'Each phase removed the constraint the last one exposed: silos, then blunt logic, then the assistive ceiling. What is left is a system that acts on its own and shows its working.',
        media: { kind: 'image', src: img('phase4/Summary.png'), alt: 'Summary of the four-phase evolution' },
      },
    },
    {
      id: 'out-wins',
      kicker: 'Strategic Wins',
      navLabel: '2025–2026 strategic wins',
      title: 'Where it landed in the market.',
      layout: 'card-grid',
      source: 'Step6 · 2025–2026 Strategic Wins',
      content: {
        cards: [
          { title: 'Speed to lead', body: 'BGSF filled a historically hard role in 11.1 hours — the fastest on record.' },
          { title: 'Operational transformation', body: 'HCA Healthcare saved over 50,000 hours of manager time.' },
          { title: 'Brand reputation', body: 'TalentBurst moved from 2.0 to 4.2 on Glassdoor as candidate communication stopped going dark.' },
          { title: 'Referral velocity', body: 'Dietitians On Demand generated 107 referrals in 45 days.' },
          { title: 'Capacity multiplier', body: 'Carvana tripled weekly starts per recruiter.' },
          { title: 'Enterprise adoption', body: '$4.6M in post-pilot ARR converted.' },
        ],
      },
    },
    {
      id: 'out-roi',
      kicker: 'Business ROI',
      navLabel: 'General business ROI',
      title: 'The numbers across all deployments.',
      layout: 'metric-wall',
      source: 'Step6 · General Business ROI',
      content: {
        metrics: [
          { value: '30–81%', label: 'Reduction in time-to-hire' },
          { value: '30%', label: 'Reduction in cost per hire' },
          { value: '1M+', label: 'Candidates engaged per year' },
          { value: '96.6%', label: 'Customer satisfaction' },
        ],
      },
    },
    {
      id: 'out-agents',
      kicker: 'Agent Performance',
      navLabel: 'AI agent performance',
      title: 'How the agents performed.',
      layout: 'card-grid',
      source: 'Step6 · AI Agent Performance',
      content: {
        cards: [
          { title: 'Rapid evaluation', body: '33 minutes from application to a scored, evidence-backed evaluation.' },
          { title: 'Quality benchmark', body: '20 qualified evaluations per 100 sourced — ahead of the human average.' },
          { title: 'Funnel optimisation', body: 'Two-minute engagement after application, where research shows connection rates rise fourfold.' },
          { title: 'Scheduling scale', body: '404,507 meetings booked YTD, up 175% year on year.' },
        ],
      },
    },
    {
      id: 'out-conclusion',
      kicker: 'Conclusion',
      navLabel: 'From tools to teammates',
      title: 'From tools to teammates.',
      layout: 'bullets-impact',
      source: 'Step6 · Conclusion',
      content: {
        cards: [
          { title: 'Solving the "black hole"', body: 'The defining failure of recruitment was silence after applying. Closing that loop — at every stage, automatically — is what every phase was ultimately for.' },
          { title: 'The "glass box" philosophy', body: 'Autonomy is only acceptable when it is inspectable. Every decision an agent makes is visible, traceable and overrideable on the canvas.' },
          { title: 'Future vision: true agentic AIR', body: 'By 2026, agents that learn from outcomes and adjust their own targeting — closing the learning loop that the whole category still leaves open.' },
        ],
        impact: {
          label: 'The Thesis',
          statement: 'One recruiter, operating with the capacity of a team.',
          footnote: 'Not because the tools got faster, but because the recruiter stopped being the thing that connects them.',
        },
      },
    },
    {
      id: 'out-future',
      kicker: 'What Is Next',
      navLabel: 'Future vision',
      title: 'The loop that is still open.',
      layout: 'media',
      source: 'Step6 · Future Vision',
      content: {
        lede: 'Every phase so far removed a human from the execution path. The next one removes them from the optimisation path — agents that read their own outcomes and retune targeting without being asked.',
        media: { kind: 'image', src: img('phase4/Future.png'), alt: 'Future vision of agentic AI' },
      },
    },
  ],
}

const deck = {
  id: 'evolution',
  title: 'Evolution of AI Automation Agent',
  routeBase: 'case-study',
  parts: [intro, phase1, phase2, phase3, phase4, outcomes],
}

/* First slide of the part matching a scroll-mode step — used by the Play button. */
export function slideIndexForStep(step) {
  let n = 1
  for (const part of deck.parts) {
    if (part.sourceStep === step) return n
    n += part.slides.length
  }
  return 1
}

export default deck
