import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useAudio, type AudioApi } from '../hooks/useAudio'
import {
  defaultGameState,
  type GameState,
} from '../utils/storage'
import { achievementById, type Achievement } from '../data/achievements'
import siteConfig from '../config/siteConfig'

export type Phase =
  | 'landing'
  | 'quiz'
  | 'results'
  | 'twist'
  | 'proposal'
  | 'celebration'
  | 'home'

interface GameContextValue {
  state: GameState
  phase: Phase
  setPhase: (p: Phase) => void
  setAnswer: (questionId: number, answer: string) => void
  setCompatibilityScore: (score: number) => void
  setHomecomingResponse: (r: 'yes' | 'no') => void
  unlockAchievement: (id: string) => void
  toastQueue: Achievement[]
  dequeueToast: () => void
  discoverEasterEgg: (id: string) => boolean
  discoverMemory: (id: string) => void
  promUnlocked: boolean
  audio: AudioApi
  isReturning: boolean
}

const GameContext = createContext<GameContextValue | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  // In-memory only: the experience restarts fresh on every page load.
  const [state, setState] = useState<GameState>(defaultGameState)
  const audio = useAudio()

  const isReturning = state.homecomingResponse === 'yes'

  const [phase, setPhaseRaw] = useState<Phase>(() =>
    isReturning ? 'home' : 'landing',
  )

  const [toastQueue, setToastQueue] = useState<Achievement[]>([])

  const setPhase = useCallback(
    (p: Phase) => {
      setPhaseRaw(p)
      setState((prev) => ({ ...prev, furthestPhase: p }))
      audio.play('transition')
    },
    [setState, audio],
  )

  const setAnswer = useCallback(
    (questionId: number, answer: string) => {
      setState((prev) => ({
        ...prev,
        answers: { ...prev.answers, [questionId]: answer },
      }))
    },
    [setState],
  )

  const setCompatibilityScore = useCallback(
    (score: number) => {
      setState((prev) => ({
        ...prev,
        compatibilityScore: score,
        quizCompleted: true,
      }))
    },
    [setState],
  )

  const setHomecomingResponse = useCallback(
    (r: 'yes' | 'no') => {
      setState((prev) => ({ ...prev, homecomingResponse: r }))
    },
    [setState],
  )

  const unlockedThisSession = useRef<Set<string>>(new Set())

  const unlockAchievement = useCallback(
    (id: string) => {
      const def = achievementById(id)
      if (!def) return
      setState((prev) => {
        if (prev.achievements.includes(id)) return prev
        return { ...prev, achievements: [...prev.achievements, id] }
      })
      if (!unlockedThisSession.current.has(id)) {
        unlockedThisSession.current.add(id)
        setToastQueue((q) => [...q, def])
        audio.play('achievement')
      }
    },
    [setState, audio],
  )

  const dequeueToast = useCallback(() => {
    setToastQueue((q) => q.slice(1))
  }, [])

  const discoverEasterEgg = useCallback(
    (id: string): boolean => {
      let firstTime = false
      setState((prev) => {
        if (prev.easterEggs.includes(id)) return prev
        firstTime = true
        return { ...prev, easterEggs: [...prev.easterEggs, id] }
      })
      return firstTime
    },
    [setState],
  )

  const discoverMemory = useCallback(
    (id: string) => {
      setState((prev) => {
        if (prev.memoriesDiscovered.includes(id)) return prev
        return { ...prev, memoriesDiscovered:
