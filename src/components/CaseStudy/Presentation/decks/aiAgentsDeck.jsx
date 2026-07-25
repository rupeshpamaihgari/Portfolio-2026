import { AGENTS } from '../../agentsData'

/* ─────────────────────────────────────────────────────────────
   AI Agents deck — generated from the same AGENTS array that
   drives AIAgentsCasePage, so the two can never drift apart.
   6 agents × 8 slides + cover + closing.
───────────────────────────────────────────────────────────── */

/* First sentence of a context blurb, normalised to exactly one full stop —
   `split('. ')[0]` keeps the period when the text is a single sentence. */
const firstSentence = (text) => `${text.split('. ')[0].replace(/\.+$/, '')}.`

const SUMMARY_KPIS = [
  { value: '30–81%', label: 'Reduction in time-to-hire across deployments', accent: '#F4A58A' },
  { value: '1M+', label: 'Candidates engaged per year across all agents', accent: '#B8D4F8' },
  { value: '50K+', label: 'Hours of recruiter time saved (HCA Healthcare alone)', accent: '#B8F4D4' },
]

const coverPart = {
  id: 'overview',
  label: 'Overview',
  accent: '#F8E4A0',
  slides: [
    {
      id: 'cover',
      layout: 'title',
      navLabel: 'AI Agents for Recruitment',
      title: 'AI Agents for Recruitment',
      content: {
        eyebrow: 'Case Study',
        heading: 'AI Agents for Recruitment',
        subtitle: 'Six specialised agents that turn a job order into a qualified submission — matching, calling, screening and deciding without a recruiter in the loop.',
        meta: [
          { label: 'Role', value: 'Staff Product Designer' },
          { label: 'Timeline', value: '2022 – Present' },
          { label: 'Company', value: 'SenseHQ' },
        ],
      },
    },
    {
      id: 'summary',
      kicker: 'Project Summary',
      navLabel: 'Six agents. One mission.',
      title: 'Six agents. One mission.',
      layout: 'metric-wall',
      content: {
        lede: 'Each agent owns one stage of the funnel and hands off to the next. Together they close the loop from job order to ATS submission — with a recruiter supervising rather than operating.',
        metrics: SUMMARY_KPIS,
      },
    },
    {
      id: 'roster',
      kicker: 'The Roster',
      navLabel: 'Meet the six agents',
      title: 'Who does what.',
      layout: 'card-grid',
      content: {
        cards: AGENTS.map((a) => ({
          title: `${a.icon}  ${a.label}`,
          body: `${a.sublabel} — ${firstSentence(a.context)}`,
          accent: a.color,
        })),
        minWidth: 280,
      },
    },
  ],
}

/* Short, stable headings for the three "why" points on every agent. */
const WHY_TITLES = ['The bottleneck', 'Why it could not scale', 'What we set out to change']

