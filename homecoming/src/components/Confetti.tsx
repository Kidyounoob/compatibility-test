import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface ConfettiProps {
  count?: number
  run?: boolean
}

const COLORS = ['#EFA7C4', '#D96C9D', '#F7D774', '#B9A7E8', '#9CAF88', '#C9A45C']

/** A one-shot confetti + petal burst for the YES moment. */
export function Confetti({ count = 90, run = true }: ConfettiProps) {
  const reduce = useReducedMotion()

  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[i % COLORS.length],
        size: 7 + Math.random() * 9,
        rounded: Math.random() > 0.5,
        duration: 2.6 + Math.random() * 2.4,
        delay: Math.random() * 0.8,
        rotate: Math.random() * 720 - 360,
        drift: Math.random() * 120 - 60,
      })),
    [count],
  )

  if (reduce || !run) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-[-5%]"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.rounded ? p.size : p.size * 0.5,
            background: p.color,
            borderRadius: p.rounded ? '9999px' : '2px',
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: '110vh',
            x: p.drift,
            rotate: p.rotate,
            opacity: [1, 1, 0.9, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  )
}

export default Confetti
