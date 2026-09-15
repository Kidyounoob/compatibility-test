import { useState } from 'react'
import { motion } from 'framer-motion'
import siteConfig from '../config/siteConfig'
import { Flower, type FlowerKind } from './Flower'

interface ProposalRevealProps {
  eventName?: string
  onYes: () => void
  onNo: () => void
}

const NO_MESSAGES = [
  'No',
  'Are you sure?',
  'Really?',
  'The compatibility algorithm strongly disagrees.',
]

// Flowers that bloom in a ring around the question.
const RING: { kind: FlowerKind; angle: number; r: number; size: number }[] = [
  { kind: 'rose', angle: -90, r: 46, size: 54 },
  { kind: 'sunflower', angle: -40, r: 48, size: 58 },
  { kind: 'tulip', angle: 20, r: 47, size: 50 },
  { kind: 'lavender', angle: 70, r: 46, size: 50 },
  { kind: 'daisy', angle: 130, r: 48, size: 52 },
  { kind: 'cherry', angle: -150, r: 47, size: 48 },
  { kind: 'rose', angle: 175, r: 45, size: 46 },
  { kind: 'daisy', angle: -12, r: 50, size: 44 },
]

export function ProposalReveal({
  eventName = siteConfig.pass.eventName,
  onYes,
  onNo,
}: ProposalRevealProps) {
  const [noIndex, setNoIndex] = useState(0)

  const advanceNo = () =>
    setNoIndex((i) => Math.min(i + 1, NO_MESSAGES.length - 1))

  return (
    <div className="relative flex flex-col items-center text-center">
      {/* blooming flower ring around the question */}
      <div className="pointer-events-none absolute left-1/2 top-[42%] h-0 w-0">
        {RING.map((f, i) => {
          const rad = (f.angle * Math.PI) / 180
          const x = Math.cos(rad) * f.r * 5
          const y = Math.sin(rad) * f.r * 3.2
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: x, top: y, translateX: '-50%', translateY: '-50%' }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 140,
                damping: 12,
                delay: 0.4 + i * 0.12,
              }}
            >
              <Flower kind={f.kind} size={f.size} animate="sway" />
            </motion.div>
          )
        })}
      </div>

      <motion.p
        className="relative z-10 font-display text-2xl font-medium text-ink sm:text-3xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {siteConfig.herName},
      </motion.p>

      <motion.h1
        className="relative z-10 mt-3 font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        Will you go to
      </motion.h1>

      <motion.div
        className="relative z-10 my-2"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.6 }}
      >
        <span className="bg-gradient-to-r from-rose via-pink to-lavender bg-clip-text font-display text-[3.4rem] font-bold leading-none tracking-tight text-transparent sm:text-[5.5rem]">
          {eventName}
        </span>
      </motion.div>

      <motion.h1
        className="relative z-10 font-display text-4xl font-semibold text-ink sm:text-5xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
      >
        with me?
      </motion.h1>

      <motion.div
        className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          onClick={onYes}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="rounded-full bg-gradient-to-r from-rose to-pink px-10 py-4 text-lg font-semibold text-white shadow-petal transition"
        >
          YES 💗
        </motion.button>

        <motion.button
          onClick={onNo}
          onMouseEnter={advanceNo}
          onFocus={advanceNo}
          whileTap={{ scale: 0.96 }}
          className="rounded-full border border-ink/20 bg-white/70 px-7 py-4 text-base font-medium text-ink-soft backdrop-blur transition hover:bg-white"
        >
          {NO_MESSAGES[noIndex]}
        </motion.button>
      </motion.div>
    </div>
  )
}

export default ProposalReveal
