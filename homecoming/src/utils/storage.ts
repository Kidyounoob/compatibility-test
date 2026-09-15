// ════════════════════════════════════════════════════════════════
//  STORAGE
//  One place that owns every localStorage key + a full reset helper.
// ════════════════════════════════════════════════════════════════

export const STORAGE_KEY = 'homecoming-experiment-v1'

export interface GameState {
  answers: Record<number, string>
  quizCompleted: boolean
  compatibilityScore: number | null
  homecomingResponse: 'yes' | 'no' | null
  achievements: string[]
  memoriesDiscovered: string[]
  easterEggs: string[]
  promUnlocked: boolean
  /** Last phase reached, so we can restore the experience. */
  furthestPhase: string
}

export const defaultGameState: GameState = {
  answers: {},
  quizCompleted: false,
  compatibilityScore: null,
  homecomingResponse: null,
  achievements: [],
  memoriesDiscovered: [],
  easterEggs: [],
  promUnlocked: false,
  furthestPhase: 'landing',
}

/** Wipe everything and reload — handy for testing the full flow again. */
export function resetGame() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
  window.location.reload()
}
