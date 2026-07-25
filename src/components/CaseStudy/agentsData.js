/* ─────────────────────────────────────────────────────────────
   AGENTS — shared source of truth for the AI Agents case study.
   Consumed by AIAgentsCasePage.jsx (scroll mode) and
   Presentation/decks/aiAgentsDeck.jsx (presentation mode).
───────────────────────────────────────────────────────────── */
export const AGENTS = [
  {
    id: 'senseiq',
    label: 'SenseIQ',
    sublabel: 'Intelligence',
    color: '#B8D4F8',
    icon: '🧠',
    context: 'SenseIQ is the intelligence backbone of the Sense platform — an AI layer that enables natural language search, semantic candidate filtering, and automated list generation without requiring recruiters to write complex Boolean queries.',
    why: [
      'Recruiters were spending significant time constructing complex Boolean strings to find the right candidates — a skill most didn\'t have.',
      'Candidate databases had millions of records but no smart way to surface the right talent quickly. A recruiter typing "Java developers in SF available now" should not need a database degree to get results.',
      'The gap between recruiter intent and system capability was creating a 15–20 minute overhead per search — SenseIQ was built to collapse that to seconds.',
    ],
    research: [
      { title: 'Recruiter Mental Models', body: 'We ran 12 interviews with recruiters across 6 agencies to understand how they think about candidate targeting. Most described their intent in plain English — "someone who has done this before and lives nearby." We mapped these patterns to query primitives.' },
      { title: 'AI Lister Prototyping', body: 'Three interaction models were tested: a chat-style natural language input, a guided multi-step filter builder, and a hybrid prompt + filter refinement flow. Usability sessions showed the hybrid model reduced errors by 60% vs pure chat.' },
      { title: 'Semantic Matching Research', body: 'We studied embedding-based search models to understand how "React Developer" matches "Frontend Engineer" — and built explainability affordances so recruiters could see WHY a candidate was included.' },
    ],
    constraints: [
      { title: 'ATS Data Quality', body: 'Many agencies had inconsistent or missing fields in their ATS. SenseIQ had to gracefully degrade — returning best-effort results and surfacing data quality warnings rather than failing silently.' },
      { title: 'Query Accuracy vs. Speed', body: 'Natural language is ambiguous. "Senior developer available now" could mean many things. We had to balance query precision with recall, and build correction affordances when the AI misunderstood intent.' },
      { title: 'False Positive Risk', body: 'Over-matching candidates to irrelevant jobs would erode recruiter trust. We set conservative thresholds and always showed a "why this match" rationale card for each result.' },
    ],
    guardrails: [
      'Always display the interpreted filter criteria so recruiters can verify the AI understood their intent',
      'Provide one-click override to switch to manual filter builder at any point',
      'Surface data quality warnings when results are based on incomplete ATS records',
      'Never silently exclude candidates — show count of filtered-out records with reason',
    ],
    variations: [
      { title: 'Conversational Chat Input', body: 'Free-text entry with AI interpretation. Fastest to use but highest error rate. Best for power users who could validate the generated filters.' },
      { title: 'Guided Filter Builder', body: 'Step-by-step structured input. Slower but more accurate. Preferred by new users who needed scaffolding.' },
      { title: 'Hybrid: Prompt + Refine', body: 'Natural language generates a draft filter set; user tweaks chips. Combined speed of NL with precision of manual. Shipped as the default interaction.' },
    ],
    impact: [
      { value: 'Seconds', label: 'List creation time (vs. 15–20 min manually)' },
      { value: '297', label: 'Lists created in first month of AI Lister launch' },
      { value: '87', label: 'Unique workflows driven by AI-generated lists' },
      { value: '50+', label: 'Active agencies using SenseIQ in month 1' },
    ],
  },
  {
    id: 'matching',
    label: 'Matching Agent',
    sublabel: 'Sourcing',
    color: '#B8F4D4',
    icon: '🎯',
    context: 'The Matching Agent is the sourcing engine of the AI Recruiter ecosystem. It uses Deep Match logic — combining skills, location, availability, and behavioral signals — to automatically surface the most qualified candidates for a job order without manual search.',
    why: [
      'Before the Matching Agent, recruiters manually searched candidate databases for each new job order — a process that took 30–60 minutes per role and relied heavily on keyword guessing.',
      'The platform handled thousands of job orders simultaneously. Manual matching couldn\'t scale. A 3× increase in weekly starts per recruiter required removing the sourcing bottleneck entirely.',
      'Semantic gap: a "Registered Nurse - ICU" and "Critical Care RN" are the same role, but keyword search missed these matches. Deep Match was built to close this gap using embedding-based similarity.',
    ],
    research: [
      { title: 'Recruiter Sourcing Patterns', body: 'We shadowed 8 recruiters during live sourcing sessions. The average recruiter ran 4–6 searches before finding viable candidates, adjusting keywords each time. We documented every search reformulation as a signal for what the AI needed to infer automatically.' },
      { title: 'Skills Taxonomy Study', body: 'We worked with the ML team to map 50,000+ skill variants to a normalized taxonomy. This powered semantic equivalence ("React" = "React.js" = "ReactJS") and role-level matching ("Software Engineer" ≈ "SWE" ≈ "Developer").' },
      { title: 'Batch Processing UX', body: 'We tested two models for showing results: a ranked list (single pass) and batch processing with live progress. Recruiters strongly preferred seeing the system work — the batch UI with a running count built trust that the AI was being thorough.' },
    ],
    constraints: [
      { title: 'Cold Start on New Job Types', body: 'For niche or emerging roles with few historical matches, the model had limited training signal. We designed a fallback to keyword search with a clear "low confidence" indicator so recruiters knew when to manually review.' },
      { title: 'Bias Mitigation', body: 'Matching on behavioral signals (past engagement, response rates) could inadvertently surface demographic bias from historical data. The team built bias monitoring dashboards and we added recruiter override controls as a required guardrail.' },
      { title: 'Goal-Based Exit Logic', body: 'Agencies set targets like "find 50 qualified candidates." The agent needed to stop at the right time — not too early (insufficient results) and not too late (wasted compute). Exit thresholds were configurable per agency.' },
    ],
    guardrails: [
      'Always show "why this match" rationale — skills matched, location proximity, availability signals',
      'Recruiter can demote or remove any match before the agent proceeds to engagement',
      'Confidence indicators: High / Medium / Low based on data completeness',
      'Zip Code Radius filter always visible and adjustable — never hidden',
      'Bias monitoring dashboard accessible to admin users',
    ],
    variations: [
      { title: 'Ranked List View', body: 'Single scored list with fit percentage. Clean and fast but overwhelming for large batches. Used for small job orders.' },
      { title: 'Batch Processing View', body: 'Real-time progress bar showing candidates being evaluated. Builds trust and lets recruiters monitor without waiting. Became the primary view for large-scale sourcing.' },
      { title: 'Side-by-Side Comparison', body: 'Two candidates compared head-to-head on matched criteria. Useful for final shortlist decisions but not scalable as a primary interface.' },
    ],
    impact: [
      { value: '20/100', label: 'Qualified evaluations per candidates sourced' },
      { value: '50', label: 'Top matches delivered per job order automatically' },
      { value: '12,821', label: 'Candidates matched in one live deployment' },
      { value: '3×', label: 'Increase in weekly start capacity (Carvana)' },
    ],
  },
  {
    id: 'voice',
    label: 'Voice Agent',
    sublabel: 'Engagement',
    color: '#F4A58A',
    icon: '🎙️',
    context: 'The Voice Agent conducts AI-powered phone screens on behalf of recruiters — calling candidates, asking dynamic role-specific questions generated from the Job Description, and capturing structured responses. It handles retries, voicemails, and channel-switching autonomously.',
    why: [
      'Phone screening was the single biggest bottleneck in the recruitment funnel. A recruiter screening 50 candidates could spend 2–3 full days on calls alone — most of which were voicemails or no-answers.',
      'Candidates expected instant engagement. Research showed that responding to an application within 2 minutes increased connection rates by 400%. Human recruiters could not achieve this at scale.',
      'The Voice Agent was designed to turn "calls" into "conversations" — structured, contextual, and capable of handling candidate questions dynamically rather than reading from a rigid script.',
    ],
    research: [
      { title: 'Voice UX Principles', body: 'We studied conversational AI interaction models across 15 production voice systems. Key findings: candidates needed to know immediately they were speaking to AI, questions must sound natural (not read), and silence handling (pauses) was critical to perceived intelligence.' },
      { title: 'Dynamic Question Module (DQM)', body: 'The DQM reads the Job Description and generates role-specific screening questions at runtime. We tested 3 question generation strategies — templated, JD-parsed, and fully generative — finding JD-parsed questions had the highest candidate completion rate at 73%.' },
      { title: 'Retry Logic Design', body: 'We mapped every failure state: voicemail, no answer, hung up, wrong number. Each required a different retry strategy. The agent supports up to 3 retries with configurable delays and switches to SMS/chat if all voice attempts fail.' },
    ],
    constraints: [
      { title: 'Accent and Language Diversity', body: 'The voice model needed to handle a wide range of accents across US, UK, and APAC markets. We worked with the vendor to test against 12 accent profiles and set minimum transcription confidence thresholds before accepting a response as valid.' },
      { title: 'Regulatory Compliance', body: 'In several US states, AI disclosure at the start of a call is legally required. The agent always opens with "I am an AI assistant calling on behalf of [Agency Name]." This was non-negotiable and validated with legal before launch.' },
      { title: 'No Visual Feedback Channel', body: 'Unlike chat, voice gives candidates no visual affordance. We had to design audio cues and verbal prompts to guide the conversation — adding audio confirmations, explicit transition phrases ("Moving to the next question..."), and a clear closing statement.' },
    ],
    guardrails: [
      'Always disclose AI identity at the start of every call — no exceptions',
      'Candidate can say "speak to a human" or "stop" at any point to trigger human escalation',
      'Maximum 3 retry attempts per candidate with minimum 4-hour spacing',
      'All transcripts stored and available for recruiter review — no black-box conversations',
      'Dynamic questions reviewed by recruiter before agent is activated for a new role type',
    ],
    variations: [
      { title: 'Scripted Question Flow', body: 'Fixed sequence of predefined questions. Predictable and auditable but inflexible. Used for high-compliance industries (healthcare, finance).' },
      { title: 'Dynamic JD-Parsed Flow', body: 'Questions generated from Job Description at runtime. More relevant and candidate-specific. Became the default for staffing agency use cases.' },
      { title: 'Adaptive Conversation Flow', body: 'Agent adjusts follow-up questions based on candidate responses. Most natural but highest complexity. Shipped as an experimental feature for select enterprise clients.' },
    ],
    impact: [
      { value: '60%', label: 'Cold calls lasting over 8 minutes' },
      { value: '2 min', label: 'Engagement time after application' },
      { value: '7 min', label: 'Full screening completion time' },
      { value: '3×', label: 'More candidates screened vs. human recruiter per day' },
    ],
  },
  {
    id: 'screening',
    label: 'Screening Agent',
    sublabel: 'Evaluation',
    color: '#D4B8F8',
    icon: '⚖️',
    context: 'The Screening Agent — also known as the Evaluation Agent — analyses voice call transcripts and resumes to assign a structured Fit Score (1–10) for each candidate. When a candidate meets the threshold, it automatically creates a submission record in the ATS with zero human data entry.',
    why: [
      'Evaluation was the subjective bottleneck. Two recruiters reviewing the same candidate could arrive at completely different conclusions based on personal heuristics. Standardisation was needed at scale.',
      'The manual process of reviewing call notes, reading resumes, and deciding on next steps took 15–20 minutes per candidate. With 50+ candidates per job order, this alone was a full-time job.',
      'The ATS writeback was the final automation gap. Candidates who passed screening still required manual data entry to update their status. The Screening Agent closed this loop completely.',
    ],
    research: [
      { title: 'Recruiter Scoring Rubrics', body: 'We interviewed 10 senior recruiters to extract their mental models for candidate evaluation. We identified 6 universal criteria: skills match, availability, location, compensation alignment, communication quality, and role-specific qualifications. These became the scoring dimensions.' },
      { title: 'Explainability Testing', body: 'Early versions showed only a numeric score. Usability tests revealed recruiters distrusted scores without rationale. We redesigned to always show score + reason for each dimension — increasing adoption from 34% to 81% in A/B testing.' },
      { title: 'Evaluation Mode Research', body: 'Three modes were designed: Resume-only (fast, less accurate), Voice Transcript-only (contextual, no document needed), and Combined (holistic). We found combined mode improved qualification accuracy by 34% vs. single-signal evaluation.' },
    ],
    constraints: [
      { title: 'Low Transcript Quality', body: 'Background noise, poor connection, or very short calls could produce unreliable transcripts. We built confidence scoring for transcription quality and flagged low-confidence evaluations for mandatory human review.' },
      { title: 'Explainability Requirements', body: 'Enterprise clients required audit trails for every hiring decision. Every Fit Score must be traceable to specific evidence from resume or transcript. The agent never produces a score without citing source material.' },
      { title: 'Threshold Calibration', body: 'Different agencies and roles require different quality bars. A score of 7/10 might be "submit" for a high-volume staffing role and "reject" for a senior specialist. Thresholds were made configurable per job template.' },
    ],
    guardrails: [
      'Score always accompanied by dimension-level breakdown — never a number alone',
      'Human override is always available — recruiter can accept or reject any AI evaluation',
      'Candidates flagged as "low confidence" always route to human review queue',
      'ATS writeback only triggers on explicit threshold crossing — configurable per agency',
      'Full evaluation audit trail stored per candidate for compliance',
    ],
    variations: [
      { title: 'Resume-Only Mode', body: 'Fastest evaluation path. Good for initial screening at top of funnel. Lower accuracy on soft skills and communication ability. Used when no voice data is available.' },
      { title: 'Voice Transcript Mode', body: 'Scores based on call analysis alone. Best for roles where communication is the primary qualifier. Not suitable for highly technical roles requiring resume depth.' },
      { title: 'Combined Mode (Default)', body: 'Holistic analysis of resume + transcript. Most accurate. 34% improvement in qualification precision. Shipped as the default for AI Recruiter deployments.' },
    ],
    impact: [
      { value: '33 min', label: 'Time from application to scored evaluation' },
      { value: '20/100', label: 'Qualified evaluations — outperforming human average' },
      { value: '0', label: 'Manual data entry required for ATS submission writeback' },
      { value: '8/10', label: 'Default submission threshold (configurable per agency)' },
    ],
  },
  {
    id: 'data',
    label: 'Data Agent',
    sublabel: 'Analytics',
    color: '#c8f4f0',
    icon: '📊',
    context: 'The Data Agent — internally called Jarvis — is a conversational analytics agent that lets recruiters and operations managers query workflow performance in plain English. Instead of navigating complex dashboards, users ask questions and get instant diagnostic insights and recommendations.',
    why: [
      'Analytics dashboards were powerful but passive. They showed what happened, not why — and required a data-literate user to extract actionable insight. Most recruiters couldn\'t diagnose a failing workflow without exporting to Excel.',
      'The feedback loop between workflow performance and optimization was too slow. A recruiter might not notice a 40% drop in SMS response rates until week-end reporting — losing days of candidate engagement.',
      'Ops managers needed to answer "why is this workflow failing?" in real-time during client calls. Jarvis was designed to give a confident, cited answer in under 10 seconds.',
    ],
    research: [
      { title: 'Analytics Mental Models', body: 'We ran card sorting sessions with 8 ops managers to understand how they think about workflow health. Three dominant patterns emerged: funnel analysis (where do candidates drop?), time analysis (when are candidates most responsive?), and comparative analysis (which template performs best?).' },
      { title: 'Query Pattern Analysis', body: 'We analysed 3 months of support tickets and dashboard exports to identify the 20 most common analytics questions. These became the seed set for training the conversational interface and validating completeness of the underlying data model.' },
      { title: 'Trust and Citation Design', body: 'Early user testing showed that a confident-sounding wrong answer was worse than a uncertain correct answer. We redesigned Jarvis to always cite its data source (e.g., "Based on 1,101 workflows between Jan–Mar 2025...") and show confidence level.' },
    ],
    constraints: [
      { title: 'Data Freshness', body: 'Analytics data was refreshed on a lag — some metrics were near-real-time, others were daily. Jarvis needed to clearly communicate data freshness per query so users didn\'t make decisions on stale numbers.' },
      { title: 'Complex Multi-Step Queries', body: 'Questions like "Show me the ROI of workflows that used AI matching vs. manual lists over the past quarter" required joining multiple data sources. We designed a query planner UI showing Jarvis\'s reasoning steps before returning results.' },
      { title: 'Scope Limitations', body: 'Jarvis could only answer questions about Sense data — not ATS data outside the Sense sync boundary. Clear scope messages ("I can only see data synced to Sense") were essential to prevent user confusion.' },
    ],
    guardrails: [
      'Every answer cites its data source and time window — no unattributed insights',
      'Data freshness indicator shown for every metric returned',
      'Out-of-scope queries get a clear explanation and redirect, never a hallucinated answer',
      'Sensitive data (individual candidate PII) is excluded from conversational responses',
      'Recommendations are framed as suggestions with supporting evidence — never directives',
    ],
    variations: [
      { title: 'Chat Interface', body: 'Free-form question entry with conversational responses. Natural but can feel unpredictable. Best for experienced ops users who know what they want to ask.' },
      { title: 'Insight Cards (Pre-built)', body: 'Auto-generated summaries of key metrics surfaced proactively. Lower learning curve, higher trust. Became the homepage of the Analytics section.' },
      { title: 'Hybrid: Chat + Pre-built', body: 'Insight cards for ambient awareness, chat for deep-dive. Shipped configuration — insight cards shown by default, Jarvis chat available on demand.' },
    ],
    impact: [
      { value: '97%', label: 'QoQ workflow growth Q2→Q3 2025' },
      { value: '10s', label: 'Time to get workflow diagnostic insight' },
      { value: '1,101', label: 'Active workflows analysed in real-time' },
      { value: '199', label: 'Agencies with active workflow monitoring' },
    ],
  },
  {
    id: 'ai-recruiter',
    label: 'AI Recruiter',
    sublabel: 'Orchestrator',
    color: '#F8E4A0',
    icon: '🤖',
    context: 'The AI Recruiter — internally called Grace — is the central orchestrator of the entire agent ecosystem. Grace doesn\'t do the work herself; she delegates it. When a new job order arrives, she activates the Matching Agent, deploys the Voice Agent, instructs the Screening Agent, and closes the loop with an ATS writeback — all without a human recruiter logging in.',
    why: [
      'The sub-agents (Matching, Voice, Screening) existed independently but lacked a coordinating intelligence. Recruiters still had to manually chain them together — activating each in sequence, copying outputs between them. This "human middleware" was the final bottleneck.',
      'True autonomy required a decision-making layer that could handle branching scenarios: what if a candidate doesn\'t answer? What if they want to negotiate rate? What if the Voice Agent scores a 6/10 but they\'re the 50th match and the role is urgent? Grace was built to reason through these states.',
      'The vision was "One Recruiter with the Power of a Team." Grace embodies this by acting as the senior recruiter who delegates to specialists — rather than being yet another tool that a recruiter must operate.',
    ],
    research: [
      { title: 'Orchestration UX Research', body: 'We studied how recruiters mentally model a full hiring process — the handoffs, decisions, and fallbacks. We mapped these into an agent state machine: Sourcing → Engagement → Evaluation → Submission, with defined fallback paths at each node.' },
      { title: 'Supervisor Mental Model', body: 'Research showed recruiters were most comfortable with Grace when she was framed as a supervisor they were managing, not a tool they were operating. This shifted UI language from "configure agent" to "set goals for Grace" — a critical reframe that improved adoption.' },
      { title: 'Failure State Design', body: 'We ran exhaustive failure scenario mapping: agent timeout, candidate opt-out, low-confidence evaluation, ATS API failure. Each scenario needed a clear recruiter notification, a defined fallback state, and a one-click recovery action.' },
    ],
    constraints: [
      { title: 'Partial Automation States', body: 'In real deployments, some candidates fall through agent handoffs — they answer the voice call but don\'t complete screening, or the ATS writeback fails. Grace needed to surface these "stuck" candidates clearly rather than silently dropping them.' },
      { title: 'Trust and Transparency', body: 'Recruiters worried Grace would make bad decisions they\'d be blamed for. The "Glass Box" design principle was central: every decision Grace makes is visible, traceable, and overrideable. Recruiters are supervisors, not passengers.' },
      { title: 'Multi-Tenancy Isolation', body: 'Grace operates across thousands of concurrent job orders from hundreds of agencies. Agent actions for one agency must never bleed into another\'s data or workflows. Strict tenant isolation was a non-negotiable architectural constraint.' },
    ],
    guardrails: [
      'Every agent action is logged and attributed — Grace never acts silently',
      'Recruiter can pause, override, or terminate any agent action at any stage',
      'Grace surfaces a "needs attention" queue for candidates requiring human judgment',
      '"Glass Box" principle: all AI reasoning steps visible on the workflow canvas',
      'ATS writes always require a confidence threshold — never write on uncertain data',
      'Candidate opt-out at any channel immediately halts all agent activity for that candidate',
    ],
    variations: [
      { title: 'Dashboard View', body: 'Real-time status of all active Grace deployments in a card grid. Shows candidates in each stage, stuck states, and completion metrics. Preferred by ops managers for oversight.' },
      { title: 'Workflow Canvas Integration', body: 'Grace\'s agent logic visualised directly on the Workflow Canvas node graph. Each agent is a node; active state shown with live indicators. Preferred by power users who build custom configurations.' },
      { title: 'Goal-Setting Wizard', body: 'Simplified onboarding flow: recruiter sets job order goals (target candidates, quality threshold, timeline). Grace handles everything else. Designed for non-technical recruiters adopting AI Recruiter for the first time.' },
    ],
    impact: [
      { value: '11.1 hrs', label: 'Fastest time to fill a hard role (BGSF)' },
      { value: '$5M+', label: 'Booked ARR tracked from AI Recruiter product line' },
      { value: '50K+', label: 'Hours of manager time saved (HCA Healthcare)' },
      { value: '404K', label: 'Meetings scheduled YTD — 175% YoY increase' },
    ],
  },
]

