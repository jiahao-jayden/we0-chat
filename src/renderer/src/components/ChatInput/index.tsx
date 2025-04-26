'use client'

import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea
} from '@/components/ui/prompt-input'
import { Button } from '@/components/ui/button'
import { ArrowUp, Paperclip, Square, X } from 'lucide-react'
import { useRef, useState } from 'react'

type ChatInputProps = {
  className?: string
  maxHeight?: number
  onSubmit: (message: string) => void
}

export function ChatInput({ className, maxHeight = 180, onSubmit }: ChatInputProps) {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const uploadInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (input.trim() || files.length > 0) {
      setIsLoading(true)
      onSubmit(input.trim())
      setTimeout(() => {
        setIsLoading(false)
        setInput('')
        setFiles([])
      }, 2000)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    if (uploadInputRef?.current) {
      uploadInputRef.current.value = ''
    }
  }

  return (
    <PromptInput
      value={input}
      onValueChange={setInput}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      className={className}
      maxHeight={maxHeight}
    >
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 pb-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-secondary"
            >
              <Paperclip className="size-4" />
              <span className="max-w-[120px] truncate">{file.name}</span>
              <button
                onClick={() => handleRemoveFile(index)}
                className="p-1 rounded-full hover:bg-secondary/50"
              >
                <X className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <PromptInputTextarea placeholder="Ask me anything..." />

      <PromptInputActions className="flex items-center justify-between gap-2 pt-2">
        <PromptInputAction tooltip="Attach files">
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center w-8 h-8 cursor-pointer hover:bg-secondary-foreground/10 rounded-2xl"
          >
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <Paperclip className="text-primary size-5" />
          </label>
        </PromptInputAction>

        <PromptInputAction tooltip={isLoading ? 'Stop generation' : 'Send message'}>
          <Button
            variant="default"
            size="icon"
            className="w-8 h-8 rounded-full"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <Square className="fill-current size-3" />
            ) : (
              <ArrowUp className="size-5" />
            )}
          </Button>
        </PromptInputAction>
      </PromptInputActions>
    </PromptInput>
  )
}
