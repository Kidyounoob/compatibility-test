import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useAudio, type AudioApi } from '../hooks/useAudio'
import {
  STORAGE_KEY,
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
  // persisted state
  state: GameState
  // ephemeral phase (drives which screen shows)
  phase: Phase
  setPhase: (p: Phase) => void
  // answers
  setAnswer: (questionId: number, answer: string) => void
  // results
  setCompatibilityScore: (score: number) => void
  setHomecomingResponse: (r: 'yes' | 'no') => void
  // achievements
  unlockAchievement: (id: string) => void
  toastQueue: Achievement[]
  dequeueToast: () => void
  // easter eggs
  discoverEasterEgg: (id: string) => boolean
  // memories
  discoverMemory: (id: string) => void
  // prom
  promUnlocked: boolean
  // audio
  audio: AudioApi
  // meta
  isReturning: boolean
}

const GameContext = createContext<GameContextValue | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useLocalStorage<GameState>(
    STORAGE_KEY,
    defaultGameState,
  )
  const audio = useAudio()

  // Did they already finish the proposal before? (for "welcome back")
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

  // Guard so we don't re-toast an achievement unlocked this session.
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
        return { ...prev, memoriesDiscovered: [...prev.memoriesDiscovered, id] }
      })
    },
    [setState],
  )

  const value = useMemo<GameContextValue>(
    () => ({
      state,
      phase,
      setPhase,
      setAnswer,
      setCompatibilityScore,
      setHomecomingResponse,
      unlockAchievement,
      toastQueue,
      dequeueToast,
      discoverEasterEgg,
      discoverMemory,
      promUnlocked: siteConfig.promUnlocked || state.promUnlocked,
      audio,
      isReturning,
    }),
    [
      state,
      phase,
      setPhase,
      setAnswer,
      setCompatibilityScore,
      setHomecomingResponse,
      unlockAchievement,
      toastQueue,
      dequeueToast,
      discoverEasterEgg,
      discoverMemory,
      audio,
      isReturning,
    ],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGame(): GameContextValue {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within a GameProvider')
  return ctx
}
