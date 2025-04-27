import type { UserProviderConfig } from '@/types/provider'
import { create } from 'zustand'
import type { Setting } from '~/shared/types/settings'

type SettingsStore = {
  settings: Setting[]
  userProviderConfigs: UserProviderConfig[]
  setSettings: (settings: Setting[]) => void
  setUserProviderConfigs: (userProviderConfigs: UserProviderConfig[]) => void
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: [],
  userProviderConfigs: [],
  setSettings: (settings) => set({ settings }),
  setUserProviderConfigs: (userProviderConfigs) => set({ userProviderConfigs })
}))
