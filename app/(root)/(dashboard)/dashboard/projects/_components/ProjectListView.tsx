import Link from "next/link";
import { Project } from "@/types/project";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ProjectListViewProps {
  projects: Project[];
}

const ProjectListView: React.FC<ProjectListViewProps> = ({ projects }) => {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {projects.map(project => (
        <Card key={project.id} className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-lg font-medium">
                  <Link 
                    href={`/dashboard/projects/${project.id}/kanban`} 
                    className="hover:text-purple-700 hover:underline"
                  >
                    {project.name}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
              </div>
              
              <div className="flex flex-col">
                <div className="text-sm font-medium">Progress</div>
                <div className="mt-2 flex items-center">
                  <Progress value={project.progress} className="h-2 flex-1" />
                  <span className="ml-2 text-sm font-medium">{project.progress}%</span>
                </div>
                <div className="mt-2 text-sm">
                  <Badge variant="outline" className={getStatusColor(project.status)}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>
                </div>
              </div>
              
              <div className="flex flex-col">
                <div className="text-sm font-medium">Tasks</div>
                <div className="text-sm mt-2">
                  {project.completedTasks}/{project.tasks} Completed
                </div>
                <div className="text-sm font-medium mt-2">Due Date</div>
                <div className="text-sm">{new Date(project.dueDate).toLocaleDateString()}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 bg-gray-50">
            <div className="flex items-center justify-between w-full">
              <div className="flex -space-x-2">
                {project.team.map((member, index) => (
                  <div 
                    key={member} 
                    className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center border-2 border-white"
                    style={{ zIndex: project.team.length - index }}
                  >
                    <span className="text-xs font-medium text-purple-800">
                      {member.charAt(1).toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href={`/dashboard/projects/${project.id}`}
                className="text-sm text-purple-600 hover:text-purple-800 font-medium hover:underline"
              >
                View Board →
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProjectListView;
