// ════════════════════════════════════════════════════════════════
//  ACHIEVEMENTS  —  Minecraft "Advancement made!" style.
//  Titles borrow the spirit of real Minecraft advancements.
//  `id` is used internally — DON'T change ids once shipped.
//  (You can freely edit title / description / icon.)
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
    title: 'Taking Inventory',
    description: 'Answer your first question.',
    icon: '🎒',
  },
  {
    id: 'flower-expert',
    title: 'A Seedy Place',
    description: 'You know every flower in the biome.',
    icon: '🌻',
  },
  {
    id: 'minecraft-scholar',
    title: 'Diamonds!',
    description: 'Certified block enthusiast.',
    icon: '💎',
  },
  {
    id: 'flower-forest-explorer',
    title: 'Adventuring Time',
    description: 'You wandered into the Flower Forest.',
    icon: '🌸',
  },
  {
    id: 'compatibility-investigator',
    title: 'What Have You Done?',
    description: 'You clicked INVESTIGATE. Bold.',
    icon: '🔍',
  },
  {
    id: 'rare-flower',
    title: 'Rare Drop!',
    description: 'Something that wasn’t supposed to spawn.',
    icon: '🌺',
  },
  {
    id: 'homecoming-unlocked',
    title: 'Best Friends Forever',
    description: 'The real question, finally.',
    icon: '💗',
  },
  {
    id: 'developer-mode',
    title: 'How Did We Get Here?',
    description: 'You saw behind the curtain.',
    icon: '🛠️',
  },
  {
    id: 'cat-whisperer',
    title: 'A Complete Catalogue',
    description: 'You found the cat. Obviously there’s a cat.',
    icon: '🐈',
  },
]

/** Lookup helper. */
export const achievementById = (id: string): Achievement | undefined =>
  achievements.find((a) => a.id === id)

export default achievements
