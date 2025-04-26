import { ChevronLeft } from 'lucide-react'
import { SelectModelButton } from '../SelectModel'
import { Button } from '../ui/button'
import { SidebarTrigger } from '../ui/sidebar'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Titlebar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isSettings = pathname === '/settings'
  return (
    <header
      id="titlebar"
      className="flex h-9 items-center w-full bg-sidebar z-50 border-b border-border"
    >
      {!isSettings ? (
        <>
          <SidebarTrigger className="ml-18 relative z-[999] cursor-pointer" />
          <SelectModelButton />
        </>
      ) : (
        <Button
          variant="ghost"
          className="rounded-xl ml-18 text-xs"
          size="sm"
          onClick={() => navigate('/')}
        >
          <ChevronLeft className="size-5 stroke-accent-foreground" />
          Go Back
        </Button>
      )}
      <div className="can-drag h-9 w-full" />
    </header>
  )
}
