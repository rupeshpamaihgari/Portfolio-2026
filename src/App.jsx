import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AchievementsSection from './components/AchievementsSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectsSection_2 from './components/ProjectsSection_2'
import TestimonialsSection from './components/TestimonialsSection'
import AIProcessSection from './components/AIProcessSection'
import ServicesSection from './components/ServicesSection'
import CompanySection from './components/CompanySection'
import QuestionsSection from './components/QuestionsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import CaseStudyPage from './components/CaseStudy/CaseStudyPage'
import AIAgentsCasePage from './components/CaseStudy/AIAgentsCasePage'
import PresentationDeck, { countSlides } from './components/CaseStudy/Presentation/PresentationDeck'
import evolutionDeck, { slideIndexForStep } from './components/CaseStudy/Presentation/decks/evolutionDeck'
import aiAgentsDeck, { slideIndexForAgent } from './components/CaseStudy/Presentation/decks/aiAgentsDeck'
import aboutDeck from './components/CaseStudy/Presentation/decks/aboutDeck'
import automationsDeck from './components/CaseStudy/Presentation/decks/automationsDeck'
import AnalyticsCasePage from './components/AnalyticsCasePage'

function parseRoute() {
  const raw = window.location.hash.replace(/^#\/?/, '')
  const [head = '', a = '', b = ''] = raw.split('/')
  return { head, a, b }
}

function toSlideIndex(str, len) {
  const n = parseInt(str, 10)
  return Number.isNaN(n) ? 0 : Math.min(Math.max(n - 1, 0), len - 1)
}

function App() {
  const [route, setRoute] = useState(parseRoute)

  useEffect(() => {
    const handler = () => setRoute(parseRoute())
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  const navigate = (path) => {
    window.location.hash = path ? `/${path}` : '/'
    window.scrollTo({ top: 0 })
  }

  const { head, a, b } = route

  if (head === 'about' && a === 'present') {
    return (
      <PresentationDeck
        key={aboutDeck.id}
        deck={aboutDeck}
        initialSlide={toSlideIndex(b, countSlides(aboutDeck))}
        onExit={() => navigate('')}
      />
    )
  }

  if (head === 'automations' && a === 'present') {
    return (
      <PresentationDeck
        key={automationsDeck.id}
        deck={automationsDeck}
        initialSlide={toSlideIndex(b, countSlides(automationsDeck))}
        onExit={() => navigate('')}
      />
    )
  }

  if (head === 'AiAgents' && a === 'present') {
    return (
      <PresentationDeck
        key={aiAgentsDeck.id}
        deck={aiAgentsDeck}
        initialSlide={toSlideIndex(b, countSlides(aiAgentsDeck))}
        onExit={() => navigate('AiAgents')}
      />
    )
  }

  if (head === 'AiAgents') {
    return (
      <AIAgentsCasePage
        onBack={() => navigate('')}
        onPlay={(agentId) => navigate(`AiAgents/present/${slideIndexForAgent(agentId)}`)}
      />
    )
  }

  if (head === 'analytics' && a) {
    return (
      <AnalyticsCasePage
        key={a}
        id={a}
        onBack={() => navigate('')}
      />
    )
  }

  if (head === 'automations' && a === 'present') {
    return (
      <PresentationDeck
        key={automationsDeck.id}
        deck={automationsDeck}
        initialSlide={toSlideIndex(b, countSlides(automationsDeck))}
        onExit={() => navigate('')}
      />
    )
  }

  if (head === 'case-study' && a === 'present') {
    return (
      <PresentationDeck
        key={evolutionDeck.id}
        deck={evolutionDeck}
        initialSlide={toSlideIndex(b, countSlides(evolutionDeck))}
        onExit={(step) => navigate(`case-study/${step || 1}`)}
      />
    )
  }

  if (head === 'case-study') {
    const parsed = parseInt(a, 10)
    const step = Number.isNaN(parsed) ? 1 : parsed
    return (
      <CaseStudyPage
        /* Remount on step change so the route stays authoritative —
           initialStep only seeds state on first mount. */
        key={`case-study-${step}`}
        onClose={() => navigate('')}
        initialStep={step}
      />
    )
  }

  return (
    <div
      style={{
        background: 'rgb(234,232,225)',
        minHeight: '100vh',
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <AchievementsSection />
        <ExperienceSection />
        <ProjectsSection_2 />
        <TestimonialsSection />
        <AIProcessSection />
        <CompanySection />
        <QuestionsSection />
        <ContactSection />
      </main>
    </div>
  )
}

export default App
