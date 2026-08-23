import { useRef, useState } from 'react'
import { asset } from '../../../../utils/asset'
import { PALETTE, ST, Media, ImpactStrip } from '../SlideLayouts'
import { WorkflowIllustration } from '../../../ProjectsSection_2'
import { NumbersAndExperience, Achievements, PillarHierarchy } from './aboutDeck'
import { CaseStudyScrollableImage, Lightbox } from '../../CaseStudyMedia'

/* ─────────────────────────────────────────────────────────────
   Workflow Automation Builder — standalone presentation deck.

   A focused cut of the "Evolution of AI Automation Agent" case
   study (evolutionDeck.jsx), scoped to just the Automations /
   Workflow Builder chapter, plus a short "about me" intro. Every
   slide below was requested explicitly — nothing extra was added,
   including no filler section-diviers between parts.

   Reached only via #/automations/present/N — not linked from the
   home page yet.
───────────────────────────────────────────────────────────── */

const img = (p) => asset(`/illustrations/case-study/${p}`)
const FONT_H = "'Fredoka', sans-serif"
const FONT_B = "'Nunito', sans-serif"

/* ── Slide 1 — Landing ───────────────────────────────────────── */

/* Reuses the site's own Automations illustration (with its live
   mouse-tilt animation) beside a cover title — same recipe as the
   ProjectsSection_2 Automations tab, just re-hosted for the deck. */
