import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import siteConfig from '../config/siteConfig'

/**
 * Floating audio controls. Only appears once music has been started
 * (i.e. after the first real interaction), respecting autoplay rules.
 */
export function AudioController() {
  const { audio } = useGame()
  const [open, setOpen] = useState(false)

  if (!siteConfig.audio.enabled || !audio.started) return null

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Audio settings"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/70 bg-white/80 text-lg shadow-card backdrop-blur transition hover:scale-105"
        >
          {audio.muted ? '🔇' : audio.playing ? '🎵' : '🔈'}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: -10, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 'auto' }}
              exit={{ opacity: 0, x: -10, width: 0 }}
              className="flex items-center gap-3 overflow-hidden rounded-full border border-white/70 bg-white/80 px-4 py-2 shadow-card backdrop-blur"
            >
              <button
                onClick={audio.toggle}
                className="text-sm font-medium text-ink"
                aria-label={audio.playing ? 'Pause music' : 'Play music'}
              >
                {audio.playing ? '⏸' : '▶'}
              </button>
              <button
                onClick={() => audio.setMuted(!audio.muted)}
                className="text-sm font-medium text-ink"
              >
                {audio.muted ? 'Unmute' : 'Mute'}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={audio.volume}
                onChange={(e) => audio.setVolume(Number(e.target.value))}
                aria-label="Volume"
                className="h-1 w-24 cursor-pointer accent-rose"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AudioController
