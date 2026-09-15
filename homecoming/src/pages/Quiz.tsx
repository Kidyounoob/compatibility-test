import { useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { questions } from '../data/questions'
import { calculateCompatibility } from '../utils/compatibility'
import { Stage } from '../components/Stage'
import { QuizCard } from '../components/QuizCard'
import { ProgressVine } from '../components/ProgressVine'
import { PetalEffect } from '../components/PetalEffect'
import { FlowerGarden } from '../components/FlowerGarden'

export function Quiz() {
  const {
    state,
    setAnswer,
    setCompatibilityScore,
    setPhase,
    unlockAchievement,
    audio,
  } = useGame()

  const [index, setIndex] = useState(0)
  const [burst, setBurst] = useState(0)

  const total = questions.length
  const current = questions[index]

  // Category totals so we know when a "themed" set is complete.
  const totals = useMemo(() => {
    const t: Record<string, number> = {}
    for (const q of questions) t[q.category] = (t[q.category] ?? 0) + 1
    return t
  }, [])

  const handleAnswer = (answer: string) => {
    setAnswer(current.id, answer)
    audio.play('bloom')
    setBurst((b) => b + 1)

    // Build the answer set including this one for achievement checks.
    const nextAnswers = { ...state.answers, [current.id]: answer }
    const answeredIds = Object.keys(nextAnswers).map(Number)

    if (answeredIds.length === 1) unlockAchievement('first-question')

    const answeredInCat = (cat: string) =>
      questions.filter(
        (q) => q.category === cat && answeredIds.includes(q.id),
      ).length

    if (answeredInCat('flower') === totals.flower) unlockAchievement('flower-expert')
    if (answeredInCat('minecraft') === totals.minecraft)
      unlockAchievement('minecraft-scholar')

    // Advance, or finish and compute the (rigged) result.
    if (index + 1 < total) {
      setTimeout(() => setIndex((i) => i + 1), 260)
    } else {
      const result = calculateCompatibility(nextAnswers)
      setCompatibilityScore(result.overall)
      setTimeout(() => setPhase('results'), 500)
    }
  }

  return (
    <Stage mood="day">
      {/* petal burst on each answer */}
      {burst > 0 && <PetalEffect key={burst} count={8} intensity="burst" />}
      <FlowerGarden density={7} ground={false} />

      <div className="relative z-20 mb-8 w-full max-w-xl">
        <ProgressVine total={total} answered={index} />
      </div>

      <div className="relative z-20 flex w-full justify-center">
        <AnimatePresence mode="wait">
          <QuizCard
            key={current.id}
            question={current}
            index={index}
            total={total}
            initialAnswer={state.answers[current.id]}
            onAnswer={handleAnswer}
          />
        </AnimatePresence>
      </div>
    </Stage>
  )
}

export default Quiz
