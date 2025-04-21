import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface AnalyticsCardsProps {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  onHoldProjects: number;
  totalTasks: number;
  completedTasks: number;
  overallProgress: number;
  totalViews: number;
}

const AnalyticsCards: React.FC<AnalyticsCardsProps> = ({
  totalProjects,
  activeProjects,
  completedProjects,
  onHoldProjects,
  totalTasks,
  completedTasks,
  overallProgress,
  totalViews
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Projects</CardTitle>
          <CardDescription>Total active and completed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-700">{totalProjects}</div>
          <div className="mt-2 text-sm text-muted-foreground">
            <span className="text-green-600 font-medium">{activeProjects} Active</span> • 
            <span className="ml-2 text-blue-600 font-medium">{completedProjects} Completed</span> •
            <span className="ml-2 text-yellow-600 font-medium">{onHoldProjects} On Hold</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Tasks</CardTitle>
          <CardDescription>Completion status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-700">
            {completedTasks}/{totalTasks}
          </div>
          <div className="mt-2">
            <Progress value={(completedTasks / totalTasks) * 100} className="h-2" />
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {Math.round((completedTasks / totalTasks) * 100)}% complete
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Progress</CardTitle>
          <CardDescription>Overall project completion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-700">{overallProgress}%</div>
          <div className="mt-2">
            <Progress value={overallProgress} className="h-2" />
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            Average across all projects
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Views</CardTitle>
          <CardDescription>Total project views</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-700">{totalViews}</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Across all projects
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsCards;
