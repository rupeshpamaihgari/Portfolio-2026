import { asset } from '../../../../utils/asset'
import { PALETTE } from '../SlideLayouts'
import { CaseStudyImage, CaseStudyVideo } from '../../CaseStudyMedia'

/* ─────────────────────────────────────────────────────────────
   About Rupesh — self-introduction deck.

   Reuses the same PresentationDeck shell and slide layouts as the
   case-study decks. Numbers and copy are drawn from the live site
   sections (ServicesSection, AchievementsSection, ContactSection,
   CompanySection) and the evolution case study. A few slides use
   the `render` escape hatch to reproduce real site components
   (achievement cards, the contact card) rather than the generic
   layout primitives.

   Image placeholders live under /illustrations/about/ — the deck
   renders them as broken-icon frames until the PNGs are dropped in;
   no code change is needed when they arrive.
───────────────────────────────────────────────────────────── */

const img = (p) => asset(`/illustrations/about/${p}`)
const FONT_H = "'Fredoka', sans-serif"
const FONT_B = "'Nunito', sans-serif"

/* ── Shared data, ported from the live site ──────────────────── */

const ACHIEVEMENTS = [
  { year: '2019', location: 'Boston, MA', title: 'MIT "Reality Virtually" Hackathon', desc: 'AR/VR solution helping people drive better and automating road safety tasks.', link: 'https://devpost.com/software/accudrive', color: PALETTE[0] },
  { year: '2022', location: null, title: 'Bayer Integrated Digital Label Hackathon', desc: 'Accessible digital solution giving farmers detailed, product-specific information.', link: 'https://www.hackerearth.com/challenges/hackathon/bayer-hackathon-2/', color: PALETTE[1] },
  { year: '2016', location: null, title: "HackerEarth's First Game Dev Hackathon", desc: 'Won this highly competitive event early in my career, validating my creative ability globally.', link: 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/IH__Game%20Devac6bcb1.jpg', color: PALETTE[2] },
  { year: '2× Winner', location: null, title: 'Sense Internal Star Award', desc: 'Awarded twice for best collaboration and contribution to team success.', link: null, color: PALETTE[3] },
]

const EXPERIENCES = [
  { yearRange: '2021–Present', title: 'Staff Product Designer @ SenseHQ', icon: '🤖', desc: 'Led end-to-end design across 10+ products, including Automations and AI recruiter agents driving 80% of revenue.', color: PALETTE[3] },
  { yearRange: '2019–2021', title: 'Sr Product Designer @ Betterplace', icon: '🤝', desc: 'Founding designer on background verification and attendance-tracking apps for blue-collar workforces.', color: PALETTE[2] },
  { yearRange: '2015–2019', title: 'UI/UX Designer @ Unisys', icon: '🌍', desc: 'First UX role — enterprise products for global clients across Public Sector, Travel and Transportation.', color: PALETTE[1] },
  { yearRange: '2013', title: 'Games & AR/VR Developer', icon: '🎮', desc: 'Led a 4-person team building games that shaped my empathetic, user-centered design foundation.', color: PALETTE[0] },
]

const PRINCIPLES = [
  { title: 'Embrace Challenges', icon: '💪', color: PALETTE[0], desc: 'Every obstacle is a challenge to be conquered, never a reason to lose confidence.' },
  { title: 'Never Stop Learning', icon: '📚', color: PALETTE[1], desc: 'Growth is a daily habit — an hour every day spent learning something new.' },
  { title: 'Creative Excellence', icon: '✨', color: PALETTE[2], desc: 'I strive to stand out by finding creative solutions to complex problems.' },
  { title: 'Be Transparent', icon: '🔍', color: PALETTE[3], desc: 'Whether personally or professionally, clarity creates trust.' },
]

/* ── Custom renders — reused from live site components ───────── */

/* KPI stat cards (MetricWall's visual recipe) + condensed experience
   cards beneath, on one slide — mirrors the site's top stats plus
   the four ExperienceSection eras, each cut to a 2-line description. */
export function NumbersAndExperience() {
  const stats = [
    { value: '11+', label: 'Years of experience' },
    { value: '15+', label: '0→1 SaaS products shipped' },
    { value: '7', label: 'Years at startups' },
    { value: '4', label: 'Years in enterprise' },
  ]
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{ background: '#fff', borderRadius: '16px', padding: '20px 18px', textAlign: 'center', position: 'relative', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: PALETTE[i % PALETTE.length] }} />
            <div style={{ fontFamily: FONT_H, fontSize: 'clamp(20px, 3.4vw, 32px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#111', lineHeight: 1.05, marginBottom: '6px' }}>{s.value}</div>
            <div style={{ fontFamily: FONT_B, fontSize: '12px', lineHeight: 1.45, color: '#777' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: PALETTE[4] }} />
        <span style={{ fontFamily: FONT_B, fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999' }}>Experience</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
        {EXPERIENCES.map((e) => (
          <div key={e.title} style={{ background: '#fff', borderRadius: '14px', padding: '14px 16px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 10px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '20px', lineHeight: 1 }}>{e.icon}</span>
            <div style={{ fontFamily: FONT_B, fontSize: '12.5px', fontWeight: 700, color: '#111', lineHeight: 1.3 }}>{e.title}</div>
            <div style={{ fontFamily: FONT_B, fontSize: '10.5px', fontWeight: 600, color: '#aaa' }}>{e.yearRange}</div>
            <p style={{ fontFamily: FONT_B, fontSize: '11px', lineHeight: 1.45, color: '#777', margin: 0 }}>{e.desc}</p>
            <div style={{ height: '2px', borderRadius: '2px', background: e.color, width: '18px' }} />
          </div>
        ))}
      </div>
    </>
  )
}

/* Achievement cards — same visual recipe as the site's AchievementsSection
   cards, condensed to a 2-line description, its own slide. */
export function Achievements() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
      {ACHIEVEMENTS.map((a) => (
        <div key={a.title} style={{ background: '#fff', borderRadius: '16px', padding: '18px 20px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <img src={asset('/award-symbol.png')} alt="" style={{ width: '34px', height: '34px', objectFit: 'contain' }} />
          <div style={{ fontFamily: FONT_B, fontSize: '14px', fontWeight: 700, color: '#111', lineHeight: 1.3 }}>{a.title}</div>
          <div style={{ fontFamily: FONT_B, fontSize: '11px', fontWeight: 600, color: '#aaa' }}>{a.year}{a.location ? ` · ${a.location}` : ''}</div>
          <p style={{ fontFamily: FONT_B, fontSize: '12px', lineHeight: 1.5, color: '#777', margin: 0 }}>{a.desc}</p>
          <div style={{ height: '2px', borderRadius: '2px', background: a.color, width: '20px' }} />
        </div>
      ))}
    </div>
  )
}

/* Pillar ownership hierarchy — a static blob-styled org chart in the same
   visual language as the site's AI Agents BlobNetwork (radial-gradient
   "blob" nodes), recreating the Sense Automation Platform product tree.
   Green blobs are the product areas owned; black blobs are the rest of
   the platform. Green nodes get a soft glow to read as "mine" at a glance. */
const HIER_W = 1200
const HIER_H = 540

const HIER_ROOT = { x: 600, y: 46, r: 46, label: 'Sense Automation Platform' }
const HIER_L1 = [
  { id: 'discover', x: 110, y: 210, r: 38, label: 'Discover', owned: true },
  { id: 'engage', x: 290, y: 210, r: 38, label: 'Engage', owned: true },
  { id: 'site', x: 470, y: 210, r: 34, label: 'Site Builder', owned: false },
  { id: 'referrals', x: 650, y: 210, r: 34, label: 'Referrals', owned: false },
  { id: 'crm', x: 855, y: 210, r: 34, label: 'CRM', owned: false },
  { id: 'analytics', x: 1040, y: 210, r: 36, label: 'Analytics', owned: true },
]
const HIER_L2 = [
  { parent: 'discover', x: 40, y: 400, r: 30, label: 'Candidate Matching', owned: true },
  { parent: 'discover', x: 200, y: 400, r: 30, label: 'Candidate Evaluation', owned: true },
  { parent: 'engage', x: 340, y: 400, r: 28, label: 'Workflows', owned: true },
  { parent: 'engage', x: 460, y: 400, r: 28, label: 'AI Recruiter', owned: true },
  { parent: 'engage', x: 580, y: 400, r: 28, label: 'Messaging', owned: true },
  { parent: 'engage', x: 700, y: 400, r: 28, label: 'Scheduler', owned: true },
  { parent: 'crm', x: 800, y: 400, r: 28, label: 'CRM Mobile', owned: false },
  { parent: 'crm', x: 930, y: 400, r: 28, label: 'CRM Web', owned: false },
]

function hierElbow(x1, y1, x2, y2) {
  const my = (y1 + y2) / 2
  return `M ${x1} ${y1} V ${my} H ${x2} V ${y2}`
}

function HierBlob({ x, y, r, label, owned, isRoot }) {
  const greenFill = 'radial-gradient(circle at 38% 30%, #d4fce8 0%, #B8F4D4 55%, #7adcaa 100%)'
  const blackFill = 'radial-gradient(circle at 38% 30%, #666 0%, #1c1c1c 45%, #000 100%)'
  const glow = owned
    ? '0 0 0 1.5px rgba(122,220,170,0.7), 0 0 44px 12px rgba(184,244,212,0.55), 0 8px 22px rgba(122,220,170,0.35)'
    : 'inset 0 2px 8px rgba(255,255,255,0.10), 0 10px 26px rgba(0,0,0,0.35)'
  return (
    <div
      style={{
        position: 'absolute',
        left: `${(x / HIER_W) * 100}%`,
        top: `${(y / HIER_H) * 100}%`,
        transform: 'translate(-50%, -50%)',
        width: `${r * 2}px`,
        height: `${r * 2}px`,
        borderRadius: '50%',
        background: owned ? greenFill : blackFill,
        boxShadow: glow,
        border: owned ? '1px solid rgba(122,220,170,0.5)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: isRoot ? '4px' : '3px',
      }}
    >
      <span
        style={{
          fontFamily: FONT_B,
          fontWeight: isRoot ? 700 : 650,
          fontSize: isRoot ? '10.5px' : r >= 34 ? '9.5px' : '8.5px',
          lineHeight: 1.15,
          color: owned ? '#0d3b26' : '#fff',
        }}
      >
        {label}
      </span>
    </div>
  )
}

export function PillarHierarchy() {
  return (
    <div>
      <div style={{ position: 'relative', width: '100%', paddingBottom: `${(HIER_H / HIER_W) * 100}%` }}>
        <svg
          viewBox={`0 0 ${HIER_W} ${HIER_H}`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          {HIER_L1.map((n) => (
            <path
              key={n.id}
              d={hierElbow(HIER_ROOT.x, HIER_ROOT.y + HIER_ROOT.r, n.x, n.y - n.r)}
              fill="none"
              stroke={n.owned ? 'rgba(122,220,170,0.55)' : 'rgba(0,0,0,0.18)'}
              strokeWidth="1.5"
            />
          ))}
          {HIER_L2.map((n, i) => {
            const parent = HIER_L1.find((p) => p.id === n.parent)
            return (
              <path
                key={i}
                d={hierElbow(parent.x, parent.y + parent.r, n.x, n.y - n.r)}
                fill="none"
                stroke={n.owned ? 'rgba(122,220,170,0.55)' : 'rgba(0,0,0,0.18)'}
                strokeWidth="1.5"
              />
            )
          })}
        </svg>
        <HierBlob {...HIER_ROOT} owned={false} isRoot />
        {HIER_L1.map((n) => <HierBlob key={n.id} {...n} />)}
        {HIER_L2.map((n, i) => <HierBlob key={i} {...n} />)}
      </div>
      <div style={{ display: 'flex', gap: '20px', marginTop: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: 'radial-gradient(circle at 38% 30%, #d4fce8 0%, #B8F4D4 55%, #7adcaa 100%)', boxShadow: '0 0 8px 2px rgba(184,244,212,0.7)' }} />
          <span style={{ fontFamily: FONT_B, fontSize: '11.5px', color: '#555' }}>Product areas I own</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: 'radial-gradient(circle at 38% 30%, #666 0%, #1c1c1c 45%, #000 100%)' }} />
          <span style={{ fontFamily: FONT_B, fontSize: '11.5px', color: '#555' }}>Rest of the platform</span>
        </div>
      </div>
    </div>
  )
}

/* Ownership map — reuses the site's Automations WorkflowIllustration card
   recipe (white card, colored pill badge, title, sub, accent underline) as
   a vertical org chart: AI Recruiter → Workflows → the six pods and their
   owners. My own pod gets a colored glow ring so it reads as "mine". */
function MapArrow() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '24px', alignItems: 'center' }}>
      <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
        <line x1="8" y1="0" x2="8" y2="16" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" />
        <polygon points="8,24 3,15 13,15" fill="rgba(0,0,0,0.18)" />
      </svg>
    </div>
  )
}

