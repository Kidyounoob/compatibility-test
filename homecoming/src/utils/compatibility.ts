// ════════════════════════════════════════════════════════════════
//  THE "ALGORITHM"
//  Looks sophisticated. Is entirely, gloriously rigged.
//  Every score lands in the [minimum, maximum] window from config.
// ════════════════════════════════════════════════════════════════

import siteConfig from '../config/siteConfig'
import type { QuizCategory } from '../data/questions'

export interface CategoryScore {
  key: string
  label: string
  value: number
}

/** Deterministic-ish pseudo random from a seed so re-runs feel stable. */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

/** Turn an answer string into a small numeric seed. */
function hashAnswers(answers: Record<number, string>): number {
  let h = 0
  for (const [k, v] of Object.entries(answers)) {
    const s = `${k}:${v}`
    for (let i = 0; i < s.length; i++) {
      h = (h << 5) - h + s.charCodeAt(i)
      h |= 0
    }
  }
  return Math.abs(h)
}

const CATEGORY_LABELS: Record<string, string> = {
  humor: 'Humor Compatibility',
  gaming: 'Gaming Compatibility',
  minecraft: 'Minecraft Compatibility',
  flower: 'Flower Compatibility',
  adventure: 'Adventure Compatibility',
  date: 'Date Compatibility',
  vibe: 'Vibe Compatibility',
}

/** The categories we always show, even if the quiz didn't cover them. */
const DISPLAY_ORDER: QuizCategory[] = [
  'humor',
  'gaming',
  'minecraft',
  'flower',
  'adventure',
  'date',
  'vibe',
]

function scoreIn(min: number, max: number, r: number): number {
  const raw = min + r * (max - min)
  return Math.round(raw * 10) / 10
}

export interface CompatibilityResult {
  categories: CategoryScore[]
  overall: number
}

export function calculateCompatibility(
  answers: Record<number, string>,
): CompatibilityResult {
  const { minimum, maximum } = siteConfig.compatibility
  const seed = hashAnswers(answers) || 7

  const categories: CategoryScore[] = DISPLAY_ORDER.map((key, i) => ({
    key,
    label: CATEGORY_LABELS[key] ?? key,
    // Nudge the floor up a touch so nothing ever looks bad.
    value: scoreIn(minimum, maximum, seededRandom(seed + i * 13.37)),
  }))

  // Overall is a gentle average, then clamped into the happy window.
  const avg =
    categories.reduce((sum, c) => sum + c.value, 0) / categories.length
  const overall = Math.min(
    maximum,
    Math.max(minimum, Math.round(avg * 10) / 10),
  )

  return { categories, overall }
}

/**
 * Build the animated count-up steps for the big overall reveal,
 * e.g. 94 → 96 → 97 → 98 → 98.7
 */
export function buildCountUpSteps(target: number): number[] {
  const steps: number[] = []
  let v = Math.max(0, Math.round(target) - 5)
  while (v < Math.floor(target)) {
    steps.push(v)
    v += v < target - 2 ? 2 : 1
  }
  steps.push(Math.floor(target))
  if (target % 1 !== 0) steps.push(target)
  return steps
}
