import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import siteConfig from '../config/siteConfig'
import { Flower } from '../components/Flower'
import { FlowerGarden } from '../components/FlowerGarden'
import { HomecomingPass } from '../components/HomecomingPass'

export function Prom() {
  const { promUnlocked } = useGame()

  if (!promUnlocked) {
    // ── Locked teaser ─────────────────────────────────────────
    return (
      <div className="relative z-20 mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-center justify-center px-4 py-12 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="grid h-24 w-24 place-items-center rounded-full border border-white/70 bg-white/70 text-4xl shadow-card backdrop-blur"
        >
          🔒
        </motion.div>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-ink-soft">
          Next chapter
        </p>
        <h2 className="mt-2 font-display text-4xl font-semibold text-ink">
          PROM
        </h2>
        <p className="mt-1 font-mono text-sm font-bold text-rose">LOCKED 🔒</p>
        <p className="mt-5 max-w-sm font-display text-xl italic text-ink-soft">
          Some things are worth waiting for.
        </p>
        <p className="mt-6 text-sm text-ink-soft/80">
          (Psst — flip{' '}
          <code className="rounded bg-white/70 px-1.5 py-0.5 font-mono text-xs">
            promUnlocked: true
          </code>{' '}
          in <code className="font-mono text-xs">siteConfig.ts</code> when
          you&rsquo;re ready.)
        </p>
      </div>
    )
  }

  // ── Unlocked scaffold (ready for you to fill in later) ──────
  return (
    <div className="relative z-20 mx-auto w-full max-w-3xl px-4 py-12">
      <FlowerGarden density={9} />
      <div className="text-center">
        <div className="mx-auto mb-2 w-12">
          <Flower kind="tulip" size={48} animate="bloom" glow />
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-sage">
          Chapter two
        </p>
        <h2 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
          Prom {siteConfig.promYear}
        </h2>
        <p className="mt-3 text-ink-soft">
          The garden kept growing. Here&rsquo;s where the next story lives.
        </p>
      </div>

      {/* Placeholder sections — build these out when the time comes. */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <PlaceholderPanel
          title="Homecoming memories"
          body="Pull your favourite moments in from src/data/memories.ts."
          flower="rose"
        />
        <PlaceholderPanel
          title="A new analysis"
          body="Add fresh questions to a second quiz set for round two."
          flower="sunflower"
        />
        <PlaceholderPanel
          title="Photos & timeline"
          body="Drop images into /public/photos and reference them here."
          flower="cherry"
        />
        <PlaceholderPanel
          title="The final question"
          body="Reuse ProposalReveal with eventName='PROM'."
          flower="lavender"
        />
      </div>

      <div className="mt-12 flex flex-col items-center">
        <p className="mb-4 font-display text-xl text-ink">A pass for the next one:</p>
        <HomecomingPass
          eventName="PROM"
          year={siteConfig.promYear}
          compatibility={siteConfig.compatibility.maximum}
        />
      </div>
    </div>
  )
}

function PlaceholderPanel({
  title,
  body,
  flower,
}: {
  title: string
  body: string
  flower: 'rose' | 'sunflower' | 'cherry' | 'lavender'
}) {
  return (
    <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-card backdrop-blur">
      <div className="mb-2 w-10">
        <Flower kind={flower} size={40} animate="sway" />
      </div>
      <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-ink-soft">{body}</p>
    </div>
  )
}

export default Prom
