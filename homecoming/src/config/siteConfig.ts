// ════════════════════════════════════════════════════════════════
//  SITE CONFIG  —  edit almost everything about the experience here.
//  You should rarely need to touch the components.
// ════════════════════════════════════════════════════════════════

export const siteConfig = {
  // ── The people ──────────────────────────────────────────────
  yourName: 'Aiden',
  herName: 'Sadie',

  // ── The events ──────────────────────────────────────────────
  homecomingYear: '2026',
  homecomingDate: 'October 2026',
  promYear: '2027',
  promDate: 'Spring 2027',

  // ── Chapter unlock ──────────────────────────────────────────
  //  Flip this to `true` later to reveal the Prom chapter.
  promUnlocked: false,

  // ── Fake compatibility algorithm tuning ─────────────────────
  //  The final score is randomised between these two values so it
  //  always looks scientific, and always adores her.
  compatibility: {
    minimum: 97,
    maximum: 100,
  },

  // ── Copy you might want to tweak ────────────────────────────
  copy: {
    disclaimer:
      'Results are calculated using highly sophisticated and definitely legitimate science.',
    resultTeaser: "That's… higher than expected.",
    unresolvedVariable:
      'However, the analysis has detected one unresolved variable.',
    proposalQuestion: 'Will you go to HOMECOMING with me?',
    acceptedHeadline: 'HOMECOMING ACCEPTED',
    acceptedSubtitle: 'Looks like we have a date.',
    hiddenLoveNote: 'P.S. I really like you.',
  },

  // ── Audio ───────────────────────────────────────────────────
  //  Drop your own files into /public and update the paths.
  //  Music never autoplays before the first interaction.
  audio: {
    enabled: true,
    // Background track begins after "BEGIN ANALYSIS" is clicked.
    backgroundMusic: `${import.meta.env.BASE_URL}audio/background.mp3`,
    defaultVolume: 0.4,
    // Sound effects (all optional — missing files fail silently).
    sfx: {
      click: `${import.meta.env.BASE_URL}audio/click.mp3`,
      select: `${import.meta.env.BASE_URL}audio/select.mp3`,
      bloom: `${import.meta.env.BASE_URL}audio/bloom.mp3`,
      transition: `${import.meta.env.BASE_URL}audio/transition.mp3`,
      achievement: `${import.meta.env.BASE_URL}audio/achievement.mp3`,
      reveal: `${import.meta.env.BASE_URL}audio/reveal.mp3`,
    },
  },

  // ── Homecoming pass ─────────────────────────────────────────
  pass: {
    eventName: 'HOMECOMING',
    venue: 'The Grand Hall',
    // Any image URL works. Leave as a data-URI placeholder for now.
    qrPlaceholder: '', // e.g. `${import.meta.env.BASE_URL}qr.png`
  },
}

export type SiteConfig = typeof siteConfig
export default siteConfig
