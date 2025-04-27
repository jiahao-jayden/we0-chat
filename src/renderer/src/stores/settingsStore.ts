import { create } from 'zustand'
import type { Setting } from '~/shared/types/settings'

type SettingsStore = {
  settings: Setting
  setSettings: (settings: Setting) => void
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: {} as Setting,
  setSettings: (settings) => set({ settings })
}))
