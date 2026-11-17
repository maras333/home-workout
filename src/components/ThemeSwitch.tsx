import { Monitor, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useText } from '@/language'
import { useTheme } from '@/theme'

const ICONS = { system: Monitor, light: Sun, dark: Moon }

/** One button showing the current Theme choice; each press moves to the next one. */
export function ThemeSwitch() {
  const { theme, next } = useTheme()
  const text = useText().theme
  const Icon = ICONS[theme]
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={next}
      aria-label={`${text.name}: ${text.choices[theme]}`}
      className="-my-2"
    >
      <Icon aria-hidden="true" />
    </Button>
  )
}
