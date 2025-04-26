import type { LLMProvider } from '~/shared/types/provider'
import { OpenRouter, SiliconCloud } from '@lobehub/icons'
export const PROVIDERS: Record<string, LLMProvider> = {
  openrouter: {
    id: 'openrouter',
    name: 'OpenRouter',
    description: 'OpenRouter is a platform for running AI models in the cloud.',
    apiUrl: 'https://openrouter.ai/api/v1',
    website: 'https://openrouter.ai',
    logo: <OpenRouter size={24} className="size-5 rounded-2xl" />,
    modelUrl: 'https://openrouter.ai/api/frontend/models',
    features: ['LLM', 'TEXT EMBEDDING']
  },
  silicon: {
    id: 'silicon',
    name: '硅基流动',
    description: '硅基流动是一家专注于AI模型和服务的公司。',
    apiUrl: 'https://api.siliconflow.com/v1',
    website: 'https://siliconflow.com',
    logo: <SiliconCloud.Avatar size={24} shape={'square'} className="size-5 rounded-2xl" />,
    modelUrl: 'https://api.siliconflow.com/v1/models',
    features: ['LLM', 'TEXT EMBEDDING']
  }
}
