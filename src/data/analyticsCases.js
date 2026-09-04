import { asset } from '../utils/asset'

/* Palette (matches CaseStudyPage) */
const PALETTE = ['#F4A58A', '#B8D4F8', '#B8F4D4', '#F8E4A0', '#D4B8F8']

export const ANALYTICS_CASES = [
  /* ─────────── 1. Voice Call Analytics ─────────── */
  {
    id: 'voice',
    kicker: 'AI Recruiter · Voice Analytics',
    title: 'Voice Call Analytics',
    tagline: 'Turning millions of AI voice screens into an actionable performance signal.',
    accent: PALETTE[0],
    thumb: asset('/analytics/Voice1.png'),
    heroMetric: [
      { v: '8.2K',  l: 'Calls initiated / 7 days' },
      { v: '15%',   l: 'Final completion rate' },
      { v: '10 min',l: 'Avg call duration' },
      { v: '+70%',  l: 'Answer rate 6–9 PM' },
    ],
    images: [
      { src: asset('/analytics/Voice1.png'), caption: 'Overview: KPIs + Sankey flow from initiated → answered → completed, with drop segments per stage.' },
      { src: asset('/analytics/Voice2.png'), caption: 'Engagement view: completed vs dropped call durations, best-time-to-call heatmap, drop reasons over time.' },
      { src: asset('/analytics/voice3.png'), caption: 'Insights: transcript-driven patterns — top objections, sentiment shifts, and consent flow drop-offs.' },
      { src: asset('/analytics/voice4.png'), caption: 'Call records: filterable table of every call with transcript, outcome, and node-level attribution.' },
      { src: asset('/analytics/voice5.png'), caption: 'All voice flows: cross-workflow view showing which voice nodes are used across multiple workflows and their comparative performance.' },
    ],
    persona: {
      name: 'Ops Manager & VP of Talent Ops',
      quote: '"I bought Voice Agent because sales said it screens 24/7. But I have no idea if it\'s actually working. Recruiters keep telling me candidates are hanging up in the first 30 seconds — I need proof, not vibes."',
      context: 'Owns AI Recruiter budget approval, reports to CRO on hiring throughput. Not a data analyst — reads dashboards on Monday mornings and needs answers, not queries.',
    },
    problem: [
      'After Voice Agent went GA, CS started fielding 40+ tickets/month asking "why did the call drop?" — with no way for the customer to self-serve an answer.',
      'Two enterprise accounts (~$380K combined ARR) opened churn conversations citing "no visibility into what the AI is actually doing on calls."',
      'NRR on the AI Recruiter add-on dropped from 118% to 96% in one quarter — the first time it went below 100% since launch.',
      'Recruiters were escalating individual candidate call issues to engineering because there was no dashboard that could answer "was this drop the candidate, the agent, or the system?"',
    ],
    goal: [
      'Give ops managers a self-serve answer to: "is my voice agent worth the money, and where is it failing?"',
      'Reduce CS ticket volume for voice-analytics questions by 60% within one quarter of launch.',
      'Attribute every dropped call to one of three sources: candidate-side, agent-side, or system-side — so the customer knows which lever to pull.',
      'Ship the dashboard behind the same auth as the AI Recruiter product so it becomes a paid renewal driver, not a support tool.',
    ],
    research: [
      { t: 'Customer calls',    b: 'Ran 12 discovery calls with ops managers across staffing (BGSF, TalentBurst), healthcare (HCA), and RPO (Aleron). Recorded on Gong, transcribed and coded in Claude.' },
      { t: 'Ticket mining',     b: 'Pulled 90 days of Zendesk tickets tagged "voice." Top themes: "why did the call drop" (34%), "when should I schedule calls" (22%), "which workflow is broken" (18%).' },
      { t: 'Recruiter shadowing',b: 'Sat with 4 recruiters for 2 hrs each while they reviewed candidate calls. They kept toggling between the call log, the workflow builder, and the ATS — three products, three tabs, zero connection.' },
      { t: 'Analyst benchmarking', b: 'Studied how Gong, Balto, and CallRail visualise call outcomes. Borrowed the flow-funnel pattern but rejected the "call intelligence" language — recruiters wanted outcomes, not talk analytics.' },
    ],
    designDecisions: [
      { t: 'Sankey flow as the anchor', b: 'The overview leads with a Sankey diagram (Initiated → Answered → Completed → Dropped) instead of a bar chart. Reason: recruiters could not mentally reconstruct the funnel from disconnected KPI tiles. Sankey answers "where do candidates fall off" in one glance.' },
      { t: 'KPI tiles above the flow — not below', b: 'The 8 headline KPIs sit above the Sankey so the customer sees "the number" before "the shape." Ops managers open the dashboard for a number they can share upward; recruiters scroll to the flow.' },
      { t: 'Heatmap for best-time-to-call, not a line chart', b: 'A time-of-day × answer/drop-rate heatmap replaced a proposed dual-axis line chart. Reason: the actionable insight is "when should I schedule my Trigger Node," and a heatmap makes the winning cell (6–9 PM, 70% answer rate) unmissable.' },
      { t: 'Drop reason attribution as a pie, not stacked bars', b: 'Pie for "Dropped by User / Agent / System" because the customer conversation is always "whose fault is it" — a proportion is the shape of that answer.' },
      { t: 'Filters left, content right — never top-anchored', b: 'The workflow + node filters stay pinned to the left rail. Ops managers configure once and let it be; top filters kept getting reset on every page refresh in user testing.' },
      { t: 'Cross-workflow flow reuse table', b: 'The "All Voice Flows" table shows which voice flow is reused across multiple workflows and its comparative performance — surfacing the "one broken voice flow poisoning three workflows" pattern that our support team saw repeatedly.' },
    ],
    testing: [
      'Ran 3 rounds of Maze unmoderated tests with 18 ops managers total (6 per round).',
      'Round 1: 4 of 6 could not find "why did the call drop." Sankey flow was hidden below the fold — moved above.',
      'Round 2: task success 5 of 6, but 3 users clicked on the Sankey bands expecting a drill-down. Added click-through to a filtered call-records view for that segment.',
      'Round 3: task success 6 of 6 in under 45 seconds. Added the "Best Time to Call" heatmap in this round after 4 users spontaneously asked "when should I run these calls."',
      'Also ran 5 moderated sessions with recruiters (not ops managers) — they cared more about the individual call records than the aggregate, which validated splitting Overview / Records into separate tabs.',
    ],
    constraints: [
      { t: 'Highcharts library ceiling', b: 'We\'re standardised on Highcharts across the platform. Sankey works out of the box, but Highcharts\' default node labels overlap heavily at 5+ segments. I designed around this — grouped low-volume drop reasons into "Other" so the diagram never renders more than 6 segments per column.' },
      { t: '10–15 min Snowflake data latency', b: 'Voice event data flows from Kafka → Snowflake → dashboard with a 10–15 min lag. We couldn\'t promise "real-time" without lying. Solution: an explicit "Last updated N min ago" chip near the date range picker, and defaulting the date range to "Last 7 days" (not "Today") so the lag is invisible in the most common view.' },
      { t: 'No support for pie chart drill-down in Highcharts community edition', b: 'Enterprise Highcharts allows nested pies (sunburst), but we\'re on the community licence. Worked around by pairing each pie with a companion table below it — the table is the drill-down, the pie is the summary.' },
      { t: 'Consent-revoked calls are legally opaque', b: 'When a candidate revokes consent mid-call, we can\'t store the transcript. The dashboard shows count + duration up to revocation, but the Insights tab suppresses transcript excerpts for those calls. Designed the empty state to make this a feature ("Consent honoured — transcript not stored") rather than an error.' },
    ],
    outcomes: [
      { v: '−72%', l: 'CS tickets on voice analytics (Q1 post-launch vs Q4 pre-launch)' },
      { v: '2 saves',l: 'Enterprise accounts pulled out of churn conversations after seeing the dashboard in QBRs' },
      { v: '+18 pt',l: 'NRR on AI Recruiter add-on recovered from 96% → 114%' },
      { v: '4.6/5', l: 'Avg CSAT on the dashboard (in-product survey, n=142)' },
      { v: '38%',   l: 'Of ops managers changed their trigger time to the 6–9 PM window within 30 days — a direct behaviour change from the heatmap insight' },
    ],
  },

  /* ─────────── 2. Survey Analytics ─────────── */
  {
    id: 'survey',
    kicker: 'Multi-channel Surveys',
    title: 'Survey Analytics',
    tagline: 'From "did anyone answer?" to a channel-attributed feedback engine.',
    accent: PALETTE[1],
    thumb: asset('/analytics/Survey1.png'),
    heroMetric: [
      { v: '82K',  l: 'Surveys reached / 7 days' },
      { v: '45%',  l: 'View rate' },
      { v: '10%',  l: 'Completion rate' },
      { v: '3 min',l: 'Median completion time' },
    ],
    images: [
      { src: asset('/analytics/Survey1.png'), caption: 'All Surveys overview: conversion funnel from Reached → Viewed → Started → Completed with per-channel engagement.' },
      { src: asset('/analytics/survey2.png'), caption: 'Candidate NPS: NPS score trend, sentiment breakdown, and top verbatim themes surfaced from open-text responses.' },
      { src: asset('/analytics/survey3.png'), caption: 'Client NPS: agency-side NPS with segment cuts by industry, size, and product usage.' },
      { src: asset('/analytics/survey4.png'), caption: 'All Responses: full-text search across every response, filterable by score band, channel, and workflow.' },
      { src: asset('/analytics/survey5.png'), caption: 'Channel engagement over time — quarterly trend of sent, delivered, opened, and skipped across email, SMS, and WhatsApp.' },
      { src: asset('/analytics/survey6.png'), caption: 'Conversion funnel view: stage-by-stage drop-off with attribution to channel and workflow node.' },
    ],
    persona: {
      name: 'CX / Voice-of-Customer Lead',
      quote: '"We send 80,000 surveys a week and I still cannot tell you if SMS beats email for a Nurse audience in Texas. Every question turns into a Snowflake ticket."',
      context: 'Owns the NPS program — candidate NPS on the AI Recruiter side, client NPS on the agency side. Reports NPS quarterly to the board. Not technical; lives in Google Sheets.',
    },
    problem: [
      'The old Surveys dashboard was a single line chart of "responses over time." No channel breakdown, no funnel, no verbatim search.',
      'CX had to file Snowflake queries every quarter to prep the board deck — average turnaround 3 business days, sometimes ran past the QBR.',
      'Customer complaint on 6 renewal calls: "we can\'t justify keeping Surveys 2.0 without proof it beats our old SurveyMonkey."',
      'Candidate NPS was flat at 42 for three quarters — we had the data to explain why (SMS respondents scored 18 points higher than email) but no way to surface it.',
    ],
    goal: [
      'Ship one dashboard that answers the 5 questions CX gets asked in every board meeting: response rate, NPS trend, verbatim themes, channel performance, and cost-per-response.',
      'Cut Snowflake ticket volume from CX by 80%.',
      'Give account teams a "one-click NPS export" for QBRs so they stop pulling design bandwidth to build slides.',
      'Prove multi-channel value: make the SMS-vs-email delta visible in one screen so we can defend the multi-channel pricing tier.',
    ],
    research: [
      { t: 'Board deck reverse-engineering', b: 'Read the last 6 quarters of NPS board slides. Every deck asked the same 5 questions — that became the tab structure (Candidate NPS · Client NPS · All Surveys · All Responses).' },
      { t: 'CX shadowing',       b: 'Watched a CX analyst prep for a QBR: 4 hours of Snowflake, Google Sheets pivots, and manual chart building. Video-recorded and coded every action — 61% of her time was on data reshaping, 24% on chart building, 15% on interpretation.' },
      { t: 'Verbatim analysis with LLM', b: 'Ran 30K NPS verbatims through Claude with a coding rubric. Found 7 recurring themes accounting for 82% of comments — informed the "top themes" module in the Candidate NPS view.' },
      { t: 'Channel benchmarks',  b: 'Pulled internal data across 40 agencies: SMS response rate 22% vs email 4% for candidate NPS. This one stat became the design north star — the dashboard had to make it impossible to miss.' },
    ],
    designDecisions: [
      { t: 'Funnel-first, tabs by audience second', b: 'The overview leads with the 4-stage funnel (Reached → Viewed → Started → Completed) as the shape everyone recognises. Only after that do we split by audience — because the funnel is the same story whether it\'s candidates or clients.' },
      { t: 'Channel engagement as a small-multiple line chart', b: 'Four lines (Sent · Delivered · Opened · Skipped) on one chart, not four separate cards. Reason: the interesting story is the gap between "Delivered" and "Opened" — putting them on the same axis makes the gap visible.' },
      { t: 'Verbatim theme surfacing as chips, not a word cloud', b: 'Chips with count + sentiment badge, ranked by volume. Word clouds test poorly with CX — they read as "cute" but non-actionable.' },
      { t: 'Response table with inline preview', b: 'The All Responses tab shows a searchable table with the actual verbatim inline (not behind a modal). CX users copy-paste verbatims into decks; the fewer clicks between "find quote" and "paste quote," the better.' },
      { t: 'Bounce + Spam + Unsubscribe as first-class KPIs', b: 'These three metrics usually get hidden in an "advanced" tab. Elevated to the top row because deliverability is what kills NPS programs — and it\'s the first thing that breaks silently.' },
    ],
    testing: [
      'Round 1 (n=8, Maze unmoderated): 5 of 8 could find the NPS score, only 2 of 8 could find the SMS-vs-email delta. Added the Channel Engagement chart to the overview as the fix.',
      'Round 2 (n=6, moderated): 6 of 6 could answer all 5 board-deck questions in under 3 minutes. Two users spontaneously asked "can I export this as a PDF" — added a top-right Export button.',
      'Round 3 (n=5, with real CX leads on live data): 4 of 5 said they would cancel their SurveyMonkey subscription. The fifth wanted Salesforce integration — parked as v2 scope.',
      'Verbatim search discoverability was the biggest failure — added a persistent search box at the top of the All Responses tab (not tucked under a filter panel).',
    ],
    constraints: [
      { t: 'Highcharts limitation on multi-line charts with mixed scales', b: 'Bounce % and Sent absolute counts don\'t share an axis cleanly. Rather than a dual-axis chart (which we\'ve seen fail user testing), we split them into a single-metric top row (KPIs) and a same-scale multi-line chart below.' },
      { t: '10–15 min Snowflake latency + hourly rollup jobs', b: 'Some aggregates (NPS trend) rely on an hourly rollup job. We designed a "Rolled up hourly · last update N min ago" chip near the trend chart so users understand why a live change won\'t appear immediately.' },
      { t: 'GDPR + email deny-list interplay', b: 'Skipped responses (due to deny list or unsubscribe) can\'t be attributed to individuals, only aggregated. Designed an empty-state hover ("Aggregated for privacy compliance") that doubles as a trust signal.' },
      { t: 'WhatsApp API rate limits', b: 'WhatsApp deliverability data comes back with a 20–40 min delay from Meta\'s API. The channel filter treats WhatsApp separately — the dashboard tells the user "WhatsApp figures update every 30 min" instead of pretending it\'s real-time.' },
    ],
    outcomes: [
      { v: '−84%', l: 'CX Snowflake tickets in Q1 after launch' },
      { v: '3 days → 12 min', l: 'QBR NPS prep time' },
      { v: '+11 pt',l: 'Candidate NPS lifted (42 → 53) after 6 agencies switched their default survey channel to SMS based on dashboard insight' },
      { v: '$140K',l: 'ARR retained — 3 agencies who had raised Surveys renewal concerns re-signed after in-QBR dashboard demo' },
      { v: '92%',  l: 'Of surveyed CX users said the dashboard replaced at least one external tool (SurveyMonkey, Typeform, Metabase)' },
    ],
  },

  /* ─────────── 3. Redeployments ─────────── */
  {
    id: 'redeployment',
    kicker: 'Talent Engagement ROI',
    title: 'Redeployment Analytics',
    tagline: 'Proving Sense-influenced re-hires actually beat cold sourcing — with the receipts.',
    accent: PALETTE[2],
    thumb: asset('/analytics/redeployment1.png'),
    heroMetric: [
      { v: '100K', l: 'Placements tracked / year' },
      { v: '12K',  l: 'Redeployments in period' },
      { v: '28.5', l: 'Avg days to redeploy' },
      { v: '12%',  l: 'Redeployment rate — 3× industry avg' },
    ],
    images: [
      { src: asset('/analytics/redeployment1.png'), caption: 'Redeployments overview: total placements, redeployment count, and avg days-to-redeploy with month × time-window heatmap.' },
      { src: asset('/analytics/redeployment2.png'), caption: 'Sense-Influenced vs Overall toggle — the critical view that proves Sense engagement lifts redeployment rate 2.4×.' },
      { src: asset('/analytics/redeployment3.png'), caption: 'Individual placement table with "Sense Influenced" attribution badges, days-to-redeploy, and drilldown into the engagement touchpoints that led to re-hire.' },
    ],
    persona: {
      name: 'Staffing Agency CFO & VP of Operations',
      quote: '"I pay Sense $180K a year. Prove to me that recruiters who use Sense engagement redeploy candidates faster than the ones who don\'t. Show me the receipts, not a case study."',
      context: 'Signs the annual contract. Runs a 400-recruiter staffing agency. Sees Sense as a cost line — needs it to be a revenue line to defend it in the next budget cycle.',
    },
    problem: [
      'Redeployment (re-placing a candidate who already worked for the agency) is the highest-margin placement type — no sourcing cost, faster to close, higher win rate.',
      'Agencies knew Sense helped with engagement but had no way to attribute a specific redeployment to a specific engagement action.',
      'Two large accounts ($420K combined ARR) went into churn review citing "we can\'t defend the Sense spend to our CFO — no clear ROI story."',
      'Even for agencies that stayed, expansion conversations stalled because AE teams had no self-serve number for "$ influenced by Sense" to bring to renewal.',
    ],
    goal: [
      'Give the CFO a single view that answers: "of all placements this year, how many were redeployments, and how many did Sense influence?"',
      'Reduce time-to-redeploy by giving ops managers visibility into which engagement patterns lead to fastest re-hire.',
      'Enable AE teams to run a "Sense ROI" story in every QBR without pulling analyst time.',
      'Ship a "Sense-Influenced" attribution model that\'s conservative enough for finance teams to trust and defensible enough to survive a churn review.',
    ],
    research: [
      { t: 'CFO interviews',      b: 'Ran 8 CFO/VP-Finance calls at accounts that had raised renewal concerns. Universal ask: "one number I can put in a slide." Not a dashboard — a number.' },
      { t: 'Attribution modelling', b: 'Worked with data science to define "Sense-Influenced" — placement where the candidate had ≥1 Sense engagement (SMS, email, voice, chatbot) within 90 days before re-hire. Conservative on purpose — CFOs distrust generous attribution.' },
      { t: 'Existing customer analysis', b: 'Pulled 12 months of placement data across 40 agencies. Found Sense-Influenced redeployments closed on average 28.5 days vs 62 days for non-influenced. That delta became the product\'s hero claim.' },
      { t: 'Competitor pricing',   b: 'Bullhorn charges an "engagement" add-on but offers no ROI dashboard. This became the differentiator we designed the tab structure around: "Overall" (baseline) vs "Sense Influenced" (the story).' },
    ],
    designDecisions: [
      { t: 'The toggle is the entire product', b: 'A prominent left-rail radio: "Overall Data" vs "Only Sense Influenced." Every number, chart, and table on the page recomputes on toggle. The visual delta between the two states IS the ROI proof — the customer sees the lift with their own eyes.' },
      { t: 'Month × time-window heatmap', b: 'Rows = calendar months, columns = time-to-redeploy buckets (<=7d, <=30d, <=90d, >90d). Cells coloured by % of redeployments in that bucket. Reason: staffing is seasonal (nursing surges in Jan, retail in Nov) and the heatmap lets a CFO spot which months to double engagement spend.' },
      { t: '"Sense Influenced" badge on the table', b: 'Every row in the placements table has an inline badge if it was Sense-influenced. Not a filter — a badge. Reason: the CFO scans the list and immediately sees the density of blue badges. It\'s a visual proof at row level.' },
      { t: 'Export Report as the primary CTA', b: 'The header CTA is "Export Report" (not "Save Dashboard" — that\'s secondary). This dashboard is a document generator; the customer\'s goal is to walk into their board meeting with a PDF.' },
      { t: 'BETA badge kept visible', b: 'We shipped this before the attribution model was fully audited. The BETA badge is intentional — signals "we\'re iterating" so early adopters can push back before we lock the model.' },
    ],
    testing: [
      'Round 1 (n=6 CFOs, moderated): all 6 asked "what does Sense Influenced mean" within 30 seconds. Added a tooltip + method note; problem persisted. Fix: added a full "Attribution methodology" page linked from the toggle.',
      'Round 2 (n=8 ops managers, Maze): task success on "find your best-performing engagement month" = 7 of 8. The heatmap was working.',
      'Round 3 (n=4 AEs, moderated live-in-QBR simulation): 4 of 4 successfully told the ROI story in under 90 seconds. Reduced pitch length by 60% vs previous QBR decks.',
      'Discovered late: 3 of 8 CFOs wanted to export the raw redeployment list, not the aggregates. Added CSV export on the table (in addition to the PDF report on the header).',
    ],
    constraints: [
      { t: 'Highcharts heatmap requires manual color scaling', b: 'Highcharts\' community heatmap doesn\'t support automatic quantile bucketing. I designed a 5-bucket color scale by hand (5 shades of green + 2 amber for outliers) and documented it in the design system so other analytics dashboards can reuse it.' },
      { t: '10–15 min Snowflake latency PLUS a nightly attribution rebuild', b: 'The Sense-Influenced attribution model rebuilds nightly (it\'s expensive — joins across 6 tables). We show "Attribution refreshed at 3:00 AM" in the header. The KPIs are day-N-1, not real-time — and that\'s appropriate for a finance-audience dashboard.' },
      { t: 'ATS-source data quality varies wildly', b: 'Some agencies\' ATS integrations don\'t emit a "placement ended" event reliably. We designed a "Data quality" note on the header for those accounts that reads "Coverage: 87% of placements have complete lifecycle data." Trust > perfection.' },
      { t: 'PDF export renders via headless Chrome — 30 second cap', b: 'Reports with >5K rows time out on the PDF service. Solution: PDF exports render the aggregates + top 100 rows; the full list is a companion CSV linked in the PDF footer.' },
    ],
    outcomes: [
      { v: '$1.8M',l: 'ARR retained — 4 accounts on churn watchlist re-signed after seeing the dashboard' },
      { v: '2.4×', l: 'Redeployment rate lift on Sense-Influenced vs baseline (the hero claim)' },
      { v: '−54%', l: 'Avg days-to-redeploy for Sense-Influenced (28.5 vs 62 days)' },
      { v: '$3.2M',l: 'Expansion ARR from 11 accounts that upgraded their engagement tier after ROI was proven' },
      { v: '78%',  l: 'Of QBRs in the quarter after launch used this dashboard as the primary artifact' },
    ],
  },

  /* ─────────── 4. Jarvis ─────────── */
  {
    id: 'jarvis',
    kicker: 'Conversational Analytics · AI Agent',
    title: 'Jarvis — Reports on the Go',
    tagline: 'Turning "can you pull me a report?" into a chat message a recruiter sends at 11 PM.',
    accent: PALETTE[3],
    thumb: null,
    video: {
      src: asset('/videos/ai/jarvis.mov'),
      caption: 'Jarvis in action — a recruiter asks a plain-English question and gets an inline chart back in seconds. Every answer cites its data source and includes a "Show query" toggle for power users.',
    },
    heroMetric: [
      { v: '10 s',    l: 'Median diagnostic time (vs 45 min manual)' },
      { v: '1,101',   l: 'Active workflows monitored' },
      { v: '199',     l: 'Agencies using Jarvis' },
      { v: '97%',     l: 'QoQ workflow growth attributed to Jarvis-surfaced fixes' },
    ],
    images: [],
    persona: {
      name: 'Recruiter & Ops Manager',
      quote: '"By the time our data team pulls the report, the fire is already out — or worse, three more have started. I need the answer right now, from my phone, in the parking lot."',
      context: 'Runs 15–20 active workflows. Not a SQL user. Wakes up on Monday morning to a pipeline of "why did my workflow break?" — and the answer is 3 clicks and 4 dashboards away.',
    },
    problem: [
      'Even with the new dashboards (Voice, Survey, Workflow), recruiters still couldn\'t answer their own questions — the questions were too specific ("why did MY workflow drop 40% yesterday").',
      'Data team was fielding 200+ ad-hoc report requests per month across the customer base. Average turnaround 2 business days.',
      'Two dashboards deep, users would still Slack #cs-analytics with "can someone pull this for me" — dashboards had solved the visualisation problem, not the "which dashboard, and which cut" problem.',
      'The Phase 3 "Ask AI" limitation — users still had to know which dashboard to open first — was the explicit driver for Phase 4\'s conversational agent.',
    ],
    goal: [
      'Let a recruiter ask any question in plain English and get a chart or a number back in under 15 seconds.',
      'Eliminate the "which dashboard" problem — Jarvis figures out the right cut and returns the answer.',
      'Cut the data team\'s ad-hoc report queue by 80%.',
      'Make Jarvis mobile-first — the recruiter\'s question happens in the parking lot, not at the desk.',
    ],
    research: [
      { t: 'Query log mining',    b: 'Pulled 6 months of ad-hoc report requests from the CS Slack channel. Categorised 1,200+ requests into 8 intent buckets — workflow health (34%), candidate lookup (22%), performance trend (18%), attribution (11%), and 4 minor buckets. Sized the training set from this.' },
      { t: 'Recruiter diary study',b: 'Gave 8 recruiters a diary app for 2 weeks — logged every time they thought "I wonder if…" about their workflow. 84% of the questions were about workflow health or a specific candidate\'s journey.' },
      { t: 'LLM prompt research', b: 'Ran 3 rounds of internal prompt bake-offs on GPT-4o, Claude 3.5 Sonnet, and Gemini 1.5. Claude won on structured chart output (JSON spec adherence) and stayed within our latency budget.' },
      { t: 'ATS-connected demos', b: 'Built a wizard-of-oz prototype with 6 customers — I played the LLM behind the scenes for 30 min per session. Got the intent taxonomy right before writing a line of code.' },
    ],
    designDecisions: [
      { t: 'Chat surface, not a query builder', b: 'Rejected a form-based "build your report" UI. Reason: form-based reporting still requires knowing what to ask for. Chat lets the user ask fuzzy questions and Jarvis clarifies in-line ("did you mean this workflow or all workflows in this category?").' },
      { t: 'Charts render inline in the chat bubble', b: 'When Jarvis returns a metric that\'s better as a chart, the chart renders inline as a message. No modal, no "click to view" — the answer IS the chart, in the flow of the conversation.' },
      { t: 'Ambient status feed on the dashboard home', b: 'Even without a query, Jarvis surfaces the top 3 anomalies on the home screen ("Workflow X\'s completion rate dropped 40% vs last week"). This is the "wake up on Monday" ambient view.' },
      { t: '"Show me the query" transparency toggle', b: 'For power users, every Jarvis answer has a "Show query" toggle that reveals the SQL Jarvis ran. Reason: trust — data teams pushed back on "black-box analytics." Toggle earned them as allies rather than adversaries.' },
      { t: 'Mobile chat interface with quick-reply chips', b: 'Recruiters use this on their phones. First-response messages include 3 quick-reply chips ("Show trend", "Filter by workflow", "Export"). Reduces typing on mobile from average 14 words to 2 taps.' },
    ],
    testing: [
      'Round 1 (wizard-of-oz, n=6): validated that recruiters would ask "why did my workflow break" as their first message. Confirmed the intent taxonomy.',
      'Round 2 (functional prototype, n=8): 6 of 8 successfully diagnosed a broken workflow in under 30 seconds. Failures: 2 users asked "why is my candidate ghosting" — a question Jarvis wasn\'t trained on. Added that intent to v1.',
      'Round 3 (beta, 12 agencies × 4 weeks): median query time dropped to 10s. 89% of queries resolved without a follow-up message.',
      'Discovered: 40% of queries happened outside 9-5 (evenings and weekends) — validated the mobile-first bet.',
      'One recruiter\'s quote from testing became the pull-quote we used at launch: "It\'s like having a data analyst who never sleeps and never rolls their eyes at my questions."',
    ],
    constraints: [
      { t: 'Highcharts + LLM JSON output = brittle', b: 'The LLM generates chart specs in JSON that we feed to Highcharts. When the LLM hallucinates a Highcharts option that doesn\'t exist, the chart fails silently. Solution: a strict JSON schema validator between LLM output and Highcharts renderer, with a fallback to a plain table when validation fails.' },
      { t: '10–15 min Snowflake latency = wrong answers if not disclosed', b: 'If a recruiter asks "how many calls happened in the last hour," Jarvis has to say "Sense data updates every 10–15 min — showing latest available window." Designed the freshness caveat as a subtle inline note, never a warning banner.' },
      { t: 'LLM cost per query at scale', b: 'Every Jarvis query calls Claude. At 200 queries × 199 agencies × 30 days that\'s expensive. Introduced a query cache — identical questions asked within 15 min return cached results. Reduced LLM cost by 63% in month 2.' },
      { t: 'Ambiguous entity references', b: 'Recruiters say "the nurse workflow" not "Workflow #WF-4829." Jarvis has to resolve ambiguity without frustrating the user. Designed a clarifying quick-reply: "I found 3 workflows matching \'nurse\' — which one?" as chips, not a text list.' },
    ],
    outcomes: [
      { v: '10 s',    l: 'Median diagnostic time vs 45 min manual + 2-day analyst queue' },
      { v: '−87%',   l: 'Ad-hoc report requests to data team in first quarter post-launch' },
      { v: '199',    l: 'Agencies using Jarvis in production within 6 months' },
      { v: '97%',    l: 'QoQ workflow growth attributed to Jarvis-surfaced fixes' },
      { v: '$2.4M',  l: 'Expansion ARR from customers upgrading to include Jarvis in their contract' },
      { v: '4.8/5',  l: 'CSAT — highest in the analytics suite' },
    ],
  },
]

export const getAnalyticsCase = (id) => ANALYTICS_CASES.find(c => c.id === id)
