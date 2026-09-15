import { useGame } from '../context/GameContext'
import { memories } from '../data/memories'
import { MemoryCard } from '../components/MemoryCard'
import { Flower } from '../components/Flower'

export function Memories() {
  const { discoverMemory } = useGame()

  return (
    <div className="relative z-20 mx-auto w-full max-w-4xl px-4 py-10">
      <header className="mb-8 text-center">
        <div className="mx-auto mb-2 w-12">
          <Flower kind="lavender" size={48} animate="sway" />
        </div>
        <h2 className="font-display text-3xl font-semibold text-ink">
          Our garden of memories
        </h2>
        <p className="mt-2 text-ink-soft">
          Every bloom is a moment. More will grow here over time.
        </p>
      </header>

      {memories.length === 0 ? (
        <p className="text-center text-ink-soft">
          No memories planted yet — add some in{' '}
          <code className="rounded bg-white/70 px-1.5 py-0.5 font-mono text-sm">
            src/data/memories.ts
          </code>
          .
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {memories.map((m) => (
            <MemoryCard key={m.id} memory={m} onOpen={discoverMemory} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Memories