function MapCard({ badge, title, sub, color, mine, compact }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: compact ? '16px' : '20px',
        padding: compact ? '13px 15px' : '16px 20px',
        border: `1.5px solid ${color}55`,
        boxShadow: mine ? `0 0 0 2px ${color}, 0 0 28px 6px ${color}66, 0 8px 20px ${color}44` : `0 4px 16px ${color}30`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: compact ? '8px' : '10px' }}>
        <span style={{ background: `${color}30`, color: '#333', borderRadius: '999px', padding: '3px 10px', fontSize: compact ? '9.5px' : '11px', fontWeight: 700, whiteSpace: 'nowrap' }}>
          {badge}
        </span>
      </div>
      <div style={{ fontFamily: FONT_B, fontSize: compact ? '12.5px' : '14px', fontWeight: 650, color: '#111', marginBottom: '4px', lineHeight: 1.3 }}>{title}</div>
      <div style={{ fontFamily: FONT_B, fontSize: compact ? '10.5px' : '11.5px', color: '#888', lineHeight: 1.45 }}>{sub}</div>
      <div style={{ height: '2px', width: '28px', borderRadius: '2px', background: color, marginTop: '10px' }} />
    </div>
  )
}

function OwnershipMap() {
  const pods = [
    { title: 'Candidate Matching & Evaluation', owner: 'Rupesh', mine: true, color: PALETTE[2] },
    { title: 'Messaging', owner: 'Sudeshna', mine: false, color: PALETTE[1] },
    { title: 'Scheduling', owner: 'Soundar', mine: false, color: PALETTE[4] },
    { title: 'List Builders', owner: 'Nandini', mine: false, color: PALETTE[6] },
    { title: 'Site Builder & Referrals', owner: 'Haresh', mine: false, color: PALETTE[5] },
    { title: 'CRM & Agent Builder', owner: 'Chirag', mine: false, color: PALETTE[7] },
  ]
  return (
    <div>
      <div style={{ maxWidth: '420px', margin: '0 auto' }}>
        <MapCard badge="🤖 Orchestrator" title="AI Recruiter" sub="Rupesh — end-to-end design ownership" color={PALETTE[3]} mine />
        <MapArrow />
        <MapCard badge="⚡ Core Product" title="Workflows" sub="Rupesh — primary design owner" color={PALETTE[1]} mine />
      </div>
      <MapArrow />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
        {pods.map((p) => (
          <MapCard
            key={p.title}
            compact
            badge={p.mine ? '👤 Rupesh' : `👤 ${p.owner}`}
            title={p.title}
            sub={p.mine ? 'My pod' : `Owned by ${p.owner}`}
            color={p.color}
            mine={p.mine}
          />
        ))}
      </div>
    </div>
  )
}

