import { useState, useEffect } from "react";
import { KanbanColumn, KanbanTask } from "@/types/project";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface KanbanViewProps {
  columns: KanbanColumn[];
  onTaskMove: (taskId: string, sourceColumnId: string, targetColumnId: string) => void;
}

const KanbanView: React.FC<KanbanViewProps> = ({ columns, onTaskMove }) => {
  const [draggedTask, setDraggedTask] = useState<{
    taskId: string;
    columnId: string;
  } | null>(null);

  const handleDragStart = (taskId: string, columnId: string) => {
    setDraggedTask({ taskId, columnId });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('drag-over');
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    if (draggedTask && draggedTask.columnId !== columnId) {
      onTaskMove(draggedTask.taskId, draggedTask.columnId, columnId);
    }
    
    setDraggedTask(null);
  };

  const getPriorityColor = (priority: KanbanTask['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {columns.map(column => (
        <div
          key={column.id}
          className="kanban-column"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">{column.title}</h3>
            <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
              {column.tasks.length}
            </span>
          </div>
          
          {column.tasks.map(task => (
            <div
              key={task.id}
              className="task-card"
              draggable
              onDragStart={() => handleDragStart(task.id, column.id)}
            >
              <h4 className="font-medium mb-1">{task.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-2">
                {task.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs px-2 py-0">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <Badge variant="outline" className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
                
                {task.assignee && (
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-purple-200 flex items-center justify-center mr-1">
                      <span className="text-xs text-purple-800">{task.assignee.charAt(1).toUpperCase()}</span>
                    </div>
                    <span className="text-muted-foreground">{task.assignee}</span>
                  </div>
                )}
                
                {task.dueDate && (
                  <span className="text-muted-foreground">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))}
          
          {column.tasks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No tasks
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default KanbanView;