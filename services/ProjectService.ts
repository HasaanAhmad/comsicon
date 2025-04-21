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
            title: "Social media content calendar",
            description: "Create content calendar for campaign",
            assignee: "user5",
            dueDate: "2025-04-28",
            priority: "high",
            tags: ["content", "planning"]
          },
          {
            id: "task2",
            title: "Email templates",
            description: "Design and code email campaign templates",
            assignee: "user1",
            dueDate: "2025-04-30",
            priority: "medium",
            tags: ["design", "email"]
          }
        ]
      },
      {
        id: "col2",
        title: "In Progress",
        tasks: [
          {
            id: "task3",
            title: "Influencer outreach",
            description: "Contact and coordinate with influencers",
            assignee: "user5",
            dueDate: "2025-04-25",
            priority: "medium",
            tags: ["outreach", "influencers"]
          }
        ]
      },
      {
        id: "col3",
        title: "Review",
        tasks: []
      },
      {
        id: "col4",
        title: "Completed",
        tasks: [
          {
            id: "task4",
            title: "Campaign strategy document",
            description: "Finalize campaign strategy and goals",
            assignee: "user1",
            dueDate: "2025-04-15",
            priority: "high",
            tags: ["strategy", "planning"]
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
        tasks: []
      },
      {
        id: "col2",
        title: "In Progress",
        tasks: []
      },
      {
        id: "col3",
        title: "Review",
        tasks: []
      },
      {
        id: "col4",
        title: "Completed",
        tasks: [
          {
            id: "task1",
            title: "Data mapping",
            description: "Map fields between old and new systems",
            assignee: "user3",
            dueDate: "2025-03-15",
            priority: "high",
            tags: ["data", "planning"]
          },
          {
            id: "task2",
            title: "Data cleaning script",
            description: "Write scripts to clean and validate data",
            assignee: "user4",
            dueDate: "2025-03-20",
            priority: "medium",
            tags: ["data", "scripts"]
          },
          {
            id: "task3",
            title: "Test migration",
            description: "Perform test migration with sample data",
            assignee: "user3",
            dueDate: "2025-03-25",
            priority: "high",
            tags: ["testing", "data"]
          },
          {
            id: "task4",
            title: "Full migration",
            description: "Execute full data migration",
            assignee: "user4",
            dueDate: "2025-03-30",
            priority: "high",
            tags: ["data", "migration"]
          },
          {
            id: "task5",
            title: "Validation and verification",
            description: "Verify data integrity after migration",
            assignee: "user3",
            dueDate: "2025-04-01",
            priority: "high",
            tags: ["validation", "data"]
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
            title: "Marketing materials",
            description: "Create brochures, fact sheets, and presentation",
            assignee: "user5",
            dueDate: "2025-06-25",
            priority: "high",
            tags: ["marketing", "materials"]
          },
          {
            id: "task2",
            title: "Launch event planning",
            description: "Organize product launch event",
            assignee: "user1",
            dueDate: "2025-07-05",
            priority: "medium",
            tags: ["event", "planning"]
          },
          {
            id: "task3",
            title: "Press release",
            description: "Draft and distribute press release",
            assignee: "user5",
            dueDate: "2025-07-10",
            priority: "medium",
            tags: ["press", "content"]
          },
          {
            id: "task4",
            title: "Sales training",
            description: "Train sales team on new product features",
            assignee: "user2",
            dueDate: "2025-07-01",
            priority: "high",
            tags: ["training", "sales"]
          }
        ]
      },
      {
        id: "col2",
        title: "In Progress",
        tasks: [
          {
            id: "task5",
            title: "Pricing strategy",
            description: "Finalize pricing structure and strategy",
            assignee: "user1",
            dueDate: "2025-06-15",
            priority: "high",
            tags: ["pricing", "strategy"]
          },
          {
            id: "task6",
            title: "Website updates",
            description: "Update website with new product information",
            assignee: "user2",
            dueDate: "2025-06-20",
            priority: "medium",
            tags: ["website", "content"]
          }
        ]
      },
      {
        id: "col3",
        title: "Review",
        tasks: []
      },
      {
        id: "col4",
        title: "Completed",
        tasks: [
          {
            id: "task7",
            title: "Product positioning",
            description: "Define product positioning and key messages",
            assignee: "user5",
            dueDate: "2025-06-01",
            priority: "high",
            tags: ["marketing", "strategy"]
          },
          {
            id: "task8",
            title: "Competitor analysis",
            description: "Complete analysis of competitive landscape",
            assignee: "user1",
            dueDate: "2025-05-25",
            priority: "medium",
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
