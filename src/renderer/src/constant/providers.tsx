import { OpenRouter, SiliconCloud } from '@lobehub/icons'
import type { ProviderId, SystemModelConfig } from '~/shared/types/provider'
import type { UserProviderConfig } from '../types/provider'

export const SYSTEM_PROVIDERS: Record<
  string,
  Omit<UserProviderConfig, 'category' | 'isInstalled'>
> = {
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
    models: []
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
    models: []
  }
}

export const SYSTEM_MODELS: Record<ProviderId, SystemModelConfig[]> = {
  openrouter: [
    {
      name: 'Google: Gemma 2 9B',
      modelId: 'gemma-2-9b',
      iconId: 'gemma',
      features: ['LLM']
    },
    {
      name: 'Phi-3 Mini 128K Instruct',
      modelId: 'phi-3-mini-128k-instruct',
      iconId: 'phi',
      features: ['LLM']
    },
    {
      name: 'Phi-3 Medium 128K Instruct',
      modelId: 'phi-3-medium-128k-instruct',
      iconId: 'phi',
      features: ['LLM']
    },
    {
      name: 'Meta: Llama 3 8B Instruct',
      modelId: 'llama-3-8b-instruct',
      iconId: 'llama3',
      features: ['LLM']
    },
    {
      name: 'Mistral: Mistral 7B Instruct',
      modelId: 'mistral-7b-instruct',
      iconId: 'mistral',
      features: ['LLM']
    }
  ],
  silicon: [
    {
      name: 'deepseek-ai/DeepSeek-R1',
      modelId: 'deepseek-ai/DeepSeek-R1',
      iconId: 'deepseek-v3',
      features: ['LLM']
    },
    {
      name: 'deepseek-ai/DeepSeek-V3',
      modelId: 'deepseek-ai/DeepSeek-V3',
      iconId: 'deepseek-v3',
      features: ['LLM']
    },
    {
      name: 'Qwen/Qwen2.5-7B-Instruct',
      modelId: 'Qwen/Qwen2.5-7B-Instruct',
      iconId: 'qwen',
      features: ['LLM']
    },
    {
      name: 'meta-llama/Llama-3.3-70B-Instruct',
      modelId: 'meta-llama/Llama-3.3-70B-Instruct',
      iconId: 'llama3',
      features: ['LLM']
    },
    {
      name: 'BAAI/bge-m3',
      modelId: 'BAAI/bge-m3',
      iconId: 'bge',
      features: ['LLM']
    }
  ]
}
