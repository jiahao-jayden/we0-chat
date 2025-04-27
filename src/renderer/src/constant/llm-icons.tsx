import type { IconId } from '~/shared/types/provider'

// export const PROVIDER_ICONS: Record<keyof typeof SYSTEM_PROVIDERS, React.ReactNode> = {
//   openrouter: <OpenRouter size={24} className="size-5 rounded-2xl" />,
//   silicon: <SiliconCloud.Avatar size={24} shape={'square'} className="size-5 rounded-2xl" />
// }

/**
 * 模型图标配置
 */
export const MODEL_ICONS: Record<IconId, () => Promise<string>> = {
  'deepseek-v3': () => import('@/assets/models/deepseek.png').then((icon) => icon.default),
  gemma: () => import('@/assets/models/gemma.png').then((icon) => icon.default),
  phi: () => import('@/assets/models/phi.png').then((icon) => icon.default),
  llama3: () => import('@/assets/models/llama3.png').then((icon) => icon.default),
  mistral: () => import('@/assets/models/mistral.png').then((icon) => icon.default),
  qwen: () => import('@/assets/models/qwen.png').then((icon) => icon.default),
  bge: () => import('@/assets/models/bge.png').then((icon) => icon.default)
}
