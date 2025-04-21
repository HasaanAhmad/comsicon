'use client'
import { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Mock data
const teamMembers = [
  { id: 1, name: "John Smith", avatar: "/placeholder.svg", role: "Frontend Developer" },
  { id: 2, name: "Sarah Johnson", avatar: "/placeholder.svg", role: "UI Designer" },
  { id: 3, name: "Mike Williams", avatar: "/placeholder.svg", role: "Backend Developer" },
  { id: 4, name: "Emily Davis", avatar: "/placeholder.svg", role: "Project Manager" },
  { id: 5, name: "All Team Members", avatar: null, role: "View all" },
];

const tasks = [
  { 
    id: 1, 
    title: "Design System Updates", 
    date: new Date(2025, 3, 21), 
    assignedTo: 2,
    priority: "High", 
    status: "In Progress",
    project: "Website Redesign"
  },
  { 
    id: 2, 
    title: "API Integration", 
    date: new Date(2025, 3, 22), 
    assignedTo: 3,
    priority: "Medium", 
    status: "To Do",
    project: "Mobile App"
  },
  { 
    id: 3, 
    title: "Frontend Implementation", 
    date: new Date(2025, 3, 22), 
    assignedTo: 1,
    priority: "High", 
    status: "To Do",
    project: "Website Redesign"
  },
  { 
    id: 4, 
    title: "Project Planning", 
    date: new Date(2025, 3, 23), 
    assignedTo: 4,
    priority: "Medium", 
    status: "Completed",
    project: "New Client Onboarding"
  },
  { 
    id: 5, 
    title: "User Testing", 
    date: new Date(2025, 3, 25), 
    assignedTo: 1,
    priority: "Low", 
    status: "To Do",
    project: "Website Redesign"
  },
  { 
    id: 6, 
    title: "Progress Review", 
    date: new Date(2025, 3, 26), 
    assignedTo: 4,
    priority: "Medium", 
    status: "To Do",
    project: "Mobile App"
  },
];

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedMember, setSelectedMember] = useState("5"); // Default to All Team Members
  
  // Get tasks for the selected date and member
  const getTasksForSelectedDate = () => {
    if (!date) return [];
    
    return tasks.filter(task => {
      const sameDate = 
        task.date.getDate() === date.getDate() &&
        task.date.getMonth() === date.getMonth() &&
        task.date.getFullYear() === date.getFullYear();
      
      return sameDate && (selectedMember === "5" || task.assignedTo === parseInt(selectedMember));
    });
  };
  
  // Get dates that have tasks for highlighting in the calendar
  const getTaskDates = () => {
    const memberFilter = selectedMember === "5" ? null : parseInt(selectedMember);
    
    return tasks
      .filter(task => !memberFilter || task.assignedTo === memberFilter)
      .map(task => task.date);
  };

  const taskDates = getTaskDates();
  const selectedDateTasks = getTasksForSelectedDate();
  
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Task Calendar</CardTitle>
                  <CardDescription>View and manage team tasks</CardDescription>
                </div>
                <Select value={selectedMember} onValueChange={setSelectedMember}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map(member => (
                      <SelectItem key={member.id} value={member.id.toString()}>
                        <div className="flex items-center gap-2">
                          {member.avatar && (
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          {member.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="pb-6">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
                modifiers={{
                  hasTasks: taskDates,
                }}
                modifiersStyles={{
                  hasTasks: { fontWeight: 'bold', textDecoration: 'underline' },
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>
                {date ? (
                  <>{date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</>
                ) : (
                  "Select a date"
                )}
              </CardTitle>
              <CardDescription>
                {selectedDateTasks.length} tasks scheduled
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {selectedDateTasks.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateTasks.map(task => {
                      const assignedMember = teamMembers.find(member => member.id === task.assignedTo);
                      
                      return (
                        <Card key={task.id} className="p-4 shadow-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-sm font-medium">{task.title}</h3>
                              <p className="text-xs text-muted-foreground">{task.project}</p>
                            </div>
                            <Badge variant={task.status === "Completed" ? "outline" : "default"}>{task.status}</Badge>
                          </div>
                          
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {assignedMember && (
                                <>
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={assignedMember.avatar || ""} alt={assignedMember.name} />
                                    <AvatarFallback>{assignedMember.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs">{assignedMember.name}</span>
                                </>
                              )}
                            </div>
                            <div className={`h-2 w-2 rounded-full ${getPriorityColor(task.priority)}`} title={`Priority: ${task.priority}`} />
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-muted-foreground">No tasks scheduled for this date</p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default CalendarPage;
