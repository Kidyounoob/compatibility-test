import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Particles } from './Particles'

interface StageProps {
  children: ReactNode
  /** 'day' = bright garden, 'dusk' = warm sunset for the reveal. */
  mood?: 'day' | 'dusk'
  particles?: boolean
  className?: string
}

/** A full-viewport, vertically-centered scene with a botanical backdrop. */
export function Stage({
  children,
  mood = 'day',
  particles = true,
  className = '',
}: StageProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-4 py-16 ${
        mood === 'dusk' ? 'bg-garden-dusk' : 'bg-garden-day'
      } ${className}`}
    >
      {particles && <Particles />}
      <div className="relative z-20 flex w-full flex-col items-center">
        {children}
      </div>
    </motion.section>
  )
}

export default Stage
