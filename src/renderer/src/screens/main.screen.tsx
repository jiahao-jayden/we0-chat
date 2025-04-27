import { ChatInput } from '@/components/ChatInput'
import { Button } from '@/components/ui/button'
import { ChatContainer } from '@/components/ui/chat-container'
import { Markdown } from '@/components/ui/markdown'
import {
  Message,
  MessageAction,
  MessageActions,
  MessageAvatar,
  MessageContent
} from '@/components/ui/message'
import { ScrollButton } from '@/components/ui/scroll-button'
import { transformProviderConfig } from '@/lib/transform'
import { cn } from '@/lib/utils'
import { chat } from '@/services/chat'
import { useSettingsStore } from '@/stores/settingsStore'
import { Copy } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

interface ChatMessage {
  id: number
  role: 'user' | 'assistant'
  content: string
}

function MainScreen(): React.ReactElement {
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { setSettings, setUserProviderConfigs } = useSettingsStore()

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: 'user',
      content: 'Hello! Can you help me with a coding question?'
    },
    {
      id: 2,
      role: 'assistant',
      content:
        "Of course! I'd be happy to help with your coding question. What would you like to know?"
    },
    {
      id: 3,
      role: 'assistant',
      content: '```tsx\nconst a = 1\n```'
    },
    {
      id: 4,
      role: 'assistant',
      content: '```tsx\nconst a = 1\n```'
    },
    {
      id: 5,
      role: 'assistant',
      content:
        '300 words: apple, orange, banana,apple, orange, banana,apple, orange, banana,apple, orange, banana,apple, orange, banana,apple, orange, banana,apple, orange, banana,apple, orange, banana,apple, orange, banana,apple, orange, banana,apple, orange, banana, '
    }
  ])

  const handleChat = async (message: string) => {
    try {
      // 添加用户消息
      const userMessage: ChatMessage = {
        id: Date.now(),
        role: 'user',
        content: message
      }
      setMessages((prev) => [...prev, userMessage])

      // 添加助手消息占位
      const assistantMessageId = Date.now() + 1
      const assistantMessage: ChatMessage = {
        id: assistantMessageId,
        role: 'assistant',
        content: ''
      }
      setMessages((prev) => [...prev, assistantMessage])

      // 处理流式响应
      for await (const chunk of chat(message)) {
        console.log(chunk, 'chunk')

        setMessages((prev) => {
          const newMessages = [...prev]
          const assistantMessageIndex = newMessages.findIndex(
            (msg) => msg.id === assistantMessageId
          )
          if (assistantMessageIndex !== -1) {
            newMessages[assistantMessageIndex] = {
              ...newMessages[assistantMessageIndex],
              content: newMessages[assistantMessageIndex].content + chunk
            }
          }
          return newMessages
        })
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: 'assistant',
          content: '抱歉，发生了错误。请稍后重试。'
        }
      ])
    }
  }

  // const onSend = () => {
  //   window.electron.ipcRenderer.send('create-message', {
  //     winViewId: 2,
  //     val: {
  //       roomId: 1,
  //       content: '123',
  //       type: 'text'
  //     }
  //   })
  // }

  useEffect(() => {
    // 主动获取设置
    window.api
      .invoke('db:get-settings', 'default')
      .then((settings) => {
        console.log('Settings fetched:', settings)
        if (settings) {
          const transformedSettings = transformProviderConfig(settings.SYSTEM_PROVIDERS)
          setSettings(settings)
          setUserProviderConfigs(transformedSettings)
        }
      })
      .catch((error) => {
        toast.error('Failed to fetch settings:', error)
      })
  }, [])

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        <ChatContainer
          className="h-full space-y-4 px-6 py-4 overflow-auto pb-20 max-w-[1000px] mx-auto"
          ref={chatContainerRef}
          scrollToRef={bottomRef}
        >
          <AnimatePresence mode="popLayout">
            {messages.map((message) => {
              const isAssistant = message.role === 'assistant'
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Message className={message.role === 'user' ? 'justify-end' : 'justify-start'}>
                    {isAssistant && (
                      <MessageAvatar src="/avatars/ai.png" alt="AI Assistant" fallback="AI" />
                    )}
                    <motion.div
                      className={cn('max-w-[75%] flex-1 ', {
                        'flex flex-col items-end': !isAssistant
                      })}
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isAssistant ? (
                        <div className="p-2 overflow-visible prose rounded-lg text-foreground">
                          <Markdown className="text-foreground">{message.content}</Markdown>
                        </div>
                      ) : (
                        <div className="flex flex-col">
                          <MessageContent className="inline-flex px-4 py-2 prose break-words bg-accent rounded-2xl text-foreground">
                            {message.content}
                          </MessageContent>
                          <MessageActions className="self-end">
                            <MessageAction tooltip="Copy to clipboard">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-8 h-8 rounded-full"
                                onClick={() => {}}
                              >
                                <Copy className={`size-4`} />
                              </Button>
                            </MessageAction>
                            {/*
                            <MessageAction tooltip="Helpful">
                              <Button
                                variant="ghost"
                                size="icon"
                                className={`h-8 w-8 rounded-full ${liked === true ? 'bg-green-100 text-green-500' : ''}`}
                                onClick={() => setLiked(true)}
                              >
                                <ThumbsUp className="size-4" />
                              </Button>
                            </MessageAction>

                            <MessageAction tooltip="Not helpful">
                              <Button
                                variant="ghost"
                                size="icon"
                                className={`h-8 w-8 rounded-full ${liked === false ? 'bg-red-100 text-red-500' : ''}`}
                                onClick={() => setLiked(false)}
                              >
                                <ThumbsDown className="size-4" />
                              </Button>
                            </MessageAction> */}
                          </MessageActions>
                        </div>
                      )}
                    </motion.div>
                  </Message>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </ChatContainer>
      </div>

      <div className="relative w-full px-3 py-2">
        <ChatInput
          maxHeight={180}
          className="w-full max-w-[1000px] mx-auto"
          onSubmit={handleChat}
        />
        <ScrollButton
          scrollRef={bottomRef}
          containerRef={chatContainerRef}
          className="absolute right-7 -top-10  z-[999]"
        />
      </div>
    </div>
  )
}

export default MainScreen
