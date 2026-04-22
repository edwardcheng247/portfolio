import { useState, useEffect, useRef } from 'react'
import { DotGrid } from './DotGrid'
import { ProjectPage } from './ProjectPage'
import './App.css'

function useRoute() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const handler = () => setHash(window.location.hash)
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])
  return hash
}

function LiveClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="footer-clock">
      {time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'America/Los_Angeles',
      })}
    </span>
  )
}

const ASCII_CHARS = ['✻', '✽', '✶', '✳', '✢']
const ASCII_CHARS_MOBILE = ['✻', '✽', '✶', '•', '✢']

function AsciiSpinner() {
  const chars = window.matchMedia('(max-width: 480px)').matches ? ASCII_CHARS_MOBILE : ASCII_CHARS
  const [i, setI] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setI(n => (n + 1) % chars.length), 250)
    return () => clearInterval(interval)
  }, [chars.length])

  return (
    <span className="ascii-badge">
      <span className="ascii-char">{chars[i]}</span>
      {' '}Claude-coded <span className="ascii-gray">in Palo Alto CA</span>
    </span>
  )
}

const pastLives = [
  { role: 'Founding Designer at Benny', years: '2024 – 2026' },
  { role: 'Product Designer at UrbanFootprint', years: '2019 – 2024' },
  { role: 'Visual Designer at FactoryFour', years: '2018 – 2019' },
]

const shouts = [
  {
    quote: '"He has an exceptional ability to make anything beautiful, and he does it fast."',
    from: 'VP of Product',
  },
  {
    quote:
      '"Thrives within existing design systems, and flourishes when given the opportunity to create something new."',
    from: 'Senior Software Engineer',
  },
  {
    quote: '"The glue person for my design team."',
    from: 'Design Manager',
  },
  {
    quote: '"If we don\'t hire Edward, I\'m quitting."',
    from: 'CTO (allegedly)',
  },
]

