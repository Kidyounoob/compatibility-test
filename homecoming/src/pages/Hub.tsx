import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import siteConfig from '../config/siteConfig'
import { Navigation, type HubSection } from '../components/Navigation'
import { HomecomingPass } from '../components/HomecomingPass'
import { Particles } from '../components/Particles'
import { Flower } from '../components/Flower'
import { Memories } from './Memories'
import { Prom } from './Prom'

function Summary() {
  const { state, promUnlocked } = useGame()
  const score = state.compatibilityScore ?? siteConfig.compatibility.maximum

  return (
    <div className="relative z-20 mx-auto w-full max-w-3xl px-4 py-10">
      <header className="mb-8 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-sage">
          Homecoming status: COMPLETE ✓
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
          Welcome back, <span className="text-rose">{siteConfig.herName}.</span>
        </h1>
        <p className="mt-3 text-ink-soft">
          {siteConfig.yourName} &amp; {siteConfig.herName} — going to{' '}
          {siteConfig.pass.eventName} {siteConfig.homecomingYear}.
        </p>
      </header>

      <div className="flex justify-center">
        <HomecomingPass compatibility={score} />
      </div>

      {/* Next chapter teaser */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 overflow-hidden rounded-3xl border border-white/70 bg-white/60 p-8 text-center shadow-card backdrop-blur"
      >
        <div className="mx-auto mb-2 w-10">
          <Flower kind="tulip" size={40} animate="sway" />
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-soft">
          Next chapter detected
        </p>
        <h2 className="mt-1 font-display text-3xl font-semibold text-ink">
          {promUnlocked ? 'Prom is open 🌷' : 'Prom — locked 🔒'}
        </h2>
        <p className="mt-2 text-ink-soft">
          {promUnlocked
            ? 'A new story is waiting in the Prom tab.'
            : 'Some things are worth waiting for.'}
        </p>
      </motion.div>
    </div>
  )
}

export function Hub() {
  const { promUnlocked, discoverEasterEgg } = useGame()
  const [section, setSection] = useState<HubSection>('home')
  const [showNote, setShowNote] = useState(false)

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-garden-day pb-16">
      <Particles />
      <Navigation
        active={section}
        onChange={setSection}
        promUnlocked={promUnlocked}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={section}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
        >
          {section === 'home' && <Summary />}
          {section === 'memories' && <Memories />}
          {section === 'prom' && <Prom />}
        </motion.div>
      </AnimatePresence>

      {/* footer with hidden love note */}
      <footer className="relative z-20 mt-8 pb-6 text-center">
        <button
          onClick={() => {
            const first = discoverEasterEgg('love-note')
            setShowNote(true)
            void first
          }}
          className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-soft/60 transition hover:text-rose"
        >
          made with far too many flowers
        </button>
        <AnimatePresence>
          {showNote && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 font-display text-lg italic text-rose"
            >
              {siteConfig.copy.hiddenLoveNote}
            </motion.p>
          )}
        </AnimatePresence>
      </footer>
    </div>
  )
}

export default Hub
