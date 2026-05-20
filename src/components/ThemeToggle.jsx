import { Moon, Sun, Laptop } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useState } from 'react'

export function ThemeToggle({ variant = 'default' }) {
  const { theme, resolvedTheme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const options = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Laptop },
  ]

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center rounded-xl border px-3 py-2 transition hover:border-[rgba(245,184,65,0.7)] hover:text-[color:var(--gold-500)]"
        style={{
          borderColor: 'rgba(245,184,65,0.4)',
          color: variant === 'navbar' ? '#c7d2fe' : 'var(--text-muted)',
          background: 'transparent',
        }}
        aria-label="Toggle theme"
        aria-expanded={isOpen}
      >
        {theme === 'light' && <Sun size={18} />}
        {theme === 'dark' && <Moon size={18} />}
        {theme === 'system' && <Laptop size={18} />}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border shadow-lg"
          style={{
            borderColor: 'var(--card-border)',
            background:
              variant === 'navbar'
                ? 'rgba(8,27,61,0.92)'
                : resolvedTheme === 'light'
                  ? 'rgba(255,255,255,0.98)'
                  : 'rgba(8,27,61,0.92)',
            boxShadow:
              resolvedTheme === 'light'
                ? '0 22px 40px -28px rgba(6,21,47,0.30)'
                : '0 22px 40px -28px rgba(0,0,0,0.75)',
          }}
        >
          {options.map((option) => {
            const Icon = option.icon
            const isSelected = theme === option.id
            const baseText =
              variant === 'navbar' ? '#c7d2fe' : resolvedTheme === 'light' ? 'var(--text-main)' : 'var(--text-main)'

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  toggleTheme(option.id)
                  setIsOpen(false)
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold transition"
                style={{
                  color: isSelected ? 'var(--gold-500)' : baseText,
                  background: isSelected ? 'rgba(245,184,65,0.14)' : 'transparent',
                }}
              >
                <Icon size={16} />
                {option.label}
                {isSelected && <span className="ml-auto text-xs">✓</span>}
              </button>
            )
          })}
        </div>
      )}

      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
