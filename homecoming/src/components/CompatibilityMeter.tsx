import { useEffect, useState } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'

/** Counts a number up to `value`, optionally with decimals. */
export function AnimatedNumber({
  value,
  decimals = 0,
  duration = 1.4,
  delay = 0,
  suffix = '',
}: {
  value: number
  decimals?: number
  duration?: number
  delay?: number
  suffix?: string
}) {
  const reduce = useReducedMotion()
  const mv = useMotionValue(reduce ? value : 0)
  const rounded = useTransform(mv, (v) => v.toFixed(decimals) + suffix)
  const [text, setText] = useState(
    (reduce ? value : 0).toFixed(decimals) + suffix,
  )

  useEffect(() => {
    const unsub = rounded.on('change', setText)
    if (!reduce) {
      const controls = animate(mv, value, {
        duration,
        delay,
        ease: 'easeOut',
      })
      return () => {
        controls.stop()
        unsub()
      }
    }
    return unsub
  }, [value, duration, delay, reduce, mv, rounded])

  return <span>{text}</span>
}

interface CompatibilityMeterProps {
  label: string
  value: number
  delay?: number
}

export function CompatibilityMeter({
  label,
  value,
  delay = 0,
}: CompatibilityMeterProps) {
  const reduce = useReducedMotion()
  return (
    <div className="w-full">
      <div className="mb-1 flex items-baseline justify-between">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink-soft">
          {label}
        </span>
        <span className="font-mono text-sm font-bold text-rose">
          <AnimatedNumber value={value} decimals={1} delay={delay} suffix="%" />
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-sage/20">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-pink via-rose to-lavender"
          initial={reduce ? false : { width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.4, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default CompatibilityMeter