/* Four-phase strategy — step cards (ProcessFlow's visual recipe) with a
   real screenshot/video from each phase beneath, pulled from the case
   study's own assets so the plan isn't just described, it's shown. */
const STRATEGY_PHASES = [
  { n: 1, title: 'Phase 1 · Siloed', body: 'Eight point solutions, each solving one problem in isolation.', kind: 'video', src: '/videos/ai/reusable-lists.mov', alt: 'Reusable Lists — one of eight siloed point solutions' },
  { n: 2, title: 'Phase 2 · Unification', body: 'One workflow builder — modular nodes, real branching, a single canvas.', kind: 'video', src: '/videos/ai/sense-workflows-video.mp4', alt: 'The unified workflow builder canvas' },
  { n: 3, title: 'Phase 3 · Intelligence', body: 'An assistive layer — natural-language lists, conversational analytics, in-context help.', kind: 'video', src: '/videos/ai/ask-ai.mov', alt: 'Ask AI, the in-context intelligence layer' },
  { n: 4, title: 'Phase 4 · Agentic', body: 'Autonomous agents that source, screen, evaluate and submit — the system acts, the recruiter supervises.', kind: 'image', src: '/illustrations/case-study/phase4/HeroImage.png', alt: 'Grace, the autonomous AI Recruiter' },
]

