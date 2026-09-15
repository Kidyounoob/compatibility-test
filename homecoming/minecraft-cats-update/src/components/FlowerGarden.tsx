import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Flower, type FlowerKind } from './Flower'
import { Cat, type CatVariant } from './Cat'
import { useGame } from '../context/GameContext'

interface FlowerGardenProps {
  /** How many flowers to scatter along the ground. */
  density?: number
  className?: string
  /** Show the soft grassy ground band. */
  ground?: boolean
  kinds?: FlowerKind[]
  /** Show cats sitting in the garden. */
  cats?: boolean
}

const ALL_KINDS: FlowerKind[] = [
  'rose',
  'daisy',
  'tulip',
  'sunflower',
  'lavender',
  'cherry',
]

// A couple of cats resting in the flowers. The first one is a hidden
// clickable easter egg that unlocks the "A Complete Catalogue" advancement.
const GARDEN_CATS: { left: number; variant: CatVariant; size: number }[] = [
  { left: 12, variant: 'ink', size: 62 },
  { left: 86, variant: 'ginger', size: 54 },
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
  cats = true,
}: FlowerGardenProps) {
  const reduce = useReducedMotion()
  const { unlockAchievement } = useGame()
  const [purring, setPurring] = useState(false)

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

      {cats &&
        GARDEN_CATS.map((c, i) => {
          const clickable = i === 0
          return (
            <motion.div
              key={`cat-${i}`}
              className="absolute bottom-1"
              style={{ left: `${c.left}%`, x: '-50%', zIndex: 12 }}
              initial={reduce ? false : { y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
            >
              {clickable ? (
                <button
                  type="button"
                  onClick={() => {
                    unlockAchievement('cat-whisperer')
                    setPurring(true)
                    setTimeout(() => setPurring(false), 1400)
                  }}
                  className="pointer-events-auto relative block cursor-pointer border-0 bg-transparent p-0"
                  aria-label="A cat"
                >
                  <Cat variant={c.variant} size={c.size} />
                  {purring && (
                    <motion.span
                      initial={{ opacity: 0, y: 0, scale: 0.6 }}
                      animate={{ opacity: 1, y: -14, scale: 1 }}
                      className="absolute -top-2 left-1/2 -translate-x-1/2 text-sm"
                    >
                      💗
                    </motion.span>
                  )}
                </button>
              ) : (
                <Cat variant={c.variant} size={c.size} delay={0.4} />
              )}
            </motion.div>
          )
        })}
    </div>
  )
}

export default FlowerGarden
