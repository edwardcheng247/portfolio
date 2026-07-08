import { useEffect, useRef, useState } from 'react'
import { LiveClock, AsciiSpinner } from './App'
import { getProject, workCards, type WorkCard } from './projects'
import './ProjectPage.css'

const CLOSE_DURATION_MS = 430
// Scroll distance over which the side gutters collapse to full width.
const GUTTER_COLLAPSE_PX = 180

const cardHash = (c: WorkCard) => `#/project/${c.slug}`

export function ProjectOverlay({ slug, onClose }: { slug: string; onClose: () => void }) {
  const project = getProject(slug)
  // "Next" follows case-study cards in homepage order, wrapping at the end.
  const linkedCards = workCards.filter(c => c.slug)
  const currentIndex = linkedCards.findIndex(c => c.slug === slug)
  const nextProject = currentIndex >= 0 ? linkedCards[(currentIndex + 1) % linkedCards.length] : null
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [closing, setClosing] = useState(false)
  const closingRef = useRef(false)

  const close = () => {
    if (closingRef.current) return
    closingRef.current = true
    setClosing(true)
    // Start scaling home back down while the overlay animates out.
    document.body.classList.remove('overlay-open')
    window.setTimeout(onClose, CLOSE_DURATION_MS)
  }

  // Lock the page behind the overlay (home keeps its scroll position) and
  // scale it back slightly, anchored to the visible part of the page.
  useEffect(() => {
    const body = document.body
    const prevOverflow = body.style.overflow
    body.style.overflow = 'hidden'
    body.style.setProperty('--home-origin-y', `${window.scrollY + window.innerHeight / 2}px`)
    body.classList.add('overlay-open')
    return () => {
      body.style.overflow = prevOverflow
      body.classList.remove('overlay-open')
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Per project: reset scroll, focus for keyboard scrolling, and drive the
  // gutter-collapse progress (--overlay-p: 0 inset → 1 full width).
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTo(0, 0)
    el.style.setProperty('--overlay-p', '0')
    el.focus({ preventScroll: true })
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const p = Math.min(el.scrollTop / GUTTER_COLLAPSE_PX, 1)
        el.style.setProperty('--overlay-p', p.toFixed(4))
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [slug])

  const goToNext = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!nextProject?.slug) return
    // Replace the history entry so closing always returns straight home.
    window.location.replace(cardHash(nextProject))
  }

  return (
    <div
      className={`project-overlay${closing ? ' project-overlay--closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={project?.title ?? 'Case study'}
    >
      <div className="overlay-backdrop" />
      <div
        className="overlay-scroll"
        ref={scrollerRef}
        tabIndex={-1}
        onClick={e => { if (e.target === e.currentTarget) close() }}
      >
        <article className="overlay-panel" key={slug}>
          {project ? (
            <div className="site" style={{ minHeight: 'unset' }}>
              <div className="project-page">
                <div className="project-hero">
                  <img src={project.heroImage} alt={project.title} className="project-hero-img" />
                </div>

                <div className="project-header">
                  <div className="project-header-left">
                    <h1 className="project-title">{project.title}</h1>
                    <p className="project-subtitle">{project.subtitle}</p>
                    {project.tags && project.tags.length > 0 && (
                      <div className="project-tags">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="project-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="project-header-right">
                    <p className="project-collab-label">Collaborators</p>
                    {project.collaborators.map((c, i) => (
                      <div key={i} className="project-collab-row">
                        <span className="project-collab-name">{c.name}</span>
                        <span className="project-collab-role">{c.role}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="project-content">
                  <div className="project-section">
                    <p className="project-section-label">Context</p>
                    {project.context.map((block, i) => (
                      <p key={i} className="project-body">{block.value}</p>
                    ))}
                  </div>
                </div>

                {project.sections.map((section, si) => (
                  <div key={si} className="project-section-group">
                    <div className="project-content">
                      <p className="project-section-label">{section.label}</p>
                      {section.heading && (
                        <h2 className="project-section-heading">{section.heading}</h2>
                      )}
                    </div>
                    {section.blocks.map((block, bi) => {
                      if (block.type === 'text') {
                        return (
                          <div key={bi} className="project-content">
                            <p className="project-body">{block.value}</p>
                          </div>
                        )
                      }
                      if (block.type === 'image') {
                        const stopShimmer = (el: HTMLImageElement | null) => {
                          if (!el) return
                          el.style.animation = 'none'
                          el.style.backgroundImage = 'none'
                        }
                        const img = (
                          <img
                            src={block.src}
                            alt=""
                            width={1920}
                            height={1080}
                            className="project-figure-img"
                            ref={el => { if (el && el.complete && el.naturalWidth > 0) stopShimmer(el) }}
                            onLoad={e => stopShimmer(e.currentTarget)}
                          />
                        )
                        return (
                          <figure key={bi} className="project-figure">
                            {block.href ? (
                              <a href={block.href} target="_blank" rel="noreferrer" className="project-figure-link">{img}</a>
                            ) : img}
                            {block.caption && (
                              <figcaption className="project-caption">{block.caption}</figcaption>
                            )}
                          </figure>
                        )
                      }
                      return null
                    })}
                  </div>
                ))}
              </div>

              <footer className="footer glow-line">
                <div className="footer-links">
                  <a href="https://linkedin.com/in/imedwardcheng" target="_blank" rel="noreferrer" className="footer-link">
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
          ) : (
            <div className="project-not-found">Project not found.</div>
          )}
        </article>
      </div>

      <button className="overlay-close" onClick={close} aria-label="Close case study">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      {nextProject && (
        <a
          className="overlay-next"
          href={cardHash(nextProject)}
          onClick={goToNext}
        >
          Next
          <svg className="overlay-next-arrow" width="13" height="12" viewBox="0 0 13 12" fill="none" aria-hidden="true">
            <path d="M7 1l5 5-5 5M12 6H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      )}
    </div>
  )
}
