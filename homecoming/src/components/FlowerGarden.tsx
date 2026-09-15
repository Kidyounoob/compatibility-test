import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Flower, type FlowerKind } from './Flower'

interface FlowerGardenProps {
  /** How many flowers to scatter along the ground. */
  density?: number
  className?: string
  /** Show the soft grassy ground band. */
  ground?: boolean
  kinds?: FlowerKind[]
}

const ALL_KINDS: FlowerKind[] = [
  'rose',
  'daisy',
  'tulip',
  'sunflower',
  'lavender',
  'cherry',
]

/**
 * A decorative garden strip. Flowers "grow" up from the ground on mount,
 * then gently sway. Meant to sit at the bottom of a stage.
 */
export function FlowerGarden({
  density = 9,
  className = '',
  ground = true,
  kinds = ALL_KINDS,
}: FlowerGardenProps) {
  const reduce = useReducedMotion()

  const plants = useMemo(
    () =>
      Array.from({ length: density }).map((_, i) => ({
        id: i,
        kind: kinds[i % kinds.length],
        left: (i / Math.max(1, density - 1)) * 100,
        size: 46 + Math.random() * 46,
        delay: i * 0.08,
        depth: Math.random(),
      })),
    [density, kinds],
  )

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-56 ${className}`}
      aria-hidden="true"
    >
      {ground && (
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-sage/50 via-sage/20 to-transparent" />
      )}
      {plants.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bottom-0"
          style={{
            left: `${p.left}%`,
            transformOrigin: 'bottom center',
            zIndex: Math.round(p.depth * 10),
          }}
          initial={reduce ? false : { scaleY: 0, x: '-50%', opacity: 0 }}
          animate={{ scaleY: 1, x: '-50%', opacity: 0.55 + p.depth * 0.45 }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 14,
            delay: p.delay,
          }}
        >
          <Flower kind={p.kind} size={p.size} withStem animate="sway" />
        </motion.div>
      ))}
    </div>
  )
}

export default FlowerGarden