const agentToPart = (agent) => ({
  id: agent.id,
  label: agent.label,
  accent: agent.color,
  sourceAgentId: agent.id,
  slides: [
    {
      id: `${agent.id}-divider`,
      layout: 'section-divider',
      navLabel: `${agent.label} — ${agent.sublabel}`,
      title: agent.label,
      content: {
        number: agent.icon,
        label: agent.label,
        thesis: `${agent.sublabel} · ${firstSentence(agent.context)}`,
      },
    },
    {
      id: `${agent.id}-context`,
      kicker: 'Context',
      navLabel: `What ${agent.label} is`,
      title: `What ${agent.label} is`,
      layout: 'statement',
      content: { body: agent.context },
    },
    {
      id: `${agent.id}-why`,
      kicker: 'Why',
      navLabel: `Why we needed ${agent.label}`,
      title: `Why do we need ${agent.label}?`,
      layout: 'bullets-impact',
      content: {
        cards: agent.why.map((body, i) => ({ title: WHY_TITLES[i], body })),
        impact: {
          label: 'The Impact',
          statement: `${agent.impact[0].value} — ${agent.impact[0].label.toLowerCase()}.`,
          footnote: `${agent.label} now runs this stage autonomously, with the recruiter supervising rather than executing.`,
        },
      },
    },
    {
      id: `${agent.id}-research`,
      kicker: 'Research & Ideation',
      navLabel: 'Research & ideation',
      title: 'What the research told us.',
      layout: 'card-grid',
      content: { cards: agent.research },
    },
    {
      id: `${agent.id}-constraints`,
      kicker: 'Constraints',
      navLabel: 'Constraints & limitations',
      title: 'What we had to design around.',
      layout: 'card-grid',
      content: { cards: agent.constraints },
    },
    {
      id: `${agent.id}-guardrails`,
      kicker: 'Guardrails',
      navLabel: 'Guardrails & principles',
      title: 'The rules the agent cannot break.',
      layout: 'list',
      content: {
        lede: 'Autonomy only earns trust when its limits are explicit. These guardrails shipped with the agent, not after it.',
        items: agent.guardrails,
      },
    },
    {
      id: `${agent.id}-variations`,
      kicker: 'Design Variations',
      navLabel: 'Design variations explored',
      title: 'Three directions we built and tested.',
      layout: 'card-grid',
      content: { cards: agent.variations, numbered: true, minWidth: 280 },
    },
    {
      id: `${agent.id}-impact`,
      kicker: 'Impact & Outcomes',
      navLabel: 'Impact & outcomes',
      title: `What ${agent.label} shipped.`,
      layout: 'metric-wall',
      content: { metrics: agent.impact },
    },
  ],
})

const closingPart = {
  id: 'closing',
  label: 'Closing',
  accent: '#D4B8F8',
  slides: [
    {
      id: 'closing-orchestration',
      kicker: 'The System',
      navLabel: 'How the agents chain together',
      title: 'One job order, four handoffs, zero manual steps.',
      layout: 'process-flow',
      content: {
        lede: 'Grace orchestrates; the specialists execute. Each handoff carries full context forward, which is what makes the chain autonomous rather than merely automated.',
        steps: [
          { title: 'Job order lands', body: 'Grace picks up the trigger and sets goals for the run.' },
          { title: 'Matching Agent', body: 'Deep Match surfaces the top candidates from the database.' },
          { title: 'Voice Agent', body: 'Calls, screens with JD-generated questions, handles retries.' },
          { title: 'Screening Agent', body: 'Scores 1–10 against the rubric, cites its evidence.' },
          { title: 'ATS writeback', body: 'Qualified candidates submitted with no manual data entry.' },
        ],
      },
    },
    {
      id: 'closing-thesis',
      kicker: 'Design Thesis',
      navLabel: 'The Glass Box principle',
      title: 'A recruiter should supervise the work, not perform it.',
      layout: 'bullets-impact',
      content: {
        cards: [
          { title: 'Glass Box, not black box', body: 'Every decision an agent makes is visible, traceable and overrideable on the canvas. Confidence without transparency does not survive contact with a real recruiter.' },
          { title: 'Delegation over operation', body: 'Framing Grace as a supervised colleague rather than a tool changed adoption more than any feature did. Language was the design.' },
          { title: 'Guardrails ship first', body: 'Disclosure, opt-out, human escalation and audit trails were requirements, not follow-ups. They are what made autonomy acceptable to enterprise buyers.' },
        ],
        impact: {
          label: 'The Outcome',
          statement: 'One recruiter, operating with the capacity of a team.',
          footnote: '$5M+ booked ARR, 404K meetings scheduled YTD, and the fastest hard-role fill on record at 11.1 hours.',
        },
      },
    },
  ],
}

const deck = {
  id: 'ai-agents',
  title: 'AI Agents for Recruitment',
  routeBase: 'AiAgents',
  parts: [coverPart, ...AGENTS.map(agentToPart), closingPart],
}

/* First slide of the part matching an agent id — used by the Play button. */
export function slideIndexForAgent(agentId) {
  let n = 1
  for (const part of deck.parts) {
    if (part.sourceAgentId === agentId) return n
    n += part.slides.length
  }
  return 1
}

export default deck
