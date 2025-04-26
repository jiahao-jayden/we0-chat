import { Outlet } from 'react-router-dom'
import { AppSidebar } from './components/Sidebar'
import Titlebar from './components/Titlebar'
import { SidebarProvider } from './components/ui/sidebar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from 'next-themes'

export function Layout(): React.ReactElement {
  const queryClient = new QueryClient()
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <ThemeProvider>
        <Toaster />
        <QueryClientProvider client={queryClient}>
          <SidebarProvider className="!bg-transparent flex flex-col h-full">
            <Titlebar />
            <div className="flex flex-1 overflow-hidden">
              <AppSidebar />
              <main className="flex-1 overflow-auto bg-background">
                <Outlet />
              </main>
            </div>
          </SidebarProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  )
}
