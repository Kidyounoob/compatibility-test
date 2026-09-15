import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface ParticlesProps {
  count?: number
  className?: string
}

/** Soft glowing pollen / light motes drifting upward. */
export function Particles({ count = 22, className = '' }: ParticlesProps) {
  const reduce = useReducedMotion()

  const motes = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: 3 + Math.random() * 7,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 8,
        opacity: 0.25 + Math.random() * 0.5,
      })),
    [count],
  )

  if (reduce) return null

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {motes.map((m) => (
        <motion.span
          key={m.id}
          className="absolute rounded-full"
          style={{
            left: `${m.x}%`,
            bottom: '-5%',
            width: m.size,
            height: m.size,
            background:
              'radial-gradient(circle, rgba(247,215,116,0.9) 0%, rgba(239,167,196,0.4) 60%, rgba(239,167,196,0) 100%)',
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: '-105vh',
            opacity: [0, m.opacity, m.opacity, 0],
            x: [0, 20, -15, 0],
          }}
          transition={{
            duration: m.duration,
            delay: m.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default Particles
