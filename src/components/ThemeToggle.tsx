import { Moon, Sun } from '@phosphor-icons/react'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      aria-pressed={isDark}
      title={isDark ? 'Modo claro' : 'Modo escuro'}
      className="cursor-pointer rounded-md bg-base-button p-2 text-purple-dark transition-colors hover:bg-base-hover"
    >
      {isDark ? (
        <Sun size={22} weight="fill" aria-hidden />
      ) : (
        <Moon size={22} weight="fill" aria-hidden />
      )}
    </button>
  )
}
