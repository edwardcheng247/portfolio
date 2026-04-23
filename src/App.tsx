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
      {' '}Claude-coded <span className="ascii-gray">in Palo Alto CA</span><span className="ascii-mobile-heart"> with ♡</span>
    </span>
  )
}

const pastLives = [
  { role: 'Founding Designer at Benny', stage: '[SEED]', period: '2024\u2009–\u20092026' },
  { role: 'Product Designer at UrbanFootprint', stage: '[SERIES B]', period: '2019\u2009–\u20092024' },
  { role: 'Visual Designer at FactoryFour', stage: '[SERIES A]', period: '2018\u2009–\u20092019' },
]

const shouts = [
  {
    quote: '"He has an exceptional ability to make anything beautiful, and he does it fast."',
    name: 'Nick',
    from: 'VP of Product',
    company: 'UrbanFootprint',
    colorClass: 'nick',
  },
  {
    quote:
      '"Thrives within existing design systems, and flourishes when given the opportunity to create something new."',
    name: 'Matt',
    from: 'Senior Software Engineer',
    company: 'UrbanFootprint',
    colorClass: 'matt',
  },
  {
    quote: '"The glue person for my design team."',
    name: 'Stephen',
    from: 'Design Manager',
    company: 'Mapbox / ex-Google, IDEO',
    colorClass: 'stephen',
  },
  {
    quote: '"If we don\'t hire Edward, I\'m quitting."',
    name: 'Steve',
    from: 'CTO [allegedly]',
    company: 'Benny / ex-CashApp, Uber, Brex',
    colorClass: 'steve',
  },
]

