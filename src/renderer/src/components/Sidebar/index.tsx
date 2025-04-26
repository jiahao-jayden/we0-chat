import { Cog } from 'lucide-react'
import { Button } from '../ui/button'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '../ui/sidebar'
import { SearchInput } from './search-input'
import { useLocation, useNavigate } from 'react-router-dom'

export function AppSidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  if (pathname === '/settings') {
    return null
  }
  return (
    <Sidebar>
      <SidebarHeader>
        <SearchInput />
      </SidebarHeader>
      <SidebarContent />
      <SidebarFooter className="relative p-2">
        <Button variant="ghost" className="rounded-xl" onClick={() => navigate('/settings')}>
          <Cog className="size-5 text-accent-foreground" />
        </Button>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>

          </DropdownMenuTrigger>
          <DropdownMenuContent alignOffset={50} side="top" sideOffset={10} align="end">
            <DropdownMenuItem>
              <span>Login in</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </SidebarFooter>
    </Sidebar>
  )
}
