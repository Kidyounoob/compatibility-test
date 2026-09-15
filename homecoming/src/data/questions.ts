// ════════════════════════════════════════════════════════════════
//  QUIZ QUESTIONS
//  Edit freely. Add or remove questions and the progress vine,
//  scoring and "QUESTION 0X / NN" counter all adjust automatically.
//
//  `category` tags feed the fake compatibility meters.
//  `flower` (optional) renders a flower illustration next to options.
// ════════════════════════════════════════════════════════════════

export type QuizCategory =
  | 'minecraft'
  | 'flower'
  | 'adventure'
  | 'gaming'
  | 'date'
  | 'humor'
  | 'vibe'

export type FlowerKind =
  | 'rose'
  | 'daisy'
  | 'tulip'
  | 'sunflower'
  | 'lavender'
  | 'cherry'

export interface QuizOption {
  label: string
  /** Optional flower illustration to render beside this option. */
  flower?: FlowerKind
  /** Optional emoji shown beside the label. */
  emoji?: string
}

export interface QuizQuestion {
  id: number
  prompt: string
  category: QuizCategory
  /** When true, options render as large flower cards. */
  flowerChoices?: boolean
  /** Makes the card feel a little more "off" as the quiz turns. */
  suspicious?: boolean
  options: QuizOption[]
}

export const questions: QuizQuestion[] = [
  {
    id: 1,
    prompt: 'What is your favorite Minecraft mob?',
    category: 'minecraft',
    options: [
      { label: 'Wolf', emoji: '🐺' },
      { label: 'Cat', emoji: '🐈' },
      { label: 'Axolotl', emoji: '🦎' },
      { label: 'Allay', emoji: '💙' },
    ],
  },
  {
    id: 2,
    prompt:
      'If you could have an unlimited supply of one flower, which would you choose?',
    category: 'flower',
    options: [
      { label: 'Roses', flower: 'rose' },
      { label: 'Tulips', flower: 'tulip' },
      { label: 'Sunflowers', flower: 'sunflower' },
      { label: 'Lilies', flower: 'daisy' },
    ],
  },
  {
    id: 3,
    prompt: "What's your ideal date?",
    category: 'date',
    options: [
      { label: 'Movie night', emoji: '🎬' },
      { label: 'Going somewhere together', emoji: '🚗' },
      { label: 'Staying home and playing games', emoji: '🎮' },
      { label: 'Exploring somewhere new', emoji: '🧭' },
    ],
  },
  {
    id: 4,
    prompt: 'Who would survive longer in a Minecraft world?',
    category: 'minecraft',
    options: [
      { label: 'Me', emoji: '⛏️' },
      { label: 'You', emoji: '🗡️' },
      { label: "We'd probably both die immediately", emoji: '💀' },
      { label: 'The Minecraft wolf', emoji: '🐺' },
    ],
  },
  {
    id: 5,
    prompt: "What's better?",
    category: 'vibe',
    options: [
      { label: 'Sunrise', emoji: '🌅' },
      { label: 'Sunset', emoji: '🌇' },
      { label: 'Both', emoji: '🌄' },
      { label: 'Sleeping through both', emoji: '😴' },
    ],
  },
  {
    id: 6,
    prompt: 'Choose a flower that best matches your personality.',
    category: 'flower',
    flowerChoices: true,
    options: [
      { label: 'Rose', flower: 'rose' },
      { label: 'Daisy', flower: 'daisy' },
      { label: 'Sunflower', flower: 'sunflower' },
      { label: 'Lavender', flower: 'lavender' },
    ],
  },
  {
    id: 7,
    prompt: 'If we had a completely free day together, what would you choose?',
    category: 'adventure',
    options: [
      { label: 'Go on an adventure', emoji: '🗺️' },
      { label: 'Stay in and watch movies', emoji: '🍿' },
      { label: 'Play games together', emoji: '🎮' },
      { label: 'Completely improvise', emoji: '🎲' },
    ],
  },
  {
    id: 8,
    prompt:
      "Who is more likely to say 'we should probably go home' and then stay another three hours?",
    category: 'humor',
    options: [
      { label: 'Me', emoji: '🙋' },
      { label: 'You', emoji: '👉' },
      { label: 'Both of us', emoji: '🤝' },
      { label: 'Neither of us', emoji: '🤷' },
    ],
  },
  {
    id: 9,
    prompt: 'If our relationship were a Minecraft build, what would it be?',
    category: 'minecraft',
    options: [
      { label: 'Cozy cottage', emoji: '🏡' },
      { label: 'Giant castle', emoji: '🏰' },
      { label: 'Flower garden', emoji: '🌷' },
      { label: 'Completely unfinished dirt house', emoji: '🟫' },
    ],
  },
  {
    id: 10,
    prompt: "Pick a flower you'd want someone to give you.",
    category: 'flower',
    flowerChoices: true,
    options: [
      { label: 'Rose', flower: 'rose' },
      { label: 'Tulip', flower: 'tulip' },
      { label: 'Daisy', flower: 'daisy' },
      { label: 'Sunflower', flower: 'sunflower' },
    ],
  },
  {
    id: 11,
    prompt: 'What sounds like the best evening?',
    category: 'vibe',
    options: [
      { label: 'Stargazing', emoji: '✨' },
      { label: 'Movie night', emoji: '🎬' },
      { label: 'Gaming together', emoji: '🎮' },
      { label: 'Going somewhere together', emoji: '🌙' },
    ],
  },
  {
    id: 12,
    prompt: 'What do you think this quiz is actually for?',
    category: 'humor',
    suspicious: true,
    options: [
      { label: 'A normal compatibility test', emoji: '📊' },
      { label: 'A Minecraft personality test', emoji: '🎮' },
      { label: 'Something involving flowers', emoji: '🌸' },
      { label: "I don't trust you anymore", emoji: '🧐' },
    ],
  },
]

export default questions
