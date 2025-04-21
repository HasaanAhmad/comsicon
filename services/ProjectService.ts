import { Project, ProjectWithKanban } from "@/types/project";

// Mock data for projects
const mockProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of company website with new branding",
    status: "active",
    progress: 75,
    dueDate: "2025-05-15",
    tasks: 24,
    completedTasks: 18,
    team: ["user1", "user2", "user3"],
    views: 128
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Create a new mobile app for customer engagement",
    status: "active",
    progress: 45,
    dueDate: "2025-06-30",
    tasks: 38,
    completedTasks: 17,
    team: ["user2", "user4"],
    views: 93
  },
  {
    id: "3",
    name: "Marketing Campaign",
    description: "Q2 digital marketing campaign for new product launch",
    status: "on-hold",
    progress: 30,
    dueDate: "2025-05-01",
    tasks: 12,
    completedTasks: 4,
    team: ["user1", "user5"],
    views: 67
  },
  {
    id: "4",
    name: "Data Migration",
    description: "Migrate customer data to new CRM system",
    status: "completed",
    progress: 100,
    dueDate: "2025-04-01",
    tasks: 15,
    completedTasks: 15,
    team: ["user3", "user4"],
    views: 42
  },
  {
    id: "5",
    name: "Product Launch",
    description: "Prepare and execute launch of new product line",
    status: "active",
    progress: 20,
    dueDate: "2025-07-15",
    tasks: 32,
    completedTasks: 6,
    team: ["user1", "user2", "user5"],
    views: 105
  }
];

