import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGame } from '../context/GameContext'

/**
 * Renders queued achievements one at a time as a "Advancement made!"
 * style toast that slides in from the top-right, then auto-dismisses.
 */
export function AchievementToast() {
  const { toastQueue, dequeueToast } = useGame()
  const current = toastQueue[0]

  useEffect(() => {
    if (!current) return
    const t = setTimeout(dequeueToast, 4200)
    return () => clearTimeout(t)
  }, [current, dequeueToast])

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex w-[min(20rem,90vw)] flex-col gap-2">
      <AnimatePresence>
        {current && (
          <motion.div
            key={current.id}
            initial={{ x: 360, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 360, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="pointer-events-auto flex items-center gap-3 rounded-lg border border-gold/40 bg-[#3a2c33]/95 px-4 py-3 text-cream shadow-card backdrop-blur"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-sage/30 text-2xl">
              {current.icon}
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-sun">
                Advancement made!
              </p>
              <p className="truncate font-display text-base font-semibold leading-tight text-cream">
                {current.title}
              </p>
              <p className="truncate text-xs text-cream/70">
                {current.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AchievementToast
