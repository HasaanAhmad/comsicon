'use client'
import { useEffect, useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { io, Socket } from 'socket.io-client'
import { getOrganizationMembers, sendMessage, getMessages, getUserOrganizationId } from '../_actions/chat-actions'
import UserList from './user-list'
import MessageList from './message-list'
import MessageInput from './message-input'

interface ExtendedSession {
  user?: {
    id: string;
  } | null;
}

interface User {
  id: string;
  name: string | null;
  image: string | null;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
  sender: {
    name: string | null;
    id: string;
    image: string | null;
  };
}

export default function Chat() {
  const { data: session } = useSession() as { data: ExtendedSession | null }
  const [users, setUsers] = useState<Array<{ user: User }>>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [organizationId, setOrganizationId] = useState<string | null>(null)
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    const initializeChat = async () => {
      if (!session?.user?.id) return;

      try {
        // Get organization ID first
        const orgId = await getUserOrganizationId(session.user.id);
        setOrganizationId(orgId);

        // Initialize socket connection
        socketRef.current = io(process.env.NEXT_PUBLIC_SITE_URL!, {
          path: '/api/socket',
        });

        // Join organization room with user ID
        socketRef.current.emit('join-org', { orgId, userId: session.user.id });

        // Listen for new messages
        socketRef.current.on('new-message', (message) => {
          setMessages((prev) => {
            // Avoid duplicate messages
            if (prev.some(m => m.id === message.id)) {
              return prev;
            }
            return [...prev, message];
          });
        });

        // Load organization members
        await loadOrganizationMembers(orgId);
      } catch (error) {
        console.error('Failed to initialize chat:', error);
        setLoading(false);
      }
    };

    initializeChat();

    return () => {
      if (socketRef.current) {
        socketRef.current.off('new-message');
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [session]); // Remove selectedUser from dependencies as it's not needed here

  useEffect(() => {
    if (selectedUser) {
      loadMessages();
    }
  }, [selectedUser]);

  const loadOrganizationMembers = async (orgId: string) => {
    try {
      const members = await getOrganizationMembers(orgId);
      setUsers(members.filter((member) => member.user.id !== session?.user?.id));
      setLoading(false);
    } catch (error) {
      console.error('Failed to load members:', error);
    }
  };

  const loadMessages = async () => {
    if (!selectedUser) return
    try {
      const messages = await getMessages(session?.user?.id!, selectedUser.id)
      setMessages(messages)
    } catch (error) {
      console.error('Failed to load messages:', error)
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!selectedUser || !content.trim() || !socketRef.current) return

    try {
      const message = await sendMessage(content, selectedUser.id)
      // Change the event name to 'new-message' to match the listener
      socketRef.current.emit('new-message', {
        ...message,
        organizationId: organizationId
      })
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <UserList users={users} selectedUser={selectedUser} onSelectUser={setSelectedUser} />
      <div className="flex-1 flex flex-col">
        <MessageList messages={messages} currentUserId={session?.user?.id} />
        <MessageInput onSendMessage={handleSendMessage} disabled={!selectedUser} />
      </div>
    </div>
  )
}