// Mock data for Kanban boards
const mockKanbanProjects: Record<string, ProjectWithKanban> = {
  "1": {
    ...mockProjects[0],
    columns: [
      {
        id: "col1",
        title: "To Do",
        tasks: [
          {
            id: "task1",
            title: "Update homepage hero section",
            description: "Replace current hero with new design and copy",
            assignee: "user1",
            dueDate: "2025-05-01",
            priority: "high",
            tags: ["design", "frontend"]
          },
          {
            id: "task2",
            title: "SEO optimization",
            description: "Implement meta tags and optimize content for search engines",
            assignee: "user3",
            dueDate: "2025-05-07",
            priority: "medium",
            tags: ["seo", "content"]
          }
        ]
      },
      {
        id: "col2",
        title: "In Progress",
        tasks: [
          {
            id: "task3",
            title: "Create new blog templates",
            description: "Design and implement new templates for blog posts",
            assignee: "user2",
            dueDate: "2025-05-03",
            priority: "medium",
            tags: ["design", "content"]
          },
          {
            id: "task4",
            title: "Mobile responsive fixes",
            description: "Fix issues with site display on mobile devices",
            assignee: "user1",
            dueDate: "2025-05-05",
            priority: "high",
            tags: ["frontend", "bug"]
          }
        ]
      },
      {
        id: "col3",
        title: "Review",
        tasks: [
          {
            id: "task5",
            title: "Content review",
            description: "Editorial review of all page content",
            assignee: "user3",
            dueDate: "2025-04-30",
            priority: "low",
            tags: ["content"]
          }
        ]
      },
      {
        id: "col4",
        title: "Completed",
        tasks: [
          {
            id: "task6",
            title: "Setup analytics",
            description: "Install and configure Google Analytics",
            assignee: "user2",
            dueDate: "2025-04-25",
            priority: "medium",
            tags: ["analytics"]
          },
          {
            id: "task7",
            title: "Design system updates",
            description: "Update component library with new brand colors",
            assignee: "user1",
            dueDate: "2025-04-20",
            priority: "high",
            tags: ["design", "systems"]
          }
        ]
      }
    ]
  },
  "2": {
    ...mockProjects[1],
    columns: [
      {
        id: "col1",
        title: "To Do",
        tasks: [
          {
            id: "task1",
            title: "User authentication screens",
            description: "Implement login, signup, password reset screens",
            assignee: "user2",
            dueDate: "2025-06-10",
            priority: "high",
            tags: ["frontend", "auth"]
          },
          {
            id: "task2",
            title: "Push notifications",
            description: "Configure and test push notifications",
            assignee: "user4",
            dueDate: "2025-06-15",
            priority: "medium",
            tags: ["backend", "notifications"]
          }
        ]
      },
      {
        id: "col2",
        title: "In Progress",
        tasks: [
          {
            id: "task3",
            title: "Profile settings screen",
            description: "Create user profile management UI",
            assignee: "user4",
            dueDate: "2025-06-08",
            priority: "medium",
            tags: ["frontend", "ui"]
          }
        ]
      },
      {
        id: "col3",
        title: "Review",
        tasks: [
          {
            id: "task4",
            title: "Performance optimization",
            description: "Optimize app load time and transitions",
            assignee: "user2",
            dueDate: "2025-06-05",
            priority: "high",
            tags: ["performance"]
          }
        ]
      },
      {
        id: "col4",
        title: "Completed",
        tasks: [
          {
            id: "task5",
            title: "Initial project setup",
            description: "Set up development environment and base architecture",
            assignee: "user4",
            dueDate: "2025-05-15",
            priority: "high",
            tags: ["setup", "architecture"]
          },
          {
            id: "task6",
            title: "Design system implementation",
            description: "Implement design tokens and base components",
            assignee: "user2",
            dueDate: "2025-05-25",
            priority: "medium",
            tags: ["design", "ui"]
          }
        ]
      }
    ]
  },
  "3": {
    ...mockProjects[2],
    columns: [
      {
        id: "col1",
        title: "To Do",
        tasks: [
          {
            id: "task1",
            title: "Create social media content calendar",
            description: "Plan and create content for Q2 campaign",
            assignee: "user1",
            dueDate: "2025-04-25",
            priority: "high",
            tags: ["content", "social-media"]
          },
          {
            id: "task2",
            title: "Design campaign visuals",
            description: "Create visual assets for all platforms",
            assignee: "user5",
            dueDate: "2025-04-28",
            priority: "high",
            tags: ["design", "creative"]
          }
        ]
      },
      {
        id: "col2",
        title: "In Progress",
        tasks: [
          {
            id: "task3",
            title: "Email marketing setup",
            description: "Configure email sequences and templates",
            assignee: "user1",
            dueDate: "2025-04-20",
            priority: "medium",
            tags: ["email", "marketing"]
          }
        ]
      },
      {
        id: "col3",
        title: "Review",
        tasks: [
          {
            id: "task4",
            title: "Campaign budget allocation",
            description: "Review and finalize budget distribution",
            assignee: "user5",
            dueDate: "2025-04-15",
            priority: "medium",
            tags: ["budget", "planning"]
          }
        ]
      },
      {
        id: "col4",
        title: "Completed",
        tasks: [
          {
            id: "task5",
            title: "Market research",
            description: "Complete competitor and market analysis",
            assignee: "user1",
            dueDate: "2025-04-10",
            priority: "high",
            tags: ["research", "analysis"]
          }
        ]
      }
    ]
  },
  "4": {
    ...mockProjects[3],
    columns: [
      {
        id: "col1",
        title: "To Do",
        tasks: [
          {
            id: "task1",
            title: "Final data verification",
            description: "Verify all migrated data for accuracy",
            assignee: "user3",
            dueDate: "2025-03-30",
            priority: "high",
            tags: ["verification", "data"]
          }
        ]
      },
      {
        id: "col2",
        title: "In Progress",
        tasks: [
          {
            id: "task2",
            title: "User training documentation",
            description: "Create training materials for new CRM",
            assignee: "user4",
            dueDate: "2025-03-28",
            priority: "medium",
            tags: ["documentation", "training"]
          }
        ]
      },
      {
        id: "col3",
        title: "Review",
        tasks: [
          {
            id: "task3",
            title: "System integration tests",
            description: "Run final integration tests",
            assignee: "user3",
            dueDate: "2025-03-25",
            priority: "high",
            tags: ["testing", "integration"]
          }
        ]
      },
      {
        id: "col4",
        title: "Completed",
        tasks: [
          {
            id: "task4",
            title: "Data mapping",
            description: "Complete data field mapping between systems",
            assignee: "user4",
            dueDate: "2025-03-20",
            priority: "high",
            tags: ["mapping", "data"]
          },
          {
            id: "task5",
            title: "Initial data transfer",
            description: "Complete first phase of data migration",
            assignee: "user3",
            dueDate: "2025-03-15",
            priority: "high",
            tags: ["migration", "data"]
          }
        ]
      }
    ]
  },
  "5": {
    ...mockProjects[4],
    columns: [
      {
        id: "col1",
        title: "To Do",
        tasks: [
          {
            id: "task1",
            title: "Product pricing strategy",
            description: "Finalize pricing structure for new product line",
            assignee: "user1",
            dueDate: "2025-07-01",
            priority: "high",
            tags: ["pricing", "strategy"]
          },
          {
            id: "task2",
            title: "Launch event planning",
            description: "Plan and organize product launch event",
            assignee: "user5",
            dueDate: "2025-07-10",
            priority: "high",
            tags: ["event", "planning"]
          }
        ]
      },
      {
        id: "col2",
        title: "In Progress",
        tasks: [
          {
            id: "task3",
            title: "Marketing materials",
            description: "Create marketing collateral for launch",
            assignee: "user2",
            dueDate: "2025-06-25",
            priority: "medium",
            tags: ["marketing", "content"]
          },
          {
            id: "task4",
            title: "Sales team training",
            description: "Prepare and conduct sales team training",
            assignee: "user1",
            dueDate: "2025-06-30",
            priority: "medium",
            tags: ["training", "sales"]
          }
        ]
      },
      {
        id: "col3",
        title: "Review",
        tasks: [
          {
            id: "task5",
            title: "Product documentation",
            description: "Review product documentation and manuals",
            assignee: "user5",
            dueDate: "2025-06-20",
            priority: "low",
            tags: ["documentation"]
          }
        ]
      },
      {
        id: "col4",
        title: "Completed",
        tasks: [
          {
            id: "task6",
            title: "Market analysis",
            description: "Complete market research and analysis",
            assignee: "user2",
            dueDate: "2025-06-15",
            priority: "high",
            tags: ["research", "analysis"]
          }
        ]
      }
    ]
  }
};

