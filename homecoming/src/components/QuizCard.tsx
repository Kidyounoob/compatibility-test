import { useState } from 'react'
import { motion } from 'framer-motion'
import type { QuizQuestion } from '../data/questions'
import { Flower } from './Flower'
import { useGame } from '../context/GameContext'

interface QuizCardProps {
  question: QuizQuestion
  index: number
  total: number
  initialAnswer?: string
  onAnswer: (answer: string) => void
}

export function QuizCard({
  question,
  index,
  total,
  initialAnswer,
  onAnswer,
}: QuizCardProps) {
  const { audio } = useGame()
  const [selected, setSelected] = useState<string | null>(initialAnswer ?? null)
  const number = String(index + 1).padStart(2, '0')
  const totalStr = String(total).padStart(2, '0')

  const choose = (label: string) => {
    if (selected) return
    setSelected(label)
    audio.play('select')
    // Let the bloom feedback play, then advance.
    setTimeout(() => onAnswer(label), 620)
  }

  return (
    <motion.div
      className={`relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 p-7 shadow-card backdrop-blur-md sm:p-10 ${
        question.suspicious ? 'ring-1 ring-rose/40' : ''
      }`}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 160, damping: 20 }}
    >
      {/* corner botanical flourish */}
      <div className="pointer-events-none absolute -right-6 -top-6 opacity-40">
        <Flower kind="cherry" size={90} animate="sway" />
      </div>

      <div className="mb-1 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-ink-soft">
          Question {number} / {totalStr}
        </span>
        {question.suspicious && (
          <motion.span
            className="font-mono text-[0.65rem] uppercase tracking-widest text-rose"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            ⚠ anomaly
          </motion.span>
        )}
      </div>

      <h2 className="mb-7 font-display text-2xl font-semibold leading-snug text-ink sm:text-[1.7rem]">
        {question.prompt}
      </h2>

      {question.flowerChoices ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {question.options.map((opt, i) => {
            const isSel = selected === opt.label
            return (
              <motion.button
                key={opt.label}
                onClick={() => choose(opt.label)}
                disabled={!!selected}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.96 }}
                className={`group flex flex-col items-center gap-2 rounded-2xl border p-4 transition-colors ${
                  isSel
                    ? 'border-rose bg-petal shadow-petal'
                    : 'border-transparent bg-white/60 hover:border-pink/50'
                } ${selected && !isSel ? 'opacity-40' : ''}`}
              >
                <Flower
                  kind={opt.flower ?? 'daisy'}
                  size={64}
                  animate={isSel ? 'bloom' : 'sway'}
                  glow={isSel}
                />
                <span className="font-display text-sm font-medium text-ink">
                  {opt.label}
                </span>
              </motion.button>
            )
          })}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {question.options.map((opt) => {
            const isSel = selected === opt.label
            return (
              <motion.button
                key={opt.label}
                onClick={() => choose(opt.label)}
                disabled={!!selected}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 rounded-2xl border px-5 py-4 text-left transition-colors ${
                  isSel
                    ? 'border-rose bg-petal shadow-petal'
                    : 'border-transparent bg-white/60 hover:border-pink/50 hover:bg-white/90'
                } ${selected && !isSel ? 'opacity-40' : ''}`}
              >
                {opt.flower ? (
                  <Flower kind={opt.flower} size={34} animate="none" />
                ) : (
                  <span className="text-2xl leading-none">{opt.emoji}</span>
                )}
                <span className="font-medium text-ink">{opt.label}</span>
                {isSel && (
                  <motion.span
                    layoutId={`check-${question.id}`}
                    className="ml-auto text-rose"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    ✿
                  </motion.span>
                )}
              </motion.button>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}

export default QuizCard
