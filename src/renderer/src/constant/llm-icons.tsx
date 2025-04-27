import type { IconId } from '~/shared/types/provider'

// export const PROVIDER_ICONS: Record<keyof typeof PROVIDERS, React.ReactNode> = {
//   openrouter: <OpenRouter size={24} className="size-5 rounded-2xl" />,
//   silicon: <SiliconCloud.Avatar size={24} shape={'square'} className="size-5 rounded-2xl" />
// }

/**
 * 模型图标配置
 */
export const MODEL_ICONS: Record<IconId, () => Promise<string>> = {
  'deepseek-v3': () => import('@/assets/models/deepseek.png').then((icon) => icon.default)
}
