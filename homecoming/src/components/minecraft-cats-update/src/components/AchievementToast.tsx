import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGame } from '../context/GameContext'

/**
 * Queued achievements shown one at a time as a Minecraft-style
 * "Advancement Made!" toast: a blocky stone panel with an item slot,
 * sliding in from the top-right, then auto-dismissing.
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
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex w-[min(21rem,92vw)] flex-col gap-2">
      <AnimatePresence>
        {current && (
          <motion.div
            key={current.id}
            initial={{ x: 380, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 380, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="pointer-events-auto flex items-center gap-3 bg-[#48343c] px-3 py-3 text-cream"
            style={{
              // blocky, pixel-ish double border (no rounded corners → very Minecraft)
              boxShadow:
                '0 0 0 2px #2b2025, 0 0 0 4px #6b5560, 0 0 0 6px #2b2025, 0 10px 24px rgba(0,0,0,0.25)',
              imageRendering: 'pixelated',
            }}
          >
            {/* item "slot" */}
            <div
              className="grid h-12 w-12 shrink-0 place-items-center bg-[#2b2025] text-2xl"
              style={{ boxShadow: 'inset 0 0 0 2px #6b5560' }}
            >
              {current.icon}
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-sun">
                Advancement Made!
              </p>
              <p className="truncate font-mono text-sm font-bold leading-tight text-cream">
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
