// ════════════════════════════════════════════════════════════════
//  MEMORIES
//  Add as many as you like. Each becomes a botanical card.
//  `image` can be:
//    • a file in /public/photos  →  `${import.meta.env.BASE_URL}photos/first-date.jpg`
//    • any external URL
//    • left empty '' to show a flower illustration instead.
//  Feel free to edit any title / date / description below — the
//  dates are friendly placeholders, not real dates.
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

const photo = (name: string) => `${import.meta.env.BASE_URL}photos/${name}`

export const memories: Memory[] = [
  {
    id: 'first-date',
    title: 'Our First Date',
    date: 'Where it all began',
    description:
      'The one that started everything — sunset, the two of us, and a very good feeling about where this was going.',
    image: photo('first-date.jpg'),
    flower: 'rose',
  },
  {
    id: 'camping',
    title: 'Camping',
    date: 'Under the stars',
    description:
      'Straw hats, the open road, and nowhere either of us would rather be. Adventure tastes better with you.',
    image: photo('camping.jpg'),
    flower: 'sunflower',
  },
  {
    id: 'redwoods',
    title: 'Among the Giants',
    date: 'Adventure day',
    description:
      'Standing under trees older than everything, and still the best view was the company.',
    image: photo('redwoods.jpg'),
    flower: 'cherry',
  },
  {
    id: 'golden-hour',
    title: 'Golden Hour',
    date: 'A perfect afternoon',
    description:
      'Good light, good company. Some afternoons you just want to hold onto.',
    image: photo('golden-hour.jpg'),
    flower: 'tulip',
  },
  {
    id: 'little-moments',
    title: 'The Little Things',
    date: 'Everyday us',
    description:
      'It\u2019s the small, quiet moments that end up meaning the most.',
    image: photo('little-moments.jpg'),
    flower: 'lavender',
  },
  {
    id: 'just-us',
    title: 'Just Us',
    date: 'Any given day',
    description:
      'No occasion needed. Just you, me, and another photo for the collection.',
    image: photo('us.jpg'),
    flower: 'daisy',
  },
  {
    id: 'laughing',
    title: 'Caught Laughing',
    date: 'Can\u2019t stop',
    description:
      'Half our photos look like this, and honestly that says everything.',
    image: photo('laughing.jpg'),
    flower: 'rose',
  },
  {
    id: 'mall-day',
    title: 'Mall Day',
    date: 'Wandering around',
    description:
      'Nowhere in particular to be, wandering around together. The best kind of ordinary.',
    image: photo('mall-day.jpg'),
    flower: 'tulip',
  },
  {
    id: 'the-quiz',
    title: 'The Quiz',
    date: 'The day you read this',
    description:
      'The day a \u201ccompatibility analysis\u201d turned out to be something else entirely. Statistically, the best decision the algorithm ever made.',
    image: '',
    flower: 'lavender',
  },
]

export default memories
