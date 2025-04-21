'use client'
import React, { useState } from "react";
import { PaperclipIcon, SendHorizontal, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  sender: string;
  senderAvatar?: string;
  content: string;
  time: string;
  isCurrentUser: boolean;
}

const ChatPanel = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg1",
      sender: "John Doe",
      content: "Morning team! Let's discuss priorities for the day.",
      time: "09:10 AM",
      isCurrentUser: true
    },
    {
      id: "msg2",
      sender: "Alice Smith",
      senderAvatar: "",
      content: "I'm working on the dashboard redesign. Should be ready by EOD.",
      time: "09:12 AM",
      isCurrentUser: false
    },
    {
      id: "msg3",
      sender: "Mike Johnson",
      content: "I need help with the API integration for the chat feature.",
      time: "09:15 AM",
      isCurrentUser: false
    },
    {
      id: "msg4",
      sender: "John Doe",
      content: "Sure Mike, I'll help after our standup. Alice, can you share the wireframes?",
      time: "09:17 AM",
      isCurrentUser: true
    },
    {
      id: "msg5",
      sender: "Alice Smith",
      senderAvatar: "",
      content: "Just uploaded the wireframes to the shared folder. Let me know your thoughts!",
      time: "09:20 AM",
      isCurrentUser: false
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const message: Message = {
      id: `msg${messages.length + 1}`,
      sender: "John Doe",
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="dashboard-card flex flex-col h-[500px] overflow-hidden">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Team Chat</h3>
          <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        </div>
        
        <div className="flex items-center space-x-1">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs">JD</AvatarFallback>
          </Avatar>
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs">AS</AvatarFallback>
          </Avatar>
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs">MJ</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground ml-1">+3</span>
        </div>
      </div>
      
      <ScrollArea className="flex-1 overflow-hidden relative">
        <div className="space-y-4 pb-4 px-1">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[75%] ${
                  message.isCurrentUser 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted"
                } rounded-lg p-3 break-words`}
              >
                {!message.isCurrentUser && (
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-[10px]">
                        {message.sender.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{message.sender}</span>
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
                <p className="text-[10px] opacity-70 text-right mt-1">
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="border-t pt-4 mt-auto">
        <div className="flex gap-2 max-h-[120px]">
          <Textarea
            placeholder="Type your message..."
            className="min-h-[60px] max-h-[100px] resize-y"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          
          <div className="flex flex-col gap-2 flex-shrink-0">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <PaperclipIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Smile className="h-4 w-4" />
            </Button>
            <Button size="icon" className="h-8 w-8" onClick={handleSendMessage}>
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