function StrategyPhases({ accent }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
      {STRATEGY_PHASES.map((p) => (
        <div key={p.n} style={{ background: '#fff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 18px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '8px' }}>
              <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: `${accent}44`, border: `1.5px solid ${accent}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_B, fontSize: '10px', fontWeight: 700, color: '#333', flexShrink: 0 }}>
                {p.n}
              </span>
              <span style={{ fontFamily: FONT_B, fontSize: '13px', fontWeight: 700, color: '#111' }}>{p.title}</span>
            </div>
            <p style={{ fontFamily: FONT_B, fontSize: '12px', lineHeight: 1.6, color: '#666', margin: 0 }}>{p.body}</p>
          </div>
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            {p.kind === 'video' ? (
              <CaseStudyVideo src={asset(p.src)} style={{ margin: 0, borderRadius: 0 }} />
            ) : (
              <CaseStudyImage src={asset(p.src)} alt={p.alt} style={{ margin: 0, borderRadius: 0, border: 'none' }} />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

/* Closing card — reproduces ContactSection's dark card (gradient
   orbs, contact block, LinkedIn CTA, the pulsing illustration, the
   "Code I Live By" principles) without the "Available for Hire"
   badge and without a location line. */
function ClosingCard() {
  return (
    <div style={{ background: '#111111', borderRadius: '28px', padding: 'clamp(28px, 4vw, 48px)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-40px', left: '30%', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="pd-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div>
          <h2 style={{ fontFamily: FONT_H, fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 750, letterSpacing: '-0.04em', lineHeight: 1.05, color: '#fff', margin: '0 0 10px' }}>
            Let&apos;s build<br />something together.
          </h2>
          <p style={{ fontFamily: FONT_B, fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: '0 0 24px' }}>Automations &amp; AI Agents Expert</p>

          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '20px 22px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '16px', lineHeight: 1 }}>📧</span>
              <span style={{ fontFamily: FONT_B, fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>rupesh.chaitanya@gmail.com</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '16px', lineHeight: 1, color: 'rgba(255,255,255,0.4)' }}>📞</span>
              <span style={{ fontFamily: FONT_B, fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>+91 9945186854</span>
            </div>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />
            <a
              href="https://www.linkedin.com/in/rupesh046/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(10,102,194,0.2)', border: '1px solid rgba(10,102,194,0.4)', borderRadius: '12px', padding: '10px 16px', textDecoration: 'none', width: 'fit-content' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span style={{ fontFamily: FONT_B, fontSize: '13px', fontWeight: 500, color: '#70b5f9' }}>Connect on LinkedIn</span>
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={asset('/ContactSection.png')}
            alt="Contact illustration"
            style={{ width: '100%', maxWidth: '300px', objectFit: 'contain', animation: 'scalePulse 11.82s ease-in-out infinite' }}
          />
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, marginTop: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <span style={{ fontFamily: FONT_B, fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>Code I Live By</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }} className="pd-principles-grid">
          {PRINCIPLES.map((p) => (
            <div key={p.title} style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255,255,255,0.09)', borderTop: `2px solid ${p.color}88`, borderRadius: '14px', padding: '16px 16px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '9px', background: `${p.color}30`, border: `1px solid ${p.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', lineHeight: 1 }}>{p.icon}</div>
              <div>
                <div style={{ fontFamily: FONT_B, fontSize: '12px', fontWeight: 650, color: 'rgba(255,255,255,0.85)', marginBottom: '4px' }}>{p.title}</div>
                <p style={{ fontFamily: FONT_B, fontSize: '10.5px', lineHeight: 1.55, color: 'rgba(255,255,255,0.4)', margin: 0 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Part 1 — Introduction ───────────────────────────────────── */

const intro = {
  id: 'about-intro',
  label: 'Introduction',
  accent: PALETTE[0],
  slides: [
    {
      id: 'about-cover',
      layout: 'title',
      navLabel: 'Rupesh Pamaihgari',
      title: 'Rupesh Pamaihgari',
      content: {
        eyebrow: 'About',
        heading: 'Rupesh Pamaihgari',
        subtitle: 'Staff Product Designer @ SenseHQ — specialised in Automation products and AI Agents.',
        meta: [
          { label: 'Experience', value: '11+ years' },
          { label: 'Company', value: 'SenseHQ' },
        ],
      },
    },
    {
      id: 'about-numbers',
      kicker: 'By the Numbers',
      navLabel: 'Experience by the numbers',
      title: 'Eleven years across four roles.',
      layout: 'custom',
      render: () => <NumbersAndExperience />,
    },
    {
      id: 'about-achievements',
      kicker: 'International Awards',
      navLabel: 'Achievements',
      title: 'Four international wins.',
      layout: 'custom',
      render: () => <Achievements />,
    },
  ],
}

/* ── Part 2 — Evolution to Staff ──────────────────────────────── */

const evolution = {
  id: 'about-evolution',
  label: 'Evolution to Staff',
  accent: PALETTE[1],
  slides: [
    {
      id: 'evo-divider',
      layout: 'section-divider',
      navLabel: 'Evolution to a Staff Product Designer',
      title: 'Evolution to a Staff Product Designer',
      content: {
        number: '01',
        label: 'Evolution to a Staff Product Designer',
        thesis: 'Joined as Lead Product Designer. Grew into Staff, owning an entire pillar.',
      },
    },
    {
      id: 'evo-arc',
      kicker: 'The Arc',
      navLabel: 'Founding designer → Staff',
      title: 'The first design hire, five years on.',
      layout: 'bullets-impact',
      content: {
        cards: [
          { title: 'Founding designer', body: 'The first design hire — set the bar for craft, process and how design shows up in the org.' },
          { title: 'Initial ownership', body: 'End-to-end on the core products: research, definition, design, prototyping and handoff.' },
          { title: 'Today', body: 'A roughly 50/50 split between managing the design team and staying hands-on with the hardest problems.' },
        ],
        impact: {
          label: 'The Role',
          statement: 'Lead → Staff Product Designer, 2021 → present.',
          footnote: 'Growth measured not by title, but by the scope of what I now own and the team I have built around it.',
        },
      },
    },
    {
      id: 'evo-pillar',
      kicker: 'Ownership',
      navLabel: 'Leading the Engagement pillar',
      title: 'Leading the entire Engagement pillar.',
      layout: 'custom',
      render: ({ accent }) => (
        <>
          <div
            className="pd-blocks"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '22px 34px', alignItems: 'start', minWidth: 0, marginBottom: '26px' }}
          >
            {[
              { title: 'What I own', body: 'The Engagement pillar at Sense — the products that drive how agencies source, reach and convert talent.' },
              { title: 'The pods', body: 'Multiple product pods, each with its own designer, all rolling up to a shared design vision and system.' },
            ].map((b) => (
              <div key={b.title} style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: accent, flexShrink: 0 }} />
                  <span style={{ fontFamily: FONT_B, fontSize: '13px', fontWeight: 700, color: '#111' }}>{b.title}</span>
                </div>
                <p style={{ fontFamily: FONT_B, fontSize: '14px', lineHeight: 1.75, color: '#555', margin: 0 }}>{b.body}</p>
              </div>
            ))}
          </div>
          <PillarHierarchy />
        </>
      ),
    },
    {
      id: 'evo-mapping',
      kicker: 'The Team Map',
      navLabel: 'Designers → products',
      title: 'Designers mapped to products.',
      layout: 'custom',
      render: () => (
        <>
          <p style={{ fontFamily: FONT_B, fontSize: '14px', lineHeight: 1.75, color: '#555', margin: '0 0 22px', maxWidth: '640px' }}>
            Every product has an owner, and the overlaps are deliberate — shared surfaces get shared review so the system stays coherent.
          </p>
          <OwnershipMap />
        </>
      ),
    },
    {
      id: 'evo-collab',
      kicker: 'Collaboration',
      navLabel: 'Working across stakeholders',
      title: 'One designer, many stakeholders.',
      layout: 'custom',
      render: () => (
        <>
          <p style={{ fontFamily: FONT_B, fontSize: '14px', lineHeight: 1.75, color: '#555', margin: '0 0 4px', maxWidth: '640px' }}>
            Design does not happen in isolation — it lives at the intersection of product, engineering, research and leadership.
          </p>
          <CaseStudyImage src={asset('/illustrations/case-study/collaboration.png')} alt="Cross-functional collaboration framework" style={{ margin: '20px 0 0' }} />
          <p style={{ fontFamily: FONT_B, fontSize: '12px', color: '#888', margin: '4px 2px 0' }}>How I structure recurring touchpoints across research, product, engineering and leadership.</p>
          <CaseStudyImage src={asset('/illustrations/case-study/Collaboration_Calendar.png')} alt="Typical collaboration calendar" style={{ margin: '20px 0 0' }} />
          <p style={{ fontFamily: FONT_B, fontSize: '12px', color: '#888', margin: '4px 2px 0' }}>A typical week — busy, but run through a consistent Research → Define → Validate → Design → Build → QA → Launch framework.</p>
        </>
      ),
    },
  ],
}

/* ── Part 3 — Strategic Impact ───────────────────────────────── */

const impact = {
  id: 'about-impact',
  label: 'Strategic Impact',
  accent: PALETTE[2],
  slides: [
    {
      id: 'impact-divider',
      layout: 'section-divider',
      navLabel: 'Strategic impact at Sense',
      title: 'Strategic Initiatives & Impact at Sense',
      content: {
        number: '02',
        label: 'Strategic initiatives & impact at Sense',
        thesis: 'Greater responsibility needs greater strategy.',
        stat: { value: '80%', label: 'of Sense revenue driven by the products I lead' },
      },
    },
    {
      id: 'impact-data',
      kicker: 'Data-First Approach',
      navLabel: 'A data-first approach',
      title: 'Introduced a Data-First Approach.',
      layout: 'bullets-impact',
      content: {
        cards: [
          { title: 'Amplitude instrumentation', body: 'Instrumented key funnels in Amplitude to track real adoption and usage, not just feature launches.' },
          { title: 'Clarity integration', body: 'Wired in Microsoft Clarity for qualitative signal — session recordings and heatmaps alongside the quant.' },
          { title: 'MCP-driven analysis', body: 'Query data conversationally through MCP-connected tools, cutting analysis time from days to minutes.' },
        ],
        impact: {
          label: 'The Shift',
          statement: 'Every major bet backed by usage data, not opinion.',
          footnote: 'Quant instrumentation plus qualitative signal turned "I think" into "I can show you."',
        },
      },
    },
    {
      id: 'impact-practices',
      kicker: 'Design Practices',
      navLabel: 'Catching risk early',
      title: 'Introduced design practices to catch risk before shipping.',
      layout: 'bullets-impact',
      content: {
        cards: [
          { title: 'Design decks', body: 'Every initiative starts with a design deck — problem, options, trade-offs — reviewed before a pixel is final.' },
          { title: 'Critique sessions', body: 'Regular critique sessions surface risk early, while a change is still cheap to make.' },
          { title: 'Process discipline', body: 'A consistent design process — research, define, validate, design, build, QA — keeps iteration cycles short.' },
        ],
        impact: {
          label: 'The Payoff',
          statement: 'Fewer late-stage reworks, faster ship cycles.',
          footnote: 'Introduced as internal team practice — risks get caught in the deck, not in production.',
        },
      },
    },
    {
      id: 'impact-plan',
      kicker: 'Product Strategic Vision — AI Agents',
      navLabel: 'The four-phase plan',
      title: 'A key part of the strategic vision to build AI agents.',
      layout: 'custom',
      render: ({ accent }) => (
        <>
          <p style={{ fontFamily: FONT_B, fontSize: '14px', lineHeight: 1.75, color: '#555', margin: '0 0 22px', maxWidth: '680px' }}>
            I helped set and drive the strategy that evolved eight separate products into a single automation-to-agents platform.
          </p>
          <StrategyPhases accent={accent} />
        </>
      ),
    },
    {
      id: 'impact-numbers',
      kicker: 'Results',
      navLabel: 'Business impact',
      title: 'The business case for the work.',
      layout: 'bullets-impact',
      content: {
        cards: [
          { title: 'Adoption', body: '1,101 active workflows live across 199 agencies — 97% quarter-over-quarter growth in usage.' },
          { title: 'Speed', body: 'Up to an 80% reduction in time-to-hire across deployments, with the fastest hard-role fill on record at 11.1 hours.' },
          { title: 'Scale', body: '1M+ candidates engaged per year, and 50,000+ hours of manager time saved at HCA Healthcare alone.' },
        ],
        impact: {
          label: 'The Headline',
          statement: '$5M+ booked ARR in 2 months of AI Recruiter.',
          footnote: 'The strategy did not just ship features — it moved the numbers the business is measured on.',
        },
      },
    },
  ],
}

/* ── Part 4 — People, Workflow & Coaching ────────────────────── */

const people = {
  id: 'about-people',
  label: 'People & Coaching',
  accent: PALETTE[4],
  slides: [
    {
      id: 'team-divider',
      layout: 'section-divider',
      navLabel: 'Building & coaching a team',
      title: 'Building & Coaching a Team',
      content: {
        number: '03',
        label: 'Building & coaching a team',
        thesis: 'Grew the team to seven designers — built to run without me in the room.',
      },
    },
    {
      id: 'team-principle',
      kicker: 'Management Philosophy',
      navLabel: 'The management principle',
      title: 'The one belief that shapes how I manage.',
      layout: 'quote',
      content: {
        quote: 'Building a team that does not require management is the main quality a manager should have.',
        attribution: 'My operating principle as a design manager',
        note: 'Everything below follows from it — the goal of coaching is to make yourself unnecessary to the day-to-day.',
      },
    },
    {
      id: 'team-principles',
      kicker: 'Principles',
      navLabel: 'How the team operates',
      title: 'Five principles the team runs on.',
      layout: 'card-grid',
      content: {
        numbered: true,
        minWidth: 240,
        cards: [
          { title: 'Independence', body: 'Designers own their problems end to end — I set direction, not pixels.' },
          { title: 'Transparency', body: 'Decisions, trade-offs and rationale are shared openly, so nobody designs in the dark.' },
          { title: 'Ownership', body: 'Whoever holds a product holds the outcome — accountability lives with the maker.' },
          { title: 'Integrity', body: 'We say what we mean and do what we say — even when it is the harder or slower path.' },
          { title: 'Constant Learning', body: 'Everyone has something to teach — learning flows both ways, from coach to designer and designer to coach.' },
        ],
      },
    },
    {
      id: 'team-processes',
      kicker: 'Workflow',
      navLabel: 'Processes I built',
      title: 'The systems that keep the team fast.',
      layout: 'card-grid',
      content: {
        stacked: true,
        cards: [
          { title: 'Asana — Planning & Delivery', banner: asset('/Intro/Asana.png'), bannerFit: 'contain', accent: PALETTE[1], body: 'A single source of truth for what every designer is working on, what is blocked, and what ships next.' },
          { title: 'Claude + Chrome Workflow', banner: asset('/Intro/plugin.png'), bannerFit: 'contain', accent: PALETTE[4], body: 'An AI-assisted workflow — research synthesis, ideation and handoff, with a Chrome plugin wired into the tools we already use.' },
          { title: 'Design Checklist', banner: asset('/Intro/Checklist.png'), bannerFit: 'contain', accent: PALETTE[2], body: 'A quality gate every design passes before engineering picks it up — states, edge cases, accessibility, content.' },
          { title: 'Stakeholder Alignment Framework', banner: asset('/Intro/Stakeholder alignment.png'), bannerFit: 'contain', accent: PALETTE[0], body: 'A structured way to surface trade-offs and map decisions, so alignment is a document, not a meeting.' },
        ],
        impact: {
          label: 'The Payoff',
          statement: '≈12 hours saved every week.',
          footnote: 'The AI-assisted workflow compresses hours of repetitive work into minutes — freeing time for strategy and user thinking.',
        },
      },
    },
  ],
}

/* ── Part 5 — Closing ────────────────────────────────────────── */

const closing = {
  id: 'about-closing',
  label: 'Closing',
  accent: PALETTE[5],
  slides: [
    {
      id: 'about-contact',
      layout: 'title',
      navLabel: "Let's talk",
      title: "Let's talk",
      render: () => <ClosingCard />,
    },
  ],
}

const deck = {
  id: 'about',
  title: 'About Rupesh',
  routeBase: 'about',
  parts: [intro, evolution, impact, people, closing],
}

export default deck
