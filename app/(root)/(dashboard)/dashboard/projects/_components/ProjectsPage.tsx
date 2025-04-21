'use client'
import { useState, useEffect } from "react";
import AnalyticsCards from "./AnalyticsCard";
import ViewToggle from "./ViewToggle";
import ProjectListView from "./ProjectListView";
import KanbanView from "./KanbanView";
import { getProjects, getProjectsAnalytics, getProjectWithKanban, moveTask } from "@/services/ProjectService";
import { Project } from "@/types/project";
import MainLayout from "../../../layout/MainLayout";

const ProjectsPage = () => {
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

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Projects Overview</h1>
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
      </div>
    </MainLayout>
  );
};

export default ProjectsPage;
