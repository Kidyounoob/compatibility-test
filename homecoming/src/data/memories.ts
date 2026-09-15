// ════════════════════════════════════════════════════════════════
//  MEMORIES
//  Add as many as you like. Each becomes a botanical card.
//  `image` can be:
//    • a file you drop in /public  →  `${import.meta.env.BASE_URL}photos/first-date.jpg`
//    • any external URL
//    • left empty '' to show a flower illustration instead.
// ════════════════════════════════════════════════════════════════

import type { FlowerKind } from './questions'

export interface Memory {
  id: string
  title: string
  date: string
  description: string
  image: string
  flower: FlowerKind
}

export const memories: Memory[] = [
  {
    id: 'the-quiz',
    title: 'The Quiz',
    date: 'The day you read this',
    description:
      'The day a "compatibility analysis" turned out to be something else entirely. Statistically, the best decision the algorithm ever made.',
    image: '',
    flower: 'rose',
  },
  // ── Add your own after Homecoming, for example: ──
  // {
  //   id: 'first-homecoming',
  //   title: 'Our First Homecoming',
  //   date: 'October 2026',
  //   description: 'You wore ... and we ...',
  //   image: `${import.meta.env.BASE_URL}photos/homecoming.jpg`,
  //   flower: 'sunflower',
  // },
]

export default memories
