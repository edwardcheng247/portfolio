import { useEffect, useRef } from 'react'

const SPACING = 18
const INFLUENCE_R = 140
const MAX_PULL = 6
const LERP_MOUSE = 0.05
const LERP_TOUCH = 0.18

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
  const lerpRef = useRef(LERP_MOUSE)
  const dotsRef = useRef<Dot[]>([])
  const rafRef = useRef<number>(0)
  const touchEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

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

    const onMouseMove = (e: MouseEvent) => {
      lerpRef.current = LERP_MOUSE
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }
    const onTouchStart = (e: TouchEvent) => {
      if (touchEndTimerRef.current) clearTimeout(touchEndTimerRef.current)
      lerpRef.current = LERP_TOUCH
      const t = e.touches[0]
      mouseRef.current = { x: t.clientX, y: t.clientY }
    }
    const onTouchMove = (e: TouchEvent) => {
      lerpRef.current = LERP_TOUCH
      const t = e.touches[0]
      mouseRef.current = { x: t.clientX, y: t.clientY }
    }
    const onTouchEnd = () => {
      lerpRef.current = LERP_MOUSE
      touchEndTimerRef.current = setTimeout(() => {
        mouseRef.current = { x: -9999, y: -9999 }
      }, 600)
    }
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })

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
          targetAngle = Math.atan2(dy, dx)
          const pull = tSmooth * MAX_PULL
          tx = dot.bx + (dx / dist) * pull
          ty = dot.by + (dy / dist) * pull
        }

        const lerp = lerpRef.current
        dot.cx += (tx - dot.cx) * lerp
        dot.cy += (ty - dot.cy) * lerp
        dot.len += (targetLen - dot.len) * lerp
        dot.angle = lerpAngle(dot.angle, targetAngle, lerp)

        const cos = Math.cos(dot.angle)
        const sin = Math.sin(dot.angle)
        const alpha = 0.04 + (dot.len / 3) * 0.1

        const influence = Math.max(0, (dot.len - 0.5) / 2.5)
        ctx.lineWidth = 0.6 + influence * 0.15

        // Faint orange (#FF8C00 = 255,140,0) near cursor, white at rest
        const blend = influence * 0.35
        const g = Math.round(255 * (1 - blend) + 140 * blend)
        const b = Math.round(255 * (1 - blend))

        ctx.beginPath()
        ctx.moveTo(dot.cx - cos * dot.len, dot.cy - sin * dot.len)
        ctx.lineTo(dot.cx + cos * dot.len, dot.cy + sin * dot.len)
        ctx.strokeStyle = `rgba(255,${g},${b},${alpha.toFixed(3)})`
        ctx.stroke()
      }

      ctx.restore()
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      if (touchEndTimerRef.current) clearTimeout(touchEndTimerRef.current)
      window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`).removeEventListener('change', onDprChange)
      ro.disconnect()
      cancelAnimationFrame(rafRef.current)
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
