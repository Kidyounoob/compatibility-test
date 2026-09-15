import { motion } from 'framer-motion'

export type HubSection = 'home' | 'memories' | 'prom'

interface NavItem {
  key: HubSection
  label: string
  icon: string
  locked?: boolean
}

interface NavigationProps {
  active: HubSection
  onChange: (s: HubSection) => void
  promUnlocked: boolean
}

export function Navigation({ active, onChange, promUnlocked }: NavigationProps) {
  const items: NavItem[] = [
    { key: 'home', label: 'Homecoming', icon: '💗' },
    { key: 'memories', label: 'Memories', icon: '🌼' },
    { key: 'prom', label: 'Prom', icon: promUnlocked ? '🌷' : '🔒', locked: !promUnlocked },
  ]

  return (
    <nav className="sticky top-0 z-30 flex justify-center px-4 pt-4">
      <div className="flex items-center gap-1 rounded-full border border-white/70 bg-white/70 p-1 shadow-card backdrop-blur">
        {items.map((it) => {
          const isActive = active === it.key
          return (
            <button
              key={it.key}
              onClick={() => onChange(it.key)}
              className="relative rounded-full px-4 py-2 text-sm font-medium transition"
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-pink to-rose"
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 flex items-center gap-1.5 ${
                  isActive ? 'text-white' : 'text-ink-soft'
                }`}
              >
                <span>{it.icon}</span>
                <span className="hidden sm:inline">{it.label}</span>
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default Navigation
