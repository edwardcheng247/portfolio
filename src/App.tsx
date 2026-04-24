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
      {' '}Claude-coded<span className="ascii-gray"> in Palo Alto &#8202;CA</span><span className="ascii-mobile-heart"> with ♡</span>
    </span>
  )
}

const pastLives = [
  { role: 'Founding Designer at Benny', stage: '[SEED]', period: '2024\u2009–\u20092026' },
  { role: 'Product Designer at UrbanFootprint', stage: '[SERIES B]', period: '2019\u2009–\u20092024' },
  { role: 'Visual Designer at FactoryFour', stage: '[SERIES A]', period: '2018\u2009–\u20092019' },
]

// Computes a card width so that each quote lands on roughly the same number of lines.
// Targets 3 lines for the serif 14px text; clamped to a sensible range.
function computeCardWidth(quote: string): number {
  const AVG_CHAR_PX = 7.5   // approx char width for Messina Serif 14px
  const TARGET_LINES = 3
  const PADDING_H = 56      // 28px left + 28px right
  const textWidth = (quote.length * AVG_CHAR_PX) / TARGET_LINES
  return Math.round(Math.max(220, Math.min(380, textWidth + PADDING_H)))
}

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
    quote: '"Edward was the glue person for my design team... he consistently went above and beyond."',
    name: 'Stephen',
    from: 'Design Manager',
    company: 'Mapbox / ex-Google, IDEO',
    colorClass: 'stephen',
  },
  {
    quote: '"If we don\'t hire Edward, I\'m quitting!"',
    name: 'Steve',
    from: 'CTO, post-interview [allegedly]',
    company: 'Benny / ex-CashApp, Uber, Brex',
    colorClass: 'steve',
  },
]

function Home() {
  const [navVisible, setNavVisible] = useState(true)
  const [navScrolled, setNavScrolled] = useState(false)
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
  const shoutsTrackRef = useRef<HTMLDivElement>(null)
  const shoutsCarouselRef = useRef<HTMLDivElement>(null)
  const isDraggingCarouselRef = useRef(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.querySelectorAll<HTMLElement>('.glass-card, .glow-line').forEach(el => {
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
        el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
      })
      const workLink = (e.target as Element).closest<HTMLElement>('[data-tooltip]')
      const isMobile = window.innerWidth <= 768
      if (workLink && !(isMobile && workLink.dataset.person) && !isDraggingCarouselRef.current) {
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
      setNavScrolled(y > 10)
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
      // Glow effect on touch
      const touch = e.touches[0]
      document.querySelectorAll<HTMLElement>('.glass-card, .glow-line').forEach(el => {
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--mouse-x', `${touch.clientX - rect.left}px`)
        el.style.setProperty('--mouse-y', `${touch.clientY - rect.top}px`)
        el.classList.add('glow-active')
      })
    }
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      document.querySelectorAll<HTMLElement>('.glass-card, .glow-line').forEach(el => {
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--mouse-x', `${touch.clientX - rect.left}px`)
        el.style.setProperty('--mouse-y', `${touch.clientY - rect.top}px`)
      })
    }
    const handleTouchEnd = (e: TouchEvent) => {
      if (tooltipDragRef.current) return
      if (!(e.target as Element).closest('[data-tooltip]')) {
        setTooltip(t => ({ ...t, visible: false }))
      }
      // Fade out glow — delay so ease-in always completes before ease-out begins
      setTimeout(() => {
        document.querySelectorAll<HTMLElement>('.glass-card, .glow-line').forEach(el => {
          el.classList.remove('glow-active')
        })
      }, 250)
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  // ── Shouts carousel physics ──
  useEffect(() => {
    const track = shoutsTrackRef.current
    const carousel = shoutsCarouselRef.current
    if (!track || !carousel) return

    // Wrap pos into [-halfWidth, 0)
    const wrapPos = (pos: number, hw: number) => {
      if (hw <= 0) return pos
      const r = pos % hw
      return r > 0 ? r - hw : r
    }

    const s = {
      pos: 0,
      excessVel: 0,       // extra px/ms on top of constant auto-scroll
      autoVel: 0,         // constant scroll velocity in px/ms (negative = leftward)
      halfWidth: 0,
      dragging: false,
      hovering: false,
      dragStartX: 0,
      dragStartPos: 0,
      samples: [] as { x: number; t: number }[],
      lastTs: 0,
      rafId: 0,
    }

    const measure = () => {
      if (track.scrollWidth <= 0) return
      s.halfWidth = track.scrollWidth / 2
      s.autoVel = -s.halfWidth / 80000  // 80 s for one full loop
    }

    const tick = (ts: number) => {
      s.rafId = requestAnimationFrame(tick)

      // Mobile: static grid — clear any stale transform and do nothing
      if (window.innerWidth <= 768) {
        if (track.style.transform) track.style.transform = ''
        return
      }

      if (s.halfWidth === 0) { measure(); return }

      const dt = s.lastTs ? Math.min(ts - s.lastTs, 50) : 16
      s.lastTs = ts

      if (!s.dragging && !s.hovering) {
        // Friction: excess velocity decays toward 0 → total returns to autoVel
        s.excessVel *= Math.pow(0.96, dt / 16.667)
        if (Math.abs(s.excessVel) < 0.0001) s.excessVel = 0

        s.pos += (s.autoVel + s.excessVel) * dt
        s.pos = wrapPos(s.pos, s.halfWidth)
        track.style.transform = `translate3d(${s.pos}px, 0, 0)`
      }
    }

    s.rafId = requestAnimationFrame(tick)

    const onMouseEnter = () => { s.hovering = true }
    const onMouseLeave = () => { if (!s.dragging) s.hovering = false }

    const onPointerDown = (e: PointerEvent) => {
      if (window.innerWidth <= 768) return
      if (e.button !== 0) return
      e.preventDefault()
      s.dragging = true
      isDraggingCarouselRef.current = true
      s.hovering = false
      s.dragStartX = e.clientX
      s.dragStartPos = s.pos
      s.samples = [{ x: e.clientX, t: e.timeStamp }]
      carousel.classList.add('is-dragging')
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!s.dragging) return
      const dx = e.clientX - s.dragStartX
      s.pos = wrapPos(s.dragStartPos + dx, s.halfWidth)
      track.style.transform = `translate3d(${s.pos}px, 0, 0)`
      s.samples.push({ x: e.clientX, t: e.timeStamp })
      s.samples = s.samples.filter(p => e.timeStamp - p.t < 150)
    }

    const onPointerUp = () => {
      if (!s.dragging) return
      s.dragging = false
      isDraggingCarouselRef.current = false
      carousel.classList.remove('is-dragging')

      // Compute flick velocity from recent samples (px/ms, rightward = positive)
      let flickVel = 0
      if (s.samples.length >= 2) {
        const a = s.samples[0]
        const b = s.samples[s.samples.length - 1]
        const dt = b.t - a.t
        if (dt > 5) flickVel = (b.x - a.x) / dt
      }
      // Cap speed; set excess so total velocity at release = flick velocity
      const capped = Math.max(-5, Math.min(5, flickVel))
      s.excessVel = capped - s.autoVel
    }

    const onWindowResize = () => {
      s.halfWidth = 0
      if (window.innerWidth <= 768) track.style.transform = ''
    }

    carousel.addEventListener('mouseenter', onMouseEnter)
    carousel.addEventListener('mouseleave', onMouseLeave)
    track.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)
    window.addEventListener('resize', onWindowResize)

    return () => {
      cancelAnimationFrame(s.rafId)
      carousel.removeEventListener('mouseenter', onMouseEnter)
      carousel.removeEventListener('mouseleave', onMouseLeave)
      track.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
      window.removeEventListener('resize', onWindowResize)
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
    <header className={`nav-wrapper${navVisible ? '' : ' nav-wrapper--hidden'}${navScrolled ? ' nav-wrapper--scrolled' : ''}`}>
      <nav className="nav">
        <span className="nav-name">Edward Cheng</span>
        <div className="nav-links">
          <a href="#about" className={activeSection === 'about' ? 'nav-active' : ''} onClick={e => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }}>About</a>
          <a href="#work" className={activeSection === 'work' ? 'nav-active' : ''} onClick={e => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) }}>Work</a>
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
                <picture>
                  <source media="(max-width: 768px)" srcSet="/benny_merchants_mobile.png" />
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
                </picture>
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

        <div className="divider glow-line" role="separator" />

        <section className="section section--shouts">
          <p className="section-label">Shouts</p>
          <div className="shouts-carousel" ref={shoutsCarouselRef}>
            <div className="shouts-track" ref={shoutsTrackRef}>
              {[...shouts, ...shouts].map((shout, i) => (
                <div key={`${shout.from}-${i}`} className="shout-card glass-card" style={{ width: computeCardWidth(shout.quote) }} aria-hidden={i >= shouts.length || undefined} data-tooltip={shout.name} data-tooltip-sub={shout.company} data-tooltip-color={shout.colorClass} data-person={shout.colorClass} onMouseLeave={() => { setTooltip(t => ({ ...t, visible: false })); document.body.classList.remove('cursor-flipped') }}>
                  <p className="shout-quote">{shout.quote}</p>
                  <p className="shout-from">
                    {shout.from.includes('[allegedly]') ? <>{shout.from.replace(' [allegedly]', '')}<br /><span className="shout-from-note">[allegedly]</span></> : shout.from}
                  </p>
                </div>
              ))}
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
            LinkedIn <span className="footer-arrow">↗</span>
          </a>
          <a href="mailto:edwardcheng247@gmail.com" className="footer-link">
            Email <span className="footer-arrow">↗</span>
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
