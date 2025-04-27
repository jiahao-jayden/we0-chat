import type { LLMProvider } from '../types/provider'
import { OpenRouter, SiliconCloud } from '@lobehub/icons'

export const PROVIDERS: Record<string, LLMProvider> = {
  openrouter: {
    id: 'openrouter',
    name: 'OpenRouter',
    description: 'OpenRouter is a platform for running AI models in the cloud.',
    apiUrl: 'https://openrouter.ai/api/v1',
    websiteUrl: 'https://openrouter.ai',
    logo: <OpenRouter size={24} className="size-5 rounded-2xl" />,
    baseUrl: 'https://openrouter.ai/api/frontend/models',
    modelUrl: 'https://openrouter.ai/api/frontend/models',
    features: ['LLM', 'TEXT EMBEDDING'],
    models: [],
    isInstalled: false
  },
  silicon: {
    id: 'silicon',
    name: '硅基流动',
    description: '硅基流动是一家专注于AI模型和服务的公司。',
    apiUrl: 'https://api.siliconflow.com/v1',
    websiteUrl: 'https://siliconflow.com',
    logo: <SiliconCloud.Avatar size={24} shape={'square'} className="size-5 rounded-2xl" />,
    baseUrl: 'https://api.siliconflow.com/v1/models',
    modelUrl: 'https://api.siliconflow.com/v1/models',
    features: ['LLM', 'TEXT EMBEDDING'],
    models: [],
    isInstalled: false
  }
}
