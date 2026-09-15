import { motion, useReducedMotion } from 'framer-motion'
import type { FlowerKind } from '../data/questions'

export type { FlowerKind }

type AnimateMode = 'none' | 'sway' | 'bloom' | 'float' | 'grow'

interface FlowerProps {
  kind: FlowerKind
  size?: number
  className?: string
  /** Motion behaviour. `bloom`/`grow` animate on mount. */
  animate?: AnimateMode
  /** Delay (s) for staggered blooms. */
  delay?: number
  withStem?: boolean
  glow?: boolean
}

/* ── Individual flower heads (drawn on a 100×100 viewBox) ─────────── */

function RoseHead() {
  return (
    <g>
      <circle cx="50" cy="50" r="30" fill="#D96C9D" />
      <circle cx="50" cy="50" r="30" fill="url(#roseShade)" />
      <path
        d="M50 30c9 0 16 7 16 16 0 6-4 11-9 13 3-3 5-7 5-11 0-7-5-12-12-12z"
        fill="#C25587"
      />
      <path
        d="M38 44c3-6 9-9 15-8-5 2-9 6-11 12-2 6 0 12 4 16-8-3-13-13-8-20z"
        fill="#E38AB4"
      />
      <path
        d="M50 40c6 0 11 5 11 11s-5 11-11 11-11-5-11-11 5-11 11-11z"
        fill="#EFA7C4"
      />
      <path d="M50 45c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6z" fill="#F6C6D9" />
      <circle cx="50" cy="51" r="2.5" fill="#D96C9D" />
    </g>
  )
}

function DaisyHead() {
  const petals = Array.from({ length: 12 })
  return (
    <g>
      {petals.map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="24"
          rx="6.5"
          ry="16"
          fill="#FFFDF8"
          stroke="#F3E9DA"
          strokeWidth="0.6"
          transform={`rotate(${i * 30} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="13" fill="#F7D774" />
      <circle cx="50" cy="50" r="13" fill="url(#daisyCenter)" />
    </g>
  )
}

function TulipHead() {
  return (
    <g>
      <path d="M35 52c0-14 4-28 15-30 11 2 15 16 15 30-5 5-10 7-15 7s-10-2-15-7z" fill="#E68AB0" />
      <path d="M50 22c6 4 9 17 9 30-3 2-6 3-9 3V22z" fill="#D96C9D" />
      <path d="M35 52c2-11 6-24 15-30-4 9-6 20-6 33-4-1-7-2-9-3z" fill="#EFA7C4" />
      <path d="M44 34c0 8 3 15 6 15s6-7 6-15-3-14-6-14-6 6-6 14z" fill="#F6C6D9" opacity="0.7" />
    </g>
  )
}

function SunflowerHead() {
  const petals = Array.from({ length: 16 })
  return (
    <g>
      {petals.map((_, i) => (
        <path
          key={i}
          d="M50 8c3 6 3 14 0 22-3-8-3-16 0-22z"
          fill="#F7D774"
          stroke="#E7C24E"
          strokeWidth="0.5"
          transform={`rotate(${i * 22.5} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="16" fill="#8A5A2B" />
      <circle cx="50" cy="50" r="16" fill="url(#sunCenter)" />
      <circle cx="50" cy="50" r="10" fill="#6E4420" opacity="0.35" />
    </g>
  )
}

function LavenderHead() {
  const buds = Array.from({ length: 9 })
  return (
    <g>
      {buds.map((_, i) => {
        const y = 14 + i * 6
        const off = i % 2 === 0 ? -6 : 6
        return (
          <g key={i}>
            <ellipse cx={50 + off} cy={y} rx="5" ry="7" fill="#B9A7E8" />
            <ellipse cx={50 - off} cy={y + 3} rx="4" ry="6" fill="#A78FDD" />
          </g>
        )
      })}
      <ellipse cx="50" cy="12" rx="4" ry="6" fill="#C9BCEF" />
    </g>
  )
}

function CherryHead() {
  const petals = Array.from({ length: 5 })
  return (
    <g>
      {petals.map((_, i) => (
        <path
          key={i}
          d="M50 20c5 0 9 5 9 11 0 5-4 9-9 11-5-2-9-6-9-11 0-6 4-11 9-11z"
          fill="#FBD9E6"
          stroke="#F3B9D0"
          strokeWidth="0.6"
          transform={`rotate(${i * 72} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="6" fill="#EFA7C4" />
      {Array.from({ length: 6 }).map((_, i) => (
        <circle
          key={i}
          cx={50 + Math.cos((i * Math.PI) / 3) * 8}
          cy={50 + Math.sin((i * Math.PI) / 3) * 8}
          r="1.4"
          fill="#D96C9D"
        />
      ))}
    </g>
  )
}

const HEADS: Record<FlowerKind, () => JSX.Element> = {
  rose: RoseHead,
  daisy: DaisyHead,
  tulip: TulipHead,
  sunflower: SunflowerHead,
  lavender: LavenderHead,
  cherry: CherryHead,
}

export function Flower({
  kind,
  size = 80,
  className = '',
  animate = 'sway',
  delay = 0,
  withStem = false,
  glow = false,
}: FlowerProps) {
  const reduce = useReducedMotion()
  const Head = HEADS[kind]

  const swayClass =
    !reduce && animate === 'sway'
      ? 'origin-bottom animate-sway'
      : !reduce && animate === 'float'
        ? 'animate-float'
        : ''

  const bloomInitial =
    !reduce && (animate === 'bloom' || animate === 'grow')
      ? { scale: 0, opacity: 0, y: animate === 'grow' ? 20 : 0 }
      : false

  return (
    <motion.div
      className={`inline-block ${swayClass} ${className}`}
      style={{ width: size, height: withStem ? size * 1.6 : size }}
      initial={bloomInitial}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 140,
        damping: 12,
        delay,
      }}
    >
      <svg
        viewBox={withStem ? '0 0 100 160' : '0 0 100 100'}
        width="100%"
        height="100%"
        aria-hidden="true"
        style={glow ? { filter: 'drop-shadow(0 0 10px rgba(247,215,116,0.6))' } : undefined}
      >
        <defs>
          <radialGradient id="roseShade" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#EFA7C4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C25587" stopOpacity="0.9" />
          </radialGradient>
          <radialGradient id="daisyCenter" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#FBE7A6" />
            <stop offset="100%" stopColor="#E7B84E" />
          </radialGradient>
          <radialGradient id="sunCenter" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#A9713A" />
            <stop offset="100%" stopColor="#5F3A1A" />
          </radialGradient>
        </defs>

        {withStem && (
          <g>
            <path
              d="M50 96c0 20 0 40 0 60"
              stroke="#9CAF88"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M50 120c-10-2-18-8-22-18 12 0 20 6 22 18z"
              fill="#9CAF88"
            />
            <path
              d="M50 135c10-2 18-8 22-18-12 0-20 6-22 18z"
              fill="#8AA078"
            />
          </g>
        )}
        <g transform={withStem ? 'translate(0,0)' : ''}>
          <Head />
        </g>
      </svg>
    </motion.div>
  )
}

export default Flower
