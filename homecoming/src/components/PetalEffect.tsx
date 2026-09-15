import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface PetalEffectProps {
  count?: number
  /** 'ambient' = gentle drift, 'burst' = denser fall for celebrations. */
  intensity?: 'ambient' | 'burst'
  colors?: string[]
}

const DEFAULT_COLORS = ['#EFA7C4', '#D96C9D', '#F7D774', '#B9A7E8', '#FBD9E6']

function Petal({
  x,
  size,
  duration,
  delay,
  color,
  drift,
}: {
  x: number
  size: number
  duration: number
  delay: number
  color: string
  drift: number
}) {
  return (
    <motion.div
      className="pointer-events-none absolute top-[-8%]"
      style={{ left: `${x}%` }}
      initial={{ y: '-10vh', opacity: 0, rotate: 0 }}
      animate={{
        y: '115vh',
        x: [0, drift, -drift, drift * 0.5, 0],
        opacity: [0, 0.9, 0.9, 0.7, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
        <path
          d="M10 1c5 3 8 8 8 12 0 3-3 6-8 6s-8-3-8-6c0-4 3-9 8-12z"
          fill={color}
          opacity="0.85"
        />
      </svg>
    </motion.div>
  )
}

export function PetalEffect({
  count,
  intensity = 'ambient',
  colors = DEFAULT_COLORS,
}: PetalEffectProps) {
  const reduce = useReducedMotion()
  const n = count ?? (intensity === 'burst' ? 40 : 14)

  const petals = useMemo(
    () =>
      Array.from({ length: n }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: 10 + Math.random() * (intensity === 'burst' ? 16 : 12),
        duration:
          (intensity === 'burst' ? 4 : 9) + Math.random() * 6,
        delay: Math.random() * (intensity === 'burst' ? 2 : 8),
        color: colors[i % colors.length],
        drift: (Math.random() * 2 - 1) * 60,
      })),
    [n, intensity, colors],
  )

  if (reduce) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {petals.map((p) => (
        <Petal key={p.id} {...p} />
      ))}
    </div>
  )
}

export default PetalEffect
