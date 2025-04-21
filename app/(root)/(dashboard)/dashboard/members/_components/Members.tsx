'use client'
import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Mail, Search, Users, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data
const membersData = [
  { id: 1, name: "John Smith", email: "john@example.com", avatar: "/placeholder.svg", role: "Frontend Developer", teams: [1, 3] },
  { id: 2, name: "Sarah Johnson", email: "sarah@example.com", avatar: "/placeholder.svg", role: "UI Designer", teams: [1] },
  { id: 3, name: "Mike Williams", email: "mike@example.com", avatar: "/placeholder.svg", role: "Backend Developer", teams: [2, 3] },
  { id: 4, name: "Emily Davis", email: "emily@example.com", avatar: "/placeholder.svg", role: "Project Manager", teams: [1, 2, 3] },
  { id: 5, name: "Alex Turner", email: "alex@example.com", avatar: "/placeholder.svg", role: "QA Engineer", teams: [2] },
  { id: 6, name: "Lisa Wang", email: "lisa@example.com", avatar: "/placeholder.svg", role: "UX Designer", teams: [1] },
  { id: 7, name: "David Miller", email: "david@example.com", avatar: "/placeholder.svg", role: "DevOps Engineer", teams: [3] },
];

const teamsData = [
  { 
    id: 1, 
    name: "Design Team", 
    description: "Responsible for user interface and experience design",
    projects: ["Website Redesign", "Mobile App"],
    members: [1, 2, 4, 6]
  },
  { 
    id: 2, 
    name: "Development Team", 
    description: "Handles backend and frontend code implementation",
    projects: ["Mobile App", "CRM Integration"],
    members: [1, 3, 4, 5]
  },
  { 
    id: 3, 
    name: "DevOps Team", 
    description: "Manages deployment and infrastructure",
    projects: ["CI/CD Pipeline", "Cloud Migration"],
    members: [3, 4, 7]
  },
];

const projectsData = [
  { id: 1, name: "Website Redesign", teams: [1, 2] },
  { id: 2, name: "Mobile App", teams: [1, 2] },
  { id: 3, name: "CRM Integration", teams: [2] },
  { id: 4, name: "CI/CD Pipeline", teams: [3] },
  { id: 5, name: "Cloud Migration", teams: [3] },
];

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "UI Designer",
  "UX Designer",
  "Project Manager",
  "QA Engineer",
  "DevOps Engineer",
  "Full Stack Developer",
];

const MembersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTeamId, setActiveTeamId] = useState<number | null>(null);
  
  const filteredMembers = membersData.filter(member => {
    if (activeTeamId) {
      return member.teams.includes(activeTeamId) && 
        (member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
         member.role.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    return member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           member.role.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  const getTeamName = (teamId: number) => {
    const team = teamsData.find(team => team.id === teamId);
    return team ? team.name : "";
  };
  
  const getTeamMembers = (teamId: number) => {
    return membersData.filter(member => member.teams.includes(teamId));
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Team Management</h1>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-1 h-4 w-4" /> Add Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Team Member</DialogTitle>
                  <DialogDescription>
                    Add a new member to your organization
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="name" className="text-right text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" placeholder="Full name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="email" className="text-right text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" placeholder="email@example.com" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="role" className="text-right text-sm font-medium">
                      Role
                    </label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map(role => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="team" className="text-right text-sm font-medium">
                      Team
                    </label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Assign to team" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamsData.map(team => (
                          <SelectItem key={team.id} value={team.id.toString()}>{team.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Member</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Users className="mr-1 h-4 w-4" /> New Team
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Team</DialogTitle>
                  <DialogDescription>
                    Create a new team for your organization
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="teamName" className="text-right text-sm font-medium">
                      Team Name
                    </label>
                    <Input id="teamName" placeholder="Team name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="description" className="text-right text-sm font-medium">
                      Description
                    </label>
                    <Input id="description" placeholder="Team description" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="projects" className="text-right text-sm font-medium">
                      Projects
                    </label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Assign to project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectsData.map(project => (
                          <SelectItem key={project.id} value={project.id.toString()}>{project.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Team</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Tabs defaultValue="members">
          <TabsList>
            <TabsTrigger value="members">All Members</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="projects">Project Assignment</TabsTrigger>
          </TabsList>
          
          {/* All Members Tab */}
          <TabsContent value="members">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredMembers.map(member => (
                <Card key={member.id}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Mail className="h-4 w-4" />
                      <span>{member.email}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Teams</p>
                      <div className="flex flex-wrap gap-2">
                        {member.teams.map(teamId => (
                          <Badge key={teamId} variant="outline">{getTeamName(teamId)}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">View Profile</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Teams Tab */}
          <TabsContent value="teams">
            <div className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-4 lg:col-span-3">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Teams</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[500px]">
                      {teamsData.map(team => (
                        <div 
                          key={team.id} 
                          className={`flex items-center justify-between p-4 cursor-pointer hover:bg-accent ${
                            activeTeamId === team.id ? "bg-accent" : ""
                          }`}
                          onClick={() => setActiveTeamId(team.id)}
                        >
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{team.name}</p>
                            <p className="text-xs text-muted-foreground">{team.members.length} members</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="border-t p-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full">
                          <Plus className="mr-1 h-4 w-4" /> Create New Team
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create New Team</DialogTitle>
                          <DialogDescription>
                            Create a new team for your organization
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="teamName" className="text-right text-sm font-medium">
                              Team Name
                            </label>
                            <Input id="teamName" placeholder="Team name" className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="description" className="text-right text-sm font-medium">
                              Description
                            </label>
                            <Input id="description" placeholder="Team description" className="col-span-3" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Create Team</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="md:col-span-8 lg:col-span-9">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>
                      {activeTeamId ? teamsData.find(t => t.id === activeTeamId)?.name : "Select a team"}
                    </CardTitle>
                    <CardDescription>
                      {activeTeamId ? teamsData.find(t => t.id === activeTeamId)?.description : "Click on a team to view details"}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {activeTeamId ? (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Projects</h3>
                          <div className="flex flex-wrap gap-2">
                            {teamsData.find(t => t.id === activeTeamId)?.projects.map((project, index) => (
                              <Badge key={index} variant="outline">{project}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium">Team Members</h3>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Plus className="h-3.5 w-3.5 mr-1" /> Add Member
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Add Member to Team</DialogTitle>
                                  <DialogDescription>
                                    Select members to add to this team
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                  <ScrollArea className="h-[200px]">
                                    {membersData
                                      .filter(m => !m.teams.includes(activeTeamId))
                                      .map(member => (
                                        <div key={member.id} className="flex items-center justify-between p-2">
                                          <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                              <AvatarImage src={member.avatar} alt={member.name} />
                                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                              <p className="text-sm font-medium">{member.name}</p>
                                              <p className="text-xs text-muted-foreground">{member.role}</p>
                                            </div>
                                          </div>
                                          <Button variant="ghost" size="sm">Add</Button>
                                        </div>
                                      ))}
                                  </ScrollArea>
                                </div>
                                <DialogFooter>
                                  <Button>Save</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                          
                          <div className="grid gap-4 sm:grid-cols-2">
                            {getTeamMembers(activeTeamId).map(member => (
                              <div key={member.id} className="flex items-center gap-3 p-3 rounded-md border">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={member.avatar} alt={member.name} />
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm">{member.name}</p>
                                  <p className="text-xs text-muted-foreground">{member.role}</p>
                                </div>
                                <Button variant="ghost" size="icon">
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-40 items-center justify-center">
                        <p className="text-muted-foreground">Select a team from the list to view details</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Project Assignment Tab */}
          <TabsContent value="projects">
            <div className="grid gap-6 md:grid-cols-2">
              {projectsData.map(project => {
                // Get all teams assigned to this project
                const assignedTeams = teamsData.filter(team => team.projects.includes(project.name));
                
                // Get all members in those teams
                let assignedMembers: any[] = [];
                assignedTeams.forEach(team => {
                  team.members.forEach(memberId => {
                    if (!assignedMembers.some(m => m.id === memberId)) {
                      const member = membersData.find(m => m.id === memberId);
                      if (member) assignedMembers.push(member);
                    }
                  });
                });
                
                return (
                  <Card key={project.id}>
                    <CardHeader>
                      <CardTitle>{project.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Assigned Teams</h3>
                          <div className="flex flex-wrap gap-2">
                            {assignedTeams.map(team => (
                              <Badge key={team.id} variant="outline">{team.name}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium">Team Members</h3>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Plus className="h-3.5 w-3.5 mr-1" /> Assign
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Assign to {project.name}</DialogTitle>
                                  <DialogDescription>
                                    Assign teams or individual members to this project
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                  <Tabs defaultValue="assign-team">
                                    <TabsList className="mb-4">
                                      <TabsTrigger value="assign-team">Assign Team</TabsTrigger>
                                      <TabsTrigger value="assign-member">Assign Member</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="assign-team">
                                      <ScrollArea className="h-[200px]">
                                        {teamsData
                                          .filter(team => !team.projects.includes(project.name))
                                          .map(team => (
                                            <div key={team.id} className="flex items-center justify-between p-2">
                                              <div>
                                                <p className="text-sm font-medium">{team.name}</p>
                                                <p className="text-xs text-muted-foreground">{team.members.length} members</p>
                                              </div>
                                              <Button variant="ghost" size="sm">Assign</Button>
                                            </div>
                                          ))}
                                      </ScrollArea>
                                    </TabsContent>
                                    <TabsContent value="assign-member">
                                      <ScrollArea className="h-[200px]">
                                        {membersData
                                          .filter(m => !assignedMembers.some(am => am.id === m.id))
                                          .map(member => (
                                            <div key={member.id} className="flex items-center justify-between p-2">
                                              <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                  <AvatarImage src={member.avatar} alt={member.name} />
                                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                  <p className="text-sm font-medium">{member.name}</p>
                                                  <p className="text-xs text-muted-foreground">{member.role}</p>
                                                </div>
                                              </div>
                                              <Button variant="ghost" size="sm">Assign</Button>
                                            </div>
                                          ))}
                                      </ScrollArea>
                                    </TabsContent>
                                  </Tabs>
                                </div>
                                <DialogFooter>
                                  <Button>Save</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                          
                          <div className="grid gap-2">
                            {assignedMembers.map(member => (
                              <div key={member.id} className="flex items-center gap-3 p-2 rounded-md border">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={member.avatar} alt={member.name} />
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm">{member.name}</p>
                                  <p className="text-xs text-muted-foreground">{member.role}</p>
                                </div>
                                <Button variant="ghost" size="icon">
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default MembersPage;
