import { motion, useReducedMotion } from 'framer-motion'

export type CatVariant = 'ink' | 'ginger' | 'cream' | 'sage'

interface CatProps {
  variant?: CatVariant
  size?: number
  className?: string
  /** Gentle idle motion (tail sway + slow bob). */
  animate?: boolean
  delay?: number
}

interface Palette {
  body: string
  shade: string
  ear: string
}

const PALETTES: Record<CatVariant, Palette> = {
  ink: { body: '#4A3B45', shade: '#3A2C33', ear: '#EFA7C4' },
  ginger: { body: '#D79A5B', shade: '#C4894B', ear: '#F6C6A0' },
  cream: { body: '#EAD9BE', shade: '#DCC7A6', ear: '#EFA7C4' },
  sage: { body: '#9CAF88', shade: '#879B74', ear: '#F1E5D0' },
}

/**
 * A little sitting cat, drawn to match the flower art (100×100 viewBox).
 * Purely decorative — pair it with the garden to keep the vibe going.
 */
export function Cat({
  variant = 'ink',
  size = 72,
  className = '',
  animate = true,
  delay = 0,
}: CatProps) {
  const reduce = useReducedMotion()
  const p = PALETTES[variant]
  const move = animate && !reduce

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      initial={move ? { y: 6, opacity: 0 } : false}
      animate={
        move
          ? { y: [0, -2.5, 0], opacity: 1 }
          : { opacity: 1 }
      }
      transition={
        move
          ? {
              y: { duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay },
              opacity: { duration: 0.5, delay },
            }
          : undefined
      }
      aria-hidden="true"
    >
      {/* tail — sways gently */}
      <motion.path
        d="M70 84c18-1 22-18 9-24 9 7 3 16-9 17z"
        fill={p.shade}
        style={{ originX: '70px', originY: '84px' }}
        animate={move ? { rotate: [0, -8, 0] } : undefined}
        transition={
          move
            ? { duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay }
            : undefined
        }
      />

      {/* body */}
      <path
        d="M28 90c-4-22 4-34 22-34s26 12 22 34z"
        fill={p.body}
      />
      <path d="M50 56c11 0 18 5 21 15-6-6-13-8-21-8s-15 2-21 8c3-10 10-15 21-15z" fill={p.shade} opacity="0.5" />

      {/* head */}
      <circle cx="50" cy="42" r="20" fill={p.body} />

      {/* ears */}
      <path d="M33 30l-4-19 17 11z" fill={p.body} />
      <path d="M67 30l4-19-17 11z" fill={p.body} />
      <path d="M35 27l-2-10 9 6z" fill={p.ear} />
      <path d="M65 27l2-10-9 6z" fill={p.ear} />

      {/* closed, content eyes */}
      <path
        d="M40 41q4 4 8 0"
        fill="none"
        stroke={p.shade}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M52 41q4 4 8 0"
        fill="none"
        stroke={p.shade}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* nose + mouth */}
      <path d="M47.5 46h5l-2.5 3z" fill={p.ear} />
      <path
        d="M50 49v2m0 0q-3 3-6 1m6-1q3 3 6 1"
        fill="none"
        stroke={p.shade}
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* whiskers */}
      <g stroke={p.shade} strokeWidth="1" strokeLinecap="round" opacity="0.55">
        <path d="M34 47l-12-3M34 51l-12 2M66 47l12-3M66 51l12 2" />
      </g>

      {/* little paws */}
      <ellipse cx="41" cy="89" rx="7" ry="5" fill={p.shade} />
      <ellipse cx="59" cy="89" rx="7" ry="5" fill={p.shade} />
    </motion.svg>
  )
}

export default Cat
