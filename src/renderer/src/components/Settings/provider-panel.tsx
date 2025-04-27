import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { SYSTEM_PROVIDERS } from '@/constant/providers'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDown, ChevronRight, Info, Link, Plus, PlusCircle, Settings2 } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState, memo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '../ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { useSettingsStore } from '@/stores/settingsStore'
import type { UserProviderConfig } from '@/types/provider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const UninstalledCard = memo(({ provider }: { provider: UserProviderConfig }) => {
  return (
    <div className="relative group">
      <Card className="h-32 p-4 shadow-none w-72 border-[0.5px]">
        <CardTitle className="flex items-center gap-3 mb-2 font-medium truncate">
          {provider.logo}
          {provider.name}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {provider.description}
        </CardDescription>
        <CardContent className="absolute bottom-0 left-0 right-0 justify-center hidden gap-3 p-2 group-hover:flex group-hover:bg-white/50 dark:group-hover:bg-black/50">
          <Button variant="outline" size="sm">
            <Plus className="size-4" /> Add
          </Button>
          <Button variant="outline" size="sm">
            <Link className="size-4" /> website
          </Button>
        </CardContent>
      </Card>
    </div>
  )
})

UninstalledCard.displayName = 'UninstalledCard'

const InstalledCard = memo(({ provider }: { provider: UserProviderConfig }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)

  const settingFormSchema = z.object({
    apiKey: z.string().min(2).max(50),
    apiBase: z.string().min(2).max(50)
  })

  const settingForm = useForm<z.infer<typeof settingFormSchema>>({
    resolver: zodResolver(settingFormSchema),
    defaultValues: {
      apiKey: '',
      apiBase: provider.apiUrl
    }
  })

  const onSubmit = (values: z.infer<typeof settingFormSchema>) => {
    console.log(values)
  }

  return (
    <div className="relative">
      {provider.category === 'unConfigured' && (
        <div className="rounded-full bg-destructive h-2 w-2 absolute right-2.5 top-2.5 z-[999]" />
      )}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <DialogTrigger asChild>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 z-10">
                  <Settings2 className="size-4" />
                </Button>
              </TooltipTrigger>
            </DialogTrigger>
            <TooltipContent side="top" sideOffset={5}>
              <p>Setting your api key or api base</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DialogContent className="space-y-4">
          <DialogHeader>
            <DialogTitle>Setting {provider.name}</DialogTitle>
          </DialogHeader>
          <Form {...settingForm}>
            <form onSubmit={settingForm.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-4">
                <FormField
                  control={settingForm.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="API Key" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={settingForm.control}
                  name="apiBase"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Base</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="enter your api base, like is https://api.openai.com/v1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Card className="px-3 pt-4 border-[0.5px] shadow-xs bg-[#F9FAFB]">
        <CardTitle className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 400 }}>
            {provider.logo}
          </motion.div>
          <span className="text-lg">{provider.name}</span>
        </CardTitle>
        <CardDescription className="flex gap-3 mt-2">
          {provider.features.map((feature) => (
            <motion.div
              key={feature}
              whileHover={{ scale: 1.05 }}
              className="text-xs text-muted-foreground p-0.5 border rounded-md select-none"
            >
              {feature}
            </motion.div>
          ))}
        </CardDescription>
        <CardContent
          className={cn('px-0 py-1 mt-2 border-spacing-1', {
            'bg-white rounded-xl p-3': isExpanded,
            'border-t mb-2': !isExpanded
          })}
        >
          <div className="flex items-center justify-between">
            {/* 已配置的提供商 */}
            {provider.category === 'isConfigured' ? (
              <div>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 text-xs"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    show model
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      {isExpanded ? (
                        <ChevronDown className="size-3.5" />
                      ) : (
                        <ChevronRight className="size-3.5" />
                      )}
                    </motion.div>
                  </Button>
                </motion.div>
                {/* 添加模型 */}
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs">
                    <motion.div
                      whileHover={{ rotate: 90 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <PlusCircle className="size-3.5" />
                    </motion.div>
                    add model
                  </Button>
                </motion.div>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-xs mt-1">
                <Info className="size-3.5" /> Please configure the api key
              </div>
            )}
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Model</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <AnimatePresence>
          {isExpanded && (
            <div>
              <CardFooter></CardFooter>
            </div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  )
})

InstalledCard.displayName = 'InstalledCard'

export function SettingsPanel() {
  const { userProviderConfigs } = useSettingsStore()
  const providerList = Object.keys(SYSTEM_PROVIDERS)
  const installableSYSTEM_PROVIDERS = providerList.filter((p) => !userProviderConfigs[p])
  console.log(installableSYSTEM_PROVIDERS)
  console.log(userProviderConfigs)

  const { configuredSYSTEM_PROVIDERS, unConfiguredSYSTEM_PROVIDERS } = useMemo(() => {
    const providerList = Object.values(SYSTEM_PROVIDERS).map((provider) => ({
      ...provider,
      category: userProviderConfigs[provider.id]?.category || 'unConfigured'
    })) as UserProviderConfig[]

    return {
      configuredSYSTEM_PROVIDERS: providerList.filter((p) => p.category === 'isConfigured'),
      unConfiguredSYSTEM_PROVIDERS: providerList.filter((p) => p.category === 'unConfigured')
      // 这里需要对齐系统所有的配置才可以获取到
    }
  }, [userProviderConfigs])

  return (
    <div className="space-y-8 text-sm">
      {/* 已配置的提供商 */}
      {configuredSYSTEM_PROVIDERS.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-bold">SYSTEM_PROVIDERS</p>
          {configuredSYSTEM_PROVIDERS.map((provider) => (
            <InstalledCard key={provider.id} provider={provider} />
          ))}
        </div>
      )}

      {/* 未配置的提供商 */}
      {unConfiguredSYSTEM_PROVIDERS.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-bold">Unconfigured</p>
          {unConfiguredSYSTEM_PROVIDERS.map((provider) => (
            <InstalledCard key={provider.id} provider={provider} />
          ))}
        </div>
      )}

      {/* 可安装的提供商 */}
      {installableSYSTEM_PROVIDERS.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-bold">Install</p>
          <div className="flex gap-4 overflow-y-auto custom-scrollbar">
            {installableSYSTEM_PROVIDERS.map((provider) => (
              <UninstalledCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
