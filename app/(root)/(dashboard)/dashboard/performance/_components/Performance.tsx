
import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data
const teamPerformanceData = [
  { month: 'Jan', completionRate: 78, responseTime: 2.4, taskQuality: 85 },
  { month: 'Feb', completionRate: 82, responseTime: 2.1, taskQuality: 87 },
  { month: 'Mar', completionRate: 80, responseTime: 2.2, taskQuality: 90 },
  { month: 'Apr', completionRate: 85, responseTime: 1.9, taskQuality: 92 },
  { month: 'May', completionRate: 89, responseTime: 1.7, taskQuality: 93 },
  { month: 'Jun', completionRate: 87, responseTime: 1.8, taskQuality: 90 },
  { month: 'Jul', completionRate: 91, responseTime: 1.6, taskQuality: 91 },
];

const teamMembers = [
  { 
    id: 1, 
    name: "John Smith", 
    avatar: "/placeholder.svg", 
    role: "Frontend Developer",
    metrics: {
      tasksCompleted: 48,
      totalTasks: 52,
      avgResponseTime: 1.8,
      taskQuality: 94,
      collaboration: 90
    } 
  },
  { 
    id: 2, 
    name: "Sarah Johnson", 
    avatar: "/placeholder.svg", 
    role: "UI Designer",
    metrics: {
      tasksCompleted: 38,
      totalTasks: 40,
      avgResponseTime: 2.1,
      taskQuality: 97,
      collaboration: 85
    }  
  },
  { 
    id: 3, 
    name: "Mike Williams", 
    avatar: "/placeholder.svg", 
    role: "Backend Developer",
    metrics: {
      tasksCompleted: 42,
      totalTasks: 45,
      avgResponseTime: 1.6,
      taskQuality: 88,
      collaboration: 78
    }  
  },
  { 
    id: 4, 
    name: "Emily Davis", 
    avatar: "/placeholder.svg", 
    role: "Project Manager",
    metrics: {
      tasksCompleted: 65,
      totalTasks: 68,
      avgResponseTime: 1.2,
      taskQuality: 95,
      collaboration: 98
    }  
  },
];

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    completionRate: 85,
    onTimeDelivery: 90,
    teamSatisfaction: 4.5,
    clientSatisfaction: 4.7,
    status: "In Progress",
    team: [1, 2, 4]
  },
  {
    id: 2,
    name: "Mobile App",
    completionRate: 65,
    onTimeDelivery: 78,
    teamSatisfaction: 4.2,
    clientSatisfaction: 4.0,
    status: "In Progress",
    team: [1, 3, 4]
  },
  {
    id: 3,
    name: "CRM Integration",
    completionRate: 100,
    onTimeDelivery: 95,
    teamSatisfaction: 4.8,
    clientSatisfaction: 4.9,
    status: "Completed",
    team: [3, 4]
  }
];

const individualPerformanceMockData = [
  { month: 'Jan', John: 75, Sarah: 68, Mike: 80, Emily: 90 },
  { month: 'Feb', John: 78, Sarah: 72, Mike: 82, Emily: 88 },
  { month: 'Mar', John: 80, Sarah: 80, Mike: 85, Emily: 92 },
  { month: 'Apr', John: 85, Sarah: 85, Mike: 87, Emily: 90 },
  { month: 'May', John: 83, Sarah: 90, Mike: 84, Emily: 95 },
  { month: 'Jun', John: 87, Sarah: 92, Mike: 86, Emily: 93 },
  { month: 'Jul', John: 90, Sarah: 94, Mike: 88, Emily: 94 },
];

const PerformancePage = () => {
  const [timeframe, setTimeframe] = useState("month");
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Performance Dashboard</h1>
          
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Tabs defaultValue="organization">
          <TabsList>
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="members">Team Members</TabsTrigger>
          </TabsList>
          
          {/* Organization Performance Tab */}
          <TabsContent value="organization">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Task Completion Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">
                    +2.5% from previous {timeframe}
                  </p>
                  <div className="h-[200px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={teamPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="completionRate"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1.8 hours</div>
                  <p className="text-xs text-muted-foreground">
                    -0.3 hours from previous {timeframe}
                  </p>
                  <div className="h-[200px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={teamPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="responseTime"
                          stroke="#82ca9d"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Task Quality Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">91/100</div>
                  <p className="text-xs text-muted-foreground">
                    +1.2 points from previous {timeframe}
                  </p>
                  <div className="h-[200px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={teamPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="taskQuality" fill="#8B5CF6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Individual Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={individualPerformanceMockData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="John" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="Sarah" stroke="#82ca9d" strokeWidth={2} />
                      <Line type="monotone" dataKey="Mike" stroke="#ffc658" strokeWidth={2} />
                      <Line type="monotone" dataKey="Emily" stroke="#ff8042" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Projects Performance Tab */}
          <TabsContent value="projects">
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map(project => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{project.name}</CardTitle>
                      <Badge variant={project.status === "Completed" ? "outline" : "default"}>
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Completion Rate</span>
                          <span className="font-medium">{project.completionRate}%</span>
                        </div>
                        <Progress value={project.completionRate} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>On-time Delivery</span>
                          <span className="font-medium">{project.onTimeDelivery}%</span>
                        </div>
                        <Progress value={project.onTimeDelivery} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Team Satisfaction</span>
                            <span className="font-medium">{project.teamSatisfaction}/5</span>
                          </div>
                          <Progress value={project.teamSatisfaction * 20} className="h-2" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Client Satisfaction</span>
                            <span className="font-medium">{project.clientSatisfaction}/5</span>
                          </div>
                          <Progress value={project.clientSatisfaction * 20} className="h-2" />
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Team</p>
                        <div className="flex -space-x-2">
                          {project.team.map(memberId => {
                            const member = teamMembers.find(m => m.id === memberId);
                            return member ? (
                              <Avatar key={member.id} className="border-2 border-background">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Team Members Performance Tab */}
          <TabsContent value="members">
            <div className="grid gap-6 md:grid-cols-2">
              {teamMembers.map(member => (
                <Card key={member.id}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Task Completion</span>
                          <span className="font-medium">
                            {member.metrics.tasksCompleted}/{member.metrics.totalTasks} 
                            ({Math.round(member.metrics.tasksCompleted / member.metrics.totalTasks * 100)}%)
                          </span>
                        </div>
                        <Progress 
                          value={Math.round(member.metrics.tasksCompleted / member.metrics.totalTasks * 100)} 
                          className="h-2" 
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Avg. Response Time</span>
                          <span className="font-medium">{member.metrics.avgResponseTime} hours</span>
                        </div>
                        {/* Inverted progress - lower is better */}
                        <Progress 
                          value={100 - ((member.metrics.avgResponseTime / 3) * 100)} 
                          className="h-2" 
                        />
                      </div>
                      
                      <div className="flex justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Task Quality</span>
                            <span className="font-medium">{member.metrics.taskQuality}/100</span>
                          </div>
                          <Progress value={member.metrics.taskQuality} className="h-2" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Collaboration</span>
                            <span className="font-medium">{member.metrics.collaboration}/100</span>
                          </div>
                          <Progress value={member.metrics.collaboration} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default PerformancePage;
