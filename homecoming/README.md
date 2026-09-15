# 🌸 The Compatibility Experiment

A secret interactive love story disguised as a "Relationship Compatibility Analysis."

It looks like a playful, scientific compatibility quiz. It gets *slightly* suspicious as it goes. Then it blooms into a **Homecoming proposal** — and it's built so the same site can later become a **Prom proposal** by flipping a single value.

Everything is wrapped in a soft botanical-garden aesthetic: hand-drawn SVG flowers, a vine that grows as you answer, drifting petals, and a downloadable event pass.

---

## ✨ What it does

1. **Cinematic loading screen** — fake "system status" boot sequence.
2. **12-question quiz** — flowers, Minecraft, dates, and increasingly suspicious questions. A vine grows and blooms as she answers.
3. **Fake compatibility algorithm** — animated category meters + a rigged overall score (always 97–100%).
4. **The twist** — the atmosphere shifts to a warm sunset garden and hints there's "one unresolved variable."
5. **The proposal** — *"[Her name], will you go to HOMECOMING with me?"* with a playful (but always clickable, never guilt-trippy) NO button.
6. **Celebration** — confetti, petals, a name wreath, and a downloadable **Homecoming Pass**.
7. **Persistence** — progress, achievements, and her answer are saved in `localStorage`, so she gets a "Welcome back" on return.
8. **Future Prom chapter** — locked by default; unlock later with one config change.
9. **Extras** — Minecraft-style achievement toasts, hidden easter eggs (Konami code, dev mode, hidden flower, creeper, a secret P.S.), and an optional audio system.

---

## 🧱 Tech stack

| Purpose | Choice |
| --- | --- |
| Build tool | **Vite** |
| Framework | **React 18 + TypeScript** |
| Styling | **Tailwind CSS** |
| Animation | **Framer Motion** |
| Pass export | **html-to-image** |
| Hosting | **GitHub Pages** (via GitHub Actions) |

No backend, no database — it's a static site. All state lives in the browser's `localStorage`.

---

## 🚀 Quick start (local)

You'll need **Node.js 18+** installed.

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
# → open the printed http://localhost:5173 URL

# 3. Build for production (optional, to test the real build)
npm run build
npm run preview
```

---

## 🎨 Customize everything from one file

Open **`src/config/siteConfig.ts`**. This is your control panel:

```ts
yourName: 'Alex',            // ← your name
herName: 'Maya',             // ← her name
homecomingDate: 'October 2026',
homecomingYear: '2026',
promUnlocked: false,         // ← flip to true to reveal the Prom chapter
compatibility: { minimum: 97, maximum: 100 },  // score window
```

You can also tweak the on-screen copy (`copy: { ... }`), the pass details (`pass: { ... }`), and audio paths there.

### Change the quiz questions
Edit **`src/data/questions.ts`**. Each question is a plain object:

```ts
{
  id: 13,
  prompt: 'Your new question?',
  category: 'vibe',          // feeds a compatibility meter
  options: [
    { label: 'Option A', emoji: '🌟' },
    { label: 'Option B', flower: 'rose' },  // show a flower instead of emoji
  ],
}
```
Add or remove questions freely — the progress vine, the `QUESTION 0X / NN` counter, and scoring all adjust automatically.

### Add photos
Drop image files into **`public/photos/`**, then reference them as:
```ts
image: `${import.meta.env.BASE_URL}photos/first-date.jpg`
```
(The `import.meta.env.BASE_URL` prefix keeps paths correct on GitHub Pages.)

### Add memories
Edit **`src/data/memories.ts`** — add as many as you like:
```ts
{
  id: 'first-homecoming',
  title: 'Our First Homecoming',
  date: 'October 2026',
  description: 'The night that started it all…',
  image: `${import.meta.env.BASE_URL}photos/homecoming.jpg`, // or '' for a flower
  flower: 'sunflower',
}
```
They appear as botanical cards in the **Memories** tab and expand into a story modal.

### Change the Homecoming date / event
All in `siteConfig.ts`: `homecomingYear`, `homecomingDate`, and `pass.eventName` / `pass.venue`.

---

## 🔒 Unlock Prom later

When you're ready to turn this into a Prom proposal:

1. Open `src/config/siteConfig.ts`.
2. Change `promUnlocked: false` → `promUnlocked: true`.
3. Commit & push — GitHub Actions redeploys automatically.

The **Prom** tab unlocks with a ready-made scaffold (memories, a new analysis, photos/timeline, and a final question). Build it out using the same components — for example, reuse the proposal with a different event name:

```tsx
<ProposalReveal eventName="PROM" onYes={...} onNo={...} />
```
and generate a Prom pass with `<HomecomingPass eventName="PROM" year="2027" />`.

---

## 🎵 Add music & sound effects (optional)

Audio never autoplays — background music only starts after she taps **Begin analysis**, and everything fails silently if the files don't exist.

1. Create a **`public/audio/`** folder.
2. Add your files (any names — just match the paths in `siteConfig.ts`):
   - `background.mp3` — looping background track
   - `click.mp3`, `select.mp3`, `bloom.mp3`, `transition.mp3`, `achievement.mp3`, `reveal.mp3` — sound effects
3. Update the paths under `audio` in `siteConfig.ts` if you renamed anything.

A floating audio control (play / pause / mute / volume) appears once music starts.

---

## 🏆 Achievements & easter eggs

- **Achievements** live in `src/data/achievements.ts` and pop as Minecraft-style "Advancement made!" toasts. Unlocked ones are saved to `localStorage`.
- **Easter eggs** (`src/data/easterEggs.ts`):
  - **Konami code** (↑ ↑ ↓ ↓ ← → ← → B A) — confetti surprise
  - Type **`dev`** anywhere — developer mode overlay (shows saved state)
  - Click the **tiny flower** bottom-right five times
  - Click the **hidden creeper** bottom-left
  - Tap the **footer** on the home screen for a secret P.S.

They never interfere with normal navigation.

---

## 📦 Deploy to GitHub Pages

This repo includes a ready-to-go GitHub Actions workflow at **`.github/workflows/deploy.yml`** that builds the site and publishes it to GitHub Pages on every push to `main`.

### One-time setup

**Step 1 — Set your repo name in the Vite base path.**
Open `vite.config.ts` and change:
```ts
const REPO_NAME = 'homecoming-proposal'  // ← your GitHub repo name, exactly
```
If your repo is `github.com/yourname/my-proposal`, set it to `'my-proposal'`.
(If you use a custom domain or a `yourname.github.io` repo, set `REPO_NAME = ''`.)

**Step 2 — Create the repo & push** (see full commands below).

**Step 3 — Turn on Pages with Actions.**
On GitHub: **Settings → Pages → Build and deployment → Source → "GitHub Actions".**

That's it. Every push to `main` rebuilds and redeploys. Your site will be live at:
```
https://<your-username>.github.io/<your-repo-name>/
```

---

## 🧭 Exact deployment instructions

From inside this project folder:

```bash
# 0. (One-time) set REPO_NAME in vite.config.ts to your repo name

