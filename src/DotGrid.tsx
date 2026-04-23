import { useEffect, useRef } from 'react'

const SPACING = 18
const INFLUENCE_R = 140
const MAX_PULL = 8
const LERP = 0.05
const LERP_REVERT = 0.025
const LERP_TOUCH = 0.28

interface Dot {
  bx: number
  by: number
  cx: number
  cy: number
  len: number
  angle: number
}

function lerpAngle(a: number, b: number, t: number): number {
  const diff = ((b - a + Math.PI * 3) % (Math.PI * 2)) - Math.PI
  return a + diff * t
}

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const dotsRef = useRef<Dot[]>([])
  const rafRef = useRef<number>(0)
  const touchEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    const buildDots = () => {
      const docW = Math.max(document.documentElement.scrollWidth, window.innerWidth)
      const docH = Math.max(document.documentElement.scrollHeight, window.innerHeight)
      const cols = Math.ceil(docW / SPACING) + 1
      const rows = Math.ceil(docH / SPACING) + 1
      const dots: Dot[] = []
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const bx = c * SPACING
          const by = r * SPACING
          dots.push({ bx, by, cx: bx, cy: by, len: 0.5, angle: 0 })
        }
      }
      dotsRef.current = dots
    }

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resizeCanvas()
    buildDots()

    const onResize = () => { resizeCanvas(); buildDots() }
    const onDprChange = () => { resizeCanvas() }
    window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`).addEventListener('change', onDprChange)
    window.addEventListener('resize', onResize)

    const ro = new ResizeObserver(buildDots)
    ro.observe(document.body)

    // ── Desktop: mouse handlers ──
    let mouseIdleTimer: ReturnType<typeof setTimeout> | null = null
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      if (mouseIdleTimer) clearTimeout(mouseIdleTimer)
      mouseIdleTimer = setTimeout(() => {
        mouseRef.current = { x: -9999, y: -9999 }
      }, 500)
    }
    const onMouseLeave = () => {
      if (mouseIdleTimer) clearTimeout(mouseIdleTimer)
      mouseRef.current = { x: -9999, y: -9999 }
    }

    // ── Mobile: touch handlers ──
    const onTouchStart = (e: TouchEvent) => {
      if (touchEndTimerRef.current) clearTimeout(touchEndTimerRef.current)
      const t = e.touches[0]
      mouseRef.current = { x: t.clientX, y: t.clientY }
    }
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      mouseRef.current = { x: t.clientX, y: t.clientY }
    }
    const onTouchEnd = () => {
      touchEndTimerRef.current = setTimeout(() => {
        mouseRef.current = { x: -9999, y: -9999 }
      }, 500)
    }

    if (isMobile) {
      window.addEventListener('touchstart', onTouchStart, { passive: true })
      window.addEventListener('touchmove', onTouchMove, { passive: true })
      window.addEventListener('touchend', onTouchEnd, { passive: true })
    } else {
      window.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseleave', onMouseLeave)
    }

    const draw = () => {
      const dpr = window.devicePixelRatio || 1
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      const scrollX = window.scrollX
      const scrollY = window.scrollY
      const mx = mouseRef.current.x + scrollX
      const my = mouseRef.current.y + scrollY

      const top    = scrollY - SPACING * 2
      const bottom = scrollY + window.innerHeight + SPACING * 2
      const left   = scrollX - SPACING * 2
      const right  = scrollX + window.innerWidth  + SPACING * 2

      const lerp = isMobile ? LERP_TOUCH : LERP

      ctx.save()
      ctx.translate(-scrollX, -scrollY)

      for (const dot of dotsRef.current) {
        if (dot.by < top || dot.by > bottom) continue
        if (dot.bx < left || dot.bx > right) continue

        const dx = mx - dot.bx
        const dy = my - dot.by
        const dist = Math.sqrt(dx * dx + dy * dy)

        let tx = dot.bx
        let ty = dot.by
        let targetLen = 0.5
        let targetAngle = dot.angle

        if (dist < INFLUENCE_R && dist > 0) {
          const t = 1 - dist / INFLUENCE_R
          const tSmooth = t * t * (3 - 2 * t)
          targetLen = 0.5 + tSmooth * 2.5

          if (!isMobile) {
            // Desktop: directional pull toward cursor
            targetAngle = Math.atan2(dy, dx)
            const pull = tSmooth * MAX_PULL
            tx = dot.bx + (dx / dist) * pull
            ty = dot.by + (dy / dist) * pull
          }
          // Mobile: no directional pull — dots just grow in place
        }

        const usedLerp = isMobile ? lerp : (targetLen > 0.5 ? LERP : LERP_REVERT)
        dot.cx += (tx - dot.cx) * usedLerp
        dot.cy += (ty - dot.cy) * usedLerp
        dot.len += (targetLen - dot.len) * usedLerp
        dot.angle = lerpAngle(dot.angle, targetAngle, usedLerp)

        const influence = Math.max(0, (dot.len - 0.5) / 2.5)
        const blend = influence * 0.35
        const gCh = Math.round(255 * (1 - blend) + 140 * blend)
        const bCh = Math.round(255 * (1 - blend))

        if (isMobile) {
          // Draw as growing circle
          const radius = 0.5 + influence * 2.5
          const alpha = 0.04 + influence * 0.18
          ctx.beginPath()
          ctx.arc(dot.bx, dot.by, radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,${gCh},${bCh},${alpha.toFixed(3)})`
          ctx.fill()
        } else {
          // Draw as directional line
          ctx.lineWidth = 0.6 + influence * 0.15
          const alpha = 0.04 + (dot.len / 3) * 0.1
          const cos = Math.cos(dot.angle)
          const sin = Math.sin(dot.angle)
          ctx.beginPath()
          ctx.moveTo(dot.cx - cos * dot.len, dot.cy - sin * dot.len)
          ctx.lineTo(dot.cx + cos * dot.len, dot.cy + sin * dot.len)
          ctx.strokeStyle = `rgba(255,${gCh},${bCh},${alpha.toFixed(3)})`
          ctx.stroke()
        }
      }

      ctx.restore()
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', onResize)
      window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`).removeEventListener('change', onDprChange)
      ro.disconnect()
      cancelAnimationFrame(rafRef.current)
      if (isMobile) {
        window.removeEventListener('touchstart', onTouchStart)
        window.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('touchend', onTouchEnd)
        if (touchEndTimerRef.current) clearTimeout(touchEndTimerRef.current)
      } else {
        window.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseleave', onMouseLeave)
        if (mouseIdleTimer) clearTimeout(mouseIdleTimer)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
