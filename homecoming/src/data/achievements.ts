// ════════════════════════════════════════════════════════════════
//  ACHIEVEMENTS
//  Minecraft-style "Advancement made!" toasts.
//  `id` is used for localStorage — don't change ids once shipped.
// ════════════════════════════════════════════════════════════════

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
}

export const achievements: Achievement[] = [
  {
    id: 'first-question',
    title: 'First Question Answered',
    description: 'The experiment has begun.',
    icon: '🌱',
  },
  {
    id: 'flower-expert',
    title: 'Flower Expert',
    description: 'You know your flowers.',
    icon: '🌻',
  },
  {
    id: 'minecraft-scholar',
    title: 'Minecraft Scholar',
    description: 'Certified block enthusiast.',
    icon: '⛏️',
  },
  {
    id: 'flower-forest-explorer',
    title: 'Flower Forest Explorer',
    description: 'You wandered off the path.',
    icon: '🌸',
  },
  {
    id: 'compatibility-investigator',
    title: 'Compatibility Investigator',
    description: 'You clicked INVESTIGATE. Bold.',
    icon: '🔍',
  },
  {
    id: 'rare-flower',
    title: 'Found: Rare Flower',
    description: 'Something that wasn\'t supposed to be here.',
    icon: '🌺',
  },
  {
    id: 'homecoming-unlocked',
    title: 'Homecoming Unlocked',
    description: 'The real question, finally.',
    icon: '💗',
  },
  {
    id: 'developer-mode',
    title: 'Developer Mode',
    description: 'You saw behind the curtain.',
    icon: '🧑‍💻',
  },
]

/** Lookup helper. */
export const achievementById = (id: string): Achievement | undefined =>
  achievements.find((a) => a.id === id)

export default achievements
