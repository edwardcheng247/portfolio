import { useEffect, useRef, useState } from 'react'
import { DotGrid } from './DotGrid'
import { LiveClock, AsciiSpinner } from './App'
import { getProject, workCards } from './projects'
import './ProjectPage.css'

export function ProjectPage({ slug }: { slug: string }) {
  const project = getProject(slug)
  // Next project follows the homepage "Selected work" order (linked cards only,
  // skipping stashed ones), wrapping at the end.
  const linkedCards = workCards.filter(c => c.slug)
  const currentIndex = linkedCards.findIndex(c => c.slug === slug)
  const nextProject = currentIndex >= 0 ? linkedCards[(currentIndex + 1) % linkedCards.length] : null
  const [navVisible, setNavVisible] = useState(true)
  const [navScrolled, setNavScrolled] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    window.scrollTo(0, 0)

    const handleScroll = () => {
      const y = window.scrollY
      if (y > lastScrollY.current && y > 60) setNavVisible(false)
      else setNavVisible(true)
      setNavScrolled(y > 10)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [slug])

  if (!project) {
    return <div className="project-not-found">Project not found.</div>
  }

  return (
    <>
      <DotGrid />
      <header className={`nav-wrapper${navVisible ? '' : ' nav-wrapper--hidden'}${navScrolled ? ' nav-wrapper--scrolled' : ''}`}>
        <nav className="nav">
          <a href="#" className="nav-name nav-back">
            <span style={{ position: 'relative', top: '-0.5px' }}>←</span>{'\u2002'}Home
          </a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#work" className="nav-active">Work</a>
            <a href="https://resume.edwardcheng.co/" target="_blank" rel="noreferrer" className="nav-cv"><span className="nav-cv-arrow">↗</span>CV</a>
          </div>
        </nav>
      </header>

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

        <nav className="project-footer-nav">
          <a href="#" className="project-nav-link">← Home</a>
          {nextProject && (
            <a
              href={`#/project/${nextProject.slug}`}
              className="project-nav-link"
              onClick={e => { e.preventDefault(); window.location.hash = `/project/${nextProject.slug}` }}
            >
              Next project: {nextProject.title} →
            </a>
          )}
        </nav>
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
    </>
  )
}