function AutomationsCover() {
  const outerRef = useRef(null)
  const meta = [
    { label: 'Role', value: 'Staff Product Designer' },
    { label: 'Timeline', value: '2022 – 2024' },
    { label: 'Company', value: 'SenseHQ' },
  ]
  return (
    <div
      ref={outerRef}
      className="flex-col md:flex-row"
      style={{
        display: 'flex', alignItems: 'center', gap: '44px',
        background: 'linear-gradient(135deg, #eafaf1 0%, #eef6ff 55%, #fff8ec 100%)',
        borderRadius: '24px', padding: 'clamp(28px, 4vw, 56px)',
        border: '1px solid rgba(0,0,0,0.06)', position: 'relative', overflow: 'hidden',
        minHeight: '460px', boxSizing: 'border-box',
      }}
    >
      <div style={{ position: 'absolute', top: '-90px', right: '-90px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,244,212,0.35) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />

      <WorkflowIllustration outerRef={outerRef} />

      <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
        <span style={{ ...ST.kicker, color: '#999' }}>Case Study</span>
        <h1 style={{ fontFamily: FONT_H, fontSize: 'clamp(28px, 4.2vw, 50px)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.08, color: '#111', margin: '12px 0 16px' }}>
          Workflow Automation Builder
        </h1>
        <p style={{ fontFamily: FONT_B, fontSize: '15.5px', lineHeight: 1.75, color: '#555', maxWidth: '420px', margin: '0 0 28px' }}>
          Designing the canvas that turned eight siloed automation tools into one system recruiters could see, build and trust.
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {meta.map((m, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(0,0,0,0.08)', borderRadius: '999px',
                padding: '9px 16px', display: 'flex', alignItems: 'center', gap: '9px',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: PALETTE[i % PALETTE.length], flexShrink: 0 }} />
              <span style={{ fontFamily: FONT_B, fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#999' }}>{m.label}</span>
              <span style={{ width: '1px', height: '13px', background: 'rgba(0,0,0,0.1)' }} />
              <span style={{ fontFamily: FONT_B, fontSize: '13px', fontWeight: 650, color: '#222' }}>{m.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Slide 2 — A brief about me ──────────────────────────────── */

function SectionLabel({ label, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '30px 0 12px' }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, flexShrink: 0 }} />
      <span style={{ fontFamily: FONT_B, fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999' }}>{label}</span>
    </div>
  )
}

function AboutMe() {
  return (
    <>
      <p style={{ ...ST.body, fontSize: '16px', lineHeight: 1.8, color: '#555', maxWidth: '780px', margin: '0 0 8px' }}>
        Eleven years bridging code and experience, four roles, and four international wins along the way.
      </p>
      <SectionLabel label="By the Numbers" color={PALETTE[1]} />
      <NumbersAndExperience />
      <SectionLabel label="Achievements" color={PALETTE[3]} />
      <Achievements />
    </>
  )
}

/* ── Slide 6 — The complexity ────────────────────────────────── */

function ComplexityBlock({ title, body, accent }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '8px' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: accent, flexShrink: 0 }} />
        <span style={{ fontFamily: FONT_B, fontSize: '13px', fontWeight: 700, color: '#111' }}>{title}</span>
      </div>
      <p style={{ fontFamily: FONT_B, fontSize: '14px', lineHeight: 1.75, color: '#555', margin: 0 }}>{body}</p>
    </div>
  )
}

function TheComplexity({ accent }) {
  return (
    <>
      <p style={{ ...ST.body, fontSize: '16px', lineHeight: 1.8, color: '#555', maxWidth: '780px', margin: '0 0 26px' }}>
        A workflow never runs on its own — every flow reads from and writes to 10+ other systems, and every node on the canvas belongs to a surface some other designer owns.
      </p>
      <div
        className="pd-blocks"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '22px 34px', alignItems: 'start', marginBottom: '28px' }}
      >
        <ComplexityBlock
          accent={accent}
          title="10+ systems to integrate"
          body="ATS records, messaging, scheduling, chatbots, CRM, analytics and more all had to read and write through the same canvas — success was set, before a line of code was written, at sub-10-second execution and 10M automations a day."
        />
        <ComplexityBlock
          accent={accent}
          title="Coordinating across designers"
          body="Workflows sit at the center of the Sense Automation Platform — every node the builder ships touches a pod owned by a different designer, so every change needed shared review, not a solo call."
        />
      </div>

      <Media media={{ kind: 'scroll', src: img('phase2/Workflow_Integrations.png'), alt: 'Workflow integrations map' }} />
      <p style={{ ...ST.caption, margin: '10px 2px 26px' }}>The systems a single workflow can touch — the integration surface that set the performance bar.</p>

      <p style={{ fontFamily: FONT_B, fontSize: '12.5px', color: '#888', margin: '0 0 14px' }}>
        Below: the product areas feeding into that canvas, and which pod owns each one.
      </p>
      <PillarHierarchy />
    </>
  )
}

/* ── Platform shift — the four-phase arc, simplified ──────────── */

/* A plainer reading of the case study's chalkboard timeline: same
   four phases, years and goals, rebuilt as light cards so the arc
   is legible at presentation distance instead of asking a room to
   decode a dense hand-drawn diagram. Reuses the shell's existing
   `pd-flow` / `pd-flow-arrow` classes, so it stacks and rotates its
   arrows on mobile for free. */
const PLATFORM_PHASES = [
  { n: '01', period: '2021', name: 'Journeys 1.0', kind: 'Siloed tools', goal: 'Do it faster', icon: '⚙️', accent: PALETTE[1] },
  { n: '02', period: '2022–23', name: 'The Canvas', kind: 'Logic & structure', goal: 'Do it systematically', icon: '🧩', accent: PALETTE[2] },
  { n: '03', period: '2024', name: 'Intelligence', kind: 'Data & search agents', goal: 'Do it smarter', icon: '🧠', accent: PALETTE[4] },
  { n: '04', period: 'Current', name: 'AI Recruiter', kind: 'Digital teammates', goal: 'Do it for me', icon: '🤖', accent: PALETTE[3] },
]

function PlatformShift() {
  return (
    <div>
      {/* The one-line thesis the whole four-phase arc serves. */}
      <div
        style={{
          background: '#fff', borderRadius: '18px', border: '1px solid rgba(0,0,0,0.05)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)', padding: '20px 26px',
          marginBottom: '22px', textAlign: 'center',
        }}
      >
        <span style={{ ...ST.kicker, display: 'block', color: '#aaa', marginBottom: '12px' }}>The Shift</span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(12px, 3vw, 24px)', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: FONT_H, fontSize: 'clamp(15px, 2vw, 21px)', fontWeight: 500, color: '#bbb' }}>
            System of Record
          </span>
          <svg width="46" height="12" viewBox="0 0 46 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path d="M1 6h38M34 1.5 39 6l-5 4.5" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: FONT_H, fontSize: 'clamp(17px, 2.4vw, 25px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#111' }}>
            System of Action
          </span>
        </div>
      </div>

      <div className="pd-flow" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', gap: '10px' }}>
        {PLATFORM_PHASES.map((p, i) => (
          <div key={p.n} style={{ display: 'flex', alignItems: 'stretch', gap: '10px', flex: '1 1 190px', minWidth: 0 }}>
            <div
              style={{
                background: '#fff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)', flex: 1, minWidth: 0,
                position: 'relative', overflow: 'hidden', padding: '18px 18px 16px',
                display: 'flex', flexDirection: 'column', gap: '11px',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: p.accent }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <span style={{ ...ST.kicker, color: '#999' }}>{p.period}</span>
                <span style={{ fontFamily: FONT_B, fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#333', background: p.accent, borderRadius: '999px', padding: '3px 9px', whiteSpace: 'nowrap' }}>
                  Phase {p.n}
                </span>
              </div>

              <div style={{ width: '38px', height: '38px', borderRadius: '11px', background: `${p.accent}55`, border: `1px solid ${p.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', lineHeight: 1 }}>
                {p.icon}
              </div>

              <div>
                <div style={{ fontFamily: FONT_H, fontSize: '17px', fontWeight: 700, letterSpacing: '-0.02em', color: '#111', lineHeight: 1.2 }}>{p.name}</div>
                <div style={{ fontFamily: FONT_B, fontSize: '11.5px', color: '#888', marginTop: '3px', lineHeight: 1.4 }}>{p.kind}</div>
              </div>

              {/* Auto margin pins every goal to the card bottom, so the
                  four read as one row even when the names wrap differently. */}
              <div style={{ marginTop: 'auto', paddingTop: '11px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <span style={{ ...ST.kicker, fontSize: '9px', color: '#bbb', display: 'block', marginBottom: '4px' }}>Goal</span>
                <span style={{ fontFamily: FONT_B, fontSize: '13px', fontWeight: 700, color: '#222', lineHeight: 1.35 }}>{p.goal}</span>
              </div>
            </div>

            {i < PLATFORM_PHASES.length - 1 && (
              <svg className="pd-flow-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ alignSelf: 'center', flexShrink: 0, opacity: 0.35 }}>
                <path d="M6 4L10 8L6 12" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Node anatomy — compact stacked rows ─────────────────────── */

/* A hand-height-capped version of the "stacked" card recipe — the
   shared CardVisual sizes a banner by its own aspect ratio at half
   the row's width, which made three real UI screenshots run ~220px
   tall each. Capping the image to a fixed thumbnail height keeps
   all three rows, plus the verdict strip, on one screen. */
const NODE_VERSIONS = [
  { title: 'V1 — rejected', src: '/Nodecards/Workflow Cards_V1.png', accent: PALETTE[0], body: 'A coloured band and node code, but no content preview and nowhere for conditions or delays to live.' },
  { title: 'V2 — rejected', src: '/Nodecards/Workflow Cards_V2.png', accent: PALETTE[1], body: 'Added a custom name alongside the system code, but still no preview text or scalable functional chips.' },
  { title: 'V3 — adopted ✓', src: '/Nodecards/Workflow Cards_V3.png', accent: PALETTE[2], body: 'Band, code, custom name, content preview and scalable chips — the only version that stayed readable as the library grew.' },
]

/* Full-width panel with its own internal vertical scrollbar — for a
   portrait diagram (the Anatomy breakdown) that needs to render at
   full slide width to stay legible, without forcing the whole slide
   to grow to the diagram's full natural height. */
function VerticalScrollImage({ src, alt, maxHeight = 560 }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`Expand image: ${alt}`}
        onKeyDown={(e) => { if (e.key === 'Enter') setOpen(true) }}
        className="cs-media-frame"
        style={{
          borderRadius: '18px', border: '1.5px solid #e8e6e0', background: '#fff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06), inset 0 1px 2px rgba(0,0,0,0.03)',
          maxHeight: `${maxHeight}px`, overflowY: 'auto', overflowX: 'hidden', cursor: 'zoom-in',
        }}
      >
        <img src={src} alt={alt} draggable={false} style={{ display: 'block', width: '100%', height: 'auto' }} />
      </div>
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  )
}

function NodeAnatomyRows({ accent }) {
  return (
    <>
      <p style={{ ...ST.body, fontSize: '15px', lineHeight: 1.7, color: '#555', maxWidth: '780px', margin: '0 0 18px' }}>
        V1 and V2 were rejected for the same reason in different ways: they could not stay readable as the node library grew.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {NODE_VERSIONS.map((v) => (
          <div
            key={v.title}
            style={{
              background: '#fff', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.05)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)', overflow: 'hidden', position: 'relative',
              display: 'flex', alignItems: 'center', gap: '18px', padding: '14px 20px',
            }}
          >
            <span style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '3px', background: v.accent }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ ...ST.cardTitle, marginBottom: '5px' }}>{v.title}</div>
              <p style={{ fontFamily: FONT_B, fontSize: '12.5px', lineHeight: 1.55, color: '#666', margin: 0 }}>{v.body}</p>
            </div>
            <img
              src={asset(v.src)}
              alt={v.title}
              style={{ width: '420px', height: '152px', objectFit: 'contain', flexShrink: 0 }}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: '22px' }}>
        <VerticalScrollImage src={asset('/Nodecards/NodeAnatomy.png')} alt="Node card component anatomy" />
        <p style={{ ...ST.caption, margin: '10px 2px 0' }}>Component anatomy — every element on the card mapped to its own design token. Scroll to see all 17.</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <CaseStudyScrollableImage src={asset('/Nodecards/NodeCards_States.png')} alt="Node card interaction states" height={252} style={{ margin: 0 }} />
        <p style={{ ...ST.caption, margin: '10px 2px 0' }}>Interaction states — default, hover, selected, warning and not-published. Scroll to see all states.</p>
      </div>

      <div style={{ marginTop: '18px' }}>
        <ImpactStrip
          accent={accent}
          impact={{
            label: 'Why V3 Won',
            statement: 'The only version that stayed readable as the library grew.',
            footnote: 'Every node type added since — including AI and agent nodes — shipped inside this same card structure without modification.',
          }}
        />
      </div>
    </>
  )
}

/* ── Deep dive — Variable Picker ──────────────────────────────── */

const vp = (p) => asset(`/Workflows/Vairalbe picker/${p}`)

const VARIABLE_PICKER_FLOWS = [
  { title: 'Typeahead variable search', body: 'Search inline in the field — results are grouped into SenseIQ Recommended and All Variables.' },
  { title: 'SenseIQ recommendations', body: 'Top-ranked variables surface first, each with supporting evidence for why it fits the field.' },
  { title: 'Variable info card', body: 'Hover the info icon for the description, value coverage, sample values, and why it is recommended.' },
  { title: 'Ask SenseIQ from the menu footer', body: '"Can\'t find the right variable?" opens SenseIQ with recommendations for the current field.' },
  { title: 'Typeahead empty state', body: 'When nothing matches, a prompt offers to let SenseIQ find the right field.' },
  { title: 'Variable Picker panel', body: 'Full panel with entity tabs, entity filter, recommended chips, and a detailed variable table.' },
  { title: 'Describe-the-field semantic search', body: 'A multi-word description in the picker triggers a SenseIQ semantic match, with loading and empty states.' },
  { title: 'SenseIQ assistant window', body: 'Conversational recommendations with supporting evidence and expandable field details.' },
]

/* The deck's standard "numbered card" recipe (top accent bar, tabular
   number, title, body) — matches CardGrid's own cards exactly, so this
   slide's cards read as the same system as every other slide. */
/* `bare` drops the boxed-card chrome (background, border, shadow) and
   just stacks the number + title + body — for when the card would
   otherwise be nested inside another container that already provides
   the white background and border, which would double the framing. */
function NumberedCard({ n, title, body, accent, bare = false }) {
  const header = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
      {n && <span style={{ fontFamily: FONT_B, fontSize: '12px', fontWeight: 700, color: accent, letterSpacing: '0.06em', fontVariantNumeric: 'tabular-nums' }}>{n}</span>}
      <span style={ST.cardTitle}>{title}</span>
    </div>
  )
  const text = <p style={{ fontFamily: FONT_B, fontSize: '13.5px', lineHeight: 1.7, color: '#555', margin: 0 }}>{body}</p>

  if (bare) {
    return <div>{header}{text}</div>
  }

  return (
    <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', padding: '20px 22px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: accent }} />
      {header}
      {text}
    </div>
  )
}

const CHALLENGE_CARDS = [
  { title: 'What V1 did', body: 'Surfaced every variable a workflow could reference in one long, unranked list per field — cryptic entries like owner/AD - rupesh, owner/AD - Test and owner/GV-Test-2 sitting beside each other with no description, spread across as many as 23 pages of near-identical Candidate fields like matt_gv_test and nilarnab_email_global.' },
  { title: 'Why it was a big problem', body: 'Nothing told a recruiter which variable actually resolved to real data. A large share were personal test values that returned null in production — pick the wrong one and a message went out blank, or the whole workflow silently failed at send time.' },
]

function VariablePickerDeepDive({ accent }) {
  return (
    <>
      <p style={{ ...ST.body, fontSize: '16px', lineHeight: 1.8, color: '#555', maxWidth: '780px', margin: '0 0 28px' }}>
        The Variable Picker looked like a small utility, but it decided whether a message actually reached the right person — which is why it made the top three hardest problems on the canvas.
      </p>

      <SectionLabel label="The Challenge" color={PALETTE[0]} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '18px' }}>
        {CHALLENGE_CARDS.map((c, i) => (
          <NumberedCard key={c.title} n={String(i + 1).padStart(2, '0')} title={c.title} body={c.body} accent={PALETTE[0]} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div>
          <Media media={{ kind: 'image', src: vp('Variable_Picker_V1.png'), alt: 'Variable Picker V1 — a flat, unranked dropdown of near-duplicate variables' }} />
          <p style={{ ...ST.caption, margin: '8px 2px 0' }}>V1 — a flat dropdown with no ranking or descriptions.</p>
        </div>
        <div>
          <Media media={{ kind: 'image', src: vp('VariablePickerV1_Table.png'), alt: 'Variable Picker V1 — a 23-page paginated table of cryptic variable names' }} />
          <p style={{ ...ST.caption, margin: '8px 2px 0' }}>V1 — 23 pages of cryptic, unranked names.</p>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <SectionLabel label="What Research Told Us" color={PALETTE[4]} />
        <ImpactStrip
          accent={PALETTE[4]}
          impact={{
            label: 'Research Finding',
            statement: 'Variables looked nearly identical to each other, and recruiters could not tell which one to use for reliable engagement.',
            footnote: 'They second-guessed almost every field — and many of those look-alike variables carried null values that would fail the workflow outright.',
          }}
        />
      </div>

      <div style={{ marginTop: '30px' }}>
        <SectionLabel label="The New Design" color={PALETTE[2]} />
        <p style={{ fontFamily: FONT_B, fontSize: '14px', lineHeight: 1.75, color: '#555', margin: '0 0 16px', maxWidth: '780px' }}>
          SenseIQ now ranks, explains and rescues every variable choice — captured end to end below.
        </p>
        <Media media={{ kind: 'video', src: vp('VariablePicker_New.mov') }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginTop: '22px' }}>
          {VARIABLE_PICKER_FLOWS.map((f, i) => (
            <NumberedCard key={f.title} n={String(i + 1).padStart(2, '0')} title={f.title} body={f.body} accent={PALETTE[i % PALETTE.length]} />
          ))}
        </div>
      </div>
    </>
  )
}

/* ── Deep dive — Scheduling ───────────────────────────────────── */

const sc = (p) => asset(`/Workflows/Scheduling/${p}`)

const SCHEDULING_PROBLEM_CARDS = [
  { title: 'What V1 offered', body: 'One radio choice each for Schedule Date (Workflow Trigger Date / Static Date / Date field) and Schedule Time (Trigger time / Static Time / Time Field), plus a single Repeat toggle with no further options — and a static summary line that did not reliably match the actual selection.' },
  { title: 'Why it fell short', body: 'There was no way to anchor a send to a candidate\'s own data, like a joining date, no way to push a send off a weekend or blackout day, and no repeat cadence beyond on/off. Recruiters faked relative timing with extra journeys and delay nodes instead.' },
]

const SCHEDULING_WHY_CARDS = [
  { title: 'Relative, not just static', body: 'A single date field like Candidate/DateofJoining can now anchor scheduling directly, instead of forcing every timed message through the workflow\'s own trigger or a hardcoded date.' },
  { title: 'Offsets that speak plain English', body: '"After 2 Days" reads the way a recruiter already thinks about timing, instead of a raw delay duration buried in a node.' },
  { title: 'Day-of-week awareness', body: '"Adjust to a Day" pushes a send to the next 1st Monday — or any rule — automatically, so a reminder never lands on a day nobody is checking messages.' },
  { title: 'Guardrails kept separate and opt-in', body: 'Blackout Days and Skip Frequency Limit sit outside the date/time hierarchy entirely, off by default, so the riskier override is a deliberate choice, not an accident.' },
]

const SCHEDULING_HIERARCHY_STEPS = [
  { title: 'Start from any date, not just the trigger', body: 'Advanced Options stay collapsed until needed — Offset, Adjust to a Day and Repeat sit as three independent, closed toggles under the chosen date field, so picking a source date alone stays a one-step task.' },
  { title: 'Layer an offset', body: 'Turning on Offset only exposes "Set Offset To: After 2 Days" — nothing else on the panel changes, so each toggle adds exactly one new decision at a time.' },
  { title: 'Layer a day adjustment — after the offset', body: '"Adjust to a Day" explicitly tells the user it applies after any offset above, so the order of operations never has to be guessed.' },
  { title: 'Layer a repeat pattern', body: 'Repeat adds cadence, specific days, an end condition and a skip count — each field appears only once the toggle is on, not before.' },
  { title: 'Guardrails kept separate', body: 'Blackout Days and Skip Frequency Limit sit below the date/time hierarchy entirely, each with its own explicit note — visually confirming they are optional overrides, not part of the core schedule.' },
]

const SCHEDULING_AI_SUMMARY_POINTS = [
  { title: 'Reads back the whole configuration', body: 'Offset, day-adjustment, repeat cadence and skip count all collapse into one sentence, so nothing has to be mentally simulated toggle by toggle.' },
  { title: 'Updates live as settings change', body: 'Every toggle flip rewrites the summary instantly, giving a plain-English check before a recruiter ever hits Save.' },
  { title: 'Fixes what V1 got wrong', body: 'V1\'s hardcoded summary text could contradict the actual selection. This summary is generated from the real configuration, so it can never say something the settings do not.' },
]

const TEST_SCHEDULING_POINTS = [
  { title: 'Traces every layer to a real date', body: 'Date of Joining, the offset, the day-adjustment and the blackout rule each resolve in order against a real test date or an actual candidate — not an abstract rule read back as text.' },
  { title: 'Shows the whole repeat cadence', body: 'First Communication, 1st Repeat, 2nd Repeat and onward each get their own resolved date and day of week, all the way to "And so on... repeat until indefinitely."' },
  { title: 'Previews on an actual calendar', body: 'The right panel plots every send directly onto a calendar month, with an exact date, time and timezone tooltip — so a recruiter can see the send day highlighted before anything goes live.' },
]

/* A distinct "why we chose this" callout — tinted rather than solid
   white, so a design-rationale aside reads as separate from the
   what-we-built cards around it without a new visual system. */
function DesignDecision({ title, body, accent, label = 'Design Decision', icon = '💡' }) {
  return (
    <div style={{ background: `${accent}40`, border: `1px solid ${accent}`, borderRadius: '16px', padding: '18px 22px 18px 20px', display: 'flex', gap: '14px', alignItems: 'flex-start', position: 'relative', overflow: 'hidden' }}>
      <span style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', background: accent }} />
      <span style={{ fontSize: '17px', lineHeight: 1, flexShrink: 0, marginTop: '1px' }} aria-hidden="true">{icon}</span>
      <div style={{ minWidth: 0 }}>
        <div style={{ ...ST.kicker, color: '#665' }}>{label}</div>
        <div style={{ ...ST.cardTitle, margin: '6px 0' }}>{title}</div>
        <p style={{ fontFamily: FONT_B, fontSize: '13.5px', lineHeight: 1.7, color: '#333', margin: 0 }}>{body}</p>
      </div>
    </div>
  )
}

/* The slide's primary narrative beats — numbered, large and bolded so
   they read as the story's actual headings during a live presentation,
   not just another small uppercase kicker among the card labels. */
function StoryHeading({ n, children, accent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '13px', margin: '38px 0 18px' }}>
      <span
        style={{
          width: '30px', height: '30px', borderRadius: '50%', background: accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          fontFamily: FONT_B, fontWeight: 800, fontSize: '13px', color: '#111',
        }}
      >
        {n}
      </span>
      <h3 style={{ fontFamily: FONT_H, fontSize: '21px', fontWeight: 700, letterSpacing: '-0.015em', color: '#111', margin: 0 }}>{children}</h3>
    </div>
  )
}

function StatHighlight({ value, label, accent }) {
  return (
    <div style={{ background: '#fff', borderRadius: '16px', border: `1px solid ${accent}55`, boxShadow: '0 2px 12px rgba(0,0,0,0.05)', padding: '18px 22px', textAlign: 'center' }}>
      <div style={{ fontFamily: FONT_H, fontSize: '36px', fontWeight: 800, letterSpacing: '-0.03em', color: '#111', lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: FONT_B, fontSize: '12px', color: '#777', marginTop: '8px', lineHeight: 1.5 }}>{label}</div>
    </div>
  )
}

function SchedulingDeepDive({ accent }) {
  return (
    <>
      <p style={{ ...ST.body, fontSize: '16px', lineHeight: 1.8, color: '#555', maxWidth: '780px', margin: '0 0 28px' }}>
        Scheduling looked like a simple date-and-time form — until a candidate's reminder needed to skip weekends, wait for a blackout window, and repeat every month without becoming spam.
      </p>

      <StoryHeading n="1" accent={PALETTE[0]}>What was the initial design?</StoryHeading>
      <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div className="pd-split" style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr' }}>
          <div style={{ background: '#faf9f7', borderRight: '1px solid rgba(0,0,0,0.06)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Media media={{ kind: 'image', src: sc('Schedulingv1.png'), alt: 'Scheduling V1 — a flat form with one radio choice per date and time, and a mismatched summary line', scrollFrame: false }} />
            <p style={{ ...ST.caption, margin: '10px 2px 0' }}>V1 — Static Date is selected, but the summary line still reads "Workflow Trigger date."</p>
          </div>
          <div style={{ padding: '28px 30px', display: 'flex', flexDirection: 'column', gap: '22px', justifyContent: 'center' }}>
            {SCHEDULING_PROBLEM_CARDS.map((c, i) => (
              <NumberedCard key={c.title} bare n={String(i + 1).padStart(2, '0')} title={c.title} body={c.body} accent={PALETTE[0]} />
            ))}
          </div>
        </div>
      </div>

      <StoryHeading n="2" accent={PALETTE[4]}>What research told us?</StoryHeading>
      <ImpactStrip
        accent={PALETTE[4]}
        impact={{
          label: 'Research Finding',
          statement: 'Recruiters needed schedule logic tied to a candidate\'s own data, not just when the workflow fired.',
          footnote: 'And they needed it to automatically dodge weekends and blackout days — a repeat that could not be paused, skipped or capped meant every recurring reminder risked becoming spam the moment a candidate\'s situation changed.',
        }}
      />
      <p style={{ fontFamily: FONT_B, fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#999', margin: '22px 0 12px' }}>What that meant we needed</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
        {SCHEDULING_WHY_CARDS.map((c, i) => (
          <NumberedCard key={c.title} n={String(i + 1).padStart(2, '0')} title={c.title} body={c.body} accent={PALETTE[(i + 1) % PALETTE.length]} />
        ))}
      </div>

      <StoryHeading n="3" accent={PALETTE[2]}>How did we tackle complexity in configuration?</StoryHeading>
      <p style={{ fontFamily: FONT_B, fontSize: '14px', lineHeight: 1.75, color: '#555', margin: '0 0 16px', maxWidth: '780px' }}>
        Every layer stays collapsed until the user opts in, and each one discloses exactly where it sits in the order of operations.
      </p>
      <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div className="pd-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ background: '#faf9f7', borderRight: '1px solid rgba(0,0,0,0.06)', padding: '20px' }}>
            <VerticalScrollImage src={sc('advanced_4.png')} alt="The full Advanced Scheduling panel — Offset, Adjust to a Day, Repeat, Blackout Days and Skip Frequency Limit all enabled" maxHeight={780} />
            <p style={{ ...ST.caption, margin: '10px 2px 0' }}>Every layer enabled at once — scroll to see the whole panel.</p>
          </div>
          <div style={{ padding: '26px 30px', display: 'flex', flexDirection: 'column', gap: '18px', justifyContent: 'center' }}>
            <StatHighlight accent={PALETTE[2]} value="20–30%" label="of workflows actually turn on Advanced Scheduling at all." />
            <DesignDecision
              accent={PALETTE[2]}
              title="Why a hidden feature?"
              body="Because only a fifth to a third of workflows need it, Advanced Scheduling sits behind one closed accordion instead of a permanent slot on the default form — keeping the view as simple as V1's for everyone else, while staying a single click away for the workflows that do. Offset, Adjust to a Day and Repeat then layer inside it the same way, in that order, so complexity is opt-in at every level, not just the first one."
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SCHEDULING_HIERARCHY_STEPS.map((s, i) => (
                <div key={s.title} style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontFamily: FONT_B, fontSize: '11px', fontWeight: 700, color: PALETTE[2], fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontFamily: FONT_B, fontSize: '12.5px', color: '#555' }}><strong style={{ color: '#222', fontWeight: 650 }}>{s.title}.</strong> {s.body}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <StoryHeading n="4" accent={PALETTE[3]}>How can a user understand what is configured?</StoryHeading>
      <p style={{ fontFamily: FONT_B, fontSize: '14px', lineHeight: 1.75, color: '#555', margin: '0 0 16px', maxWidth: '780px' }}>
        Every layer above collapses into one sentence a recruiter can actually read: <em>"Sends the first communication 2 days after the candidate's joining date, adjusts it to the next 1st Monday, and then repeats monthly on 1st Mondays and Fridays while skipping the first 3 repeats."</em>
      </p>
      <div className="pd-split" style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: '24px', alignItems: 'start' }}>
        <div>
          <Media media={{ kind: 'image', src: sc('advanced_5.png'), alt: 'Scheduling summary — an AI-generated sentence describing the full configuration', scrollFrame: false }} />
          <p style={{ ...ST.caption, margin: '8px 2px 0' }}>Generated live from the real configuration, not hardcoded.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {SCHEDULING_AI_SUMMARY_POINTS.map((c, i) => (
            <NumberedCard key={c.title} n={String(i + 1).padStart(2, '0')} title={c.title} body={c.body} accent={PALETTE[(i + 3) % PALETTE.length]} />
          ))}
        </div>
      </div>
      <div style={{ marginTop: '16px' }}>
        <DesignDecision
          accent={PALETTE[3]}
          title="Why an AI-generated description?"
          body="A configuration with three stacked toggles and an explicit order of operations is hard to mentally simulate. Reading the actual saved state back in plain English — the same pattern already trusted elsewhere in SenseIQ, like Ask AI and AI Lister — closes that trust gap immediately. And because it is generated from real state rather than a hand-authored string, it structurally cannot repeat V1's bug of a summary that contradicted the selection."
        />
      </div>

      <StoryHeading n="5" accent={PALETTE[6]}>How can a user be sure of their configuration?</StoryHeading>
      <p style={{ fontFamily: FONT_B, fontSize: '14px', lineHeight: 1.75, color: '#555', margin: '0 0 16px', maxWidth: '780px' }}>
        A sentence is enough to understand a configuration. Trusting it before it goes live needed something more concrete — Test Scheduling runs the real settings against a real date and shows exactly what happens.
      </p>
      <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div className="pd-split" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr' }}>
          <div style={{ background: '#faf9f7', borderRight: '1px solid rgba(0,0,0,0.06)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Media media={{ kind: 'image', src: sc('TestScheduling.png'), alt: 'Test Scheduling Options — the exact configuration traced against a real date, with a calendar preview of every send', scrollFrame: false }} />
            <p style={{ ...ST.caption, margin: '10px 2px 0' }}>Test Scheduling — every layer resolved to real dates, previewed on a calendar.</p>
          </div>
          <div style={{ padding: '28px 30px', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
            {TEST_SCHEDULING_POINTS.map((c, i) => (
              <NumberedCard key={c.title} bare n={String(i + 1).padStart(2, '0')} title={c.title} body={c.body} accent={PALETTE[6]} />
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: '16px' }}>
        <DesignDecision
          accent={PALETTE[6]}
          title="Why a dedicated test tool, not just the summary?"
          body="A sentence is right for a quick sanity check, but it still asks a recruiter to trust prose. For a configuration with four layered rules and an open-ended repeat, Test Scheduling closes the gap between understanding and trusting by resolving the settings against a real candidate and putting the result on a calendar, not just in words."
        />
      </div>
    </>
  )
}

/* ── Deep dive — Workflow Inside a Workflow ───────────────────── */

const wf = (p) => asset(`/Workflows/WorkflowInsideWorkflow/${p}`)

const WIW_WHY_CARDS = [
  { title: 'The scale problem', body: 'A single Auto-Submission run could match up to 500 candidates for one job, and every one of them needed the same sequence — screen, evaluate, notify — run individually, not once for the whole batch.' },
  { title: 'The canvas problem', body: 'Drawing that sequence 500 times, or drawing it once with no way to show it repeats, were the only two options a flat canvas offered — neither told the truth about what the workflow actually does.' },
]

const WIW_V1_CARDS = [
  { title: 'What V1 did', body: 'The For Each step rendered as an ordinary node — "For each candidate run this workflow" — styled identically to every Trigger, SMS or Wait node around it, with an f(x) icon as the only hint that it behaved differently.' },
  { title: 'Why it fell short', body: 'Clicking it opened a completely separate nested canvas. There was no cue beforehand that this node worked differently, and once inside, the outer Auto-Submission flow was gone from view — recruiters lost their place every time they checked what the loop actually did.' },
]

const WIW_BENEFIT_POINTS = [
  { title: 'One continuous canvas', body: 'Trigger, SMS, Wait and Candidate Match now sit directly above the loop region — the whole Auto-Submission flow reads top to bottom without a single click away.' },
  { title: 'Color instead of navigation', body: 'The tinted region marks exactly where "for each candidate" begins and ends, so a recruiter always knows whether a node runs once or once per candidate, at a glance.' },
  { title: 'Multiple exits stay visible', body: 'Both branches of the loop — evaluated and rejected — resolve to their own visible "Workflow Finished" marker inside the same tinted region, instead of disappearing into a nested screen\'s own separate end state.' },
]

function WorkflowInsideWorkflowDeepDive({ accent }) {
  return (
    <>
      <p style={{ ...ST.body, fontSize: '16px', lineHeight: 1.8, color: '#555', maxWidth: '780px', margin: '0 0 12px' }}>
        Auto-Submission needed to run the same screening sequence for up to 500 matched candidates per job — without turning the canvas into either a black box or an infinite diagram.
      </p>

      <StoryHeading n="1" accent={PALETTE[6]}>Why we needed workflow inside a workflow?</StoryHeading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {WIW_WHY_CARDS.map((c, i) => (
          <NumberedCard key={c.title} n={String(i + 1).padStart(2, '0')} title={c.title} body={c.body} accent={PALETTE[6]} />
        ))}
      </div>

      <StoryHeading n="2" accent={PALETTE[7]}>What research told us?</StoryHeading>
      <ImpactStrip
        accent={PALETTE[7]}
        impact={{
          label: 'Research Finding',
          statement: 'Recruiters needed to see the per-candidate loop as part of the same workflow, not a separate thing to open.',
          footnote: 'Jumping into a nested screen to check something as simple as "does the loop send the rejection SMS" broke their mental model of the workflow as one continuous flow.',
        }}
      />

      <StoryHeading n="3" accent={PALETTE[5]}>What was the first design approach?</StoryHeading>
      <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div className="pd-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ background: '#faf9f7', borderRight: '1px solid rgba(0,0,0,0.06)', padding: '20px' }}>
            <VerticalScrollImage src={wf('v1.png')} alt="V1 — the For Each step as an ordinary node that opens a separate nested canvas when clicked" maxHeight={480} />
            <p style={{ ...ST.caption, margin: '10px 2px 0' }}>V1 — "Internal Workflow" looks like any other node, but opens a separate screen.</p>
          </div>
          <div style={{ padding: '26px 30px', display: 'flex', flexDirection: 'column', gap: '22px', justifyContent: 'center' }}>
            {WIW_V1_CARDS.map((c, i) => (
              <NumberedCard key={c.title} bare n={String(i + 1).padStart(2, '0')} title={c.title} body={c.body} accent={PALETTE[5]} />
            ))}
          </div>
        </div>
      </div>

      <StoryHeading n="4" accent={PALETTE[4]}>Why did we move to a second design approach?</StoryHeading>
      <p style={{ fontFamily: FONT_B, fontSize: '14px', lineHeight: 1.75, color: '#555', margin: '0 0 16px', maxWidth: '780px' }}>
        The loop moved onto the same canvas as everything else — marked only by a tinted background region instead of a doorway to another screen.
      </p>
      <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div className="pd-split" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr' }}>
          <div style={{ background: '#faf9f7', borderRight: '1px solid rgba(0,0,0,0.06)', padding: '20px' }}>
            <VerticalScrollImage src={wf('Workflow inside workflow.png')} alt="The redesigned canvas — a tinted background region marks the for-each candidate loop, inline with the rest of the workflow" maxHeight={620} />
            <p style={{ ...ST.caption, margin: '10px 2px 0' }}>V2 — the whole loop, tinted, on the same canvas as Trigger, SMS and Wait.</p>
          </div>
          <div style={{ padding: '26px 30px', display: 'flex', flexDirection: 'column', gap: '18px', justifyContent: 'center' }}>
            <DesignDecision
              accent={PALETTE[4]}
              title="Why a different-colored background?"
              body="A tinted region was the lightest possible signal — no new border style, no repeated label, no new interaction to learn. Recruiters already read node-category colors elsewhere in the builder, so reusing color instead of navigation kept the loop visually distinct from the outer flow while staying spatially inside the same canvas the trigger, SMS and wait nodes sit on."
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {WIW_BENEFIT_POINTS.map((s, i) => (
                <div key={s.title} style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontFamily: FONT_B, fontSize: '11px', fontWeight: 700, color: PALETTE[4], fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontFamily: FONT_B, fontSize: '12.5px', color: '#555' }}><strong style={{ color: '#222', fontWeight: 650 }}>{s.title}.</strong> {s.body}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/* ── Deep dive — Hyperfocus Mode ──────────────────────────────── */

const hf = (p) => asset(`/Workflows/Hyperfocus mode/${p}`)

const HF_WHY_CARDS = [
  { title: 'The silent breakage problem', body: 'A single deleted node — an email, an SMS, a screening bot — could be referenced by conditions and messages several nodes downstream. Deleting it left those references pointing at nothing, and nothing on the canvas said so.' },
  { title: 'The scale problem', body: 'As a workflow grew past a dozen nodes, no recruiter could hold every downstream reference in their head before removing something upstream — the risk grew with every node added, not shrank.' },
]

const HF_STEPS = [
  { n: '01', title: 'Delete triggers detection', src: 'hf1.png', body: 'Deleting #E7 Email immediately dims the entire canvas except the exact nodes that reference it — a filter condition, an SMS and an Email — each flagged with a warning icon and a plain note like "Used in SMS Content."' },
  { n: '02', title: 'Resolve inline, no navigation', src: 'hf2.png', body: 'Clicking a flagged node opens the exact broken rule in a side panel — "#E7 Email (Forklifter screening bot) — Email opened is true" — ready to edit or replace without ever leaving the canvas.' },
  { n: '03', title: 'Delete unlocks only when clear', src: 'hf3.png', body: 'Once every reference is resolved, each node turns to a green "Resolved" state and the Delete Node button — disabled until then — finally activates.' },
]

function HyperfocusModeDeepDive({ accent }) {
  return (
    <>
      <p style={{ ...ST.body, fontSize: '16px', lineHeight: 1.8, color: '#555', maxWidth: '780px', margin: '0 0 12px' }}>
        Deleting one node upstream could silently break messages and conditions several steps downstream — Hyperfocus Mode catches that before the delete ever goes through.
      </p>

      <StoryHeading n="1" accent={PALETTE[3]}>Why we needed Hyperfocus Mode?</StoryHeading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {HF_WHY_CARDS.map((c, i) => (
          <NumberedCard key={c.title} n={String(i + 1).padStart(2, '0')} title={c.title} body={c.body} accent={PALETTE[3]} />
        ))}
      </div>

      <StoryHeading n="2" accent={PALETTE[1]}>What research told us?</StoryHeading>
      <ImpactStrip
        accent={PALETTE[1]}
        impact={{
          label: 'Research Finding',
          statement: 'Recruiters only discovered a broken reference when a workflow failed in production, never at the moment they deleted the node that caused it.',
          footnote: 'The dependency was invisible until it broke something real — a candidate who never got screened, a condition that silently evaluated to false.',
        }}
      />

      <StoryHeading n="3" accent={PALETTE[2]}>How does Hyperfocus Mode work?</StoryHeading>
      <Media media={{ kind: 'video', src: hf('HyperfocusMode.mov') }} />
      <p style={{ ...ST.caption, margin: '10px 2px 22px' }}>Deleting a node, watched end to end — detection, inline resolution, then an unlocked delete.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px' }}>
        {HF_STEPS.map((s) => (
          <div key={s.n} style={{ background: '#fff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <img src={hf(s.src)} alt={s.title} style={{ display: 'block', width: '100%', height: 'auto' }} />
            </div>
            <div style={{ padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontFamily: FONT_B, fontSize: '12px', fontWeight: 700, color: PALETTE[2], letterSpacing: '0.06em', fontVariantNumeric: 'tabular-nums' }}>{s.n}</span>
                <span style={ST.cardTitle}>{s.title}</span>
              </div>
              <p style={{ fontFamily: FONT_B, fontSize: '12.5px', lineHeight: 1.65, color: '#666', margin: 0 }}>{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      <StoryHeading n="4" accent={PALETTE[4]}>Why these design decisions?</StoryHeading>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <DesignDecision
          accent={PALETTE[4]}
          title="Why block deletion instead of just warning?"
          body="A dismissible warning is easy to click past. Making Delete Node structurally disabled until every reference resolves turns a silent failure mode into one that is simply impossible to ship — the same philosophy behind Workflow Simulation catching a bad branch before a flow goes live."
        />
        <DesignDecision
          accent={PALETTE[4]}
          title="Why dim the rest of the canvas?"
          body="Hyperfocus — the name is literal. Dimming every unrelated node removes the need to scan the whole workflow for what might be affected; the highlighted nodes, and only those, are the entire task in front of the recruiter."
        />
      </div>
    </>
  )
}

/* ── Deep dive — Workflow Simulation ──────────────────────────── */

const sim = (p) => asset(`/Workflows/Simulation/${p}`)

const SIM_WHY_CARDS = [
  { title: 'The confidence problem', body: 'A workflow could look correct on the canvas and still fail the moment it ran — a misconfigured branch, a null variable, a path nobody had actually traced end to end.' },
  { title: 'The activation risk', body: 'Activating an unverified workflow meant testing it on real candidates. A mistake was not a bug report — it was a candidate who never got screened, or a message that went out wrong.' },
]

const SIM_V1_CARDS = [
  { title: 'What V1 did', body: 'Simple Test Simulation ran one fixed, linear sequence — Add Testing Configuration → Run Candidate Matching → Place Voice Call → Run Candidate Evaluation → Communications — against a single test email and phone number.' },
  { title: 'Why it fell short', body: 'V1 only ever exercised the happy path. It could not simulate a branch resolving the other way, an evaluation score falling below threshold, or any of the edge cases recruiters actually worried about — so they still did not trust it enough to activate.' },
]

const SIM_V2_STEPS = [
  { n: '01', title: 'Canvas auto-focuses on the active node', src: 'v2 simulation.png', body: 'As the simulation runs, the canvas on the left automatically centers on whichever node is currently executing, while the timeline on the right lists every node\'s resolved outcome — a path selected, a score, a completion — as it happens.' },
  { n: '02', title: "Every node's output shown inline", src: 'v2 simulation 2.png', body: 'Expanding a completed node in the timeline previews exactly what it produced — the rendered email, not just an "Email sent" label — right beside the canvas, with no separate log to open.' },
  { n: '03', title: 'Branch nodes wait for input', src: 'v2 simulation 3.png', body: 'At a Path node, simulation pauses and asks the recruiter to choose the branch to test — Qualified or Not Qualified — instead of silently taking the first one. That single choice is what finally let edge cases get tested, not just the default path.' },
]

function WorkflowSimulationDeepDive({ accent }) {
  return (
    <>
      <p style={{ ...ST.body, fontSize: '16px', lineHeight: 1.8, color: '#555', maxWidth: '780px', margin: '0 0 12px' }}>
        Recruiters could build an increasingly complex workflow — branches, loops, evaluations — but had no way to know it actually worked before flipping it live.
      </p>

      <StoryHeading n="1" accent={PALETTE[0]}>Why we needed Workflow Simulation?</StoryHeading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {SIM_WHY_CARDS.map((c, i) => (
          <NumberedCard key={c.title} n={String(i + 1).padStart(2, '0')} title={c.title} body={c.body} accent={PALETTE[0]} />
        ))}
      </div>

      <StoryHeading n="2" accent={PALETTE[2]}>What research told us?</StoryHeading>
      <ImpactStrip
        accent={PALETTE[2]}
        impact={{
          label: 'Research Finding',
          statement: 'Recruiters trusted a workflow far more once they had watched it run — but only if they could see every path, not just the one that happened to fire.',
          footnote: 'A simulation that only ever showed the happy path answered "does the trigger work," never "what happens when a candidate scores below threshold" — the question that actually decided whether they activated it.',
        }}
      />

      <StoryHeading n="3" accent={PALETTE[1]}>What was the first design approach?</StoryHeading>
      <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div className="pd-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ background: '#faf9f7', borderRight: '1px solid rgba(0,0,0,0.06)', padding: '20px' }}>
            <VerticalScrollImage src={sim('simulation v1.png')} alt="V1 — Simple Test Simulation running one fixed, linear happy-path sequence" maxHeight={480} />
            <p style={{ ...ST.caption, margin: '10px 2px 0' }}>V1 — one fixed sequence, one test contact, no branches.</p>
          </div>
          <div style={{ padding: '26px 30px', display: 'flex', flexDirection: 'column', gap: '22px', justifyContent: 'center' }}>
            {SIM_V1_CARDS.map((c, i) => (
              <NumberedCard key={c.title} bare n={String(i + 1).padStart(2, '0')} title={c.title} body={c.body} accent={PALETTE[1]} />
            ))}
          </div>
        </div>
      </div>

      <StoryHeading n="4" accent={PALETTE[5]}>Why did we move to a second design approach?</StoryHeading>
      <p style={{ fontFamily: FONT_B, fontSize: '14px', lineHeight: 1.75, color: '#555', margin: '0 0 16px', maxWidth: '780px' }}>
        Advanced Test Simulation moved the test onto the real canvas — canvas on the left, a live timeline on the right, with the recruiter deciding what happens at every branch.
      </p>
      <Media media={{ kind: 'video', src: sim('WorkflowSimulation.mov') }} />
      <p style={{ ...ST.caption, margin: '10px 2px 22px' }}>Advanced Test Simulation, watched end to end — canvas and timeline moving together.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px', marginBottom: '16px' }}>
        {SIM_V2_STEPS.map((s) => (
          <div key={s.n} style={{ background: '#fff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <img src={sim(s.src)} alt={s.title} style={{ display: 'block', width: '100%', height: 'auto' }} />
            </div>
            <div style={{ padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontFamily: FONT_B, fontSize: '12px', fontWeight: 700, color: PALETTE[5], letterSpacing: '0.06em', fontVariantNumeric: 'tabular-nums' }}>{s.n}</span>
                <span style={ST.cardTitle}>{s.title}</span>
              </div>
              <p style={{ fontFamily: FONT_B, fontSize: '12.5px', lineHeight: 1.65, color: '#666', margin: 0 }}>{s.body}</p>
            </div>
          </div>
        ))}
      </div>
      <DesignDecision
        accent={PALETTE[5]}
        title="Why split canvas and timeline?"
        body="A canvas alone shows structure but not history; a log alone shows history but not where you are. Splitting them let the canvas answer 'where am I' — auto-focusing the active node — while the timeline answers 'what actually happened,' node by node, in one continuous scrollable record. Neither view alone could do both jobs at once."
      />
    </>
  )
}

/* ── Deep dive — Template Selection ───────────────────────────── */

const ts = (p) => asset(`/Workflows/TemplateSelection/${p}`)

/* Shared visual for one iteration's supporting screenshots — the same
   banner-card recipe used by Hyperfocus Mode and Workflow Simulation,
   reused here across three iterations instead of a fourth bespoke
   layout. */
function StepGallery({ steps, accent }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px' }}>
      {steps.map((s) => (
        <div key={s.n} style={{ background: '#fff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
            <img src={ts(s.src)} alt={s.title} style={{ display: 'block', width: '100%', height: 'auto' }} />
          </div>
          <div style={{ padding: '16px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontFamily: FONT_B, fontSize: '12px', fontWeight: 700, color: accent, letterSpacing: '0.06em', fontVariantNumeric: 'tabular-nums' }}>{s.n}</span>
              <span style={ST.cardTitle}>{s.title}</span>
            </div>
            <p style={{ fontFamily: FONT_B, fontSize: '12.5px', lineHeight: 1.65, color: '#666', margin: 0 }}>{s.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

const TS_WHY_CARDS = [
  { title: 'The blank canvas problem', body: 'Every new workflow started from an empty canvas, even though the vast majority of use cases — welcome messages, reactivation nudges, onboarding surveys — had already been solved hundreds of times before, across hundreds of other agencies.' },
  { title: 'The pressure of choice, not tools', body: 'Recruiters were rarely blocked by the node library itself. They were blocked by not knowing which combination of triggers, actions and branches matched what they were actually trying to accomplish.' },
]

const TS_GOAL_STEPS = [
  { n: '01', title: 'Pick a goal first', src: 'goalbased1.png', body: 'Hire, Reactivate, Retain, Re-deploy or Other — a workflow always starts with one of five business goals before anything else is shown.' },
  { n: '02', title: 'Browse use cases inside that goal', src: 'goalbased2.png', body: 'Choosing "Hire" surfaces a bubble field of use cases scoped to it — Welcome Information, Resume Reviewed, Interview Scheduled — filterable by entity and stage.' },
  { n: '03', title: 'Preview the exact template first', src: 'goalbased3.png', body: 'Clicking a bubble opens the real workflow it would create — trigger, branches, every action — before a recruiter commits to building it.' },
]

const TS_AI_STEPS = [
  { n: '01', title: 'Describe it in plain English', src: 'AI_Based1.png', body: '"Create a workflow to reactivate inactive candidates in database" — a free-text prompt, with example prompts offered as a starting point.' },
  { n: '02', title: 'Review it as a wall of text', src: 'AIBased2.png', body: 'The AI breaks the prompt into numbered steps and nested conditional branches — "2a. Chatbot Email," "2b. Send Landing Page in SMS" — described entirely in prose, before anything appears on the canvas.' },
]

const TS_FINAL_STEPS = [
  { n: '01', title: 'Search or browse — now with social proof', src: 'Final1.png', body: 'The same bubble field from Iteration 1, but each one now carries a popularity signal — "Interview scheduled 3k 👍" — and a "Write a use case to create playbook" search sits right above it.' },
  { n: '02', title: 'Select multiple bubbles — the canvas builds itself, live', src: 'Final2.png', body: 'Selecting Welcome Information + Message from leadership + Benefits and perks merges all three into one live preview on the left, tagged "Template generated from 2k workflows" and "Saves ~2 hours."' },
]

function TemplateSelectionDeepDive({ accent }) {
  return (
    <>
      <p style={{ ...ST.body, fontSize: '16px', lineHeight: 1.8, color: '#555', maxWidth: '780px', margin: '0 0 12px' }}>
        Almost every workflow a recruiter needed had already been built before, by someone else, somewhere on the platform — Template Selection exists to hand them that head start instead of a blank canvas.
      </p>

      <StoryHeading n="1" accent={PALETTE[4]}>Why did we need Template Selection?</StoryHeading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '18px' }}>
        {TS_WHY_CARDS.map((c, i) => (
          <NumberedCard key={c.title} n={String(i + 1).padStart(2, '0')} title={c.title} body={c.body} accent={PALETTE[4]} />
        ))}
      </div>
      <ImpactStrip
        accent={PALETTE[4]}
        impact={{
          label: 'The Insight',
          statement: 'The average recruiter had built only a handful of workflows — the platform had built the same handful of use cases thousands of times over.',
          footnote: 'Template Selection is that gap, closed: the platform already knew more about what a recruiter needed than the recruiter typing into an empty canvas did.',
        }}
      />

      <StoryHeading n="2" accent={PALETTE[1]}>Iteration 1 — Goal-Based Selection</StoryHeading>
      <Media media={{ kind: 'video', src: ts('Goal Based - iteration 1.mov') }} />
      <p style={{ ...ST.caption, margin: '10px 2px 22px' }}>Goal first, then use case, then a preview — three deliberate steps before anything is built.</p>
      <StepGallery steps={TS_GOAL_STEPS} accent={PALETTE[1]} />
      <div style={{ marginTop: '16px' }}>
        <DesignDecision
          accent={PALETTE[1]}
          label="The Challenge"
          icon="⚠️"
          title="Some users were not sure which goal covered their use case"
          body="Not every workflow cleanly mapped to a single goal. A re-engagement nudge for candidates who had gone quiet mid-process could reasonably sit under Reactivate or Retain — the taxonomy asked recruiters to classify their own intent before they had fully formed it, and picking wrong meant starting the whole flow over."
        />
      </div>

      <StoryHeading n="3" accent={PALETTE[3]}>Iteration 2 — Full AI Prompt-Based</StoryHeading>
      <Media media={{ kind: 'video', src: ts('AI_Workflows_Iteration2.mov') }} />
      <p style={{ ...ST.caption, margin: '10px 2px 22px' }}>Skip the taxonomy entirely — describe the workflow, and let AI draft it.</p>
      <StepGallery steps={TS_AI_STEPS} accent={PALETTE[3]} />
      <div style={{ marginTop: '16px' }}>
        <DesignDecision
          accent={PALETTE[3]}
          label="The Challenge"
          icon="⚠️"
          title="It did not scale — a whole workflow is hard to represent in text"
          body="A single prompt could generate branches inside branches, each described as another paragraph of prose. Reviewing steps 2a and 2b and their nested conditions as a wall of text asked recruiters to mentally reconstruct a diagram from a document — the exact opposite of what a visual canvas is for."
        />
      </div>

      <StoryHeading n="4" accent={PALETTE[2]}>Iteration 3 — Finalized: Multi-Bubble Selection</StoryHeading>
      <Media media={{ kind: 'video', src: ts('FinalPrototype.mov') }} />
      <p style={{ ...ST.caption, margin: '10px 2px 22px' }}>Unsure which single use case fits, or need a combination? Select every bubble that applies.</p>
      <StepGallery steps={TS_FINAL_STEPS} accent={PALETTE[2]} />
      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <DesignDecision
          accent={PALETTE[2]}
          title="Why fold AI search into the bubbles, not replace them?"
          body="Iteration 1 proved bubbles were fast to scan but forced a taxonomy choice too early. Iteration 2 proved free text captured intent naturally but produced prose no one could scan. The final picker keeps bubbles as the primary, poppable surface, and folds the AI prompt in as a search bar that filters those same bubbles — instead of replacing them with another wall of text."
        />
        <DesignDecision
          accent={PALETTE[2]}
          title="Why allow multiple bubbles instead of just one?"
          body="Real use cases rarely map to a single canned template. Selecting Welcome Information + Message from leadership + Benefits and perks and watching the canvas merge all three, live, on the left, turned the picker from 'choose the closest match' into 'compose the exact thing you need' — closing the gap Iteration 1's single-select bubbles left open."
        />
        <DesignDecision
          accent={PALETTE[2]}
          title="Why show popularity and time saved?"
          body="'3k 👍' and 'Saves ~2 hours compared to create from scratch' turn an abstract recommendation into a concrete, socially validated one — the same trust-building move the AI-generated Scheduling Summary makes elsewhere in the builder: don't just suggest, show the evidence."
        />
      </div>
    </>
  )
}

/* ── Slides 11 & 12 — challenges solved / features initiated ──── */

const CHALLENGES = [
  {
    title: 'Variable Picker',
    body: 'Recruiters needed to reference dynamic candidate and job data — like a first name or a job title — inside messages and branch conditions, without memorising raw field syntax. We designed a searchable, type-aware picker that inserts safe tokens inline and previews the resolved value, so scanning a flow shows real data instead of cryptic variable names.',
  },
  {
    title: 'Scheduling',
    body: 'Delays and time-based logic had to respect time zones, business hours and blackout windows across every agency\'s calendar. We built a scheduling model that lets a node say "send within business hours" or "wait until Monday 9am local time" without a recruiter hand-calculating offsets — the same model GetResponse\'s calendar-aware delays inspired.',
  },
  {
    title: 'Workflow Inside a Workflow',
    body: 'Candidate Matching needed to run the same sequence — score, screen, notify — once for every candidate in a dynamically sized list, without turning the canvas into an infinitely nested diagram. We designed a For Each loop node that collapses its inner sequence into a single expandable container, so a workflow can call itself over a list while the canvas still reads as one flat, debuggable flow.',
  },
]

const FEATURES = [
  {
    title: 'Template Selection using AI',
    body: 'Instead of starting every workflow from a blank canvas, an AI-recommended template picker suggests the closest-matching pre-built flow based on the trigger and goal a recruiter describes — turning a blank-canvas problem into a one-click starting point.',
  },
  {
    title: 'Hyperfocus Mode',
    body: 'A workflow maintenance feature: delete a node upstream that one or more downstream nodes still reference, and the canvas enters Hyperfocus Mode — dimming everything except the affected nodes and walking the recruiter through resolving each broken variable reference before the flow can be saved.',
  },
  {
    title: 'Workflow Simulation',
    body: 'A dry-run mode that traces sample candidates through every branch — including any For Each loop — and overlays their path directly on the canvas, so a misconfigured branch surfaces before a flow ever goes live, not after.',
  },
]

/* ── Deck ─────────────────────────────────────────────────────── */

const cover = {
  id: 'auto-cover',
  label: 'Cover',
  accent: PALETTE[2],
  slides: [
    {
      id: 'auto-landing',
      layout: 'title',
      navLabel: 'Workflow Automation Builder',
      title: 'Workflow Automation Builder',
      render: () => <AutomationsCover />,
    },
  ],
}

const aboutMe = {
  id: 'auto-about',
  label: 'About Me',
  accent: PALETTE[0],
  slides: [
    {
      id: 'auto-about-me',
      kicker: 'About Me',
      navLabel: 'A brief introduction',
      title: 'A brief introduction.',
      layout: 'custom',
      render: () => <AboutMe />,
    },
  ],
}

const context = {
  id: 'auto-context',
  label: 'Case Study Context',
  accent: PALETTE[1],
  slides: [
    {
      id: 'auto-sense',
      kicker: 'Project Context',
      navLabel: 'About Sense & this project',
      title: 'A system of engagement for the whole talent lifecycle.',
      layout: 'custom',
      render: ({ accent }) => (
        <>
          <div
            className="pd-blocks"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '22px 34px', alignItems: 'start', marginBottom: '24px' }}
          >
            {[
              { title: 'What is Sense?', body: 'An enterprise Talent Engagement Platform used by staffing agencies to accelerate hiring — it syncs bi-directionally with an ATS and automates communication across the entire candidate lifecycle, from first outreach to placement.' },
              { title: 'About this project', body: 'The Workflow Automation Builder — the canvas that unified eight disconnected point solutions into one system where every reusable piece could finally be composed into a single, visible flow.' },
              { title: 'Why it matters to Sense', body: 'Automations is the backbone the rest of the platform runs on — the AI recruiter agents built on top of this same canvas now drive roughly 80% of Sense\'s revenue, making this builder one of the highest-leverage products at the company.' },
            ].map((b) => (
              <ComplexityBlock key={b.title} accent={accent} title={b.title} body={b.body} />
            ))}
          </div>
          <PlatformShift />
        </>
      ),
    },
    {
      id: 'auto-personas',
      kicker: 'Key Personas',
      navLabel: 'Three users, conflicting needs',
      title: 'Three users pulling in different directions.',
      layout: 'card-grid',
      content: {
        lede: 'Designing this builder meant balancing the conflicting needs of three distinct users — every feature that helped one could easily burden another.',
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
      id: 'auto-manual',
      kicker: 'Manual Process',
      navLabel: 'The manual process',
      title: 'Recruiters were the integration layer.',
      layout: 'split-media',
      content: {
        blocks: [
          { title: 'The manual process', body: 'Every hire required a person to carry context between tools — reading one screen, retyping into another, remembering what had already been sent to whom.' },
          { title: 'The hypothesis', body: 'If the tools shared one canvas and one data model, the recruiter stops being connective tissue and starts being a supervisor. Everything after this depends on that being true.' },
        ],
        media: { kind: 'image', src: asset('/ManualProcess.png'), alt: 'Manual hiring workflow — recruiter as human middleware between disconnected tools' },
        caption: 'The manual hiring workflow — a recruiter carrying context between disconnected tools.',
      },
    },
    {
      id: 'auto-complexity',
      kicker: 'The Complexity',
      navLabel: 'Integrating systems, coordinating designers',
      title: 'One canvas, ten-plus systems, many owners.',
      layout: 'custom',
      render: ({ accent }) => <TheComplexity accent={accent} />,
    },
  ],
}

const decisions = {
  id: 'auto-decisions',
  label: 'How We Decided on a Canvas',
  accent: PALETTE[4],
  slides: [
    {
      id: 'auto-research',
      kicker: 'Based on Research',
      navLabel: 'What we saw in the field',
      title: 'What we saw in the field.',
      layout: 'card-grid',
      content: {
        cards: [
          { title: 'Field observation', body: 'Shadowed 8 ops managers across 4 agencies. Found 40+ near-duplicate Journeys in a single account — each a copy made because editing the original was too risky.' },
          { title: 'Recruiter interviews', body: '12 of 14 recruiters could not describe what their own active journeys did without opening each one individually.' },
          { title: 'Jobs to be done', body: 'The job was never "send a message." It was "know where every candidate is, and make sure nobody stalls."' },
        ],
      },
    },
    {
      id: 'auto-competitors',
      kicker: 'The Competitors',
      navLabel: 'Five products worth stealing from',
      title: 'Five products worth stealing from.',
      layout: 'card-grid',
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
      id: 'auto-testing',
      kicker: 'User Testing',
      navLabel: 'Two directions we built and tested',
      title: 'Two directions we built and tested.',
      layout: 'card-grid',
      content: {
        lede: 'Both were prototyped far enough to fail honestly — real, working screens, not sketches. Naming why they died is what made the canvas defensible.',
        stacked: true,
        cards: [
          { title: 'List View', badge: 'Killed', banner: asset('/Workflows/alternative to canvas/workflow-list-view.png'), bannerFit: 'cover', accent: PALETTE[0], body: 'A sortable, filterable table of steps — searchable, dense, great for auditing one field at a time. But every branch flattened into a numbered row. The moment a flow needed to fork, the table had no way left to show it.' },
          { title: 'Pipeline View', badge: 'Killed', banner: asset('/Workflows/alternative to canvas/workflow-timeline-view.png'), bannerFit: 'cover', accent: PALETTE[3], body: 'A horizontal strip of steps paired with live diagnostics — execution count, success rate, matched talents — read beautifully for monitoring a run already in progress. It simply had no visual grammar for a branch at all, only ever one step after another.' },
        ],
      },
    },
    {
      id: 'auto-insight',
      kicker: 'The Ultimate Insight',
      navLabel: 'The quote that set the direction',
      title: 'One sentence set the whole direction.',
      layout: 'quote',
      content: {
        quote: 'I wish I could just see the whole flow at once.',
        attribution: 'Ops Manager, staffing agency (8-person team)',
        note: 'Everything that followed — the canvas, the node library, progressive disclosure — is an answer to this one request. Visibility was the feature.',
      },
    },
    {
      id: 'auto-decision',
      kicker: 'The Decision',
      navLabel: 'How did we decide on canvas builder?',
      title: 'How did we decide on canvas builder?',
      layout: 'bullets-impact',
      content: {
        lede: 'Line up the research, the insight, the market and the prototypes we killed, and the same answer falls out every time.',
        cards: [
          { title: 'Whole-flow visibility', body: 'The entire journey visible on one surface — the literal answer to the research quote that set our direction.' },
          { title: 'Modular nodes', body: 'Every reusable asset — lists, chatbots, surveys — became a node. The Lego blocks finally had a board to sit on.' },
          { title: 'Drag and drop', body: 'Restructuring a flow became a gesture rather than a rebuild, which is what made iteration cheap enough to actually happen.' },
        ],
        impact: {
          label: 'The Verdict',
          statement: 'Hence, Canvas-Based Architecture Won.',
          footnote: 'Declared up front and used as the tie-breaker in every subsequent argument about density versus power.',
        },
      },
    },
  ],
}

const nodeDesign = {
  id: 'auto-nodes',
  label: 'Node & Structure Design',
  accent: PALETTE[3],
  slides: [
    {
      id: 'auto-node-architecture-title',
      kicker: 'Node & Structure Design',
      navLabel: 'Defining canvas architecture',
      title: 'Defining canvas architecture.',
      layout: 'statement',
      content: {},
    },
    {
      id: 'auto-node-categories',
      kicker: 'Scalable Node Categories',
      navLabel: 'A node library with hierarchy that could scale',
      title: 'A node library with hierarchy that could scale.',
      layout: 'card-grid',
      content: {
        cards: [
          { title: 'Action nodes — "the doers"', body: 'Send an email, fire an SMS, launch a chatbot, book a meeting. Anything the system does to the outside world.', accent: PALETTE[0] },
          { title: 'Logical nodes — "the brains"', body: 'Branches, delays, conditions and loops. The layer the original automation engine never had.', accent: PALETTE[1] },
          { title: 'ATS integrations', body: 'Read and write candidate records directly, keeping Sense and the ATS in sync in both directions.', accent: PALETTE[2] },
          { title: 'Smart nodes', body: 'The extension point that later AI and agentic intelligence would plug straight into.', accent: PALETTE[3] },
        ],
        media: { kind: 'scroll', src: img('phase2/NodePanel.png'), alt: 'Workflow node panel' },
        minWidth: 280,
      },
    },
    {
      id: 'auto-node-anatomy',
      kicker: 'Node Architecture',
      navLabel: 'Three versions to get one card right',
      title: 'Three versions to get one card right.',
      layout: 'custom',
      render: ({ accent }) => <NodeAnatomyRows accent={accent} />,
    },
    {
      id: 'auto-usecase-structure',
      kicker: 'Complex Use Case Structure',
      navLabel: 'A complex use case as five nodes',
      title: 'A complex use case, structured as five nodes.',
      layout: 'process-flow',
      content: {
        lede: 'The recurring test for the canvas: could a use case that used to take a recruiter an afternoon across four tools collapse into a single, readable flow?',
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
  ],
}

const challengesAndFeatures = {
  id: 'auto-challenges',
  label: 'Challenges & Features',
  accent: PALETTE[6],
  slides: [
    {
      id: 'auto-challenges-solved',
      kicker: 'Top 3 Complex Design Challenges',
      navLabel: 'Top 3 design challenges solved',
      title: 'Three of the hardest problems on the canvas.',
      layout: 'card-grid',
      content: { numbered: true, minWidth: 280, cards: CHALLENGES },
    },
    {
      id: 'auto-variable-picker-deepdive',
      kicker: 'Deep Dive · Variable Picker',
      navLabel: 'Variable Picker — from confusion to trust',
      title: 'Variable Picker, elaborated.',
      layout: 'custom',
      render: ({ accent }) => <VariablePickerDeepDive accent={accent} />,
    },
    {
      id: 'auto-scheduling-deepdive',
      kicker: 'Deep Dive · Scheduling',
      navLabel: 'Scheduling — from static form to hierarchy',
      title: 'Scheduling, elaborated.',
      layout: 'custom',
      render: ({ accent }) => <SchedulingDeepDive accent={accent} />,
    },
    {
      id: 'auto-wiw-deepdive',
      kicker: 'Deep Dive · Workflow Inside a Workflow',
      navLabel: 'Workflow Inside a Workflow — from nested screen to inline loop',
      title: 'Workflow Inside a Workflow, elaborated.',
      layout: 'custom',
      render: ({ accent }) => <WorkflowInsideWorkflowDeepDive accent={accent} />,
    },
    {
      id: 'auto-features-initiated',
      kicker: 'Design-Initiated Features',
      navLabel: 'Top features design initiated',
      title: 'Top features design initiated.',
      layout: 'card-grid',
      content: { numbered: true, minWidth: 280, cards: FEATURES },
    },
    {
      id: 'auto-hyperfocus-deepdive',
      kicker: 'Deep Dive · Hyperfocus Mode',
      navLabel: 'Hyperfocus Mode — catching broken references before delete',
      title: 'Hyperfocus Mode, elaborated.',
      layout: 'custom',
      render: ({ accent }) => <HyperfocusModeDeepDive accent={accent} />,
    },
    {
      id: 'auto-simulation-deepdive',
      kicker: 'Deep Dive · Workflow Simulation',
      navLabel: 'Workflow Simulation — from happy path to every path',
      title: 'Workflow Simulation, elaborated.',
      layout: 'custom',
      render: ({ accent }) => <WorkflowSimulationDeepDive accent={accent} />,
    },
    {
      id: 'auto-template-deepdive',
      kicker: 'Deep Dive · Template Selection',
      navLabel: 'Template Selection — three iterations to get it right',
      title: 'Template Selection, elaborated.',
      layout: 'custom',
      render: ({ accent }) => <TemplateSelectionDeepDive accent={accent} />,
    },
  ],
}

const outcomes = {
  id: 'auto-outcomes',
  label: 'Outcomes',
  accent: PALETTE[5],
  slides: [
    {
      id: 'auto-tradeoffs',
      kicker: 'Trade-offs',
      navLabel: 'What we knowingly did not fix',
      title: 'What we knowingly did not fix.',
      layout: 'card-grid',
      content: {
        cards: [
          { title: 'Legacy tech from Journeys 1.0', body: 'We had to stay backwards-compatible with existing customer journeys, which constrained the data model more than we wanted.' },
          { title: 'Deferred real-time co-editing', body: 'Multi-user editing was cut to hit GA. Ops teams coordinated manually for the first year.' },
          { title: 'Node depth capped at 50', body: 'A pragmatic performance ceiling. It affected almost nobody, but it was a real limit we chose.' },
          { title: 'The Boolean burden stayed', body: 'List building still required Boolean fluency. We knew it, shipped anyway, and it became the opening problem of the next phase.' },
        ],
      },
    },
    {
      id: 'auto-impact',
      kicker: 'Impact',
      navLabel: 'Ten million automations a day',
      title: 'Ten million automations a day.',
      layout: 'metric-wall',
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
      id: 'auto-limitations',
      kicker: 'Limitations',
      navLabel: 'A powerful canvas with a blunt brain',
      title: 'A powerful canvas with a blunt brain.',
      layout: 'card-grid',
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
          footnote: 'Each of these three limitations became the seed of the next phase of the platform.',
        },
      },
    },
  ],
}

const deck = {
  id: 'automations',
  title: 'Workflow Automation Builder',
  routeBase: 'automations',
  parts: [cover, aboutMe, context, decisions, nodeDesign, challengesAndFeatures, outcomes],
}

export default deck
