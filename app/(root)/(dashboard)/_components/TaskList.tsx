'use client'
import React, { useState } from "react";
import { 
  Calendar,
  Check,
  ChevronDown,
  Filter,
  MoreHorizontal, 
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  status: "todo" | "progress" | "completed";
  dueDate: string;
  priority: "low" | "medium" | "high";
  assignees: string[];
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task1",
      title: "Design new dashboard wireframes",
      status: "completed",
      dueDate: "Today",
      priority: "high",
      assignees: ["JD", "AS"]
    },
    {
      id: "task2",
      title: "Implement user authentication flow",
      status: "progress",
      dueDate: "Tomorrow",
      priority: "medium",
      assignees: ["JD"]
    },
    {
      id: "task3",
      title: "Create API documentation",
      status: "todo",
      dueDate: "May 30",
      priority: "low",
      assignees: ["AS", "MJ"]
    },
    {
      id: "task4",
      title: "Fix navigation responsiveness issues",
      status: "todo",
      dueDate: "Jun 2",
      priority: "high",
      assignees: ["JD"]
    },
    {
      id: "task5",
      title: "Conduct user testing sessions",
      status: "progress",
      dueDate: "Jun 5",
      priority: "medium",
      assignees: ["MJ", "AS"]
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "todo":
        return <span className="status-badge status-todo">To Do</span>;
      case "progress":
        return <span className="status-badge status-progress">In Progress</span>;
      case "completed":
        return <span className="status-badge status-completed">Completed</span>;
      default:
        return null;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>;
      case "medium":
        return <span className="h-2 w-2 rounded-full bg-orange-500 mr-1"></span>;
      case "low":
        return <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>;
      default:
        return null;
    }
  };

  const updateTaskStatus = (taskId: string, newStatus: "todo" | "progress" | "completed") => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Recent Tasks</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-3.5 w-3.5 mr-1" />
            Filter
          </Button>
          <Button variant="default" size="sm">
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add Task
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className="flex items-center justify-between p-3 rounded-lg border bg-card/50 hover:bg-card transition-colors"
          >
            <div className="flex items-center gap-3">
              <Button 
                variant={task.status === "completed" ? "default" : "outline"} 
                size="icon" 
                className="h-6 w-6"
                onClick={() => updateTaskStatus(
                  task.id, 
                  task.status === "completed" ? "todo" : "completed"
                )}
              >
                {task.status === "completed" && <Check className="h-3 w-3" />}
              </Button>
              
              <div>
                <p className={cn(
                  "text-sm font-medium",
                  task.status === "completed" && "line-through text-muted-foreground"
                )}>
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {task.dueDate}
                  </div>
                  <div className={cn(
                    "flex items-center text-xs",
                    `priority-${task.priority}`
                  )}>
                    {getPriorityIcon(task.priority)}
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {getStatusBadge(task.status)}
              
              <div className="flex -space-x-2">
                {task.assignees.map((assignee, index) => (
                  <div 
                    key={index}
                    className="h-6 w-6 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center text-[10px] font-medium"
                  >
                    {assignee}
                  </div>
                ))}
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => updateTaskStatus(task.id, "todo")}
                  >
                    Mark as To Do
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => updateTaskStatus(task.id, "progress")}
                  >
                    Mark as In Progress
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => updateTaskStatus(task.id, "completed")}
                  >
                    Mark as Completed
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Edit Task</DropdownMenuItem>
                  <DropdownMenuItem>Delete Task</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
      
      <Button variant="ghost" className="w-full mt-4">
        View All Tasks
        <ChevronDown className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};

export default TaskList;