# 1. Initialize git
git init
git add .
git commit -m "Initial commit: compatibility experiment 🌸"
git branch -M main

# 2. Create a new EMPTY repo on github.com (no README/license),
#    then connect it — replace the URL with yours:
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# 3. Push
git push -u origin main
```

Then, on GitHub:

4. Go to **Settings → Pages**.
5. Under **Build and deployment → Source**, pick **GitHub Actions**.
6. Go to the **Actions** tab and watch the "Deploy to GitHub Pages" workflow run (about a minute).
7. When it's green, open **`https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`** — the finished site is live. 🎉

### How the GitHub Action works
`.github/workflows/deploy.yml` runs on every push to `main`:
1. **build** job — checks out the code, installs deps with `npm ci`, runs `npm run build` (Vite outputs to `dist/`), and uploads `dist/` as a Pages artifact.
2. **deploy** job — publishes that artifact to GitHub Pages.

The included `public/.nojekyll` file tells Pages to serve Vite's asset folders as-is.

---

## 📁 Project structure

```
src/
├── components/     # reusable UI: Flower, FlowerGarden, PetalEffect,
│                   # QuizCard, ProgressVine, CompatibilityMeter,
│                   # AchievementToast, MemoryCard, HomecomingPass,
│                   # ProposalReveal, AudioController, Modal, Navigation,
│                   # Confetti, Particles, Stage, EasterEggs
├── pages/          # Landing, Quiz, Results, Homecoming (twist→proposal→
│                   # celebration), Hub (home), Memories, Prom
├── data/           # questions, memories, achievements, easterEggs
├── config/         # siteConfig.ts  ← edit me
├── hooks/          # useLocalStorage, useAudio
├── utils/          # compatibility (the "algorithm"), storage
├── context/        # GameContext (global state + phases)
├── App.tsx         # phase router
├── main.tsx
└── index.css
```

---

## 🔁 Resetting for testing

Want to replay the whole thing from the loading screen? Two options:
- Type **`dev`** to open developer mode and inspect state, **or**
- Clear the site's `localStorage` in your browser dev tools (Application → Local Storage), or call `resetGame()` from `src/utils/storage.ts`.

---

## ♿ Accessibility & performance notes

- Respects **`prefers-reduced-motion`** — heavy animations are disabled for users who ask for it.
- Fully **responsive** and touch-friendly (no hover-only interactions).
- Visible keyboard focus rings; icon-only buttons have labels.

---

Made with far too many flowers, and one very specific person in mind. 🌷
