export interface Project {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'completed' | 'on-hold';
    progress: number;
    dueDate: string;
    tasks: number;
    completedTasks: number;
    team: string[];
    views: number;
  }
  
  export interface KanbanTask {
    id: string;
    title: string;
    description: string;
    assignee?: string;
    dueDate?: string;
    priority: 'low' | 'medium' | 'high';
    tags: string[];
  }
  
  export interface KanbanColumn {
    id: string;
    title: string;
    tasks: KanbanTask[];
  }
  
  export interface ProjectWithKanban extends Project {
    columns: KanbanColumn[];
  }