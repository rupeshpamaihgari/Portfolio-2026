import { useState, useEffect, useRef } from 'react'
import CaseStudyAccordion from './CaseStudyAccordion'
import CaseStudyCallout from './CaseStudyCallout'
import { CaseStudyImage, CaseStudyVideo, CaseStudyScrollableImage, Lightbox } from './CaseStudyMedia'
import { asset } from '../../utils/asset'

/* ─────────────────────────────────────────────────────────────
   Portfolio accent palette
───────────────────────────────────────────────────────────── */
const PALETTE = ['#F4A58A', '#B8D4F8', '#B8F4D4', '#F8E4A0', '#D4B8F8', '#c8f4f0', '#f4c8d4', '#e4d4f8']

/* ─────────────────────────────────────────────────────────────
   Shared typography helpers
───────────────────────────────────────────────────────────── */
const T = {
  kicker: {
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#999',
    marginBottom: '10px',
    display: 'block',
    fontFamily: "'Nunito', sans-serif",
  },
  h1: {
    fontSize: 'clamp(32px, 5vw, 56px)',
    fontWeight: 800,
    letterSpacing: '-0.035em',
    lineHeight: 1.08,
    color: '#111',
    marginBottom: '18px',
    fontFamily: "'Fredoka', sans-serif",
  },
  h2: {
    fontSize: 'clamp(22px, 3vw, 34px)',
    fontWeight: 700,
    letterSpacing: '-0.025em',
    lineHeight: 1.15,
    color: '#111',
    marginBottom: '20px',
    marginTop: '48px',
    fontFamily: "'Fredoka', sans-serif",
  },
  h3: {
    fontSize: '18px',
    fontWeight: 700,
    letterSpacing: '-0.015em',
    color: '#111',
    marginBottom: '12px',
    marginTop: '32px',
    fontFamily: "'Nunito', sans-serif",
  },
  h4: {
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#999',
    marginBottom: '10px',
    marginTop: '28px',
    fontFamily: "'Nunito', sans-serif",
  },
  body: {
    fontSize: '14.5px',
    lineHeight: 1.7,
    color: '#555',
    marginBottom: '16px',
    fontFamily: "'Nunito', sans-serif",
  },
  inlineHeading: {
    fontWeight: 700,
    color: '#333',
  },
}

/* ─────────────────────────────────────────────────────────────
   Step definitions (stepper nav labels)
───────────────────────────────────────────────────────────── */
const STEPS = [
  { label: 'Introduction' },
  { label: 'Phase 1: Siloed Products' },
  { label: 'Phase 2: Unification' },
  { label: 'Phase 3: Intelligence Layer' },
  { label: 'Phase 4: Agentic Shift' },
  { label: 'Outcomes & Impact' },
]