// Get all projects
export const getProjects = (): Promise<Project[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProjects);
    }, 500);
  });
};

// Get a specific project
export const getProject = (id: string): Promise<Project | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const project = mockProjects.find(p => p.id === id);
      resolve(project || null);
    }, 300);
  });
};

// Get a project with its Kanban board
export const getProjectWithKanban = (id: string): Promise<ProjectWithKanban | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const project = mockKanbanProjects[id];
      resolve(project || null);
    }, 300);
  });
};

// Update a task's column (for drag-and-drop)
export const moveTask = (
  projectId: string, 
  taskId: string, 
  sourceColumnId: string, 
  targetColumnId: string
): Promise<ProjectWithKanban | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const project = mockKanbanProjects[projectId];
      
      if (!project) {
        resolve(null);
        return;
      }
      
      const sourceColumn = project.columns.find(col => col.id === sourceColumnId);
      const targetColumn = project.columns.find(col => col.id === targetColumnId);
      
      if (!sourceColumn || !targetColumn) {
        resolve(project);
        return;
      }
      
      const taskIndex = sourceColumn.tasks.findIndex(task => task.id === taskId);
      
      if (taskIndex === -1) {
        resolve(project);
        return;
      }
      
      // Remove task from source column
      const [task] = sourceColumn.tasks.splice(taskIndex, 1);
      
      // Add task to target column
      targetColumn.tasks.push(task);
      
      resolve({...project});
    }, 300);
  });
};

// Analytics data
export const getProjectsAnalytics = (): Promise<{
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  onHoldProjects: number;
  totalTasks: number;
  completedTasks: number;
  overallProgress: number;
  totalViews: number;
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const analytics = {
        totalProjects: mockProjects.length,
        activeProjects: mockProjects.filter(p => p.status === 'active').length,
        completedProjects: mockProjects.filter(p => p.status === 'completed').length,
        onHoldProjects: mockProjects.filter(p => p.status === 'on-hold').length,
        totalTasks: mockProjects.reduce((sum, p) => sum + p.tasks, 0),
        completedTasks: mockProjects.reduce((sum, p) => sum + p.completedTasks, 0),
        overallProgress: Math.round(
          mockProjects.reduce((sum, p) => sum + p.progress, 0) / mockProjects.length
        ),
        totalViews: mockProjects.reduce((sum, p) => sum + p.views, 0)
      };
      
      resolve(analytics);
    }, 500);
  });
};