function Home() {
  const [navVisible, setNavVisible] = useState(true)
  const [activeSection, setActiveSection] = useState<'about' | 'work'>('about')
  const lastScrollY = useRef(0)
  const [tooltip, setTooltip] = useState<{ visible: boolean; text: string; subtext?: string; colorClass?: string; x: number; y: number; flipped: boolean }>({
    visible: false,
    text: '',
    subtext: undefined,
    colorClass: undefined,
    x: 0,
    y: 0,
    flipped: false,
  })
  const tooltipRef = useRef<HTMLDivElement>(null)
  const tooltipDragRef = useRef<{ startX: number; startY: number; origX: number; origY: number; yMin: number; yMax: number } | null>(null)
  const cardBoundsRef = useRef<{ yMin: number; yMax: number }>({ yMin: 0, yMax: window.innerHeight })
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
      const isMobile = window.innerWidth <= 768
      if (workLink && !(isMobile && workLink.dataset.person)) {
        const tooltipWidth = tooltipRef.current ? tooltipRef.current.offsetWidth : 160
        let x = e.clientX
        if (isMobile) {
          const margin = 12
          x = Math.max(tooltipWidth / 2 + margin, Math.min(window.innerWidth - tooltipWidth / 2 - margin, e.clientX))
        }
        const flipped = !isMobile && e.clientX + 13 + tooltipWidth > window.innerWidth
        document.body.classList.toggle('cursor-flipped', flipped)
        setTooltip({ visible: true, text: workLink.dataset.tooltip!, subtext: workLink.dataset.tooltipSub, colorClass: workLink.dataset.tooltipColor, x, y: e.clientY, flipped })
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

      // Mobile: hide tooltip on scroll
      if (window.innerWidth <= 768) {
        setTooltip(t => ({ ...t, visible: false }))
      }
    }
    const handleTouchStart = (e: TouchEvent) => {
      const workLink = (e.target as Element).closest<HTMLElement>('[data-tooltip]')
      if (workLink && !workLink.dataset.person) {
        const touch = e.touches[0]
        const tooltipWidth = tooltipRef.current ? tooltipRef.current.offsetWidth : 160
        const margin = 12
        const x = Math.max(tooltipWidth / 2 + margin, Math.min(window.innerWidth - tooltipWidth / 2 - margin, touch.clientX))
        const cardRect = workLink.getBoundingClientRect()
        cardBoundsRef.current = { yMin: cardRect.top, yMax: cardRect.bottom }
        setTooltip({ visible: true, text: workLink.dataset.tooltip!, subtext: workLink.dataset.tooltipSub, colorClass: workLink.dataset.tooltipColor, x, y: touch.clientY, flipped: false })
      }
    }
    const handleTouchEnd = (e: TouchEvent) => {
      if (tooltipDragRef.current) return
      if (!(e.target as Element).closest('[data-tooltip]')) {
        setTooltip(t => ({ ...t, visible: false }))
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <>
    <DotGrid />
<div
      ref={tooltipRef}
      className={`work-tooltip${tooltip.visible ? ' work-tooltip--visible' : ''}${tooltip.flipped ? ' work-tooltip--flipped' : ''}${tooltip.colorClass ? ` work-tooltip--${tooltip.colorClass}` : ''}`}
      style={{ left: tooltip.x, top: tooltip.y }}
      onTouchStart={(e) => {
        e.stopPropagation()
        const t = e.touches[0]
        const tooltipH = tooltipRef.current?.offsetHeight ?? 40
        const gap = 14
        tooltipDragRef.current = {
          startX: t.clientX, startY: t.clientY,
          origX: tooltip.x, origY: tooltip.y,
          yMin: cardBoundsRef.current.yMin + tooltipH + gap,
          yMax: cardBoundsRef.current.yMax + gap,
        }
      }}
      onTouchMove={(e) => {
        const drag = tooltipDragRef.current
        if (!drag) return
        const t = e.touches[0]
        const dx = t.clientX - drag.startX
        const dy = t.clientY - drag.startY
        const newY = Math.max(drag.yMin, Math.min(drag.yMax, drag.origY + dy))
        setTooltip(prev => ({ ...prev, x: drag.origX + dx, y: newY }))
      }}
      onTouchEnd={(e) => {
        e.stopPropagation()
        tooltipDragRef.current = null
      }}
    >
      {tooltip.text}
      {tooltip.subtext && <span className="tooltip-subtext">{tooltip.subtext}</span>}
    </div>
    <header className={`nav-wrapper${navVisible ? '' : ' nav-wrapper--hidden'}`}>
      <nav className="nav">
        <span className="nav-name">Edward Cheng</span>
        <div className="nav-links">
          <a href="#about" className={activeSection === 'about' ? 'nav-active' : ''}>About</a>
          <a href="#work" className={activeSection === 'work' ? 'nav-active' : ''}>Work</a>
          <a href="https://resume.edwardcheng.co/" target="_blank" rel="noreferrer" className="nav-cv"><span className="nav-cv-arrow">↗</span>CV</a>
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
                <span className="past-lives-years">
                  <span className="past-lives-stage">{item.stage}</span>
                  <span className="past-lives-bullet">{'\u2009•\u2009'}</span>
                  <span className="past-lives-period">{item.period}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="divider glow-line" role="separator" />

        <section className="section">
          <p className="section-label">Shouts</p>
          <div className="shouts-grid">
            {shouts.map((shout) => (
              <div key={shout.from} className="shout-card glass-card" data-tooltip={shout.name} data-tooltip-sub={shout.company} data-tooltip-color={shout.colorClass} data-person={shout.colorClass} onMouseLeave={() => { setTooltip(t => ({ ...t, visible: false })); document.body.classList.remove('cursor-flipped') }}>
                <p className="shout-quote">{shout.quote}</p>
                <p className="shout-from">
                  {shout.from.includes('[allegedly]') ? <>{shout.from.replace(' [allegedly]', '')}{' \u2009'}<span className="shout-from-note">[allegedly]</span></> : shout.from}
                </p>
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
                  width={1642}
                  height={844}
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
                  width={1390}
                  height={704}
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
                  width={1014}
                  height={2332}
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
                  width={2502}
                  height={3132}
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
              <picture>
                <source media="(max-width: 768px)" srcSet="/benny_app_mobile.png" />
                <img
                  src="/benny_app.png"
                  alt="Benny App"
                  width={2070}
                  height={844}
                  className="work-image"
                  onLoad={e => {
                    const img = e.currentTarget
                    img.classList.add('work-image--loaded')
                    img.closest('.work-card')?.classList.add('work-card--loaded')
                  }}
                />
              </picture>
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
