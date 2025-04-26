import { ChevronRight, Search } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '../animate-ui/radix-dropdown-menu'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { DeepSeek } from '@lobehub/icons'

const mock = [
  {
    id: 1,
    name: '硅基流动',
    model: [
      {
        id: 'gpt-4o-mini',
        name: 'GPT-4o-mini'
      }
    ]
  },
  {
    id: 2,
    name: '硅基流动',
    model: [
      {
        id: 'gpt-4o-mini',
        name: 'GPT-4o-mini'
      }
    ]
  },
  {
    id: 3,
    name: '硅基流动',
    model: [
      {
        id: 'gpt-4o-mini',
        name: 'GPT-4o-mini'
      }
    ]
  }
]

export function SelectModelButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="focus-visible:ring-0 text-xs">
          Select a model
          <ChevronRight className="ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" min-w-[300px] shadow-none">
        {/* 搜索框 */}
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Input
            placeholder="Search"
            icon={<Search className="w-4 h-4" />}
            className="w-full border-none hover:bg-accent"
          />
        </div>
        {mock.map((item) => (
          <div key={item.id} className="flex flex-col gap-2 px-2 py-1.5">
            <Label className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {item.name}
            </Label>
            {item.model &&
              item.model.map((model) => (
                <DropdownMenuItem key={model.id}>
                  <DeepSeek />
                  {model.name}
                </DropdownMenuItem>
              ))}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
