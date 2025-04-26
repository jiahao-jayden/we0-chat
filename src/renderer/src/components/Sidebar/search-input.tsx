import { Search } from 'lucide-react'
import { Button } from '../ui/button'
import { Kbd } from '../ui/kbd'

export function SearchInput() {
  return (
    <div className="mt-8">
      <Button className="w-full flex justify-between" variant="outline">
        <Search className="w-4 h-4" />
        <div className="flex items-center gap-1">
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </div>
      </Button>
    </div>
  )
}
