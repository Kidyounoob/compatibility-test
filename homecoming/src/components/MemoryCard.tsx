import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Memory } from '../data/memories'
import { Flower } from './Flower'
import { Modal } from './Modal'
import { PetalEffect } from './PetalEffect'

interface MemoryCardProps {
  memory: Memory
  onOpen?: (id: string) => void
}

export function MemoryCard({ memory, onOpen }: MemoryCardProps) {
  const [open, setOpen] = useState(false)

  const openCard = () => {
    setOpen(true)
    onOpen?.(memory.id)
  }

  return (
    <>
      <motion.button
        onClick={openCard}
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.98 }}
        className="group relative flex w-full flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/70 text-left shadow-card backdrop-blur transition"
      >
        <div className="relative grid h-44 place-items-center overflow-hidden bg-gradient-to-br from-petal to-cream/60">
          {memory.image ? (
            <img
              src={memory.image}
              alt={memory.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <Flower kind={memory.flower} size={92} animate="sway" />
          )}
          <span className="absolute right-3 top-3 rounded-full bg-white/80 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wide text-ink-soft">
            {memory.flower}
          </span>
        </div>
        <div className="p-5">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-ink-soft">
            {memory.date}
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold text-ink">
            {memory.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-ink-soft">
            {memory.description}
          </p>
        </div>
      </motion.button>

      <Modal open={open} onClose={() => setOpen(false)} className="max-w-xl">
        {open && <PetalEffect count={10} />}
        <div className="relative">
          <div className="relative grid h-56 place-items-center overflow-hidden bg-gradient-to-br from-petal via-blush to-cream">
            {memory.image ? (
              <img
                src={memory.image}
                alt={memory.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <Flower kind={memory.flower} size={130} animate="bloom" glow />
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-ink shadow"
          >
            ✕
          </button>
        </div>
        <div className="p-7">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-rose">
            {memory.date}
          </p>
          <h3 className="mt-1 font-display text-3xl font-semibold text-ink">
            {memory.title}
          </h3>
          <p className="mt-3 leading-relaxed text-ink-soft">
            {memory.description}
          </p>
        </div>
      </Modal>
    </>
  )
}

export default MemoryCard