/* ─────────────────────────────────────────────────────────────
   Accent-line H2 wrapper — colored bar from palette
───────────────────────────────────────────────────────────── */
function AccentH2({ children, color = PALETTE[0], style = {} }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', ...style }}>
      <div
        style={{
          width: '3px',
          minHeight: '36px',
          background: color,
          borderRadius: '2px',
          flexShrink: 0,
          marginTop: '6px',
        }}
      />
      <h2 style={{ ...T.h2, marginTop: 0 }}>{children}</h2>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Stepper — pill-tab style matching portfolio nav
───────────────────────────────────────────────────────────── */
function Stepper({ current, onChange }) {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(234,232,225,0.88)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '10px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          background: 'rgba(0,0,0,0.04)',
          borderRadius: '20px',
          padding: '4px',
        }}
      >
        {STEPS.map((step, i) => {
          const isActive = current === i + 1
          const isCompleted = i + 1 < current
          const accent = PALETTE[i % PALETTE.length]
          return (
            <button
              key={i}
              onClick={() => onChange(i + 1)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '16px',
                background: isActive ? '#111' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: isActive ? '#fff' : isCompleted ? '#444' : '#888',
                fontSize: '11.5px',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 0.25s ease',
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              {isActive && (
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: accent,
                    flexShrink: 0,
                  }}
                />
              )}
              {isCompleted && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5L4.5 7.5L8 2.5" stroke="#666" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {!isActive && !isCompleted && (
                <span style={{ fontSize: '9px', fontWeight: 700, color: '#bbb', minWidth: '10px', textAlign: 'center' }}>{i + 1}</span>
              )}
              {step.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

/* ─────────────────────────────────────────────────────────────
   Step Nav (Prev / Next) — with step label preview
───────────────────────────────────────────────────────────── */
function StepNav({ current, total, onChange }) {
  const prevLabel = current > 1 ? STEPS[current - 2].label : ''
  const nextLabel = current < total ? STEPS[current].label : ''

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '72px',
        paddingTop: '36px',
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      {current > 1 ? (
        <button
          onClick={() => onChange(current - 1)}
          className="btn-light cs-nav-btn"
          style={{ gap: '8px', padding: '11px 24px', fontSize: '13.5px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontFamily: "'Nunito', sans-serif" }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Previous
          </span>
          <span style={{ fontSize: '11px', color: '#999', fontWeight: 400, marginTop: '2px' }}>{prevLabel}</span>
        </button>
      ) : (
        <span />
      )}
      {current < total ? (
        <button
          onClick={() => onChange(current + 1)}
          className="btn-dark cs-nav-btn-next"
          style={{ gap: '8px', padding: '12px 28px', fontSize: '13.5px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontFamily: "'Nunito', sans-serif" }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Next
            <svg className="cs-nav-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transition: 'transform 0.25s ease' }}><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', fontWeight: 400, marginTop: '2px' }}>{nextLabel}</span>
        </button>
      ) : (
        <span />
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Metric card — colored top bar from palette
───────────────────────────────────────────────────────────── */
function MetricCard({ value, label, colorIndex = 0 }) {
  const accent = PALETTE[colorIndex % PALETTE.length]
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '20px 22px',
        textAlign: 'center',
        border: '1px solid rgba(0,0,0,0.05)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: accent,
          borderRadius: '16px 16px 0 0',
        }}
      />
      <div
        style={{
          fontSize: 'clamp(22px, 4vw, 36px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: '#111',
          lineHeight: 1,
          marginBottom: '6px',
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: '12px', color: '#666', fontWeight: 500, lineHeight: 1.4 }}>{label}</div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Info card — colored top bar, hover lift
───────────────────────────────────────────────────────────── */
function InfoCard({ title, children, accent = PALETTE[0] }) {
  return (
    <div
      className="cs-info-card"
      style={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(8px)',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Nunito', sans-serif",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: accent,
        }}
      />
      <h3
        style={{
          fontSize: '14px',
          fontWeight: 700,
          color: '#111',
          marginBottom: '8px',
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: '#555', margin: 0 }}>{children}</p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Inline heading helper
───────────────────────────────────────────────────────────── */
function IH({ children }) {
  return <span style={T.inlineHeading}>{children}</span>
}

/* ─────────────────────────────────────────────────────────────
   Persona table — colored left border per persona
───────────────────────────────────────────────────────────── */
function PersonaTable() {
  const personas = [
    {
      avatar: asset('/illustrations/case-study/avatar1.png'),
      name: 'The Recruiter (End User)',
      role: '"The Busy Bee"',
      need: 'Wants to eliminate data entry and scheduling busy work. They want the AI to "show up to work with interviews already scheduled" on their calendar.',
      accent: PALETTE[0],
    },
    {
      avatar: asset('/illustrations/case-study/avatar2.png'),
      name: 'The Ops Manager (The Builder)',
      role: '"The Architect"',
      need: 'Needs a scalable, visual canvas to orchestrate millions of touchpoints without creating "spaghetti logic" or managing hundreds of duplicate workflows.',
      accent: PALETTE[1],
    },
    {
      avatar: asset('/illustrations/case-study/avatar3.png'),
      name: 'The Candidate (The Recipient)',
      role: '"The Talent"',
      need: 'Expects a frictionless experience. Whether texting or talking to an AI, they want instant responses and no repetition of data they have already provided.',
      accent: PALETTE[2],
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
      {personas.map((p, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            gap: '20px',
            background: '#fff',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid rgba(0,0,0,0.06)',
            borderLeft: `3px solid ${p.accent}`,
            alignItems: 'flex-start',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            fontFamily: "'Nunito', sans-serif",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.07)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
          }}
        >
          <img
            src={p.avatar}
            alt={p.name}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              objectFit: 'cover',
              flexShrink: 0,
              background: '#f5f4f1',
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: '32px', marginBottom: '10px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>Persona</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#111' }}>{p.name}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>Role</div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#555' }}>{p.role}</div>
              </div>
            </div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Core Need</div>
            <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#555', margin: 0 }}>{p.need}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   User flows interactive selector (Phase 2) — flow-diagram pills
───────────────────────────────────────────────────────────── */
const USER_FLOWS = [
  { label: 'Create a workflow', video: 'https://drive.google.com/file/d/1Fmd4kU8MvIaQ_G9B3JWbUTpeBuwaCjxH/preview?rm=minimal', description: 'Start by creating a new workflow from scratch. This initial step sets up the foundation for your automation process, allowing you to build a customized flow tailored to your recruitment needs.' },
  { label: 'Add trigger', video: 'https://drive.google.com/file/d/1G1uCDZH2A1CuAMzTo1bv7JeQC9-j27dR/preview?rm=minimal', description: 'Define the trigger event that initiates your workflow. Triggers can be based on candidate actions, status changes, or specific conditions that automatically start the automation sequence.' },
  { label: 'Add Email', video: 'https://drive.google.com/file/d/1UXXnTqIV7OTy9hYcmBqkUPn-5FS7e-Ov/preview?rm=minimal', description: 'Configure email communication nodes to send personalized messages to candidates. Customize templates, add dynamic content, and schedule delivery for effective candidate engagement.' },
  { label: 'Add scheduling', video: 'https://drive.google.com/file/d/1MZtA5emlG8cYQLvFVH0OWfripgWwAZrh/preview?rm=minimal', description: 'Integrate smart scheduling functionality to automate interview coordination. The system finds optimal meeting times by analyzing availability and reduces back-and-forth communication.' },
  { label: 'Add Delay', video: 'https://drive.google.com/file/d/1c8T_tBbBEpTlQrI-rbd4cr1jUVEUkTAJ/preview?rm=minimal', description: 'Insert time-based delays between workflow steps to control pacing. This allows for natural timing in your automation, such as waiting before sending follow-up communications.' },
  { label: 'Add SMS', video: 'https://drive.google.com/file/d/1J00TPou-ElkLf5RN7l8uTFgu7FSkMHnd/preview?rm=minimal', description: 'Add SMS messaging nodes to reach candidates via text. SMS provides immediate, high-open-rate communication that complements email outreach for better engagement.' },
  { label: 'Add path', video: 'https://drive.google.com/file/d/184G7kpkb6wsZZmT1o5zFhCQHf_aKln3E/preview?rm=minimal', description: 'Create conditional paths that branch your workflow based on specific criteria. Use split nodes to route candidates down different paths depending on their responses or qualifications.' },
  { label: 'Candidate Matching', video: 'https://drive.google.com/file/d/1N_xpWlc5pTSyvazTjMsfmyivDm49Gg3L/preview?rm=minimal', description: 'Leverage AI-powered candidate matching to automatically identify the best-fit candidates for job requirements. The system analyzes skills, experience, and qualifications to rank matches.' },
  { label: 'Candidate Evaluation', video: 'https://drive.google.com/file/d/1ZWhNx9XQYABi-__HaEob4FLn3aIJ7Fv4/preview?rm=minimal', description: 'Evaluate candidates through automated screening processes. This node can run assessments, score qualifications, and filter candidates based on predefined evaluation criteria.' },
  { label: 'Database Update', video: 'https://drive.google.com/file/d/16Yj1x6PZE8kKMMkLDs1hBWDZ6lFN6yMF/preview?rm=minimal', description: 'Automatically update your database and CRM with candidate information and workflow progress. Keep all systems synchronized without manual data entry, ensuring accurate records across platforms.' },
  { label: 'Activate', video: 'https://drive.google.com/file/d/1Z0b4kDb0WUcneuoDoISFx2lBd0DQ6TN/preview?rm=minimal', description: 'Activate your completed workflow to start the automation process. Once activated, the workflow will begin processing candidates according to the configured nodes and logic paths.' },
]

function UserFlowsSelector() {
  const [active, setActive] = useState(0)

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif" }}>
      <p style={{ fontSize: '12px', color: '#999', fontWeight: 600, marginBottom: '14px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        Select a flow to play
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginBottom: '20px',
          alignItems: 'center',
        }}
      >
        {USER_FLOWS.map((flow, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
            <button
              onClick={() => setActive(i)}
              style={{
                padding: '7px 14px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 600,
                border: `1.5px solid ${active === i ? '#111' : 'rgba(0,0,0,0.08)'}`,
                background: active === i ? '#111' : 'rgba(255,255,255,0.7)',
                color: active === i ? '#fff' : '#555',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                letterSpacing: '-0.01em',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              {active === i && (
                <span
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: PALETTE[i % PALETTE.length],
                    animation: 'caseStudyPulse 2s ease-in-out infinite',
                    flexShrink: 0,
                  }}
                />
              )}
              {flow.label}
            </button>
            {i < USER_FLOWS.length - 1 && (
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none" style={{ margin: '0 -2px', flexShrink: 0, opacity: 0.6 }}>
                <path d="M0 4H12M12 4L9 1M12 4L9 7" stroke="#999" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>
      <CaseStudyVideo src={USER_FLOWS[active].video} />
      <div
        style={{
          background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(8px)',
          borderRadius: '14px',
          padding: '16px 20px',
          border: '1px solid rgba(0,0,0,0.06)',
          marginTop: '-8px',
          borderLeft: `3px solid ${PALETTE[active % PALETTE.length]}`,
        }}
      >
        <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#555', margin: 0, fontFamily: "'Nunito', sans-serif" }}>
          {USER_FLOWS[active].description}
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Limitation item — alternating layout
───────────────────────────────────────────────────────────── */
function LimitationItem({ title, children, imgSrc, imgAlt, index = 0 }) {
  const isEven = index % 2 === 0
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '28px',
        alignItems: 'start',
        marginBottom: '16px',
        padding: '24px',
        background: '#fff',
        borderRadius: '18px',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        direction: isEven ? 'ltr' : 'rtl',
        fontFamily: "'Nunito', sans-serif",
      }}
      className="limitation-item"
    >
      <div style={{ direction: 'ltr' }}>
        <h3 style={{ ...T.h3, marginTop: 0 }}>{title}</h3>
        {children}
      </div>
      {imgSrc && (
        <img
          src={imgSrc}
          alt={imgAlt || title}
          style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block', direction: 'ltr' }}
        />
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   List helpers
───────────────────────────────────────────────────────────── */
function UL({ children, nested = false }) {
  return (
    <ul
      style={{
        paddingLeft: nested ? '20px' : '20px',
        marginBottom: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      {children}
    </ul>
  )
}
function OL({ children }) {
  return (
    <ol style={{ paddingLeft: '20px', marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {children}
    </ol>
  )
}
function LI({ children }) {
  return (
    <li style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#555', fontFamily: "'Nunito', sans-serif" }}>{children}</li>
  )
}

/* ─────────────────────────────────────────────────────────────
   Section wrapper — generous whitespace
───────────────────────────────────────────────────────────── */
function Section({ children }) {
  return <div style={{ marginBottom: '56px' }}>{children}</div>
}

/* ─────────────────────────────────────────────────────────────
   ═══════════ STEP CONTENT COMPONENTS ═══════════
───────────────────────────────────────────────────────────── */

function Step1() {
  const accordionItems = [
    {
      title: 'Key Personas',
      content: (
        <>
          <p style={T.body}>Designing this evolution required balancing the conflicting needs of three distinct users.</p>
          <PersonaTable />
        </>
      ),
    },
    {
      title: 'The Ecosystem of Use Cases',
      content: (
        <>
          <p style={T.body}>Before diving into the evolution, it's important to understand the breadth of problems Sense solves. The platform covers four main pillars:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginTop: '16px' }}>
            {[
              { img: asset('/illustrations/case-study/Sourcing.png'), title: 'Sourcing & Attraction', desc: 'Reactivating dormant candidate databases, referral automation, and chatbot screening.' },
              { img: asset('/illustrations/case-study/Candidate_Engagement.png'), title: 'Candidate Engagement', desc: 'Post-application acknowledgments, interview reminders, and status updates to prevent ghosting.' },
              { img: asset('/illustrations/case-study/Efficiency.png'), title: 'Recruiter Efficiency', desc: 'Automated interview scheduling, candidate scoring, and bulk messaging at scale.' },
              { img: asset('/illustrations/case-study/Employee Engagement.png'), title: 'Employee Engagement', desc: 'Onboarding workflows, NPS surveys, and assignment-end redeployment.' },
            ].map((c, i) => (
              <InfoCard key={i} title={c.title} accent={PALETTE[i % PALETTE.length]}>
                {c.desc}
              </InfoCard>
            ))}
          </div>
        </>
      ),
    },
    {
      title: 'Hero Use Case: Auto-Submission',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }} className="hero-usecase-grid">
          <div>
            <h3 style={T.h3}>The Problem</h3>
            <p style={T.body}>Recruiters spent hours manually searching their database for candidates who matched a new job order, calling them one by one, and screening them before submitting them to a client.</p>
            <h3 style={T.h3}>The Goal</h3>
            <p style={T.body}>Design a system that detects a new job, identifies the best matches, screens them via Voice/Chat, and submits qualified profiles to the recruiter — zero human intervention required.</p>
          </div>
          <CaseStudyImage src={asset('/illustrations/case-study/Auto-Submissoin.png')} alt="Auto-submission flow diagram" style={{ margin: 0 }} />
        </div>
      ),
    },
  ]

  return (
    <>
      {/* Hero — immersive dark gradient mesh with grid pattern */}
      <div
        className="cs-hero"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 40%, #16213e 70%, #1a1a1a 100%)',
          borderRadius: '24px',
          padding: 'clamp(40px, 6vw, 80px)',
          marginBottom: '56px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            zIndex: 0,
          }}
        />
        {/* Gradient mesh orbs */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-40px', width: '240px', height: '240px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', filter: 'blur(30px)' }} />
        <div style={{ position: 'absolute', top: '50%', right: '20%', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', filter: 'blur(20px)' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <span className="cs-hero-anim cs-hero-anim-1" style={{ ...T.kicker, color: 'rgba(255,255,255,0.4)' }}>Case Study</span>
          <h1 className="cs-hero-anim cs-hero-anim-2" style={{ ...T.h1, color: '#fff', marginBottom: '16px' }}>Evolution of AI Automation Agent</h1>
          <p className="cs-hero-anim cs-hero-anim-3" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '36px', maxWidth: '540px', fontFamily: "'Nunito', sans-serif" }}>
            A journey from siloed tools to autonomous AI teammates in talent acquisition.
          </p>
          <div className="cs-hero-anim cs-hero-anim-4" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {[
              { label: 'Role', value: 'Lead Product Designer', color: PALETTE[0] },
              { label: 'Timeline', value: '2021 – Present', color: PALETTE[1] },
              { label: 'Company', value: 'Sense.com', color: PALETTE[2] },
            ].map((m, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '999px',
                  padding: '10px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: m.color, flexShrink: 0 }} />
                <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.35)' }}>{m.label}</span>
                <span style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.12)' }} />
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="cs-scroll-indicator"
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            opacity: 0.4,
          }}
        >
          <span style={{ fontSize: '10px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500, fontFamily: "'Nunito', sans-serif" }}>Scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'caseStudyBounce 2s ease-in-out infinite' }}>
            <path d="M4 6L8 10L12 6" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <Section>
        <AccentH2 color={PALETTE[0]}>Project Context</AccentH2>
        <p style={T.body}>
          <IH>About Sense:</IH> Sense is an enterprise Talent Engagement Platform used by staffing agencies to accelerate hiring. It operates as a System of Engagement that syncs bi-directionally with an Applicant Tracking System (ATS), automating communication across the entire talent lifecycle.
        </p>
        <p style={T.body}>
          <IH>About this Project:</IH> This case study documents my journey as a product designer in the overall evolution of Sense products to AI Agents — from disconnected point solutions to a fully autonomous AI Recruiter.
        </p>
        <CaseStudyImage src={asset('/illustrations/case-study/Step_1_HeroImage.png')} alt="Sense Platform Overview" />
      </Section>

      <Section>
        <CaseStudyAccordion items={accordionItems} />
      </Section>

      <Section>
        <AccentH2 color={PALETTE[1]}>My Role & Cross-Functional Collaboration</AccentH2>
        <p style={T.body}>
          As Staff Product Designer for the Workflow Builder, I established a rigorous collaboration framework early on to ensure we were solving the right problems before a single pixel was pushed.
        </p>
        <CaseStudyImage src={asset('/illustrations/case-study/collaboration.png')} alt="Cross-functional collaboration framework" />
        <p style={T.body}>This is how my typical busy week looked like…</p>
        <CaseStudyImage src={asset('/illustrations/case-study/Collaboration_Calendar.png')} alt="Typical collaboration calendar" />
        <p style={T.body}>
          Although the calendar looks chaotic, we follow a framework to achieve efficiency in design: <IH>Research → Define → Validate ⟷ Design ⟷ Prototype → Build → QA test → Launch.</IH>
        </p>
      </Section>
    </>
  )
}

function Step2() {
  const accordionItems = [
    {
      title: 'Chatbot Builder 1.0',
      content: (
        <>
          <p style={T.body}><IH>What it did:</IH> A tool to create conversational interfaces for screening candidates or gathering feedback.</p>
          <p style={T.body}><IH>The UX Friction:</IH> It was rigid — limited logic (no nested branches), no "Text Piping" to personalise questions, and no validation for emails or phone numbers.</p>
          <CaseStudyScrollableImage src={asset('/illustrations/case-study/phase1/Chatbot_1.png')} alt="Chatbot Builder 1.0" />
        </>
      ),
    },
    {
      title: 'List Builder 1.0',
      content: (
        <>
          <p style={T.body}><IH>What it did:</IH> The engine for defining who to contact. It allowed users to filter candidates based on ATS data.</p>
          <p style={T.body}><IH>The UX Friction:</IH> It was "Tightly Coupled." Lists were built inside a specific journey rather than existing as independent, reusable assets. No Boolean power, and users struggled to differentiate static vs. dynamic "Smart Lists".</p>
          <CaseStudyScrollableImage src={asset('/illustrations/case-study/phase1/Lists_1.png')} alt="List Builder 1.0" />
        </>
      ),
    },
    {
      title: 'Messaging (Bulk Outreach)',
      content: (
        <>
          <p style={T.body}><IH>What it did:</IH> A console for 1:1 texting or Mass SMS blasts (Broadcasts).</p>
          <p style={T.body}><IH>The UX Friction:</IH> It was an isolated island. Data from a text conversation didn't easily trigger a follow-up journey — it was disconnected from the broader automation strategy.</p>
          <CaseStudyScrollableImage src={asset('/illustrations/case-study/phase1/Messaging_1.png')} alt="Messaging interface" />
        </>
      ),
    },
  ]

  return (
    <>
      <Section>
        <AccentH2 color={PALETTE[1]}>Phase 1: The Era of Siloed Products (Journeys 1.0)</AccentH2>
        <h3 style={T.h3}>The Context (2021)</h3>
        <p style={T.body}>
          When I joined Sense, the ecosystem was defined by Engage 1.0. While the platform offered powerful capabilities, they operated as "point solutions" — separate tools that solved specific problems but lacked a unified "central nervous system" to pass data between them.
        </p>
      </Section>

      <Section>
        <h3 style={{ ...T.h3, marginTop: 0 }}>1. Journeys 1.0 (Linear Automation)</h3>
        <p style={T.body}><IH>What it did:</IH> The primary automation engine. It allowed recruiters to send linear sequences of emails or SMS based on a trigger (e.g., "Candidate Applied").</p>
        <p style={T.body}><IH>The UX Friction:</IH> It was "Context Blind." A journey was merely a list of events with no native branching logic.</p>
        <p style={T.body}><IH>The "Clutter" Problem:</IH> Because assets weren't reusable, customers had to create hundreds of duplicate touchpoints. Cloning entire workflows resulted in massive, unmanageable systems.</p>
        <CaseStudyScrollableImage src={asset('/illustrations/case-study/phase1/Journeys_1.png')} alt="Journeys 1.0 interface" />
      </Section>

      <Section>
        <CaseStudyAccordion items={accordionItems} />
      </Section>

      <Section>
        <h3 style={T.h3}>The Auto-Submission Struggle (The "Before" State)</h3>
        <p style={T.body}>Because these products were silos, Auto-Submission was a manual nightmare. A recruiter had to act as the "human API" connecting these tools:</p>
        <UL>
          <LI><IH>Manual List:</IH> Build a static list of candidates in List Builder using limited filters.</LI>
          <LI><IH>Disconnected Content:</IH> Go to Chatbot Builder, create a new bot from scratch (no reusability), and manually copy the web link.</LI>
          <LI><IH>The Blast:</IH> Move to Messaging to paste that link into a bulk SMS.</LI>
          <LI><IH>The Black Hole:</IH> Once sent, the automation stopped. The recruiter had to manually download CSV reports from the chatbot to find who passed.</LI>
        </UL>
        <CaseStudyCallout>
          <strong>Our Contribution:</strong> We led the design for Chatbot 2.0 and List Builder 2.0. We introduced <strong>Modularity</strong> — redesigning chatbots and lists to be independent "objects" that could be attached to multiple workflows. This was the foundational "Lego block" strategy needed for the advanced automation to come.
        </CaseStudyCallout>
      </Section>

      <Section>
        <h3 style={T.h3}>Reusable Lists</h3>
        <CaseStudyVideo src="https://drive.google.com/file/d/1CfWexUA-bFAf8ASYUU_Tz81Fk_myXNcw/preview?rm=minimal" />
        <h3 style={T.h3}>Reusable Surveys</h3>
        <CaseStudyVideo src="https://drive.google.com/file/d/1YAaiTgEEzGx9ToJD1simXBAVPkC19DVX/preview?rm=minimal" />
      </Section>

      <Section>
        <h3 style={T.h3}>Phase 1 Outcomes — List 2.0 Impact</h3>
        <h4 style={T.h4}>Quantitative Metrics & Adoption</h4>
        <UL>
          <LI><IH>List Adoption:</IH> Achieved <strong>50 active agencies</strong> creating <strong>297 lists</strong> and driving <strong>87 unique workflows</strong> in the first month of release.</LI>
          <LI><IH>Cost Optimization:</IH> Engineering optimizations on the "List DB" instances resulted in immediate monthly cost savings of approximately <strong>$1,900/month per cluster</strong>.</LI>
        </UL>
        <h4 style={T.h4}>Customer Sentiment</h4>
        <UL>
          <LI>The <IH>"ATS List Sync"</IH> feature received high praise as a <em>"game changer"</em> — a <em>"better version of CSV uploads."</em></LI>
          <LI>Addressed the <IH>"Pacific Companies"</IH> use case, significantly reducing the hundreds of duplicate assets customers had to manage.</LI>
        </UL>
      </Section>
    </>
  )
}

function Step3() {
  const [zoomSrc, setZoomSrc] = useState(null)
  const svgRef0 = useRef(null)
  const svgRef1 = useRef(null)
  const svgRef2 = useRef(null)
  const svgRefs = [svgRef0, svgRef1, svgRef2]

  function openSvgZoom(ref) {
    const el = ref.current
    if (!el) return
    const outer = el.outerHTML
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(outer)}`
    setZoomSrc(dataUrl)
  }

  const nodeVersions = [
    { version: 'V1', src: asset('/Nodecards/Workflow Cards_V1.png'), verdict: 'Rejected', verdictColor: '#e55', caption: 'The band used a cutout-style layout that was structurally incompatible with the canvas engine — it couldn\'t anchor a precise Y position for the outgoing connector, causing downstream nodes to misalign. Canvas positioning broke entirely when nodes were chained.' },
    { version: 'V2', src: asset('/Nodecards/Workflow Cards_V2.png'), verdict: 'Rejected', verdictColor: '#e55', caption: 'Cleaner band, but the node name zone had a fixed-width constraint — any custom name longer than ~30 characters got hard-truncated with no tooltip or expand affordance. Recruiters who gave nodes descriptive names (e.g. "Auto-Submit — ICU Nurses — Chicago") couldn\'t read their own labels.' },
    { version: 'V3', src: asset('/Nodecards/Workflow Cards_V3.png'), verdict: 'Adopted', verdictColor: '#22c55e', caption: 'Fixed band height with a full-bleed connector anchor point resolves the Y-position problem. Name zone is two-line expandable — truncation only kicks in at line 2 with a visible ellipsis. Chips scale dynamically at the bottom without breaking node height consistency.' },
  ]

  const nodeAccordion = [
    {
      title: 'Understanding the Nodes and its Structure',
      content: (
        <>
          <CaseStudyScrollableImage src={asset('/illustrations/case-study/phase2/NodePanel.png')} alt="Node panel" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginTop: '16px' }}>
            <InfoCard title='Action Nodes (The "Doers")' accent={PALETTE[0]}>Modular nodes for SMS, Email, WhatsApp, and Voice — mix communication channels within a single flow.</InfoCard>
            <InfoCard title='Logical Nodes (The "Brains")' accent={PALETTE[1]}>Split, Filter, Foreach, and Delay nodes for conditional branching, audience filtering, batch processing, and time-based control.</InfoCard>
            <InfoCard title='ATS Integrations' accent={PALETTE[2]}>Nodes to update database stages in CRM and write notes to ATS — keeping everything in sync without leaving Sense.</InfoCard>
            <InfoCard title='Smart Nodes' accent={PALETTE[3]}>Voiceflow, Smart Schedule, Candidate Matching, and Job Matching — AI-powered nodes that take intelligent decisions at runtime.</InfoCard>
          </div>

          <h3 style={{ ...T.h3, marginTop: '40px' }}>Ideation Behind Defining the Structure of a Node</h3>
          <p style={T.body}>
            Before committing to the final node design, we ran three rounds of visual exploration — each testing how much information a single node could carry without overwhelming recruiters scanning a canvas with 20+ nodes. The question was: what's the minimum viable anatomy of a node that still communicates type, status, label, and action at a glance?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
            {nodeVersions.map((v) => (
              <div key={v.version} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.7)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(0,0,0,0.06)', fontFamily: "'Nunito', sans-serif" }}>
                <div style={{ flexShrink: 0, width: '260px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', background: '#111', color: '#fff', padding: '3px 10px', borderRadius: '999px' }}>{v.version}</span>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: v.verdictColor, border: `1px solid ${v.verdictColor}`, padding: '3px 10px', borderRadius: '999px' }}>{v.verdict}</span>
                  </div>
                  <div
                    onClick={() => setZoomSrc(v.src)}
                    style={{ borderRadius: '10px', overflow: 'hidden', background: '#f5f5f3', border: '1px solid rgba(0,0,0,0.06)', cursor: 'zoom-in', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.12)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
                  >
                    <img src={v.src} alt={`Node card ${v.version}`} style={{ width: '100%', display: 'block', objectFit: 'contain', pointerEvents: 'none' }} />
                  </div>
                </div>
                <div style={{ flex: 1, paddingTop: '36px' }}>
                  <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>{v.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ ...T.h3, marginTop: '40px' }}>Anatomy of a Node — V3 Structure</h3>
          <p style={T.body}>Every node in V3 is composed of four distinct zones stacked vertically. The structure is consistent across all node types — only the content within each zone changes.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px', marginBottom: '28px' }}>
            {[
              {
                num: '01',
                label: 'Medium & Module Band',
                accent: PALETTE[0],
                body: (
                  <>
                    The top band is an icon row split into two groups. The <strong>first icon</strong> always represents the <strong>communication medium</strong> — Email, SMS, or WhatsApp. The <strong>remaining icons</strong> represent the <strong>modules active inside that message</strong> — e.g. Chatbot, Survey, Job Matching, or Scheduler Link. This lets an ops manager scan a 30-node canvas and instantly know what each node sends and what intelligence it carries, without opening it.
                  </>
                ),
              },
              {
                num: '02',
                label: 'Node Code + Custom Name',
                accent: PALETTE[1],
                body: (
                  <>
                    Below the band sits a two-part identity row. The <strong>node code</strong> (e.g. <em>#A2</em>) is a system-assigned unique identifier used to reference nodes in logs, analytics, and support tickets. The <strong>custom name</strong> is recruiter-authored — two-line expandable — so descriptive names like <em>"Auto-Submit — ICU Nurses — Chicago"</em> render in full rather than truncating at 30 characters (the V2 failure).
                  </>
                ),
              },
              {
                num: '03',
                label: 'Content Preview Text',
                accent: PALETTE[2],
                body: (
                  <>
                    The middle zone shows a <strong>truncated preview of the actual message content</strong> — the opening lines of the email subject/body or SMS copy. This acts as a quick sanity check: recruiters can confirm the right template is wired to the right node without clicking into edit mode. It surfaces context without requiring a click.
                  </>
                ),
              },
              {
                num: '04',
                label: 'Functional Chips (Scalable)',
                accent: PALETTE[3],
                body: (
                  <>
                    The bottom fold renders <strong>chips for functional configuration states</strong> — Scheduling, Alert triggers, Conditional flags, and other node-specific settings. Chips only appear when a setting is active, so a minimal node shows 0–1 chips and a complex Smart Node might show 4–5. The chip count scales with the node's configuration without breaking the card height — the V1 structural failure this zone explicitly solves.
                  </>
                ),
              },
            ].map((z) => (
              <div key={z.num} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.7)', borderRadius: '14px', padding: '20px 22px', border: '1px solid rgba(0,0,0,0.06)', fontFamily: "'Nunito', sans-serif" }}>
                <div style={{ flexShrink: 0, width: '36px', height: '36px', borderRadius: '10px', background: z.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, color: '#111', letterSpacing: '0.02em', marginTop: '2px' }}>{z.num}</div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#111', margin: '0 0 6px', letterSpacing: '-0.01em' }}>{z.label}</p>
                  <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: '#555', margin: 0 }}>{z.body}</p>
                </div>
              </div>
            ))}
          </div>

          <CaseStudyCallout>
            <strong>Why V3 won:</strong> <strong>(1) Scannability</strong> — the colour-coded type band let recruiters identify node type in under 1 second across a 20+ node canvas. <strong>(2) Information density balance</strong> — label and status coexist without crowding the action zone. <strong>(3) System coherence</strong> — the same anatomy scaled from the simplest SMS node to the most complex Smart Node without visual breakage.
          </CaseStudyCallout>
        </>
      ),
    },
  ]

  const limitationsAccordion = [
    {
      title: 'Limitations of Phase 2',
      content: (
        <>
          <p style={T.body}>Despite the architectural success of Workflows, the UX hit a "complexity ceiling" that prevented full democratisation of the tool:</p>
          <LimitationItem title='1. The "Boolean Burden" (Complexity)' imgSrc={asset('/illustrations/case-study/phase2/booleanBurden.png')} imgAlt="Boolean Burden" index={0}>
            <p style={T.body}>Creating a precise "Job Match" list required manually constructing complex Boolean strings (e.g., <em>"(Location = SF OR NY) AND (Skills = Java) AND NOT (Status = Placed)"</em>). This alienated average recruiters.</p>
          </LimitationItem>
          <LimitationItem title='2. "Dumb" Logic (Lack of Intelligence)' imgSrc={asset('/illustrations/case-study/phase2/DumbLogic.png')} imgAlt="Dumb Logic" index={1}>
            <p style={T.body}>The logic was rigid. A candidate either matched a keyword or they didn't. The system lacked semantic intelligence to understand that a "React Developer" is also a good match for a "Frontend Engineer" role.</p>
          </LimitationItem>
          <LimitationItem title='3. Data Blind Spots' imgSrc={asset('/illustrations/case-study/phase2/Blind.png')} imgAlt="Data Blind Spots" index={2}>
            <p style={T.body}>Users struggled to analyse the performance of complex workflows. The dashboard only provided static charts — there was a disconnect between execution (Workflows) and insights (Analytics).</p>
          </LimitationItem>
          <CaseStudyCallout>
            <strong>The Realization:</strong> We had built the "Railroad Tracks" (Workflows), but we needed a "Conductor." This necessitated <strong>Phase 3</strong>, where we introduced the <strong>Intelligence Layer (Ask AI & Jarvis)</strong>.
          </CaseStudyCallout>
        </>
      ),
    },
  ]

  const phase2Research = [
    { title: 'Field observation', body: 'Shadowed 8 ops managers across 4 staffing agencies. The most common workaround: maintaining 40+ near-duplicate Journeys to fake branching logic the linear engine couldn\'t express.' },
    { title: 'Recruiter interviews', body: '12 of 14 interviewed recruiters could not describe their own end-to-end flow without drawing it on paper first. The mental model existed — the product just refused to render it.' },
    { title: 'Jobs to Be Done', body: '"When a new job posts, help me orchestrate sourcing → screening → submission, so I can stop being human middleware between disconnected tools."' },
  ]

  const phase2Inspiration = [
    {
      name: 'Mailchimp Customer Journeys',
      accent: PALETTE[0],
      img: asset('/Market/Mailchimp.png'),
      what: 'Entry-point branching — a single trigger fans out into multiple audience paths based on engagement state.',
      takeaway: 'Borrowed the "trigger → branch → action" mental model as the backbone of our node canvas. The simplicity of Mailchimp\'s entry conditions inspired our Trigger Node design: one clear event, one clear start.',
    },
    {
      name: 'Ortto (Autopilot)',
      accent: PALETTE[1],
      img: asset('/Market/Ortto.png'),
      what: 'Visual drag-and-drop journey builder with a canvas that made multi-step sequences feel spatial and scannable.',
      takeaway: 'Ortto validated that a canvas (not a list) is the right paradigm for complex multi-step flows. Their shape-based node style directly influenced our decision to use icon-coded node cards over step-list UIs.',
    },
    {
      name: 'ActiveCampaign',
      accent: PALETTE[2],
      img: asset('/Market/ActiveCampaign.png'),
      what: 'Conditional branching with "If/Else" split logic and goal-based workflow exits that terminate when a contact meets a condition.',
      takeaway: 'Inspired our Logical Nodes (Split, Filter, Foreach) and goal-based exit logic in the Matching Agent. The idea that a workflow should know when it\'s "done" — not just when it ends — came directly from ActiveCampaign\'s goal step.',
    },
    {
      name: 'GetResponse',
      accent: PALETTE[3],
      img: asset('/Market/GetResponse.png'),
      what: 'Time-delay nodes with calendar-aware scheduling and multi-channel sequencing (email + SMS in one flow).',
      takeaway: 'Our Delay Node and Smart Schedule Node both borrow from GetResponse\'s time-aware sequencing. The idea of channel mixing inside a single workflow (not separate campaigns) came from their combined email+SMS journeys.',
    },
    {
      name: 'Klaviyo Flows',
      accent: PALETTE[4],
      img: asset('/Market/klaviyo.png'),
      what: 'Data-driven segmentation at the node level — each message node filters its own audience based on profile properties, events, and predictive scores.',
      takeaway: 'Inspired the per-node filtering capability in our Candidate Matching Node. Instead of filtering once at entry, each node can re-evaluate the audience — a pattern Klaviyo pioneered for e-commerce that maps directly to dynamic candidate pools in recruiting.',
    },
  ]

  const phase2Explorations = [
    {
      name: 'Accordion Node Canvas',
      verdict: 'Killed',
      reason: 'All nodes visible as a stacked list — but branching was structurally invisible. A Condition Branch looked identical to any sequence node when collapsed. The "Architect" couldn\'t see parallel paths without expanding every node.',
    },
    {
      name: 'Code-First DSL',
      verdict: 'Killed',
      reason: 'Powerful for the 10% of ops engineers — locked out the other 90% (the Busy Bee persona). 9 of 10 recruiters in usability tests couldn\'t write a valid trigger. Violated our "recruiter as builder" goal.',
    },
    {
      name: 'Wizard / Step-by-step',
      verdict: 'Killed',
      reason: 'Hid the whole-flow mental model the Architect persona told us they needed. Ops managers repeatedly looped back to earlier steps after realising branching needed a different trigger. Felt like onboarding, not authoring a system.',
    },
  ]

  const phase2Tradeoffs = [
    { title: 'Legacy tech from Journeys 1.0', body: 'Workflow Builder was built on top of the same tech stack as Journeys — a system architected 5 years earlier. A full rewrite was cost-prohibitive, so we had to design within its constraints. This directly forced us to trade off live analytics, real-time recipient tracking, and per-node delivery insights — all features that were architecturally impossible without a new data pipeline. Features ops managers wanted most were deferred to Phase 3 (Jarvis) as a workaround.' },
    { title: 'Deferred real-time multi-user editing', body: 'Collaboration locking would have added latency at our 10M/day throughput target. We chose canvas locking + activity timeline as a v1 compromise.' },
    { title: 'Capped node depth at 50', body: 'Beyond ~50 nodes, canvas rendering jittered on lower-end recruiter laptops. We added "sub-workflow" nodes as the escape hatch instead of fighting browser perf.' },
    { title: 'Boolean Burden stayed', body: 'We knew complex segmentation would alienate non-technical users. We made the conscious call to ship the canvas first and let user pain quantify the cost — which became the explicit driver for Phase 3\'s AI Lister.' },
  ]

  const phase2Quotes = [
    { quote: 'For the first time, I can hand a workflow to a new recruiter and they actually understand what it does.', who: 'VP of Ops, mid-market staffing agency' },
    { quote: 'We replaced fourteen separate Journeys with one workflow. Fourteen. The duplication was killing us.', who: 'Workflow lead, enterprise healthcare client' },
  ]

  const phase2Gaps = (() => {
    const cx = 450, cy = 300, hexR = 130, cardOff = 260
    const items = [
      { num: 1, title: 'Multi-Modal Void', body: 'No seamless blend of text, voice, and email.' },
      { num: 2, title: 'Shallow Personalization', body: 'Reliance on static knockout questions.' },
      { num: 3, title: 'Limited Autonomy', body: 'Cannot handle negotiations or rescheduling dynamically.' },
      { num: 4, title: 'Broken Learning Loops', body: 'Manual adjustments; no self-optimization.' },
      { num: 5, title: 'Shallow Analytics', body: 'Tracks drop-offs, not sentiment or quality.' },
      { num: 6, title: 'DEI / Bias Automation', body: 'Inconsistent compliance & fairness guardrails.' },
      { num: 7, title: 'Integration Friction', body: 'Fragile legacy ATS integrations.' },
    ]
    const a0 = -Math.PI / 2
    const da = (2 * Math.PI) / 7
    return {
      cx, cy, hexR,
      items: items.map((it, i) => {
        const a = a0 + i * da
        return {
          ...it,
          vx: cx + hexR * Math.cos(a),
          vy: cy + hexR * Math.sin(a),
          cardX: cx + cardOff * Math.cos(a),
          cardY: cy + cardOff * Math.sin(a),
        }
      }),
    }
  })()

  const [openCards, setOpenCards] = useState(new Set([0, 1]))
  const toggleCard = (i) => setOpenCards(prev => {
    const next = new Set(prev)
    next.has(i) ? next.delete(i) : next.add(i)
    return next
  })

  const PHASE2_CARDS = [
    {
      kicker: 'OVERVIEW',
      title: 'Phase 2: The Unification — Workflow Builder 2.0',
      accent: PALETTE[2],
      content: (
        <div style={{
          background: 'linear-gradient(135deg, #B8F4D4 0%, #B8E8F8 50%, #EDFFF5 100%)',
          borderRadius: '16px',
          padding: '28px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: "'Nunito', sans-serif",
        }}>
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-30px', left: '40%', width: '110px', height: '110px', borderRadius: '50%', background: 'rgba(255,255,255,0.18)', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
            {[
              { label: 'Role', value: 'Lead → Staff Product Designer' },
              { label: 'Team', value: '1 PM · 4 engineers · 1 researcher' },
              { label: 'Duration', value: '2022 → 2024  ·  18 months to GA' },
              { label: 'My contribution', value: 'System architecture, canvas interaction model, node library, design principles' },
            ].map((m) => (
              <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'nowrap' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)', margin: 0, flex: '0 0 140px' }}>{m.label}</p>
                <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(184,232,248,0.6)', borderRadius: '999px', padding: '7px 16px', fontSize: '12.5px', fontWeight: 500, color: '#333', backdropFilter: 'blur(4px)', lineHeight: 1.5, whiteSpace: 'nowrap' }}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      kicker: 'THE PROBLEM',
      title: 'What We Were Solving',
      accent: PALETTE[3],
      content: (
        <>
          <p style={T.body}>
            Phase 1 left recruiters acting as <IH>human middleware</IH> — manually copying lists out of one tool, pasting them into another, and pinging engineers when anything needed to branch. The <IH>Busy Bee</IH> drowned in repetitive setup, and the <IH>Architect</IH> couldn't see the system she was trying to operate.
          </p>
          <p style={T.body}>
            <IH>Hypothesis:</IH> a visual, node-based canvas would collapse workflow creation from days to minutes and unlock non-technical recruiters as builders — turning ops managers from operators into orchestrators.
          </p>
          <h4 style={T.h4}>Success criteria — set before launch</h4>
          <UL>
            <LI><IH>Adoption:</IH> 1,000+ active workflows by Q3 2025.</LI>
            <LI><IH>Depth:</IH> 10 active journeys per customer (vs. one-off blasts).</LI>
            <LI><IH>Performance:</IH> sub-10s trigger and communication latencies at 10M/day throughput.</LI>
          </UL>
          <CaseStudyImage src={asset('/illustrations/case-study/phase2/Workflow_Integrations.png')} alt="Workflow integrations unified architecture" />
        </>
      ),
    },
    {
      kicker: 'RESEARCH',
      title: 'Field Evidence',
      accent: PALETTE[0],
      content: (
        <>
          <p style={T.body}>The canvas wasn't a hunch — it was the answer the field kept giving us, in three forms:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px', marginTop: '16px' }}>
            {phase2Research.map((r, i) => (
              <InfoCard key={r.title} title={r.title} accent={PALETTE[i % PALETTE.length]}>{r.body}</InfoCard>
            ))}
          </div>
          <CaseStudyCallout>
            <em>"I wish I could just see the whole flow at once instead of clicking through six screens."</em><br/>— Ops manager, in-context observation, week 3 of research
          </CaseStudyCallout>
        </>
      ),
    },
    {
      kicker: 'COMPETITORS',
      title: 'Competitor Analysis — The Multi-Modal Void',
      accent: PALETTE[5],
      content: (
        <>
          <p style={T.body}>
            Where did the rest of the AI recruitment market sit? We mapped the three named players competing for the same Talent Engagement budget. <IH>None solved the orchestration problem we were aiming at.</IH>
          </p>

          <div style={{
            background: 'rgba(255,255,255,0.9)',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '14px',
            overflow: 'hidden',
            marginTop: '20px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}>
            <table className="competitor-table" style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: "'Nunito', sans-serif",
              fontSize: '13px',
              color: '#444',
            }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.02)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 14px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#999' }}>Player</th>
                  <th style={{ textAlign: 'left', padding: '12px 14px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#999' }}>Core Bet</th>
                  <th style={{ textAlign: 'left', padding: '12px 14px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#999' }}>Strength</th>
                  <th style={{ textAlign: 'left', padding: '12px 14px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#c0392b' }}>Gap</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#111', whiteSpace: 'nowrap' }}>Paradox <span style={{ color: '#999', fontWeight: 500 }}>(Olivia)</span></td>
                  <td style={{ padding: '12px 14px' }}>Text-only SMS assistant for high-volume enterprise hiring.</td>
                  <td style={{ padding: '12px 14px' }}>Proven scale (Nestlé, GM), strong multilingual coverage.</td>
                  <td style={{ padding: '12px 14px', color: '#c0392b', fontStyle: 'italic' }}>No voice; flows feel scripted; heavy onboarding cost.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#111', whiteSpace: 'nowrap' }}>Converz AI</td>
                  <td style={{ padding: '12px 14px' }}>Voice-first virtual recruiter for US staffing firms.</td>
                  <td style={{ padding: '12px 14px' }}>Native dial-out, fast ROI on rep replacement.</td>
                  <td style={{ padding: '12px 14px', color: '#c0392b', fontStyle: 'italic' }}>Narrow scope; lacks ATS/CRM omni-channel depth.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#111', whiteSpace: 'nowrap' }}>Humanly</td>
                  <td style={{ padding: '12px 14px' }}>Agentic CRM across web, SMS, and social.</td>
                  <td style={{ padding: '12px 14px' }}>Auto-composed messaging, strong DEI guardrails.</td>
                  <td style={{ padding: '12px 14px', color: '#c0392b', fontStyle: 'italic' }}>No voice; no text↔voice handoff.</td>
                </tr>
                <tr style={{ background: 'rgba(200,244,240,0.35)', position: 'relative' }}>
                  <td style={{ padding: '14px', fontWeight: 700, color: '#111', whiteSpace: 'nowrap', borderLeft: `3px solid ${PALETTE[5]}` }}>
                    Sense <span style={{ color: '#666', fontWeight: 500 }}>(target)</span>
                  </td>
                  <td style={{ padding: '14px' }}>Multi-modal agentic orchestration powered by J2 Workflows.</td>
                  <td style={{ padding: '14px' }}>Unified Agentic Memory across text · chat · voice.</td>
                  <td style={{ padding: '14px', color: '#1a7a4a', fontWeight: 700 }}>✓ Closes the gap.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Battleground 2×2 — competitive positioning */}
          <h4 style={T.h4}>Mapping the Current HR Tech Battleground</h4>
          <div style={{
            background: 'rgba(255,255,255,0.9)',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '14px',
            padding: '20px',
            marginTop: '8px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}>
            <svg viewBox="0 0 720 380" style={{ width: '100%', display: 'block' }}>
              {/* Axes */}
              <line x1="78" y1="20" x2="78" y2="320" stroke="#cfcdc8" strokeWidth="1.5" />
              <line x1="78" y1="320" x2="700" y2="320" stroke="#cfcdc8" strokeWidth="1.5" />
              <polygon points="78,14 73,24 83,24" fill="#cfcdc8" />
              <polygon points="708,320 698,316 698,324" fill="#cfcdc8" />
              {/* Quadrant guides */}
              <line x1="78" y1="170" x2="700" y2="170" stroke="#ececea" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="390" y1="20" x2="390" y2="320" stroke="#ececea" strokeWidth="1" strokeDasharray="3,3" />
              {/* Axis labels */}
              <text x="50" y="170" textAnchor="middle" transform="rotate(-90 50 170)" fontFamily="'Nunito', sans-serif" fontSize="11" fill="#888" letterSpacing="0.05em">
                Tech Capability: Text-only Scripting → Multi-Modal Autonomy
              </text>
              <text x="390" y="355" textAnchor="middle" fontFamily="'Nunito', sans-serif" fontSize="11" fill="#888" letterSpacing="0.05em">
                Focus: High-Volume (Hourly) → Professional / Niche
              </text>

              {/* Paradox — upper-left */}
              <circle cx="210" cy="115" r="62" fill="#F4A58A" opacity="0.62" />
              <text x="210" y="103" textAnchor="middle" fontFamily="'Fredoka', sans-serif" fontWeight="700" fontSize="16" fill="#111">Paradox</text>
              <text x="210" y="120" textAnchor="middle" fontFamily="'Nunito', sans-serif" fontSize="11" fill="#333">(Olivia)</text>
              <text x="210" y="138" textAnchor="middle" fontFamily="'Nunito', sans-serif" fontSize="10.5" fill="#444">Text-first, high-volume</text>

              {/* Converz AI — center */}
              <circle cx="390" cy="215" r="54" fill="#B8F4D4" opacity="0.78" />
              <text x="390" y="210" textAnchor="middle" fontFamily="'Fredoka', sans-serif" fontWeight="700" fontSize="15" fill="#111">Converz AI</text>
              <text x="390" y="228" textAnchor="middle" fontFamily="'Nunito', sans-serif" fontSize="10.5" fill="#444">Voice specialist</text>

              {/* Humanly — lower-right */}
              <circle cx="540" cy="252" r="52" fill="#B8D4F8" opacity="0.78" />
              <text x="540" y="248" textAnchor="middle" fontFamily="'Fredoka', sans-serif" fontWeight="700" fontSize="15" fill="#111">Humanly</text>
              <text x="540" y="266" textAnchor="middle" fontFamily="'Nunito', sans-serif" fontSize="10.5" fill="#444">CRM, no voice</text>

              {/* Sense — upper-right, target state with halo */}
              <circle cx="595" cy="100" r="80" fill="none" stroke="#D4B8F8" strokeWidth="2" opacity="0.55" />
              <circle cx="595" cy="100" r="70" fill="#D4B8F8" opacity="0.7" />
              <text x="595" y="84" textAnchor="middle" fontFamily="'Fredoka', sans-serif" fontWeight="700" fontSize="17" fill="#111">Sense</text>
              <text x="595" y="101" textAnchor="middle" fontFamily="'Nunito', sans-serif" fontSize="11" fontWeight="600" fill="#222">(Target State)</text>
              <text x="595" y="119" textAnchor="middle" fontFamily="'Nunito', sans-serif" fontSize="10.5" fill="#222">Multi-modal, autonomous</text>
            </svg>
          </div>

          {/* 7 Critical Market Gaps — heptagon synthesis */}
          <h4 style={T.h4}>Industry Synthesis — The 7 Critical Market Gaps</h4>
          <div style={{
            background: 'rgba(255,255,255,0.9)',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '14px',
            padding: '20px',
            marginTop: '8px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}>
            <svg viewBox="0 0 900 620" style={{ width: '100%', display: 'block' }}>
              {/* Heptagon outline */}
              <path
                d={'M ' + phase2Gaps.items.map(v => `${v.vx.toFixed(1)} ${v.vy.toFixed(1)}`).join(' L ') + ' Z'}
                fill="none"
                stroke="#D4B8F8"
                strokeWidth="2"
                opacity="0.7"
              />
              {/* Dashed spokes center → vertices */}
              {phase2Gaps.items.map((v, i) => (
                <line
                  key={'spoke-' + i}
                  x1={phase2Gaps.cx}
                  y1={phase2Gaps.cy}
                  x2={v.vx.toFixed(1)}
                  y2={v.vy.toFixed(1)}
                  stroke="#ddd"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
              ))}
              {/* Center circle */}
              <circle cx={phase2Gaps.cx} cy={phase2Gaps.cy} r="62" fill="#fff" stroke="#e8e6e0" strokeWidth="1.5" />
              <text x={phase2Gaps.cx} y={phase2Gaps.cy - 4} textAnchor="middle" fontFamily="'Fredoka', sans-serif" fontWeight="700" fontSize="14" fill="#111">The Industry</text>
              <text x={phase2Gaps.cx} y={phase2Gaps.cy + 14} textAnchor="middle" fontFamily="'Fredoka', sans-serif" fontWeight="700" fontSize="14" fill="#111">Blindspot</text>

              {/* Gap chips at each vertex */}
              {phase2Gaps.items.map((v, i) => (
                <foreignObject
                  key={'card-' + i}
                  x={v.cardX - 115}
                  y={v.cardY - 36}
                  width="230"
                  height="72"
                >
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: '#fff',
                    border: `1px solid ${i === 0 ? PALETTE[5] : 'rgba(0,0,0,0.08)'}`,
                    borderRadius: '10px',
                    padding: '8px 11px',
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: '11px',
                    lineHeight: 1.35,
                    color: '#444',
                    boxShadow: i === 0 ? '0 2px 10px rgba(200,244,240,0.6)' : '0 1px 4px rgba(0,0,0,0.04)',
                    boxSizing: 'border-box',
                  }}>
                    <div style={{ fontWeight: 700, color: '#111', marginBottom: '3px', fontSize: '11.5px' }}>
                      {v.num}. {v.title}
                    </div>
                    <div>{v.body}</div>
                  </div>
                </foreignObject>
              ))}
            </svg>
            <p style={{ fontSize: '11.5px', color: '#888', textAlign: 'center', marginTop: '8px', fontStyle: 'italic', fontFamily: "'Nunito', sans-serif" }}>
              Gap #1 — the Multi-Modal Void — is the one Sense's J2 Workflows engine was designed to close.
            </p>
          </div>

          <div style={{
            marginTop: '20px',
            padding: '14px 18px',
            background: 'rgba(200,244,240,0.3)',
            border: `1px dashed ${PALETTE[5]}`,
            borderRadius: '10px',
            fontFamily: "'Nunito', sans-serif",
            fontSize: '13.5px',
            color: '#444',
            lineHeight: 1.6,
            fontStyle: 'italic',
          }}>
            The shared blindspot: <IH>a unified memory that survives a text → chat → voice handoff.</IH> That's where Grace lands.
          </div>
        </>
      ),
    },
    {
      kicker: 'INSPIRATION',
      title: 'Market Inspiration — What We Borrowed',
      accent: PALETTE[1],
      content: (
        <>
          <p style={T.body}>We weren't building in a vacuum. Before designing the canvas, we audited five best-in-class marketing automation products — not to copy them, but to understand the interaction patterns that already live in recruiters' muscle memory. Each one taught us something specific.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
            {phase2Inspiration.map((c) => (
              <div key={c.name} style={{ background: 'rgba(255,255,255,0.88)', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', overflow: 'hidden', fontFamily: "'Nunito', sans-serif" }}>
                {/* Screenshot */}
                <div style={{ borderBottom: `3px solid ${c.accent}`, overflow: 'hidden', maxHeight: '240px', background: '#f5f4f1' }}>
                  <img src={c.img} alt={`${c.name} screenshot`} style={{ width: '100%', height: '240px', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
                </div>
                {/* Content */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', alignItems: 'start' }}>
                  <div style={{ padding: '18px 20px', borderRight: '1px solid rgba(0,0,0,0.07)' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111', margin: '0 0 8px', letterSpacing: '-0.01em' }}>{c.name}</h4>
                    <p style={{ fontSize: '12.5px', lineHeight: 1.6, color: '#666', margin: 0 }}><strong style={{ color: '#444' }}>What it does well:</strong><br/>{c.what}</p>
                  </div>
                  <div style={{ padding: '18px 20px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: c.accent, margin: '0 0 6px' }}>Key Takeaway for Workflows</p>
                    <p style={{ fontSize: '12.5px', lineHeight: 1.65, color: '#444', margin: 0 }}>{c.takeaway}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <CaseStudyCallout>
            None of these tools were built for talent acquisition — but they each solved a real UX problem at scale. Borrowing their best patterns and re-contextualising them for the recruiter persona was faster and more credible than inventing every interaction from scratch.
          </CaseStudyCallout>
        </>
      ),
    },
    {
      kicker: 'EXPLORATION',
      title: 'Directions We Killed',
      accent: PALETTE[4],
      content: (
        <>
          <p style={T.body}>Three directions made it to mid-fidelity before we cut them. Each kill sharpened the case for the canvas:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px', marginTop: '16px' }}>

            {/* Card 1 — Accordion Node Canvas */}
            <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', fontFamily: "'Nunito', sans-serif", boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <div onClick={() => openSvgZoom(svgRefs[0])} style={{ background: '#f0ede8', borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '0', cursor: 'zoom-in', transition: 'opacity 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.opacity='0.88'} onMouseLeave={e => e.currentTarget.style.opacity='1'}>
                <svg ref={svgRef0} viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
                  <rect width="300" height="160" fill="#f0ede8"/>
                  <rect width="300" height="22" fill="#2a2a2a"/>
                  <circle cx="12" cy="11" r="4" fill="#e06c5a"/><circle cx="24" cy="11" r="4" fill="#e0b45a"/><circle cx="36" cy="11" r="4" fill="#7ab87a"/>
                  <text x="50" y="15" fill="#faf8f5" fontSize="7.5" fontWeight="700" fontFamily="'Courier New', monospace">Accordion Node Canvas</text>
                  <text x="236" y="15" fill="#888" fontSize="6" fontFamily="monospace" letterSpacing="0.05em">KILLED</text>
                  {/* sidebar */}
                  <rect x="0" y="22" width="52" height="138" fill="#f5f2ed" stroke="#2a2a2a" strokeWidth="1.5"/>
                  <rect x="4" y="30" width="44" height="11" rx="2" fill="#2a2a2a"/>
                  <text x="6" y="39" fill="#faf8f5" fontSize="6.5" fontFamily="'Courier New', monospace">📋 Journeys</text>
                  <text x="6" y="52" fill="#888" fontSize="6.5" fontFamily="'Courier New', monospace">📊 Reports</text>
                  <text x="6" y="63" fill="#888" fontSize="6.5" fontFamily="'Courier New', monospace">👥 Candidates</text>
                  {/* main label */}
                  <text x="60" y="34" fill="#2a2a2a" fontSize="7.5" fontWeight="700" fontFamily="'Courier New', monospace">Build Workflow</text>
                  <text x="60" y="43" fill="#aaa" fontSize="6" fontFamily="'Courier New', monospace">Accordion-style node list</text>
                  {/* node 1 expanded */}
                  <rect x="60" y="49" width="232" height="24" rx="3" fill="#fff" stroke="#2a2a2a" strokeWidth="1.5"/>
                  <rect x="64" y="53" width="16" height="16" rx="2" fill="#faf8f5" stroke="#2a2a2a" strokeWidth="1"/>
                  <text x="66" y="64" fontSize="9">⚡</text>
                  <text x="86" y="59" fill="#2a2a2a" fontSize="6.5" fontWeight="700" fontFamily="'Courier New', monospace">TRIGGER NODE</text>
                  <text x="86" y="68" fill="#444" fontSize="7" fontFamily="'Courier New', monospace">Candidate Applied to Job</text>
                  <text x="278" y="64" fill="#aaa" fontSize="8">∧</text>
                  {/* expanded body */}
                  <rect x="60" y="72" width="232" height="18" rx="0" fill="#faf8f5" stroke="#2a2a2a" strokeWidth="1.5"/>
                  <rect x="60" y="72" width="232" height="1" fill="#2a2a2a"/>
                  <text x="68" y="83" fill="#555" fontSize="5.5" fontFamily="'Courier New', monospace">Event: New Application   ATS: Bullhorn   Filter: Status = Passive</text>
                  {/* connector */}
                  <line x1="176" y1="91" x2="176" y2="101" stroke="#aaa" strokeWidth="1.5" strokeDasharray="2,2"/>
                  <polygon points="172,99 180,99 176,103" fill="#aaa"/>
                  {/* node 2 collapsed */}
                  <rect x="60" y="103" width="232" height="16" rx="3" fill="#fff" stroke="#bbb" strokeWidth="1.5"/>
                  <text x="68" y="114" fill="#888" fontSize="6.5" fontFamily="'Courier New', monospace">💬  SMS Node — Re-engagement message</text>
                  <text x="278" y="114" fill="#bbb" fontSize="8">∨</text>
                  {/* connector */}
                  <line x1="176" y1="120" x2="176" y2="128" stroke="#ddd" strokeWidth="1.5" strokeDasharray="2,2"/>
                  <polygon points="172,126 180,126 176,130" fill="#ddd"/>
                  {/* node 3 condition — problem highlight */}
                  <rect x="60" y="130" width="232" height="16" rx="3" fill="#fff" stroke="#bbb" strokeWidth="1.5"/>
                  <text x="68" y="141" fill="#aaa" fontSize="6.5" fontFamily="'Courier New', monospace">🔀  Condition Branch — If YES → A | else → B</text>
                  <text x="278" y="141" fill="#bbb" fontSize="8">∨</text>
                  {/* annotation callout */}
                  <rect x="88" y="148" width="180" height="10" rx="2" fill="rgba(224,108,90,0.12)" stroke="#e06c5a" strokeWidth="1"/>
                  <text x="93" y="156" fill="#c0392b" fontSize="5.5" fontFamily="'Courier New', monospace">⚠ Branch looks identical to any node — no spatial split visible</text>
                </svg>
              </div>
              <div style={{ padding: '16px 18px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#c44', background: 'rgba(196,68,68,0.08)', padding: '3px 9px', borderRadius: '999px', border: '1px solid rgba(196,68,68,0.2)' }}>Killed</span>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111', margin: 0, fontFamily: "'Nunito', sans-serif" }}>Accordion Node Canvas</h4>
                </div>
                <p style={{ fontSize: '12.5px', lineHeight: 1.6, color: '#666', margin: 0 }}>{phase2Explorations[0].reason}</p>
              </div>
            </div>

            {/* Card 2 — Code-First DSL */}
            <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', fontFamily: "'Nunito', sans-serif", boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <div onClick={() => openSvgZoom(svgRefs[1])} style={{ background: '#1e1e1e', borderBottom: '1px solid rgba(0,0,0,0.08)', cursor: 'zoom-in', transition: 'opacity 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.opacity='0.88'} onMouseLeave={e => e.currentTarget.style.opacity='1'}>
                <svg ref={svgRef1} viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
                  <rect width="300" height="160" fill="#f8f6f1"/>
                  <rect width="300" height="22" fill="#2a2a2a"/>
                  <circle cx="12" cy="11" r="4" fill="#e06c5a"/><circle cx="24" cy="11" r="4" fill="#e0b45a"/><circle cx="36" cy="11" r="4" fill="#7ab87a"/>
                  <text x="50" y="15" fill="#faf8f5" fontSize="7.5" fontWeight="700" fontFamily="monospace">Code-First DSL Editor</text>
                  <text x="236" y="15" fill="#888" fontSize="6" fontFamily="monospace" letterSpacing="0.05em">KILLED</text>
                  {/* sidebar */}
                  <rect x="0" y="22" width="52" height="138" fill="#f5f2ed" stroke="#2a2a2a" strokeWidth="1.5"/>
                  <text x="6" y="36" fill="#888" fontSize="6.5" fontFamily="monospace">📝 Editor</text>
                  <text x="6" y="47" fill="#888" fontSize="6.5" fontFamily="monospace">📋 Templates</text>
                  <text x="6" y="58" fill="#888" fontSize="6.5" fontFamily="monospace">📊 Runs</text>
                  <line x1="3" y1="66" x2="49" y2="66" stroke="#ddd" strokeWidth="1"/>
                  <text x="6" y="77" fill="#ccc" fontSize="6" fontFamily="monospace">trigger:</text>
                  <text x="6" y="87" fill="#ccc" fontSize="6" fontFamily="monospace">sms_node:</text>
                  <text x="6" y="97" fill="#ccc" fontSize="6" fontFamily="monospace">delay:</text>
                  {/* code editor */}
                  <rect x="56" y="22" width="244" height="138" fill="#f8f6f1"/>
                  <rect x="56" y="22" width="244" height="14" fill="#1e1e1e"/>
                  <text x="60" y="31" fill="#aaa" fontSize="6.5" fontFamily="monospace">workflow.yaml</text>
                  <text x="110" y="31" fill="#666" fontSize="6.5" fontFamily="monospace">schema.json</text>
                  {/* code lines */}
                  <text x="64" y="46" fill="#ccc" fontSize="6">1</text><text x="74" y="46" fill="#2980b9" fontSize="6" fontFamily="monospace">workflow</text><text x="106" y="46" fill="#333" fontSize="6" fontFamily="monospace">:</text>
                  <text x="64" y="55" fill="#ccc" fontSize="6">2</text><text x="80" y="55" fill="#2980b9" fontSize="6" fontFamily="monospace">name</text><text x="100" y="55" fill="#333" fontSize="6" fontFamily="monospace">: </text><text x="106" y="55" fill="#27ae60" fontSize="6" fontFamily="monospace">"Auto-Submit Passive Candidates"</text>
                  <text x="64" y="64" fill="#ccc" fontSize="6">3</text><text x="80" y="64" fill="#2980b9" fontSize="6" fontFamily="monospace">trigger</text><text x="106" y="64" fill="#333" fontSize="6" fontFamily="monospace">:</text>
                  <text x="64" y="73" fill="#ccc" fontSize="6">4</text><text x="88" y="73" fill="#2980b9" fontSize="6" fontFamily="monospace">type</text><text x="106" y="73" fill="#333" fontSize="6" fontFamily="monospace">: </text><text x="112" y="73" fill="#8e44ad" fontSize="6" fontFamily="monospace">scheduled</text>
                  <text x="64" y="82" fill="#ccc" fontSize="6">5</text><text x="88" y="82" fill="#2980b9" fontSize="6" fontFamily="monospace">cron</text><text x="106" y="82" fill="#333" fontSize="6" fontFamily="monospace">: </text><text x="112" y="82" fill="#27ae60" fontSize="6" fontFamily="monospace">"0 9 * * 1-5"</text>
                  <text x="64" y="91" fill="#ccc" fontSize="6">6</text><text x="80" y="91" fill="#2980b9" fontSize="6" fontFamily="monospace">nodes</text><text x="100" y="91" fill="#333" fontSize="6" fontFamily="monospace">:</text>
                  <text x="64" y="100" fill="#ccc" fontSize="6">7</text><text x="88" y="100" fill="#c0392b" fontSize="6" fontFamily="monospace">-</text><text x="94" y="100" fill="#2980b9" fontSize="6" fontFamily="monospace"> type</text><text x="114" y="100" fill="#333" fontSize="6" fontFamily="monospace">: </text><text x="120" y="100" fill="#8e44ad" fontSize="6" fontFamily="monospace">sms_node</text>
                  <text x="64" y="109" fill="#ccc" fontSize="6">8</text><text x="94" y="109" fill="#2980b9" fontSize="6" fontFamily="monospace">  condition</text><text x="134" y="109" fill="#333" fontSize="6" fontFamily="monospace">: </text><text x="140" y="109" fill="#27ae60" fontSize="6" fontFamily="monospace">"response == 'interested'"</text>
                  <text x="64" y="118" fill="#ccc" fontSize="6">9</text><text x="88" y="118" fill="#2980b9" fontSize="6" fontFamily="monospace">  goto</text><text x="108" y="118" fill="#333" fontSize="6" fontFamily="monospace">: </text><text x="114" y="118" fill="#8e44ad" fontSize="6" fontFamily="monospace">delay_1</text>
                  {/* error bar */}
                  <rect x="56" y="138" width="244" height="22" fill="rgba(224,108,90,0.12)" stroke="#e06c5a" strokeWidth="1"/>
                  <text x="62" y="148" fill="#c0392b" fontSize="6" fontFamily="monospace">✕ Line 8: Boolean syntax not supported — 2 validation errors</text>
                  <text x="62" y="157" fill="#c0392b" fontSize="5.5" fontFamily="monospace">9/10 recruiters could not write a valid trigger without engineering help</text>
                </svg>
              </div>
              <div style={{ padding: '16px 18px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#c44', background: 'rgba(196,68,68,0.08)', padding: '3px 9px', borderRadius: '999px', border: '1px solid rgba(196,68,68,0.2)' }}>Killed</span>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111', margin: 0, fontFamily: "'Nunito', sans-serif" }}>Code-First DSL</h4>
                </div>
                <p style={{ fontSize: '12.5px', lineHeight: 1.6, color: '#666', margin: 0 }}>{phase2Explorations[1].reason}</p>
              </div>
            </div>

            {/* Card 3 — Wizard / Step-by-step */}
            <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', fontFamily: "'Nunito', sans-serif", boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <div onClick={() => openSvgZoom(svgRefs[2])} style={{ background: '#f0ede8', borderBottom: '1px solid rgba(0,0,0,0.08)', cursor: 'zoom-in', transition: 'opacity 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.opacity='0.88'} onMouseLeave={e => e.currentTarget.style.opacity='1'}>
                <svg ref={svgRef2} viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
                  <rect width="300" height="160" fill="#f0ede8"/>
                  <rect width="300" height="22" fill="#2a2a2a"/>
                  <circle cx="12" cy="11" r="4" fill="#e06c5a"/><circle cx="24" cy="11" r="4" fill="#e0b45a"/><circle cx="36" cy="11" r="4" fill="#7ab87a"/>
                  <text x="50" y="15" fill="#faf8f5" fontSize="7.5" fontWeight="700" fontFamily="'Courier New', monospace">Workflow Wizard</text>
                  <text x="236" y="15" fill="#888" fontSize="6" fontFamily="monospace" letterSpacing="0.05em">KILLED</text>
                  {/* sidebar */}
                  <rect x="0" y="22" width="52" height="138" fill="#f5f2ed" stroke="#2a2a2a" strokeWidth="1.5"/>
                  <rect x="4" y="30" width="44" height="11" rx="2" fill="#2a2a2a"/>
                  <text x="6" y="39" fill="#faf8f5" fontSize="6.5" fontFamily="'Courier New', monospace">✨ New</text>
                  <text x="6" y="52" fill="#888" fontSize="6.5" fontFamily="'Courier New', monospace">📋 My Flows</text>
                  <text x="6" y="63" fill="#888" fontSize="6.5" fontFamily="'Courier New', monospace">📊 Analytics</text>
                  {/* page title */}
                  <text x="60" y="34" fill="#2a2a2a" fontSize="7.5" fontWeight="700" fontFamily="'Courier New', monospace">Create Workflow — Step 3 of 6</text>
                  {/* wizard step dots */}
                  <circle cx="70" cy="48" r="7" fill="#27ae60"/><text x="67" y="51" fill="#fff" fontSize="7" fontWeight="700">✓</text>
                  <line x1="77" y1="48" x2="91" y2="48" stroke="#ddd" strokeWidth="1.5" strokeDasharray="2,2"/>
                  <circle cx="98" cy="48" r="7" fill="#27ae60"/><text x="95" y="51" fill="#fff" fontSize="7" fontWeight="700">✓</text>
                  <line x1="105" y1="48" x2="119" y2="48" stroke="#ddd" strokeWidth="1.5" strokeDasharray="2,2"/>
                  <circle cx="126" cy="48" r="7" fill="#2a2a2a"/><text x="123" y="51" fill="#fff" fontSize="7" fontWeight="700">3</text>
                  <line x1="133" y1="48" x2="147" y2="48" stroke="#ddd" strokeWidth="1.5" strokeDasharray="2,2"/>
                  <circle cx="154" cy="48" r="7" fill="#fff" stroke="#ccc" strokeWidth="1.5"/><text x="151" y="51" fill="#ccc" fontSize="7">4</text>
                  <line x1="161" y1="48" x2="175" y2="48" stroke="#ddd" strokeWidth="1.5" strokeDasharray="2,2"/>
                  <circle cx="182" cy="48" r="7" fill="#fff" stroke="#ccc" strokeWidth="1.5"/><text x="179" y="51" fill="#ccc" fontSize="7">5</text>
                  <line x1="189" y1="48" x2="203" y2="48" stroke="#ddd" strokeWidth="1.5" strokeDasharray="2,2"/>
                  <circle cx="210" cy="48" r="7" fill="#fff" stroke="#ccc" strokeWidth="1.5"/><text x="207" y="51" fill="#ccc" fontSize="7">6</text>
                  {/* wizard form card */}
                  <rect x="60" y="60" width="232" height="58" rx="3" fill="#fff" stroke="#2a2a2a" strokeWidth="1.5"/>
                  <text x="68" y="72" fill="#aaa" fontSize="5.5" fontFamily="'Courier New', monospace">Channel</text>
                  <rect x="68" y="74" width="80" height="11" rx="2" fill="#fff" stroke="#888" strokeWidth="1"/>
                  <text x="72" y="82" fill="#555" fontSize="6" fontFamily="monospace">SMS ▾</text>
                  <text x="162" y="72" fill="#aaa" fontSize="5.5" fontFamily="'Courier New', monospace">Template</text>
                  <rect x="162" y="74" width="122" height="11" rx="2" fill="#fff" stroke="#888" strokeWidth="1"/>
                  <text x="166" y="82" fill="#555" fontSize="6" fontFamily="monospace">Passive re-engagement v2 ▾</text>
                  <text x="68" y="96" fill="#aaa" fontSize="5.5" fontFamily="'Courier New', monospace">Message preview</text>
                  <rect x="68" y="98" width="216" height="13" rx="2" fill="#f9f7f4" stroke="#ccc" strokeWidth="1"/>
                  <text x="72" y="107" fill="#888" fontSize="5.5" fontFamily="monospace">Hi {'{{first_name}}'}, we have new roles in {'{{location}}'}…</text>
                  {/* hidden steps warning */}
                  <rect x="60" y="122" width="232" height="17" rx="3" fill="rgba(224,108,90,0.07)" stroke="#e06c5a" strokeWidth="1.5" strokeDasharray="3,2"/>
                  <text x="66" y="133" fill="#c0392b" fontSize="6" fontFamily="'Courier New', monospace">⚠ Steps 4–6 hidden — cannot plan branching until you reach those steps</text>
                  {/* nav buttons */}
                  <rect x="60" y="143" width="64" height="10" rx="2" fill="#fff" stroke="#2a2a2a" strokeWidth="1"/>
                  <text x="66" y="150.5" fill="#2a2a2a" fontSize="6" fontFamily="monospace">← Back</text>
                  <rect x="222" y="143" width="70" height="10" rx="2" fill="#2a2a2a"/>
                  <text x="228" y="150.5" fill="#faf8f5" fontSize="6" fontFamily="monospace">Save &amp; Continue →</text>
                </svg>
              </div>
              <div style={{ padding: '16px 18px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#c44', background: 'rgba(196,68,68,0.08)', padding: '3px 9px', borderRadius: '999px', border: '1px solid rgba(196,68,68,0.2)' }}>Killed</span>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111', margin: 0, fontFamily: "'Nunito', sans-serif" }}>Wizard / Step-by-step</h4>
                </div>
                <p style={{ fontSize: '12.5px', lineHeight: 1.6, color: '#666', margin: 0 }}>{phase2Explorations[2].reason}</p>
              </div>
            </div>

          </div>
        </>
      ),
    },
    {
      kicker: 'SOLUTION',
      title: 'Why the Canvas Won',
      accent: PALETTE[2],
      content: (
        <>
          <p style={T.body}>Three reasons, each tied to a persona and a killed alternative:</p>
          <UL>
            <LI><IH>Whole-flow visibility:</IH> matches the Architect's mental model — beat the wizard and the timeline.</LI>
            <LI><IH>Modular nodes:</IH> reusable across workflows — kills the 40+ duplicate Journeys problem the field observation surfaced.</LI>
            <LI><IH>Drag-and-drop:</IH> keeps the Busy Bee in the building loop — beat the code-first DSL.</LI>
          </UL>
          <h4 style={T.h4}>Design principles we declared up front</h4>
          <p style={{ ...T.body, marginTop: '0' }}>
            <strong style={{ color: '#111' }}>Modularity</strong> · <strong style={{ color: '#111' }}>Visual Clarity</strong> · <strong style={{ color: '#111' }}>Progressive Disclosure</strong> — every node-library decision had to pass all three.
          </p>
          <h4 style={T.h4}>A scalable node architecture</h4>
          <p style={{ ...T.body, marginTop: '0' }}>We designed a drag-and-drop canvas categorised into four node types to handle enterprise complexity:</p>
          <CaseStudyVideo src="https://drive.google.com/file/d/1iV-QC-l-5P68w3bO4WkKdoedK7me-J8k/preview?rm=minimal" />
        </>
      ),
    },
    {
      kicker: 'NODES',
      title: 'Understanding the Nodes and its Structure',
      accent: PALETTE[2],
      content: nodeAccordion[0].content,
    },
    {
      kicker: 'USER FLOWS',
      title: 'How Workflows Are Built',
      accent: PALETTE[3],
      content: (
        <>
          <p style={T.body}>Creating a workflow is intuitive and simple. Let's look at a typical workflow creation-to-activation flow:</p>
          <UserFlowsSelector />
        </>
      ),
    },
    {
      kicker: 'USE CASE',
      title: 'Solving Auto-Submission',
      accent: PALETTE[0],
      content: (
        <>
          <p style={T.body}>We transformed the manual, disjointed steps of Phase 1 into a cohesive, automated loop on the canvas:</p>
          <OL>
            <LI><IH>Trigger Node:</IH> "When a New Job is Posted" — listens to ATS data updates.</LI>
            <LI><IH>Job Match Node:</IH> Automatically scans the database for candidates matching the job criteria, replacing manual list building.</LI>
            <LI><IH>Looping Logic:</IH> The system iterates through the matches.</LI>
            <LI><IH>Screening Node:</IH> Triggers an SMS Chatbot or Email to gauge interest.</LI>
            <LI><IH>Writeback Node:</IH> If the candidate responds positively, this node automatically updates the ATS field to "Submitted" — completing the objective without human hands.</LI>
          </OL>
          <CaseStudyScrollableImage src={asset('/illustrations/case-study/phase2/AutoSubmissionFull.png')} alt="Auto-Submission workflow Phase 2" pan />
        </>
      ),
    },
    {
      kicker: 'TRADE-OFFS',
      title: 'Constraints We Navigated',
      accent: PALETTE[1],
      content: (
        <>
          <p style={T.body}>Shipping at this scale meant making deliberate judgment calls. Three we made consciously:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px', marginTop: '16px' }}>
            {phase2Tradeoffs.map((t, i) => (
              <InfoCard key={t.title} title={t.title} accent={PALETTE[(i + 4) % PALETTE.length]}>{t.body}</InfoCard>
            ))}
          </div>
        </>
      ),
    },
    {
      kicker: 'IMPACT',
      title: 'Results & Reflections',
      accent: PALETTE[4],
      content: (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {[
              { value: '10M/day', label: 'Automations capacity (up from 1M)' },
              { value: '8s', label: 'Trigger latency (down from 40s)' },
              { value: '9s', label: 'Communication latency (down from 72s)' },
              { value: '97%', label: 'QoQ workflow growth Q2→Q3 2025' },
            ].map((m, i) => <MetricCard key={i} value={m.value} label={m.label} colorIndex={i + 1} />)}
          </div>
          <h4 style={T.h4}>Adoption & Usage Velocity</h4>
          <UL>
            <LI><IH>Active workflows:</IH> Reached <strong>1,101</strong> by Q3 2025 — <strong>97% QoQ growth.</strong></LI>
            <LI><IH>Agency penetration:</IH> <strong>199 agencies</strong> had at least one active workflow.</LI>
            <LI><IH>Depth of usage:</IH> Hit target of <strong>10 active journeys per customer</strong>, shifting from one-off blasts to always-on automation.</LI>
            <LI><IH>Migration:</IH> Converted <strong>181</strong> legacy Journeys into <strong>141</strong> Workflows across <strong>29</strong> agencies.</LI>
          </UL>
          <h4 style={T.h4}>Customer Business ROI</h4>
          <UL>
            <LI><IH>Capacity gain (Carvana):</IH> Delivered a <strong>3× increase</strong> in weekly start capacity per recruiter.</LI>
            <LI><IH>Conversion:</IH> Better targeting lifted candidate conversion by <strong>40%.</strong></LI>
            <LI><IH>Satisfaction:</IH> Helped drive a record <strong>96.6% CSAT</strong> in 2025.</LI>
          </UL>
          <h4 style={T.h4}>Customer voices</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '12px' }}>
            {phase2Quotes.map((q, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.85)', borderRadius: '14px', padding: '20px 22px', borderLeft: `3px solid ${PALETTE[(i + 2) % PALETTE.length]}`, fontFamily: "'Nunito', sans-serif" }}>
                <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#333', margin: '0 0 10px', fontStyle: 'italic' }}>"{q.quote}"</p>
                <p style={{ fontSize: '12px', color: '#666', margin: 0, fontWeight: 500 }}>— {q.who}</p>
              </div>
            ))}
          </div>
          <CaseStudyCallout>
            <strong>What I'd do differently:</strong> The Boolean Burden was visible in user testing by week three. I should have pushed the AI Lister into Phase 2's scope instead of letting it slip to Phase 3 — that one call cost roughly two quarters of recruiter pain we could have avoided.
          </CaseStudyCallout>
        </>
      ),
    },
    {
      kicker: 'LIMITATIONS',
      title: 'Limitations of Phase 2',
      accent: PALETTE[0],
      content: limitationsAccordion[0].content,
    },
  ]

  return (
    <>
      <AccentH2 color={PALETTE[2]}>Phase 2: The Unification — Workflow Builder 2.0</AccentH2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {PHASE2_CARDS.map((card, i) => {
          const isOpen = openCards.has(i)
          const isHeaderless = i === 0
          return (
            <div key={i} style={{ background: '#fff', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', fontFamily: "'Nunito', sans-serif" }}>
              {!isHeaderless && (
                <button
                  onClick={() => toggleCard(i)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '16px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: card.accent, flexShrink: 0, transition: 'background 0.3s' }} />
                    <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#999', marginRight: '4px' }}>{card.kicker}</span>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#111', letterSpacing: '-0.01em' }}>{card.title}</span>
                  </div>
                  <span style={{ flexShrink: 0, width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.35s cubic-bezier(0.33,1,0.68,1)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 5L7 10L12 5" stroke={card.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </button>
              )}
              {(isHeaderless || isOpen) && (
                <div style={{ padding: isHeaderless ? '24px 24px 28px' : '0 24px 28px' }}>
                  {card.content}
                </div>
              )}
            </div>
          )
        })}
      </div>
      {zoomSrc && <Lightbox src={zoomSrc} alt="Exploration wireframe" onClose={() => setZoomSrc(null)} />}
    </>
  )
}

function Step4() {
  const limitationsAccordion = [
    {
      title: 'Limitations of Phase 3: The "Co-Pilot" Ceiling',
      content: (
        <>
          <p style={T.body}>While Phase 3 made recruiters faster, it did not remove them from the process. Three critical limitations necessitated Phase 4:</p>
          <LimitationItem title='1. Assistive vs. Autonomous (The "Human Bottleneck")' imgSrc={asset('/illustrations/case-study/phase3/Human Bottleneck.png')} imgAlt="Human Bottleneck" index={0}>
            <p style={T.body}>Ask AI could <em>write</em> the email, and AI Listers could <em>find</em> the candidates, but a human still had to push the button to launch the campaign. Speed to Lead was still limited by how fast a recruiter could log in and approve.</p>
          </LimitationItem>
          <LimitationItem title='2. The "Execution Gap" (No Sensory Capability)' imgSrc={asset('/illustrations/case-study/phase3/Execution gap.png')} imgAlt="Execution Gap" index={1}>
            <p style={T.body}>The AI was text-based and passive. If a candidate replied saying "I'm interested but I cost $100/hr," the Phase 3 system couldn't negotiate or verify that rate via a phone call. It lacked Voice and Judgment capabilities.</p>
          </LimitationItem>
          <LimitationItem title='3. Disconnected Brains' imgSrc={asset('/illustrations/case-study/phase3/DisconnectedBrains.png')} imgAlt="Disconnected Brains" index={2}>
            <p style={T.body}>Jarvis knew the data ("Open rates are low"), and Ask AI knew the content ("Here is a better subject line"), but they were disconnected. The recruiter still had to act as middleware between insight and action.</p>
          </LimitationItem>
          <CaseStudyCallout>
            <strong>The Realization:</strong> We didn't just need a "Co-pilot" that offered suggestions; we needed a <strong>"Virtual Employee"</strong> that could do the work itself. This necessitated <strong>Phase 4: Autonomous Agents (Grace, Voice AI).</strong>
          </CaseStudyCallout>
        </>
      ),
    },
  ]

  return (
    <>
      <Section>
        <AccentH2 color={PALETTE[3]}>Phase 3: The Intelligence Layer — Ask AI, Jarvis & AI Listers</AccentH2>
        <h3 style={T.h3}>The Pivot</h3>
        <p style={T.body}>
          By Phase 2, we had successfully built the "central nervous system" (Workflows) that could handle 10 million automations a day. However, users were hitting a cognitive ceiling — tools were powerful but complex. Users struggled to define <em>who</em> to target and <em>how</em> to interpret success.
        </p>
        <p style={T.body}>
          To bridge this gap, we designed the <IH>Intelligence Layer</IH> — a suite of Generative and Analytical AI tools designed to act as "Co-pilots" for the recruiter.
        </p>
      </Section>

      <Section>
        <h3 style={T.h3}>1. Ask AI (The Creative Assistant)</h3>
        <p style={T.body}><IH>The Problem:</IH> Recruiters often suffered from "writer's block" when building workflows, resulting in generic, low-converting messages.</p>
        <p style={T.body}><IH>The Solution:</IH> We integrated a Generative AI assistant directly into the Workflow Canvas to assist with drafting job descriptions, generating role-specific pre-screening questions, and rewriting SMS content to be more conversational.</p>
        <p style={T.body}><IH>Impact on Auto-Submission:</IH> Ask AI directly improved the Screening Node by automating the generation of "job-specific screening questions." Instead of sending a generic message, the AI analysed the Job Description to generate precise qualification questions — accelerating the qualification process for auto-submitting candidates.</p>
        <h4 style={T.h4}>Defining Interactions First</h4>
        <CaseStudyVideo src="https://drive.google.com/file/d/1RSDoNdp74b0T-6-8ZVET3cZ2s93k5Cs9/preview?rm=minimal" />
        <CaseStudyVideo src="https://drive.google.com/file/d/1NsQaTAubzZUK_zsVsWR0fhioJkkIjoUt/preview?rm=minimal" />
      </Section>

      <Section>
        <h3 style={T.h3}>2. AI Lister Agent (Solving the "Boolean Burden")</h3>
        <p style={T.body}><IH>The Problem:</IH> In Phase 2, creating a precise "Job Match" list required manually constructing complex Boolean strings, alienating non-technical recruiters.</p>
        <p style={T.body}><IH>The Solution:</IH> We designed a <IH>Conversational UI</IH> where users could simply type natural language intents.</p>
        <UL>
          <LI><IH>User Input:</IH> "Find me Java Developers in SF available now who haven't been contacted in 6 months."</LI>
          <LI><IH>AI Action:</IH> The agent translates this intent into the rigid database query logic automatically — reducing list creation from minutes to seconds.</LI>
        </UL>
        <CaseStudyVideo src="https://drive.google.com/file/d/1klwvpTs2Q73TmuaQwftpxG39Z0s5U2Um/preview?rm=minimal" />
      </Section>

      <Section>
        <h3 style={T.h3}>3. Jarvis (The Data Agent)</h3>
        <p style={T.body}><IH>The Problem:</IH> Analytics were static. Users couldn't diagnose <em>why</em> a workflow was failing without exporting data to Excel.</p>
        <p style={T.body}><IH>The Solution:</IH> We designed the interaction model for <IH>Jarvis</IH>, a conversational analytics agent. Instead of navigating complex dashboards, users could ask: <em>"Why is my Auto-Submission workflow failing?"</em> — and get instant diagnostic insights.</p>
        <p style={T.body}><IH>Impact on Auto-Submission:</IH> Recruiters could ask "Show me the conversion rate from Match to Submission" — instantly identifying drop-off at the outreach or screening stage, enabling rapid optimisation.</p>
        <CaseStudyVideo src="https://drive.google.com/file/d/1snDLVyUYkW8idSWXFm9cMTUIB4sg1W1c/preview?rm=minimal" />
      </Section>

      <Section>
        <CaseStudyAccordion items={limitationsAccordion} />
      </Section>
    </>
  )
}

function Step5() {
  return (
    <>
      <Section>
        <AccentH2 color={PALETTE[4]}>Phase 4: The Agentic Shift — AI Recruiter & Voice Agents</AccentH2>
        <h3 style={T.h3}>The Final Evolution</h3>
        <p style={T.body}>
          The goal was to move from <em>automation</em> (doing what you are told) to <em>agency</em> (making decisions). This phase introduced the <IH>Agentic World</IH> — transitioning from linear workflows to a dynamic ecosystem of specialised agents.
        </p>
        <CaseStudyImage src={asset('/illustrations/case-study/phase4/FullyAutonomous flow.png')} alt="Fully Autonomous Flow diagram" />
      </Section>

      <Section>
        <h3 style={T.h3}>Step 1: The Foundation — Multimodal Agent Builder</h3>
        <p style={T.body}><IH>The Problem:</IH> Legacy bots were rigid. If a candidate on SMS said "Can you call me?", the bot would break because it lacked memory or voice capabilities.</p>
        <p style={T.body}><IH>The Solution:</IH> I led the design of the <IH>Agent Builder</IH>, a no-code interface that allows "Architects" to build Multimodal Chat+Voice Agents.</p>
        <UL>
          <LI><IH>Block-Based Architecture:</IH> "Blocks" (e.g., Job Match Block, Scheduling Block) that encapsulate complex logic.</LI>
          <LI><IH>Context Store:</IH> The critical innovation — retaining memory across channels. If a candidate ignores an SMS, the agent can autonomously switch to Voice, knowing exactly where the conversation left off.</LI>
          <LI><IH>Dynamic Flow:</IH> Unlike the linear paths of Phase 2, these agents use an Agentic Orchestration Framework to autonomously decide the next best step.</LI>
        </UL>
        <CaseStudyVideo src="https://drive.google.com/file/d/1Fj-rjo3MOC_bf_RCpqEILvaC5yejlF7g/preview?rm=minimal" />
      </Section>

      <Section>
        <h3 style={T.h3}>Step 2: The Orchestrator — "Grace" (AI Recruiter)</h3>
        <p style={T.body}>With the sub-agents built, we needed a manager. We introduced <IH>Grace (The AI Recruiter)</IH> as the central orchestrator that commands this virtual workforce.</p>
        <CaseStudyImage src={asset('/illustrations/case-study/phase4/HeroImage.png')} alt="Grace AI Recruiter" />
        <p style={T.body}><IH>The Concept:</IH> "One Recruiter with the Power of a Team." Grace doesn't just do the work — she delegates it.</p>

        <h4 style={T.h4}>Discover Agent (The Sourcer)</h4>
        <UL>
          <LI>Uses Deep Match logic to rank candidates based on skills, location, and availability.</LI>
          <LI>Processes candidates in batches and features "Goal-based Exit" logic — stops searching once enough qualified candidates are found.</LI>
          <LI>Supports advanced filters like Zip Code Radius for remote jobs.</LI>
        </UL>
        <CaseStudyImage src={asset('/illustrations/case-study/phase4/discover.png')} alt="Discover Agent" />

        <h4 style={T.h4}>Voice Agent (The Screener)</h4>
        <UL>
          <LI>Handles the phone screen — moves from "calls" to "conversations."</LI>
          <LI>Dynamically analyses the transcript to determine call status (Consented, Hung Up, Voicemail), scheduling up to 3 retries with configurable delays.</LI>
          <LI>Dynamic Question Module (DQM) reads the Job Description to auto-generate role-specific questions.</LI>
        </UL>
        <CaseStudyImage src={asset('/illustrations/case-study/phase4/Evaluation.png')} alt="Voice Agent" />

        <h4 style={T.h4}>Evaluation Agent (The Judge)</h4>
        <UL>
          <LI>Analyses output from the Voice Agent and assigns a Fit Score (1–10).</LI>
          <LI>Supports three modes: Resume only, Voice Transcript only, or holistic Resume + Voice analysis.</LI>
          <LI>If the score meets the threshold (e.g., 8/10), triggers an Object Writeback to automatically create the submission record in the ATS — no human data entry required.</LI>
        </UL>
        <CaseStudyImage src={asset('/illustrations/case-study/phase4/Evaluation Summary.png')} alt="Evaluation Agent" />
      </Section>

      <Section>
        <h3 style={T.h3}>Step 3: Solving "Auto-Submission" in the Agentic World</h3>
        <p style={T.body}>We transformed Auto-Submission from a "workflow" into a fully autonomous loop:</p>
        <OL>
          <LI><IH>Trigger (The Watcher):</IH> Grace detects a "New Job Order" in the ATS.</LI>
          <LI><IH>Sourcing (The Hand-off):</IH> Grace activates the Discover Agent to fetch the top 50 matches.</LI>
          <LI><IH>Engagement (Multimodal):</IH> Grace deploys the Multimodal Agent. If a candidate on SMS says "Call me," the agent autonomously switches to Voice, initiates the call, and conducts the pre-screen.</LI>
          <LI><IH>Decision (The Closer):</IH> The Evaluation Agent reads the transcript. IF Score &gt; 8/10 AND Interest = High → THEN trigger "Create ATS Record." The candidate is submitted to the Hiring Manager without a human recruiter ever logging in.</LI>
        </OL>
        <CaseStudyVideo src="https://drive.google.com/file/d/18WJF2KzUEE3VJlJRuMJpZ0yYM5sPwbUb/preview?rm=minimal" />
      </Section>

      <Section>
        <h3 style={T.h3}>Phase 4 Outcomes & Impact</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {[
            { value: '11.1 hrs', label: 'Time to fill a hard role (BGSF)' },
            { value: '20/100', label: 'Qualified evaluations per candidates' },
            { value: '60%', label: 'Cold calls lasting over 8 minutes' },
            { value: '$5M', label: 'Booked ARR tracked' },
          ].map((m, i) => <MetricCard key={i} value={m.value} label={m.label} colorIndex={i + 4} />)}
        </div>
        <UL>
          <LI><IH>Unprecedented Speed:</IH> For client BGSF, the AI Recruiter placed a hard-to-fill role in just <strong>11.1 hours</strong>. The system achieved a <strong>2-minute engagement time</strong> after application and completed screening within <strong>7 minutes</strong>.</LI>
          <LI><IH>Quality Benchmark:</IH> The AI Agent is finding <strong>20 qualified evaluations per 100 candidates</strong> — outperforming the average human recruiter.</LI>
          <LI><IH>Productivity:</IH> Saved <strong>50,000+ hours</strong> of manager time for HCA (Healthcare).</LI>
          <LI><IH>Scheduling Scale:</IH> <strong>404,507 meetings</strong> scheduled YTD — a <strong>175% increase</strong> year-over-year.</LI>
        </UL>
      </Section>
    </>
  )
}

function Step6() {
  return (
    <>
      <Section>
        <AccentH2 color={PALETTE[5]}>Outcomes & Impact</AccentH2>
        <p style={T.body}>
          By evolving <IH>Auto-Submission</IH> from a manual task to an <IH>agentic workflow</IH>, we achieved measurable results across <IH>speed</IH>, <IH>scale</IH>, and <IH>candidate experience</IH>.
        </p>
        <CaseStudyImage src={asset('/illustrations/case-study/phase4/Summary.png')} alt="Summary of outcomes and impact" />
      </Section>

      <Section>
        <h3 style={T.h3}>2025–2026 Strategic Wins</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {[
            { title: 'Unprecedented Speed to Lead', desc: 'For client BGSF, the AI Recruiter placed a hard-to-fill role in just 11.1 hours from application to hire.' },
            { title: 'Operational Transformation', desc: 'The ecosystem saved 50,000+ hours of manager time for HCA, equivalent to dozens of full-time employees.' },
            { title: 'Brand Reputation', desc: 'Helped TalentBurst flip their Glassdoor rating from 2.0 to 4.2, turning candidate sentiment into a competitive advantage.' },
            { title: 'Referral Velocity', desc: 'Drove 107 referrals in just 45 days for Dietitians On Demand, proving the system can generate its own pipeline.' },
            { title: 'Capacity Multiplier', desc: 'Carvana achieved a 3× increase in weekly start capacity per recruiter by utilising the full automation suite.' },
            { title: 'Enterprise Adoption', desc: 'The AI Recruiter product line has tracked toward $4.6M in Post-Pilot ARR.' },
          ].map((c, i) => <InfoCard key={i} title={c.title} accent={PALETTE[i % PALETTE.length]}>{c.desc}</InfoCard>)}
        </div>
      </Section>

      <Section>
        <h3 style={T.h3}>General Business ROI</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
          {[
            { value: '30–81%', label: 'Reduction in Time-to-Hire' },
            { value: '30%', label: 'Increase in recruiter productivity' },
            { value: '1M+', label: 'Candidates engaged per year' },
            { value: '96.6%', label: 'CSAT score in 2025' },
          ].map((m, i) => <MetricCard key={i} value={m.value} label={m.label} colorIndex={i} />)}
        </div>
      </Section>

      <Section>
        <h3 style={T.h3}>AI Agent Performance</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
          {[
            { title: 'Rapid Evaluation', desc: 'Reduced "Time to Evaluate" a candidate to just 33 minutes from application to scored evaluation.' },
            { title: 'Quality Benchmark', desc: '20 qualified evaluations per 100 candidates — outperforming the average human recruiter.' },
            { title: 'Funnel Optimisation', desc: 'In one live example: 12,821 matches → 3,699 contacted → 127 screened → 15 influenced placements.' },
            { title: 'Scheduling Scale', desc: '404,507 meetings scheduled YTD — a 175% increase year-over-year.' },
          ].map((c, i) => <InfoCard key={i} title={c.title} accent={PALETTE[(i + 2) % PALETTE.length]}>{c.desc}</InfoCard>)}
        </div>
      </Section>

      <Section>
        <AccentH2 color={PALETTE[0]}>Conclusion: From Tools to Teammates</AccentH2>
        <p style={T.body}>
          The evolution of the Sense platform from <IH>Journeys 1.0</IH> to the <IH>AI Recruiter</IH> represents a fundamental paradigm shift in product design: moving from building tools that users operate to designing digital teammates that operate themselves.
        </p>

        <h3 style={T.h3}>1. Solving the "Black Hole" of Communication</h3>
        <p style={T.body}>
          By transitioning from manual "blasts" (Phase 1) to "Action-Based Targeting" (Phase 2) and finally to "Autonomous Agents" (Phase 4), we ensured that every candidate receives a personalised, instant response — whether via text, email, or a voice call.
        </p>

        <h3 style={T.h3}>2. The "Glass Box" Design Philosophy</h3>
        <p style={T.body}>
          A critical design challenge was ensuring that as the system became more intelligent, it didn't become a "black box" that recruiters feared. By visualising the AI's logic (Voice flows, Evaluation scores, and Branching paths) directly on the Workflow Canvas, I maintained user trust. Recruiters aren't replaced; they are elevated to <IH>supervisors</IH> who manage the AI's strategy rather than executing its tasks.
        </p>

        <h3 style={T.h3}>3. Future Vision: True Agentic AIR</h3>
        <p style={T.body}>
          This case study documents the foundation for Sense's vision of "True Agentic AIR" (Humanized Grace) by 2026. We have successfully moved from <IH>automation (efficiency)</IH> to <IH>orchestration (intelligence)</IH>. The systems we designed — the interplay between Workflow infrastructure and specialised sub-agents like Voice and Jarvis — have paved the way for a future where AI handles the entire operational lifecycle, allowing human recruiters to focus entirely on building relationships.
        </p>
        <CaseStudyImage src={asset('/illustrations/case-study/phase4/Future.png')} alt="Future vision of agentic AI" />
      </Section>
    </>
  )
}

const STEP_COMPONENTS = [Step1, Step2, Step3, Step4, Step5, Step6]

/* ─────────────────────────────────────────────────────────────
   Main CaseStudyPage
───────────────────────────────────────────────────────────── */
export default function CaseStudyPage({ onClose }) {
  const [step, setStep] = useState(1)
  const contentRef = useRef(null)

  const goToStep = (s) => {
    setStep(s)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const StepContent = STEP_COMPONENTS[step - 1]

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgb(234,232,225)',
        overflowY: 'auto',
        fontFamily: "'Nunito', sans-serif",
      }}
      ref={contentRef}
    >
      {/* Top bar — frosted glass with step name */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 24px',
          background: 'rgba(234,232,225,0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <button
          onClick={onClose}
          className="cs-back-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '999px',
            padding: '8px 18px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#333',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            fontFamily: "'Nunito', sans-serif",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#111'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#111' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#333'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to Portfolio
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Nunito', sans-serif" }}>
            Case Study
          </span>
          <span style={{ width: '1px', height: '12px', background: '#ddd' }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#555', fontFamily: "'Nunito', sans-serif" }}>
            {STEPS[step - 1].label}
          </span>
        </div>
      </div>

      {/* Stepper (below top bar) */}
      <div style={{ paddingTop: '56px' }}>
        <Stepper current={step} onChange={goToStep} />
      </div>

      {/* Content with fade-in animation */}
      <div
        key={step}
        className="cs-step-content"
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          padding: '56px 32px 80px',
          animation: 'caseStudyFadeIn 0.5s cubic-bezier(0.33, 1, 0.68, 1) forwards',
        }}
      >
        <StepContent />
        <StepNav current={step} total={STEPS.length} onChange={goToStep} />
      </div>

      {/* Responsive + animation styles */}
      <style>{`
        @media (max-width: 640px) {
          .limitation-item { grid-template-columns: 1fr !important; }
          .hero-usecase-grid { grid-template-columns: 1fr !important; }
        }
        .cs-nav-btn-next:hover .cs-nav-arrow {
          transform: translateX(3px) !important;
        }
        .cs-media-frame:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </div>
  )
}
