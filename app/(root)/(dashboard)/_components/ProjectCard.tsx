import React from "react";
import { CalendarClock, Check, Clock, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ProjectCardProps {
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  members: number;
  tasksCompleted: number;
  totalTasks: number;
}

const ProjectCard = ({ 
  title, 
  description, 
  progress, 
  dueDate, 
  members,
  tasksCompleted,
  totalTasks
}: ProjectCardProps) => {
  return (
    <div className="dashboard-card flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <span className="text-xs text-muted-foreground">
          {progress}% complete
        </span>
      </div>
      
      <Progress value={progress} className="h-1.5 mb-4" />
      
      <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{description}</p>
      
      <div className="mt-auto flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarClock className="h-4 w-4" />
            <span>Due: {dueDate}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{members} members</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Check className="h-4 w-4 text-primary" />
          <span>{tasksCompleted} of {totalTasks} tasks completed</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