function Home() {
  const [navVisible, setNavVisible] = useState(true)
  const [activeSection, setActiveSection] = useState<'about' | 'work'>('about')
  const lastScrollY = useRef(0)
  const [tooltip, setTooltip] = useState<{ visible: boolean; text: string; x: number; y: number; flipped: boolean }>({
    visible: false,
    text: '',
    x: 0,
    y: 0,
    flipped: false,
  })
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [row1Flex, setRow1Flex] = useState({ left: 1, right: 1 })
  const [row2Flex, setRow2Flex] = useState({ left: 1, right: 1 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.querySelectorAll<HTMLElement>('.glass-card, .glow-line').forEach(el => {
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
        el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
      })
      const workLink = (e.target as Element).closest<HTMLElement>('[data-tooltip]')
      if (workLink) {
        const tooltipWidth = tooltipRef.current ? tooltipRef.current.offsetWidth : 160
        const flipped = e.clientX + 13 + tooltipWidth > window.innerWidth
        document.body.classList.toggle('cursor-flipped', flipped)
        setTooltip({ visible: true, text: workLink.dataset.tooltip!, x: e.clientX, y: e.clientY, flipped })
      }
    }
    const handleScroll = () => {
      const y = window.scrollY
      if (y > lastScrollY.current && y > 60) {
        setNavVisible(false)
      } else {
        setNavVisible(true)
      }
      lastScrollY.current = y

      const workEl = document.getElementById('work')
      if (workEl) {
        const workTop = workEl.getBoundingClientRect().top
        setActiveSection(workTop <= 120 ? 'work' : 'about')
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
    <DotGrid />
<div
      ref={tooltipRef}
      className={`work-tooltip${tooltip.visible ? ' work-tooltip--visible' : ''}${tooltip.flipped ? ' work-tooltip--flipped' : ''}`}
      style={{ left: tooltip.x, top: tooltip.y }}
    >
      {tooltip.text}
    </div>
    <header className={`nav-wrapper${navVisible ? '' : ' nav-wrapper--hidden'}`}>
      <nav className="nav">
        <span className="nav-name">Edward Cheng</span>
        <div className="nav-links">
          <a href="#about" className={activeSection === 'about' ? 'nav-active' : ''}>{activeSection === 'about' && <span className="nav-dot">• </span>}About</a>
          <a href="#work" className={activeSection === 'work' ? 'nav-active' : ''}>{activeSection === 'work' && <span className="nav-dot">• </span>}Work</a>
          <a href="https://resume.edwardcheng.co/" target="_blank" rel="noreferrer">CV</a>
        </div>
      </nav>
    </header>
    <div className="site">

      <main className="main">
        <section className="section" id="about">
          <p className="section-label">Past Lives</p>
          <div className="past-lives">
            {pastLives.map((item) => (
              <div key={item.role} className="past-lives-row">
                <span className="past-lives-role">{item.role}</span>
                <span className="past-lives-years">{item.years}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="divider glow-line" role="separator" />

        <section className="section">
          <p className="section-label">Shouts</p>
          <div className="shouts-grid">
            {shouts.map((shout) => (
              <div key={shout.from} className="shout-card glass-card">
                <p className="shout-quote">{shout.quote}</p>
                <p className="shout-from">{shout.from}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section section--work" id="work">
          <p className="section-label">Selected work</p>
          <div className="work-grid">
            <div className="work-row-dynamic">
              <div
                className="work-card glass-card work-link"
                style={{ flex: row1Flex.left }}
                data-tooltip="Benny Card"
                onMouseLeave={() => { setTooltip(t => ({ ...t, visible: false })); document.body.classList.remove('cursor-flipped') }}
              >
                <img
                  src="/benny_card.png"
                  alt="Benny Card"
                  className="work-image"
                  onLoad={e => {
                    const img = e.currentTarget
                    img.classList.add('work-image--loaded')
                    img.closest('.work-card')?.classList.add('work-card--loaded')
                    setRow1Flex(prev => ({ ...prev, left: img.naturalWidth / img.naturalHeight }))
                  }}
                />
              </div>
              <div
                className="work-card glass-card work-link"
                style={{ flex: row1Flex.right }}
                data-tooltip="UrbanFootprint"
                onMouseLeave={() => { setTooltip(t => ({ ...t, visible: false })); document.body.classList.remove('cursor-flipped') }}
              >
                <img
                  src="/urbanfootprint_series_b.png"
                  alt="UrbanFootprint"
                  className="work-image"
                  onLoad={e => {
                    const img = e.currentTarget
                    img.classList.add('work-image--loaded')
                    img.closest('.work-card')?.classList.add('work-card--loaded')
                    setRow1Flex(prev => ({ ...prev, right: img.naturalWidth / img.naturalHeight }))
                  }}
                />
              </div>
            </div>
            <div className="work-row-dynamic">
              <div
                className="work-card glass-card work-link"
                style={{ flex: row2Flex.left }}
                data-tooltip="Benny API"
                onMouseLeave={() => { setTooltip(t => ({ ...t, visible: false })); document.body.classList.remove('cursor-flipped') }}
              >
                <img
                  src="/benny_merchants.png"
                  alt="Benny Merchants"
                  className="work-image"
                  onLoad={e => {
                    const img = e.currentTarget
                    img.classList.add('work-image--loaded')
                    img.closest('.work-card')?.classList.add('work-card--loaded')
                    setRow2Flex(prev => ({ ...prev, left: img.naturalWidth / img.naturalHeight }))
                  }}
                />
              </div>
              <div
                className="work-card glass-card work-link"
                style={{ flex: row2Flex.right }}
                data-tooltip="Benny Dashboards"
                onMouseLeave={() => { setTooltip(t => ({ ...t, visible: false })); document.body.classList.remove('cursor-flipped') }}
              >
                <img
                  src="/benny_dashboards.png"
                  alt="Benny Dashboards"
                  className="work-image"
                  onLoad={e => {
                    const img = e.currentTarget
                    img.classList.add('work-image--loaded')
                    img.closest('.work-card')?.classList.add('work-card--loaded')
                    setRow2Flex(prev => ({ ...prev, right: img.naturalWidth / img.naturalHeight }))
                  }}
                />
              </div>
            </div>
            <div
              className="work-card work-card--wide glass-card work-link"
              data-tooltip="Benny App"
              onMouseLeave={() => { setTooltip(t => ({ ...t, visible: false })); document.body.classList.remove('cursor-flipped') }}
            >
              <img
                src="/benny_app.png"
                alt="Benny App"
                className="work-image"
                onLoad={e => {
                  const img = e.currentTarget
                  img.classList.add('work-image--loaded')
                  img.closest('.work-card')?.classList.add('work-card--loaded')
                }}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer glow-line">
        <div className="footer-links">
          <a
            href="https://linkedin.com/in/imedwardcheng"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            LinkedIn <span style={{color: '#A3A3A3'}}>↗</span>
          </a>
          <a href="mailto:edwardcheng247@gmail.com" className="footer-link">
            Email <span style={{color: '#A3A3A3'}}>↗</span>
          </a>
        </div>
        <div className="footer-right">
          <AsciiSpinner /> <LiveClock />
        </div>
      </footer>
    </div>
    </>
  )
}

function App() {
  const route = useRoute()
  const projectMatch = route.match(/^#\/project\/(.+)$/)
  if (projectMatch) return <ProjectPage slug={projectMatch[1]} />
  return <Home />
}

export default App
