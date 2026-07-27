import { forwardRef } from 'react'

/* ─────────────────────────────────────────────────────────────
   Phase 2 "Directions We Killed" — hand-drawn UI mocks.

   Shared source of truth for the three rejected directions, used by
   CaseStudyPage.jsx (scroll mode) and the presentation deck. Each
   forwards a ref to its <svg> so callers can serialise it for zoom.
───────────────────────────────────────────────────────────── */

const SVG_PROPS = {
  viewBox: '0 0 300 160',
  xmlns: 'http://www.w3.org/2000/svg',
  style: { display: 'block', width: '100%' },
}

export const AccordionCanvasMock = forwardRef(function AccordionCanvasMock(props, ref) {
  return (
    <svg ref={ref} {...SVG_PROPS}>
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
  )
})

export const CodeFirstDslMock = forwardRef(function CodeFirstDslMock(props, ref) {
  return (
    <svg ref={ref} {...SVG_PROPS}>
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
  )
})

export const WizardStepMock = forwardRef(function WizardStepMock(props, ref) {
  return (
    <svg ref={ref} {...SVG_PROPS}>
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
  )
})

/* Backdrop behind each mock, matching the artwork's own canvas colour. */
export const EXPLORATION_MOCKS = [
  { id: 'accordion', title: 'Accordion Node Canvas', Mock: AccordionCanvasMock, bg: '#f0ede8' },
  { id: 'dsl',       title: 'Code-First DSL',        Mock: CodeFirstDslMock,    bg: '#1e1e1e' },
  { id: 'wizard',    title: 'Wizard / Step-by-step', Mock: WizardStepMock,      bg: '#f0ede8' },
]
