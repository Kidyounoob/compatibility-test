import { useEffect, useState } from 'react'
import { useGame } from '../context/GameContext'
import { easterEggs, konamiSequence } from '../data/easterEggs'
import { Confetti } from './Confetti'
import { Modal } from './Modal'

/** A tiny pixel Creeper face (Minecraft nod). */
function Creeper({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" aria-hidden="true">
      <rect width="8" height="8" fill="#5BA843" />
      <rect x="0" y="0" width="8" height="8" fill="url(#cg)" opacity="0.25" />
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#89d16f" />
          <stop offset="1" stopColor="#3e7a2c" />
        </linearGradient>
      </defs>
      <rect x="1" y="2" width="2" height="2" fill="#0c2a08" />
      <rect x="5" y="2" width="2" height="2" fill="#0c2a08" />
      <rect x="3" y="4" width="2" height="1" fill="#0c2a08" />
      <rect x="2" y="5" width="1" height="2" fill="#0c2a08" />
      <rect x="5" y="5" width="1" height="2" fill="#0c2a08" />
      <rect x="3" y="5" width="2" height="1" fill="#0c2a08" />
    </svg>
  )
}

export function EasterEggs() {
  const { discoverEasterEgg, unlockAchievement, state } = useGame()
  const [message, setMessage] = useState<string | null>(null)
  const [confetti, setConfetti] = useState(false)
  const [flowerClicks, setFlowerClicks] = useState(0)
  const [devOpen, setDevOpen] = useState(false)

  // ── Konami code ──────────────────────────────────────────────
  useEffect(() => {
    let buffer: string[] = []
    const onKey = (e: KeyboardEvent) => {
      buffer.push(e.key)
      buffer = buffer.slice(-konamiSequence.length)
      if (
        buffer.length === konamiSequence.length &&
        buffer.every(
          (k, i) => k.toLowerCase() === konamiSequence[i].toLowerCase(),
        )
      ) {
        discoverEasterEgg(easterEggs.konami.id)
        setMessage(easterEggs.konami.message)
        setConfetti(true)
        setTimeout(() => setConfetti(false), 3500)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [discoverEasterEgg])

  // ── Dev mode: type "dev" ────────────────────────────────────
  useEffect(() => {
    let typed = ''
    const onKey = (e: KeyboardEvent) => {
      if (e.key.length === 1) {
        typed = (typed + e.key.toLowerCase()).slice(-6)
        if (typed.endsWith('devmode') || typed.endsWith('dev')) {
          setDevOpen(true)
          discoverEasterEgg(easterEggs.devMode.id)
          unlockAchievement('developer-mode')
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [discoverEasterEgg, unlockAchievement])

  const clickHiddenFlower = () => {
    const next = flowerClicks + 1
    setFlowerClicks(next)
    if (next >= 5) {
      const firstTime = discoverEasterEgg(easterEggs.hiddenFlower.id)
      if (firstTime) unlockAchievement('rare-flower')
      setMessage(easterEggs.hiddenFlower.message)
      setFlowerClicks(0)
    }
  }

  return (
    <>
      <Confetti run={confetti} />

      {/* hidden tiny flower — bottom-right corner */}
      <button
        onClick={clickHiddenFlower}
        aria-label="a tiny flower"
        className="fixed bottom-2 right-2 z-40 text-sm opacity-30 transition hover:opacity-80"
        title="🌼"
      >
        🌼
      </button>

      {/* hidden creeper — bottom-left, above audio button */}
      <button
        onClick={() => {
          discoverEasterEgg(easterEggs.creeper.id)
          setMessage(easterEggs.creeper.message)
        }}
        aria-label="something green"
        className="fixed bottom-2 left-16 z-40 opacity-20 transition hover:opacity-80"
      >
        <Creeper />
      </button>

      {/* reveal message */}
      <Modal open={!!message} onClose={() => setMessage(null)}>
        <div className="p-8 text-center">
          <div className="mb-3 text-4xl">🌸</div>
          <p className="font-display text-xl text-ink">{message}</p>
          <button
            onClick={() => setMessage(null)}
            className="mt-5 rounded-full bg-rose px-5 py-2 text-sm font-medium text-white"
          >
            Oh.
          </button>
        </div>
      </Modal>

      {/* dev mode overlay */}
      <Modal open={devOpen} onClose={() => setDevOpen(false)} className="max-w-xl">
        <div className="p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-rose">
            Developer mode
          </p>
          <p className="mt-1 font-display text-lg text-ink">
            {easterEggs.devMode.message}
          </p>
          <pre className="mt-3 max-h-72 overflow-auto rounded-xl bg-ink/90 p-4 font-mono text-[0.7rem] leading-relaxed text-cream">
            {JSON.stringify(state, null, 2)}
          </pre>
          <button
            onClick={() => setDevOpen(false)}
            className="mt-4 rounded-full bg-ink px-5 py-2 text-sm font-medium text-cream"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  )
}

export default EasterEggs
