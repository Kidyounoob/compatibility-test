import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import siteConfig from '../config/siteConfig'
import { Stage } from '../components/Stage'
import { PetalEffect } from '../components/PetalEffect'
import { FlowerGarden } from '../components/FlowerGarden'
import { Confetti } from '../components/Confetti'
import { ProposalReveal } from '../components/ProposalReveal'
import { Flower, type FlowerKind } from '../components/Flower'

const TWIST_LINES = [
  'We\u2019ve analyzed the data.',
  'Our compatibility is apparently ridiculous.',
  'But there is one final test\u2026',
]

/* ── Twist sequence ──────────────────────────────────────────── */
function Twist() {
  const { setPhase, unlockAchievement, audio } = useGame()
  const [line, setLine] = useState(0)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const timers: number[] = []
    TWIST_LINES.forEach((_, i) => {
      timers.push(
        window.setTimeout(() => setLine(i + 1), 1200 + i * 2000),
      )
    })
    timers.push(
      window.setTimeout(() => setShowButton(true), 1200 + TWIST_LINES.length * 2000),
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  const cont = () => {
    unlockAchievement('homecoming-unlocked')
    audio.play('reveal')
    setPhase('proposal')
  }

  return (
    <Stage mood="dusk">
      <PetalEffect count={18} />
      <FlowerGarden density={13} />

      {/* glowing path */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-64 w-40 -translate-x-1/2 bg-gradient-to-t from-sun/50 to-transparent blur-2xl" />

      <div className="relative z-20 flex min-h-[40vh] max-w-xl flex-col items-center justify-center text-center">
        <div className="space-y-4">
          {TWIST_LINES.map((text, i) => (
            <AnimatePresence key={i}>
              {line > i && (
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-2xl font-medium text-ink sm:text-3xl"
                >
                  {text}
                </motion.p>
              )}
            </AnimatePresence>
          ))}
        </div>

        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10"
            >
              <p className="mb-5 font-display text-xl text-ink-soft">
                Would you like to complete the experiment?
              </p>
              <motion.button
                onClick={cont}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="rounded-full bg-gradient-to-r from-rose to-pink px-9 py-4 text-lg font-semibold text-white shadow-petal"
              >
                Continue
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Stage>
  )
}

/* ── Proposal ────────────────────────────────────────────────── */
function Proposal() {
  const { setHomecomingResponse, setPhase, audio } = useGame()
  const [declined, setDeclined] = useState(false)

  const onYes = () => {
    audio.play('reveal')
    setHomecomingResponse('yes')
    setPhase('celebration')
  }

  const onNo = () => {
    audio.play('click')
    setDeclined(true)
  }

  return (
    <Stage mood="dusk">
      <PetalEffect count={14} />
      <FlowerGarden density={11} />

      <div className="relative z-20 w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {!declined ? (
            <motion.div key="ask" exit={{ opacity: 0 }}>
              <ProposalReveal onYes={onYes} onNo={onNo} />
            </motion.div>
          ) : (
            <motion.div
              key="declined"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-md rounded-3xl border border-white/70 bg-white/80 p-8 text-center shadow-card backdrop-blur"
            >
              <div className="mb-3 text-4xl">🌱</div>
              <h2 className="font-display text-2xl font-semibold text-ink">
                That&rsquo;s completely okay.
              </h2>
              <p className="mt-3 text-ink-soft">
                No pressure at all — the question isn&rsquo;t going anywhere, and
                neither am I. Take your time.
              </p>
              <button
                onClick={() => setDeclined(false)}
                className="mt-6 rounded-full bg-rose px-6 py-3 text-sm font-medium text-white"
              >
                Back to the question
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Stage>
  )
}

/* ── Celebration ─────────────────────────────────────────────── */
const WREATH: { kind: FlowerKind; angle: number }[] = [
  { kind: 'rose', angle: 0 },
  { kind: 'sunflower', angle: 30 },
  { kind: 'tulip', angle: 60 },
  { kind: 'daisy', angle: 90 },
  { kind: 'lavender', angle: 120 },
  { kind: 'cherry', angle: 150 },
  { kind: 'rose', angle: 180 },
  { kind: 'daisy', angle: 210 },
  { kind: 'tulip', angle: 240 },
  { kind: 'sunflower', angle: 270 },
  { kind: 'lavender', angle: 300 },
  { kind: 'cherry', angle: 330 },
]

function Celebration() {
  const { setPhase } = useGame()

  return (
    <Stage mood="dusk">
      <Confetti />
      <PetalEffect count={30} intensity="burst" />
      <FlowerGarden density={15} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 90, damping: 14 }}
        className="relative z-20 text-center"
      >
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-sage">
          {siteConfig.copy.acceptedHeadline}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
          {siteConfig.copy.acceptedSubtitle}
        </h1>

        {/* names inside a flower wreath */}
        <div className="relative mx-auto my-10 grid h-64 w-64 place-items-center sm:h-80 sm:w-80">
          {WREATH.map((f, i) => {
            const rad = (f.angle * Math.PI) / 180
            const radius = 128
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `calc(50% + ${Math.cos(rad) * radius}px)`,
                  top: `calc(50% + ${Math.sin(rad) * radius}px)`,
                  translateX: '-50%',
                  translateY: '-50%',
                }}
                initial={{ scale: 0, opacity: 0, rotate: -30 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 140,
                  damping: 12,
                  delay: 0.3 + i * 0.08,
                }}
              >
                <Flower kind={f.kind} size={44} animate="sway" />
              </motion.div>
            )
          })}

          <div className="text-center">
            <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              {siteConfig.yourName}
            </p>
            <p className="my-1 text-2xl text-rose">+</p>
            <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              {siteConfig.herName}
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
              {siteConfig.pass.eventName} {siteConfig.homecomingYear}
            </p>
          </div>
        </div>

        <motion.button
          onClick={() => setPhase('home')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="rounded-full bg-gradient-to-r from-rose to-pink px-8 py-4 text-lg font-semibold text-white shadow-petal"
        >
          See your Homecoming pass →
        </motion.button>
      </motion.div>
    </Stage>
  )
}

/* ── Router for the reveal phases ────────────────────────────── */
export function Homecoming() {
  const { phase } = useGame()
  if (phase === 'twist') return <Twist />
  if (phase === 'proposal') return <Proposal />
  return <Celebration />
}

export default Homecoming
