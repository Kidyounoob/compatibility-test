import { AnimatePresence } from 'framer-motion'
import { GameProvider, useGame } from './context/GameContext'
import { Landing } from './pages/Landing'
import { Quiz } from './pages/Quiz'
import { Results } from './pages/Results'
import { Homecoming } from './pages/Homecoming'
import { Hub } from './pages/Hub'
import { AchievementToast } from './components/AchievementToast'
import { AudioController } from './components/AudioController'
import { EasterEggs } from './components/EasterEggs'

function Experience() {
  const { phase } = useGame()

  return (
    <AnimatePresence mode="wait">
      {phase === 'landing' && <Landing key="landing" />}
      {phase === 'quiz' && <Quiz key="quiz" />}
      {phase === 'results' && <Results key="results" />}
      {(phase === 'twist' ||
        phase === 'proposal' ||
        phase === 'celebration') && <Homecoming key="reveal" />}
      {phase === 'home' && <Hub key="home" />}
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <GameProvider>
      <main className="relative">
        <Experience />
      </main>
      {/* Global overlays live above every phase */}
      <AchievementToast />
      <AudioController />
      <EasterEggs />
    </GameProvider>
  )
}
