import { useEffect, useRef, useState } from 'react'
import { DotGrid } from './DotGrid'
import { getProject } from './projects'
import './ProjectPage.css'

export function ProjectPage({ slug }: { slug: string }) {
  const project = getProject(slug)
  const [navVisible, setNavVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    window.scrollTo(0, 0)

    const handleScroll = () => {
      const y = window.scrollY
      if (y > lastScrollY.current && y > 60) setNavVisible(false)
      else setNavVisible(true)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!project) {
    return <div className="project-not-found">Project not found.</div>
  }

  return (
    <>
      <DotGrid />
      <header className={`nav-wrapper${navVisible ? '' : ' nav-wrapper--hidden'}`}>
        <nav className="nav">
          <a href="#" className="nav-name nav-back">
            ← Edward Cheng
          </a>
          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#about">About</a>
          </div>
        </nav>
      </header>

      <div className="project-page">
        <div className="project-hero">
          <img src={project.heroImage} alt={project.title} className="project-hero-img" />
        </div>

        <div className="project-header">
          <div className="project-header-left">
            <h1 className="project-title">{project.title}</h1>
            <p className="project-subtitle">{project.subtitle}</p>
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

          {project.sections.map((section, si) => (
            <div key={si} className="project-section">
              <p className="project-section-label">{section.label}</p>
              {section.heading && (
                <h2 className="project-section-heading">{section.heading}</h2>
              )}
              {section.blocks.map((block, bi) => {
                if (block.type === 'text') {
                  return <p key={bi} className="project-body">{block.value}</p>
                }
                if (block.type === 'image') {
                  return (
                    <figure key={bi} className="project-figure">
                      <img src={block.src} alt={block.alt} className="project-figure-img" />
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

        <nav className="project-footer-nav">
          <a href="#" className="project-nav-link">← Home</a>
          <a href="#" className="project-nav-link">Next project →</a>
        </nav>
      </div>
    </>
  )
}
