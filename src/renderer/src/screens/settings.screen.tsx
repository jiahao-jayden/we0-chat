import { SettingsPanel } from '@/components/Settings/provider-panel'
import { Button } from '@/components/ui/button'
import { SIDEBAR_WIDTH } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { Cloud, User } from 'lucide-react'
import { useState } from 'react'

type SettingsItemType = 'provider' | 'account'

const SETTINGS_ITEMS: { id: SettingsItemType; icon: React.ReactNode; label: string }[] = [
  {
    id: 'provider',
    icon: <Cloud className="size-5 stroke-accent-foreground/70" />,
    label: 'Provider'
  },
  {
    id: 'account',
    icon: <User className="size-5 stroke-accent-foreground/70" />,
    label: 'Account'
  }
]
export default function SettingsScreen() {
  const [selectedItem, setSelectedItem] = useState<SettingsItemType>('provider')
  const ItemButton = ({
    children,
    id,
    ...props
  }: React.ComponentProps<typeof Button> & { id: SettingsItemType }) => {
    return (
      <Button
        variant="ghost"
        className={cn('mt-2 justify-start px-2 transition-colors', {
          'bg-accent': selectedItem === id,
          'hover:bg-accent text-accent-foreground/70': selectedItem !== id
        })}
        {...props}
      >
        {children}
      </Button>
    )
  }
  const SettingsContent = (type: string) => {
    switch (type) {
      case 'provider':
        return <SettingsPanel />
      default:
        return null
    }
  }
  return (
    <div className="flex h-full">
      {/* sidebar */}
      <div
        className="flex flex-col h-full pl-4 pr-2 border-r bg-sidebar"
        style={{ width: SIDEBAR_WIDTH }}
      >
        {SETTINGS_ITEMS.map((item) => (
          <ItemButton key={item.id} id={item.id} onClick={() => setSelectedItem(item.id)}>
            {item.icon}
            {item.label}
          </ItemButton>
        ))}
      </div>
      {/* content */}
      <div className="flex-1 p-4">{SettingsContent('provider')}</div>
    </div>
  )
}
