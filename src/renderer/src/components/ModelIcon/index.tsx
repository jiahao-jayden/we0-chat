import { useEffect, useState } from 'react'
import type { IconId } from '~/shared/types/provider'
import { MODEL_ICONS } from '@/constant/llm-icons'

interface ModelIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  iconId: IconId
}

/**
 * 模型图标组件
 * @example
 * ```tsx
 * // 基础用法
 * <ModelIcon iconId="deepseek-v3" />
 *
 * // 自定义样式
 * <ModelIcon iconId="deepseek-v3" className="w-6 h-6 rounded-full" />
 *
 * // 自定义alt文本
 * <ModelIcon iconId="deepseek-v3" alt="Deepseek Model" />
 * ```
 */
export const ModelIcon: React.FC<ModelIconProps> = ({
  iconId,
  className,
  alt,
  ...props
}: ModelIconProps) => {
  const [src, setSrc] = useState<string>('')

  useEffect(() => {
    MODEL_ICONS[iconId]().then(setSrc)
  }, [iconId])

  return <img src={src} alt={alt || `${iconId} icon`} className={className} {...props} />
}
