import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { calculateCompatibility } from '../utils/compatibility'
import siteConfig from '../config/siteConfig'
import { Stage } from '../components/Stage'
import { CompatibilityMeter, AnimatedNumber } from '../components/CompatibilityMeter'
import { Flower } from '../components/Flower'

export function Results() {
  const { state, setPhase, unlockAchievement, audio } = useGame()
  const result = useMemo(
    () => calculateCompatibility(state.answers),
    [state.answers],
  )

  // Reveal steps: 0 meters → 1 overall → 2 teaser → 3 unresolved
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 2400),
      setTimeout(() => {
        setStep(2)
        audio.play('reveal')
      }, 4200),
      setTimeout(() => setStep(3), 6000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [audio])

  const investigate = () => {
    unlockAchievement('compatibility-investigator')
    audio.play('click')
    setPhase('twist')
  }

  return (
    <Stage mood="day">
      <div className="relative z-20 w-full max-w-xl">
        <div className="mb-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-soft">
            Compatibility breakdown
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-ink">
            Running the numbers…
          </h2>
        </div>

        {/* category meters */}
        <div className="space-y-4 rounded-3xl border border-white/70 bg-white/70 p-6 shadow-card backdrop-blur">
          {result.categories.map((c, i) => (
            <CompatibilityMeter
              key={c.key}
              label={c.label}
              value={c.value}
              delay={i * 0.18}
            />
          ))}
        </div>

        {/* overall reveal */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-soft">
                Compatibility analysis complete
              </p>
              <div className="relative mt-2 flex items-center justify-center">
                <div className="pointer-events-none absolute -left-6 opacity-60">
                  <Flower kind="daisy" size={48} animate="sway" />
                </div>
                <span className="bg-gradient-to-r from-rose to-lavender bg-clip-text font-display text-7xl font-bold text-transparent">
                  <AnimatedNumber
                    value={result.overall}
                    decimals={1}
                    duration={2}
                    suffix="%"
                  />
                </span>
                <div className="pointer-events-none absolute -right-6 opacity-60">
                  <Flower kind="rose" size={48} animate="sway" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* teaser line */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center font-display text-xl italic text-ink"
            >
              {siteConfig.copy.resultTeaser}
            </motion.p>
          )}
        </AnimatePresence>

        {/* unresolved variable + investigate */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center"
            >
              <p className="mx-auto max-w-md text-ink-soft">
                {siteConfig.copy.unresolvedVariable}
              </p>
              <motion.button
                onClick={investigate}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                animate={{ boxShadow: ['0 0 0 rgba(217,108,157,0)', '0 0 30px rgba(217,108,157,0.5)', '0 0 0 rgba(217,108,157,0)'] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-5 rounded-full bg-ink px-8 py-3.5 text-base font-semibold text-cream"
              >
                Investigate
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Stage>
  )
}

export default Results
