import MainLayout from '../layout/MainLayout';
import { StatCards } from '../_components/StatCard';
import { PerformanceChart, ProjectProgress, TaskDistributionChart } from '../_components/PerformanceChart';
import ProjectCard from '../_components/ProjectCard';
import TaskList from '../_components/TaskList';
import ChatPanel from '../_components/ChatPanel';
import { auth } from '@/utils/auth';
import { redirect } from 'next/navigation';
import { getOnboarding } from './_actions/get_onboarding';
import { getCurrentUser } from '@/app/actions/user';
import { Button } from '@/components/ui/button';
import { handleSignOut } from '@/app/actions/user';
import { getOrgCode } from './_actions/get_onboarding';

const page = async () => {
  const onboarding = await getOnboarding();
  const session = await auth()
  const userData = await getCurrentUser();
  const orgCode = await getOrgCode();
  
  if (!session?.user) {
    redirect('/authentication')
  }
  if (!onboarding) {
    redirect('/onboarding')
  }

  const projects = [
    {
      title: "Website Redesign",
      description: "Modernize the company website with improved UI/UX and mobile responsiveness",
      progress: 75,
      dueDate: "Jun 15",
      members: 4,
      tasksCompleted: 8,
      totalTasks: 12
    },
    {
      title: "Mobile App Development",
      description: "Build a native mobile app for iOS and Android platforms",
      progress: 45,
      dueDate: "Jul 30",
      members: 5,
      tasksCompleted: 6,
      totalTasks: 15
    },
    {
      title: "Marketing Campaign",
      description: "Launch a digital marketing campaign for the new product line",
      progress: 30,
      dueDate: "Jun 25",
      members: 3,
      tasksCompleted: 3,
      totalTasks: 10
    },
    {
      title: "API Integration",
      description: "Integrate third-party payment processing APIs with our platform",
      progress: 90,
      dueDate: "Jun 5",
      members: 2,
      tasksCompleted: 9,
      totalTasks: 10
    }
  ];

  return (
    <MainLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {userData?.name || 'User'}. Here's what's happening today.
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Organization Code: {orgCode}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{userData?.email}</span>
          <form action={async () => {
            'use server'
            await handleSignOut()
          }}>
            <Button variant="outline" type="submit">
              Sign Out
            </Button>
          </form>
        </div>
      </div>
      
      <StatCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <div>
          <TaskDistributionChart />
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Active Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              description={project.description}
              progress={project.progress}
              dueDate={project.dueDate}
              members={project.members}
              tasksCompleted={project.tasksCompleted}
              totalTasks={project.totalTasks}
            />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TaskList />
        <ChatPanel />
        
      </div>
      
      <div className="mb-6">
        <ProjectProgress />
      </div>
    </MainLayout>
  );
}

export default page