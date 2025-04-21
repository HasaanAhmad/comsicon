import { useEffect, useRef } from 'react'
import { formatDistanceToNow } from 'date-fns'

interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: Date;
  sender: {
    name: string | null;
    id: string;
    image: string | null;
  };
}

interface MessageListProps {
  messages: Message[];
  currentUserId?: string;
}

export default function MessageList({ messages, currentUserId }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => {
        const isOwn = message.senderId === currentUserId
        return (
          <div
            key={message.id}
            className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                isOwn ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-sm">
                  {isOwn ? 'You' : message.sender.name}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                </span>
              </div>
              <p className="break-words">{message.content}</p>
            </div>
          </div>
        )
      })}
      <div ref={messagesEndRef} />
    </div>
  )
} 