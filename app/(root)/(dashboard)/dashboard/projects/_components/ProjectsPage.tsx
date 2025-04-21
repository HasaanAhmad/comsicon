'use client'
import { useState, useEffect } from "react";
import AnalyticsCards from "./AnalyticsCard";
import ViewToggle from "./ViewToggle";
import ProjectListView from "./ProjectListView";
import KanbanView from "./KanbanView";
import { createProject } from "../_actions/createProject";
import { getProjects, getProjectsAnalytics, getProjectWithKanban, moveTask } from "@/services/ProjectService";
import { Project } from "@/types/project";
import MainLayout from "../../../layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Loader2, Sparkles } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { toast, Toaster } from "sonner";
import { AiModel } from "@/aiModel";

const ProjectsPage = () => {
    const SYSTEM_PROMPT = `
You are an AI project manager. Based on the user's input, create a detailed software project plan using the following Prisma schema:

1. Generate a "Project" object with:
  - name: string (based on project topic)
  - description: short summary
  - status: "PLANNED" or "ACTIVE"
  - startDate and dueDate: estimate based on timeline
  - tasksCount: number of tasks generated
  - completedTasks: default to 0
  - progress: default to 0.0

2. Generate an array of "Task" objects. For each task:
  - title
  - description
  - projectId: link to above project
  - status: default to "TODO"
  - priority: based on importance (e.g., planning = HIGH)
  - deadline: spread across project duration
  - creatorId: optional (could be assigned later)

3. Optionally generate ProjectMember stubs:
  - name/role for up to 3 team members if described

User Prompt:
"""
{{user_input}}
"""
Return the generated project, tasks, and member list in JSON format.
`

  const [view, setView] = useState<'list' | 'kanban'>('list');
  const [projects, setProjects] = useState<Project[]>([]);
  const [analytics, setAnalytics] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    onHoldProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    overallProgress: 0,
    totalViews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [kanbanProject, setKanbanProject] = useState<any>(null);
  
  // New project modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAIModalOpen,setIsAIModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: '',
    description: '',
    status: 'active',
    progress: 0,
    dueDate: format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'), // Default to 30 days from now
    team: [],
  });
  const [teamMember, setTeamMember] = useState('');
  const [aiPrompt, setAiPrompt] = useState("");

  // Fetch projects and analytics data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [projectsData, analyticsData] = await Promise.all([
          getProjects(),
          getProjectsAnalytics()
        ]);
        
        setProjects(projectsData);
        setAnalytics(analyticsData);
        
        // If we're in kanban view, load the first project's kanban data
        if (view === 'kanban' && projectsData.length > 0) {
          const kanbanData = await getProjectWithKanban(projectsData[0].id);
          setKanbanProject(kanbanData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [view]);

  // Handle view change
  const handleViewChange = async (newView: 'list' | 'kanban') => {
    setView(newView);
    
    // If switching to kanban view, load the first project's kanban data
    if (newView === 'kanban' && projects.length > 0 && !kanbanProject) {
      try {
        const kanbanData = await getProjectWithKanban(projects[0].id);
        setKanbanProject(kanbanData);
      } catch (error) {
        console.error("Error fetching kanban data:", error);
      }
    }
  };

  // Handle task movement in kanban view
  const handleTaskMove = async (taskId: string, sourceColumnId: string, targetColumnId: string) => {
    if (!kanbanProject) return;
    
    try {
      const updatedKanban = await moveTask(
        kanbanProject.id,
        taskId,
        sourceColumnId,
        targetColumnId
      );
      
      if (updatedKanban) {
        setKanbanProject(updatedKanban);
      }
    } catch (error) {
      console.error("Error moving task:", error);
    }
  };
  
  // Handle opening the add project modal
  const handleOpenModal = () => {
    setNewProject({
      name: '',
      description: '',
      status: 'active',
      progress: 0,
      dueDate: format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
      team: [],
    });
    setIsModalOpen(true);
  };
  
  // Handle opening the AI modal
  const handleOpenAIModal = () => {
    setAiPrompt("");
    setIsAIModalOpen(true);
  };

  // Handle input changes in the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle select changes (for status)
  const handleStatusChange = (value: string) => {
    setNewProject(prev => ({ ...prev, status: value as 'active' | 'completed' | 'on-hold' }));
  };
  
  // Handle date change
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setNewProject(prev => ({ ...prev, dueDate: format(date, 'yyyy-MM-dd') }));
    }
  };
  
  // Handle progress change
  const handleProgressChange = (value: number[]) => {
    setNewProject(prev => ({ ...prev, progress: value[0] }));
  };
  
  // Handle adding team member
  const handleAddTeamMember = () => {
    if (teamMember.trim() && !newProject.team?.includes(teamMember.trim())) {
      setNewProject(prev => ({
        ...prev,
        team: [...(prev.team || []), teamMember.trim()]
      }));
      setTeamMember('');
    }
  };
  
  // Handle removing team member
  const handleRemoveTeamMember = (member: string) => {
    setNewProject(prev => ({
      ...prev,
      team: prev.team?.filter(m => m !== member) || []
    }));
  };
  
  // Handle submitting the form
  const handleSubmit = async () => {
    // Validate input
    if (!newProject.name?.trim()) {
      toast.error("Project name is required");
      return;
    }
    
    if (!newProject.dueDate) {
      toast.error("Due date is required");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Create project with defaults for non-user input fields
      const projectToCreate = {
        ...newProject,
        tasks: 0,
        completedTasks: 0,
        views: 0,
        organizationId: "default-org-id", // Replace with actual organization ID
        startDate: new Date().toISOString(), // Set current date as start date
        members: newProject.team || [] // Use team members as members
      };
      
      const createdProject = await createProject(projectToCreate);
      
      if (createdProject) {
        if ('id' in createdProject && 'name' in createdProject) {
          setProjects(prev => [...prev, createdProject as unknown as Project]);
        } else {
          console.error("Invalid project data:", createdProject);
        }
        setIsModalOpen(false);
        toast.success("Project created successfully!");
        
        // Refresh analytics
        const analyticsData = await getProjectsAnalytics();
        setAnalytics(analyticsData);
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle AI prompt submission (just log for now)
  const handleAIPromptSubmit = () => {
    console.log("AI Prompt:", aiPrompt);
    toast.success("AI prompt logged to console!");
    setIsAIModalOpen(false);
  };


  const onCreateClick = async () => {
    setLoading(true);

    try {
        const result = await AiModel.sendMessage("description: " + aiPrompt + SYSTEM_PROMPT);

        if (result.response.candidates && result.response.candidates.length > 0) {
            const formContent = result.response.candidates[0].content;
            const jsonForm = formContent?.parts[0]?.text || ''; // Ensure it's a string

            console.log('Saved form:', savedForm);

            // Assuming savedForm contains the form ID in a property called `id`
            const formId = savedForm?.id;

            if (formId) {
                // Push the dynamic route with the form ID
                router.push(`/edit-form/${formId}`);
            } else {
                console.warn('Form ID not found in the saved form');
            }
        } else {
            console.warn('No candidates found in the AI response');
        }

        setIsOpen(false);
    } catch (error) {
        console.error('Error creating form:', error);
    } finally {
        setLoading(false);
    }
}

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Projects Overview</h1>
          <div className="flex items-center gap-2 justify-around"> 
            <Button onClick={handleOpenModal}>
              Add Project
            </Button>
            <Button variant="outline" onClick={handleOpenAIModal}>
              <Sparkles className="mr-2 h-4 w-4" />
              Add Project With AI
            </Button>
          </div>
        </div>
        
        <AnalyticsCards {...analytics} />
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-xl font-semibold">Project Management</h2>
          <ViewToggle view={view} onViewChange={handleViewChange} />
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="h-8 bg-gray-200 rounded w-48"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        ) : (
          <>
            {view === 'list' ? (
              <ProjectListView projects={projects} />
            ) : (
              kanbanProject && (
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    {kanbanProject.name} Board
                  </h3>
                  <KanbanView 
                    columns={kanbanProject.columns} 
                    onTaskMove={handleTaskMove} 
                  />
                </div>
              )
            )}
          </>
        )}
        
        {/* Add Project Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter project name"
                  value={newProject.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter project description"
                  value={newProject.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={newProject.status} 
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newProject.dueDate ? format(new Date(newProject.dueDate), 'PPP') : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newProject.dueDate ? new Date(newProject.dueDate) : undefined}
                        onSelect={handleDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label>Progress ({newProject.progress}%)</Label>
                <Slider
                  value={[newProject.progress || 0]}
                  max={100}
                  step={5}
                  onValueChange={handleProgressChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label>Team Members</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add team member"
                    value={teamMember}
                    onChange={(e) => setTeamMember(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTeamMember();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddTeamMember} size="sm">
                    Add
                  </Button>
                </div>
                
                {newProject.team && newProject.team.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newProject.team.map(member => (
                      <Badge key={member} variant="secondary" className="flex items-center gap-1">
                        {member}
                        <button
                          className="ml-1 text-xs rounded-full hover:bg-destructive/20 size-4 flex items-center justify-center"
                          onClick={() => handleRemoveTeamMember(member)}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Project"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* New AI Project Modal */}
        <Dialog open={isAIModalOpen} onOpenChange={setIsAIModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Create Project with AI
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="bg-accent/30 rounded-lg p-4 text-sm">
                <p>
                  Describe your project in natural language and our AI will help you set it up.
                  Include details like timeline, team size, objectives, and any specific requirements.
                </p>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="ai-prompt">Project Description</Label>
                <Textarea
                  id="ai-prompt"
                  placeholder="E.g. Create a website redesign project for our marketing team. The timeline is 3 months, we need to improve conversion rates by 20%. The team will have 2 designers and 3 developers."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
              </div>
              
              <div className="text-xs text-muted-foreground">
                <p>Examples of what you can include:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Project goals and objectives</li>
                  <li>Timeline and key milestones</li>
                  <li>Team composition and roles</li>
                  <li>Budget constraints</li>
                  <li>Technical requirements</li>
                </ul>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAIModalOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAIPromptSubmit}
                disabled={!aiPrompt.trim()}
                className="gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Generate Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default ProjectsPage;
