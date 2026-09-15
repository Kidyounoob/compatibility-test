// ════════════════════════════════════════════════════════════════
//  EASTER EGGS
//  Central list of secrets + the messages they reveal.
//  Discovery is tracked in localStorage under `easterEggs`.
// ════════════════════════════════════════════════════════════════

export interface EasterEgg {
  id: string
  message: string
}

export const easterEggs: Record<string, EasterEgg> = {
  hiddenFlower: {
    id: 'hidden-flower',
    message: "You found something that wasn't supposed to be here.",
  },
  footer: {
    id: 'footer',
    message: 'Built with far too many flowers, and one very specific person in mind.',
  },
  secretFlower: {
    id: 'secret-flower',
    message: 'A rare bloom only appears once the analysis is complete.',
  },
  konami: {
    id: 'konami',
    message: 'CHEAT ACTIVATED: maximum affection enabled.',
  },
  creeper: {
    id: 'creeper',
    message: 'Aww man.',
  },
  devMode: {
    id: 'dev-mode',
    message: 'Developer mode — every value here is fake except the feelings.',
  },
  loveNote: {
    id: 'love-note',
    message: 'P.S. I really like you.',
  },
}

/** The classic Konami code sequence. */
export const konamiSequence = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export default easterEggs
