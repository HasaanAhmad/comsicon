'use client'
import { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Paperclip, Send, Image, File } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const personalChats = [
  { id: 1, name: "John Smith", avatar: "/placeholder.svg", lastMessage: "Can you check the recent design?", time: "10:30 AM", unread: 2 },
  { id: 2, name: "Sarah Johnson", avatar: "/placeholder.svg", lastMessage: "I've uploaded the files", time: "Yesterday", unread: 0 },
  { id: 3, name: "Mike Williams", avatar: "/placeholder.svg", lastMessage: "The meeting is confirmed", time: "Yesterday", unread: 0 },
  { id: 4, name: "Emily Davis", avatar: "/placeholder.svg", lastMessage: "Great job on the presentation!", time: "Monday", unread: 0 },
];

const teamChats = [
  { id: 101, name: "Design Team", avatar: "/placeholder.svg", lastMessage: "Alex: Updated the wireframes", time: "11:45 AM", unread: 3 },
  { id: 102, name: "Marketing", avatar: "/placeholder.svg", lastMessage: "Jessica: Campaign results are in", time: "Yesterday", unread: 0 },
  { id: 103, name: "Development", avatar: "/placeholder.svg", lastMessage: "Ryan: Pushed new commits", time: "Monday", unread: 0 },
];

const messages = [
  { id: 1, sender: "John Smith", avatar: "/placeholder.svg", content: "Hey there! How's the project coming along?", time: "10:15 AM", isCurrentUser: false },
  { id: 2, sender: "You", avatar: "/placeholder.svg", content: "It's going well. I've completed most of the frontend work.", time: "10:18 AM", isCurrentUser: true },
  { id: 3, sender: "John Smith", avatar: "/placeholder.svg", content: "That's great! Can you send me the designs when you're done?", time: "10:20 AM", isCurrentUser: false },
  { id: 4, sender: "You", avatar: "/placeholder.svg", content: "Sure, I'll share them by end of day.", time: "10:25 AM", isCurrentUser: true },
  { id: 5, sender: "John Smith", avatar: "/placeholder.svg", content: "Perfect! Looking forward to it.", time: "10:26 AM", isCurrentUser: false },
  { id: 6, sender: "John Smith", avatar: "/placeholder.svg", content: "Also, don't forget we have a team meeting tomorrow at 9.", time: "10:27 AM", isCurrentUser: false },
  { id: 7, sender: "You", avatar: "/placeholder.svg", content: "I've added it to my calendar. Will be there.", time: "10:30 AM", isCurrentUser: true },
  { id: 8, sender: "John Smith", avatar: "/placeholder.svg", content: "Here's the document with requirements I mentioned earlier.", time: "10:40 AM", isCurrentUser: false, file: { name: "Project_Requirements.pdf", type: "document" } },
  { id: 9, sender: "You", avatar: "/placeholder.svg", content: "Check out this initial mockup I created", time: "10:45 AM", isCurrentUser: true, file: { name: "Design_Mockup.png", type: "image" } },
];

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(personalChats[0]);
  const [messageText, setMessageText] = useState("");
  const [activeTab, setActiveTab] = useState("personal");

  const handleSendMessage = () => {
    if (messageText.trim() !== "") {
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row h-[calc(100vh-6rem)] gap-4">
        {/* Chat Sidebar */}
        <Card className="w-full md:w-80 flex flex-col md:h-full">
          <CardContent className="p-0 flex flex-col h-full">
            <Tabs defaultValue="personal" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="teams">Teams</TabsTrigger>
              </TabsList>
              <TabsContent value="personal" className="m-0">
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  <div className="px-4 py-2">
                    {personalChats.map((chat) => (
                      <div 
                        key={chat.id}
                        className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${
                          selectedChat.id === chat.id ? "bg-accent" : "hover:bg-accent/50"
                        }`}
                        onClick={() => setSelectedChat(chat)}
                      >
                        <Avatar className="h-10 w-10">
                          <img src={chat.avatar} alt={chat.name} />
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-sm">{chat.name}</h3>
                            <span className="text-xs text-muted-foreground">{chat.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                        </div>
                        {chat.unread > 0 && (
                          <div className="bg-kaam-purple text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                            {chat.unread}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="teams" className="m-0">
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  <div className="px-4 py-2">
                    {teamChats.map((chat) => (
                      <div 
                        key={chat.id}
                        className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${
                          selectedChat.id === chat.id ? "bg-accent" : "hover:bg-accent/50"
                        }`}
                        onClick={() => setSelectedChat(chat)}
                      >
                        <Avatar className="h-10 w-10">
                          <img src={chat.avatar} alt={chat.name} />
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-sm">{chat.name}</h3>
                            <span className="text-xs text-muted-foreground">{chat.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                        </div>
                        {chat.unread > 0 && (
                          <div className="bg-kaam-purple text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                            {chat.unread}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat header */}
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <img src={selectedChat.avatar} alt={selectedChat.name} />
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">{selectedChat.name}</h2>
                    <p className="text-xs text-muted-foreground">
                      {activeTab === "personal" ? "Active now" : "3 members"}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex gap-3 max-w-[80%] ${message.isCurrentUser ? "flex-row-reverse" : ""}`}>
                        {!message.isCurrentUser && (
                          <Avatar className="h-8 w-8">
                            <img src={message.avatar} alt={message.sender} />
                          </Avatar>
                        )}
                        <div>
                          <div className={`rounded-lg p-3 ${
                            message.isCurrentUser 
                              ? "bg-kaam-purple text-white" 
                              : "bg-accent"
                          }`}>
                            <p className="text-sm">{message.content}</p>
                            {message.file && (
                              <div className="mt-2 p-2 bg-background/20 rounded flex items-center gap-2">
                                {message.file.type === "image" ? (
                                  <div>
                                    <Image className="h-4 w-4" />
                                    <span className="text-xs">{message.file.name}</span>
                                  </div>
                                ) : (
                                  <div>
                                    <File className="h-4 w-4" />
                                    <span className="text-xs">{message.file.name}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <div className={`mt-1 text-xs text-muted-foreground ${
                            message.isCurrentUser ? "text-right" : ""
                          }`}>
                            {message.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Message input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem>
                        <Image className="h-4 w-4 mr-2" />
                        <span>Image</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <File className="h-4 w-4 mr-2" />
                        <span>Document</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Input
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground">Select a chat to start messaging</p>
            </div>
          )}
        </Card>
      </div>
    </MainLayout>
  );
};

export default Chat;
