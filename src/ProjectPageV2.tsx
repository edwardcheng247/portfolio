import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { ProjectV2, V2Metric } from './projectsV2'
import './ProjectPageV2.css'

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Scroll-triggered reveal: fades/rises once when it enters the overlay viewport.
function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  // Reduced motion renders everything visible from the start.
  const [shown, setShown] = useState(() => prefersReducedMotion())

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`v2-reveal${shown ? ' v2-reveal--in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}

// Hero metric that counts up from 0 when it first becomes visible.
function CountUpMetric({ metric, delay = 0 }: { metric: V2Metric; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(prefersReducedMotion() ? metric.value : 0)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    let raf = 0
    const io = new IntersectionObserver(
      entries => {
        if (!entries.some(e => e.isIntersecting)) return
        io.disconnect()
        const duration = 1100
        const start = performance.now() + delay
        const tick = (now: number) => {
          const t = Math.min(Math.max((now - start) / duration, 0), 1)
          // ease-out-quart: fast start, gentle landing
          const eased = 1 - Math.pow(1 - t, 4)
          setDisplay(Math.round(metric.value * eased))
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [metric.value, delay])

  return (
    <div className="v2-metric">
      <span className="v2-metric-value" ref={ref}>
        {metric.prefix}
        {display}
        {metric.suffix}
      </span>
      <span className="v2-metric-label">{metric.label}</span>
    </div>
  )
}

export function ProjectPageV2({ project }: { project: ProjectV2 }) {
  return (
    <div className="project-page v2-page">
      <div className="project-hero">
        <img src={project.heroImage} alt={project.title} className="project-hero-img" />
      </div>

      <header className="v2-header">
        <h1 className="project-title">{project.title}</h1>
        <p className="v2-role">{project.role}</p>
        <div className="v2-metrics">
          {project.metrics.map((m, i) => (
            <CountUpMetric key={i} metric={m} delay={i * 140} />
          ))}
        </div>
      </header>

      <Reveal className="v2-tldr-wrap">
        <section className="v2-section v2-section--tldr">
          <p className="v2-label">Tl;dr</p>
          <div className="v2-section-body">
            <p className="v2-tldr">{project.tldr}</p>
            <div className="v2-meta-row">
              {project.tags && (
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag">{tag}</span>
                  ))}
                </div>
              )}
              <div className="v2-collabs">
                {project.collaborators.map((c, i) => (
                  <span key={i} className="v2-collab">
                    <span className="v2-collab-name">{c.name}</span> · {c.role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {project.sections.map((section, si) => (
        <section className="v2-section" key={si}>
          <p className="v2-label v2-label--sticky">{section.label}</p>
          <div className="v2-section-body">
            {section.heading && (
              <Reveal>
                <h2 className="v2-heading">{section.heading}</h2>
              </Reveal>
            )}
            {section.blocks.map((block, bi) => {
              if (block.type === 'text') {
                return (
                  <Reveal key={bi}>
                    <p className="v2-body">{block.value}</p>
                  </Reveal>
                )
              }
              if (block.type === 'pairs') {
                return (
                  <div className="v2-pairs" key={bi}>
                    {block.pairs.map((pair, pi) => (
                      <Reveal key={pi} delay={pi * 90}>
                        <div className="v2-pair">
                          <p className="v2-pair-user">{pair.user}</p>
                          <p className="v2-pair-business">{pair.business}</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                )
              }
              // image
              return (
                <Reveal key={bi}>
                  <figure className="v2-figure">
                    {block.href ? (
                      <a href={block.href} target="_blank" rel="noreferrer">
                        <img src={block.src} alt="" className="v2-figure-img" loading="lazy" />
                      </a>
                    ) : (
                      <img src={block.src} alt="" className="v2-figure-img" loading="lazy" />
                    )}
                    {block.caption && <figcaption className="v2-caption">{block.caption}</figcaption>}
                  </figure>
                </Reveal>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
