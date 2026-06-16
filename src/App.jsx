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

function getPage() {
  const hash = window.location.hash.replace(/^#\/?/, '')
  return hash || ''
}

function App() {
  const [page, setPage] = useState(getPage)

  useEffect(() => {
    const handler = () => setPage(getPage())
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  const navigate = (path) => {
    window.location.hash = path ? `/${path}` : '/'
    window.scrollTo({ top: 0 })
  }

  if (page === 'AiAgents') {
    return <AIAgentsCasePage onBack={() => navigate('')} />
  }

  if (page === 'case-study' || page.startsWith('case-study/')) {
    const stepStr = page.split('/')[1]
    const initialStep = stepStr ? parseInt(stepStr, 10) : 1
    return <CaseStudyPage onClose={() => navigate('')} initialStep={isNaN(initialStep) ? 1 : initialStep} />
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
