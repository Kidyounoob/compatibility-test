import { useRef, useState, type ReactNode } from 'react'
import { toPng } from 'html-to-image'
import { motion } from 'framer-motion'
import siteConfig from '../config/siteConfig'
import { Flower } from './Flower'

interface HomecomingPassProps {
  /** Override for reuse (e.g. Prom pass later). */
  eventName?: string
  year?: string
  compatibility?: number
  yourName?: string
  herName?: string
}

/**
 * A premium, downloadable event pass. Reusable — pass different props
 * to generate a Prom pass from the same component later.
 */
export function HomecomingPass({
  eventName = siteConfig.pass.eventName,
  year = siteConfig.homecomingYear,
  compatibility,
  yourName = siteConfig.yourName,
  herName = siteConfig.herName,
}: HomecomingPassProps) {
  const passRef = useRef<HTMLDivElement>(null)
  const [busy, setBusy] = useState(false)

  const score = compatibility ?? siteConfig.compatibility.maximum

  const download = async () => {
    if (!passRef.current) return
    setBusy(true)
    try {
      const dataUrl = await toPng(passRef.current, {
        pixelRatio: 3,
        cacheBust: true,
      })
      const link = document.createElement('a')
      link.download = `${eventName.toLowerCase()}-pass-${herName}.png`
      link.href = dataUrl
      link.click()
    } catch {
      /* rendering failed — ignore */
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        ref={passRef}
        initial={{ rotateX: -12, opacity: 0, y: 30 }}
        animate={{ rotateX: 0, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        className="relative w-[min(24rem,92vw)] overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-br from-blush via-white to-petal shadow-card"
      >
        {/* botanical corners */}
        <div className="pointer-events-none absolute -left-4 -top-4 opacity-50">
          <Flower kind="rose" size={72} animate="none" />
        </div>
        <div className="pointer-events-none absolute -bottom-5 -right-4 opacity-50">
          <Flower kind="sunflower" size={80} animate="none" />
        </div>

        {/* header */}
        <div className="relative border-b border-dashed border-gold/40 px-6 py-5 text-center">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-gold">
            Admit Two
          </p>
          <h3 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
            {eventName} PASS
          </h3>
        </div>

        {/* body */}
        <div className="relative grid grid-cols-[1fr_auto] gap-4 px-6 py-6">
          <div className="space-y-4">
            <Field label="Authorized for">
              <span className="font-display text-lg leading-tight text-ink">
                {yourName}
                <span className="mx-2 text-rose">+</span>
                {herName}
              </span>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Event">
                <span className="font-display text-base text-ink">
                  {eventName} {year}
                </span>
              </Field>
              <Field label="Status">
                <span className="font-mono text-sm font-bold text-sage">
                  APPROVED ✓
                </span>
              </Field>
            </div>
            <Field label="Compatibility">
              <span className="font-mono text-sm font-bold text-rose">
                {score.toFixed(1)}%
              </span>
            </Field>
          </div>

          {/* QR placeholder */}
          <div className="flex flex-col items-center justify-center">
            <div className="grid h-24 w-24 place-items-center overflow-hidden rounded-xl border border-ink/15 bg-white">
              {siteConfig.pass.qrPlaceholder ? (
                <img
                  src={siteConfig.pass.qrPlaceholder}
                  alt="QR code"
                  className="h-full w-full object-cover"
                />
              ) : (
                <QrPlaceholder />
              )}
            </div>
            <span className="mt-1 font-mono text-[0.55rem] uppercase tracking-widest text-ink-soft">
              scan me
            </span>
          </div>
        </div>

        {/* footer stub */}
        <div className="relative flex items-center justify-between border-t border-dashed border-gold/40 px-6 py-3">
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-ink-soft">
            No. {year}-{herName.slice(0, 3).toUpperCase()}
          </span>
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-ink-soft">
            {siteConfig.pass.venue}
          </span>
        </div>
      </motion.div>

      <button
        onClick={download}
        disabled={busy}
        className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream shadow-card transition hover:scale-[1.03] disabled:opacity-60"
      >
        {busy ? 'Saving…' : 'Download pass ↓'}
      </button>
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-ink-soft">
        {label}
      </p>
      <div className="mt-0.5">{children}</div>
    </div>
  )
}

/** A decorative faux-QR block used until you drop in a real one. */
function QrPlaceholder() {
  const cells = 7
  return (
    <div
      className="grid h-full w-full gap-[2px] p-1"
      style={{ gridTemplateColumns: `repeat(${cells}, 1fr)` }}
    >
      {Array.from({ length: cells * cells }).map((_, i) => {
        // deterministic pattern so it looks like a QR, not random noise
        const on = (i * 7 + (i % 5) * 3) % 3 !== 0
        return (
          <span
            key={i}
            className={on ? 'bg-ink' : 'bg-transparent'}
            style={{ borderRadius: 1 }}
          />
        )
      })}
    </div>
  )
}

export default HomecomingPass
