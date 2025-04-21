'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import MainLayout from "../../../../layout/MainLayout";
import KanbanView from "../../_components/KanbanView";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProjectWithKanban, moveTask } from "@/services/ProjectService";
import { ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ProjectKanbanViewProps {
  slug: string;
}

const ProjectKanbanView = ({ slug }: ProjectKanbanViewProps) => {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const projectData = await getProjectWithKanban(slug);
        setProject(projectData);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [slug]);

  const handleTaskMove = async (taskId: string, sourceColumnId: string, targetColumnId: string) => {
    if (!project || !slug) return;
    
    try {
      const updatedProject = await moveTask(
        slug,
        taskId,
        sourceColumnId,
        targetColumnId
      );
      
      if (updatedProject) {
        setProject(updatedProject);
      }
    } catch (error) {
      console.error("Error moving task:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-200';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/projects" className="flex items-center text-muted-foreground">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Projects
            </Link>
          </Button>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
          </div>
        ) : project ? (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b">
              <div>
                <h1 className="text-2xl font-bold">{project.name}</h1>
                <p className="text-muted-foreground mt-1">{project.description}</p>
                <div className="text-sm text-muted-foreground mt-1">Project ID: {slug}</div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex flex-col">
                  <div className="text-sm font-medium">Progress</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={project.progress} className="h-2 w-32" />
                    <span className="text-sm font-medium">{project.progress}%</span>
                  </div>
                </div>
                
                <Badge variant="outline" className={getStatusColor(project.status)}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
              </div>
            </div>
            
            <div className="pt-4">
              <KanbanView 
                columns={project.columns} 
                onTaskMove={handleTaskMove} 
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-muted-foreground">Project not found</h2>
            <p className="mt-2 text-muted-foreground">Could not find project with ID: {slug}</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProjectKanbanView;
