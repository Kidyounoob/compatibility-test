import { useCallback, useEffect, useState } from 'react'

/**
 * Persist a piece of React state to localStorage.
 * Falls back gracefully if storage is unavailable (private mode, etc).
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const [storedValue, setStoredValue] = useState<T>(readValue)

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next =
          value instanceof Function ? (value as (p: T) => T)(prev) : value
        try {
          window.localStorage.setItem(key, JSON.stringify(next))
        } catch {
          /* storage unavailable — keep it in memory only */
        }
        return next
      })
    },
    [key],
  )

  // Keep multiple tabs / windows in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) setStoredValue(readValue())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key, readValue])

  return [storedValue, setValue]
}

export default useLocalStorage
