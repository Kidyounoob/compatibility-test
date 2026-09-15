import { useCallback, useEffect, useRef, useState } from 'react'
import siteConfig from '../config/siteConfig'

type Sfx = keyof typeof siteConfig.audio.sfx

/**
 * Optional audio system.
 *  • Never plays anything before the user interacts.
 *  • Background music starts only when `startMusic()` is called
 *    (we call it right after "BEGIN ANALYSIS").
 *  • SFX fail silently if the files don't exist, so you can ship
 *    without adding any audio at all.
 */
export function useAudio() {
  const musicRef = useRef<HTMLAudioElement | null>(null)
  const sfxCache = useRef<Record<string, HTMLAudioElement>>({})

  const [muted, setMuted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(siteConfig.audio.defaultVolume)
  const [started, setStarted] = useState(false)

  // Lazily create the background <audio> element.
  useEffect(() => {
    if (!siteConfig.audio.enabled) return
    const el = new Audio(siteConfig.audio.backgroundMusic)
    el.loop = true
    el.volume = volume
    el.preload = 'none'
    musicRef.current = el
    return () => {
      el.pause()
      musicRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (musicRef.current) musicRef.current.volume = muted ? 0 : volume
  }, [volume, muted])

  const startMusic = useCallback(() => {
    if (!siteConfig.audio.enabled || started) return
    setStarted(true)
    const el = musicRef.current
    if (!el) return
    el.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false)) // blocked / missing file — that's fine
  }, [started])

  const toggle = useCallback(() => {
    const el = musicRef.current
    if (!el) return
    if (el.paused) {
      el.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))
    } else {
      el.pause()
      setPlaying(false)
    }
  }, [])

  const play = useCallback(
    (name: Sfx) => {
      if (!siteConfig.audio.enabled || muted) return
      const src = siteConfig.audio.sfx[name]
      if (!src) return
      try {
        let el = sfxCache.current[name]
        if (!el) {
          el = new Audio(src)
          el.preload = 'none'
          sfxCache.current[name] = el
        }
        el.currentTime = 0
        el.volume = Math.min(1, volume + 0.15)
        el.play().catch(() => {})
      } catch {
        /* ignore */
      }
    },
    [muted, volume],
  )

  return {
    muted,
    playing,
    volume,
    started,
    setMuted,
    setVolume,
    startMusic,
    toggle,
    play,
  }
}

export type AudioApi = ReturnType<typeof useAudio>
export default useAudio
