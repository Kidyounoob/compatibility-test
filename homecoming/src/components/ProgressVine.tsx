import { motion, useReducedMotion } from 'framer-motion'
import type { FlowerKind } from '../data/questions'
import { Flower } from './Flower'

interface ProgressVineProps {
  total: number
  answered: number
}

const BLOOMS: FlowerKind[] = [
  'rose',
  'daisy',
  'tulip',
  'sunflower',
  'lavender',
  'cherry',
]

/**
 * A horizontal vine that grows as questions are answered.
 * Each answered question pops a flower bloom along the vine.
 */
export function ProgressVine({ total, answered }: ProgressVineProps) {
  const reduce = useReducedMotion()
  const pct = total > 0 ? (answered / total) * 100 : 0

  return (
    <div className="relative mx-auto w-full max-w-xl px-2">
      {/* vine track */}
      <div className="relative h-2 w-full rounded-full bg-sage/25">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sage to-[#7f9a6b]"
          initial={reduce ? false : { width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
        {/* little leaves along the growing vine */}
        {Array.from({ length: total }).map((_, i) => {
          const at = ((i + 1) / total) * 100
          const grown = i < answered
          return (
            <div
              key={i}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${at}%` }}
            >
              <motion.div
                initial={reduce ? false : { scale: 0, opacity: 0 }}
                animate={
                  grown
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0.5, opacity: 0.25 }
                }
                transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              >
                {grown ? (
                  <Flower
                    kind={BLOOMS[i % BLOOMS.length]}
                    size={26}
                    animate="none"
                  />
                ) : (
                  <span className="block h-2.5 w-2.5 rounded-full bg-sage/50" />
                )}
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProgressVine
