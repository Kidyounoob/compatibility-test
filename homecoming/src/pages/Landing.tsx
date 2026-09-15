import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import siteConfig from '../config/siteConfig'
import { Stage } from '../components/Stage'
import { FlowerGarden } from '../components/FlowerGarden'
import { Flower } from '../components/Flower'

const SYSTEMS = [
  'Relationship database',
  'Memory database',
  'Flower database',
  'Compatibility algorithm',
]

export function Landing() {
  const { setPhase, audio, isReturning, state } = useGame()
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(isReturning) // returning users skip the loader
  const [online, setOnline] = useState<number>(isReturning ? SYSTEMS.length : 0)

  // Fake boot sequence.
  useEffect(() => {
    if (isReturning) return
    const start = Date.now()
    const duration = 2600
    const tick = () => {
      const p = Math.min(100, ((Date.now() - start) / duration) * 100)
      setProgress(p)
      setOnline(Math.min(SYSTEMS.length, Math.floor((p / 100) * SYSTEMS.length + 0.001)))
      if (p < 100) requestAnimationFrame(tick)
      else setTimeout(() => setReady(true), 500)
    }
    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isReturning])

  const begin = () => {
    audio.startMusic()
    audio.play('click')
    setPhase('quiz')
  }

  return (
    <Stage mood="day">
      <FlowerGarden density={11} />

      <AnimatePresence mode="wait">
        {!ready ? (
          // ── Cinematic loader ──────────────────────────────
          <motion.div
            key="loader"
            exit={{ opacity: 0, y: -20 }}
            className="relative z-20 w-full max-w-md text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              className="mx-auto mb-6 w-16"
            >
              <Flower kind="rose" size={64} animate="none" glow />
            </motion.div>

            <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-soft">
              Initializing compatibility analysis…
            </p>

            <div className="mx-auto mt-4 h-3 w-full overflow-hidden rounded-full border border-white/70 bg-white/50">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-pink via-rose to-lavender"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-1 font-mono text-sm font-bold text-rose">
              {Math.floor(progress)}%
            </p>

            <div className="mt-6 space-y-1.5 rounded-2xl border border-white/60 bg-white/50 p-4 text-left backdrop-blur">
              <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-widest text-ink-soft">
                System status
              </p>
              {SYSTEMS.map((s, i) => (
                <div
                  key={s}
                  className="flex items-center justify-between font-mono text-xs text-ink"
                >
                  <span>{s}</span>
                  <span
                    className={
                      i < online ? 'font-bold text-sage' : 'text-ink-soft/50'
                    }
                  >
                    {i < online ? 'CONNECTED' : '…'}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          // ── Welcome ───────────────────────────────────────
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 90, damping: 16 }}
            className="relative z-20 max-w-lg text-center"
          >
            {isReturning && (
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-sage">
                Homecoming status: COMPLETE ✓
              </p>
            )}

            <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
              {isReturning ? 'Welcome back,' : 'Welcome,'}{' '}
              <span className="text-rose">{siteConfig.herName}.</span>
            </h1>

            <p className="mt-4 text-lg text-ink-soft">
              {isReturning
                ? 'A new chapter may be waiting for you.'
                : 'Before we begin, please answer these questions as honestly as possible.'}
            </p>

            <p className="mx-auto mt-3 max-w-sm font-mono text-xs italic text-ink-soft/80">
              {siteConfig.copy.disclaimer}
            </p>

            <div className="mt-8 flex flex-col items-center gap-3">
              <motion.button
                onClick={begin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="rounded-full bg-gradient-to-r from-rose to-pink px-9 py-4 text-lg font-semibold text-white shadow-petal"
              >
                {isReturning ? 'Enter the garden' : 'Begin analysis'}
              </motion.button>

              {isReturning && state.homecomingResponse === 'yes' && (
                <button
                  onClick={() => setPhase('home')}
                  className="text-sm font-medium text-ink-soft underline underline-offset-4 hover:text-rose"
                >
                  Skip to my Homecoming pass →
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Stage>
  )
}

export default Landing
