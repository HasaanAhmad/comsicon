
import React from "react";
import MainLayout from "../../../layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "../../../layout/ModeToggle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SettingsPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
        
        <Tabs defaultValue="account">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-5">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="organization">Organization</TabsTrigger>
          </TabsList>
          
          {/* Account Tab */}
          <TabsContent value="account">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your account information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <div className="flex flex-col items-center gap-2">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">Change Avatar</Button>
                    </div>
                    
                    <div className="grid gap-4 flex-1">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="John Doe" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john@example.com" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Input id="role" defaultValue="Project Manager" readOnly />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input id="bio" defaultValue="Project Manager with 5 years of experience" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue="New York, USA" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="est">
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pst">Pacific Time (UTC-8)</SelectItem>
                          <SelectItem value="mst">Mountain Time (UTC-7)</SelectItem>
                          <SelectItem value="cst">Central Time (UTC-6)</SelectItem>
                          <SelectItem value="est">Eastern Time (UTC-5)</SelectItem>
                          <SelectItem value="gmt">GMT (UTC)</SelectItem>
                          <SelectItem value="ist">India Standard Time (UTC+5:30)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  <Separator />
                  
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Task Assignments</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive an email when a task is assigned to you
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Task Updates</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive an email when your tasks are updated
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Project Updates</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive an email when projects you're involved with are updated
                        </p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Direct Messages</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive an email when you receive a direct message
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-medium">In-App Notifications</h3>
                  <Separator />
                  
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Task Assignments</Label>
                        <p className="text-xs text-muted-foreground">
                          Show notifications when a task is assigned to you
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Task Updates</Label>
                        <p className="text-xs text-muted-foreground">
                          Show notifications when your tasks are updated
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Project Updates</Label>
                        <p className="text-xs text-muted-foreground">
                          Show notifications when projects you're involved with are updated
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Direct Messages</Label>
                        <p className="text-xs text-muted-foreground">
                          Show notifications when you receive a direct message
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of the application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme Mode</Label>
                  <div className="flex items-center gap-4">
                    <ModeToggle />
                    <span className="text-sm">Toggle between light and dark mode</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <Label>Accent Color</Label>
                  <div className="flex flex-wrap gap-3">
                    {["#8B5CF6", "#EC4899", "#06B6D4", "#10B981", "#F59E0B", "#EF4444"].map((color) => (
                      <div 
                        key={color} 
                        className="w-8 h-8 rounded-full cursor-pointer ring-2 ring-offset-2 ring-transparent hover:ring-gray-400"
                        style={{ backgroundColor: color }}
                        aria-label={`Color ${color}`}
                      >
                        {color === "#8B5CF6" && (
                          <div className="flex h-full items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M12 4L5.5 10.5L2 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <Label>Sidebar</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Compact Mode</span>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto-collapse on Mobile</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <Label>Animations</Label>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Enable animations</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Two Factor Authentication</CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two Factor Authentication</Label>
                      <p className="text-xs text-muted-foreground">
                        Require an authentication code in addition to your password
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sessions</CardTitle>
                  <CardDescription>
                    Manage your active sessions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Current Session</p>
                        <p className="text-xs text-muted-foreground">Mac OS • Chrome • New York, USA</p>
                      </div>
                      <Badge>Active Now</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Mobile Session</p>
                        <p className="text-xs text-muted-foreground">iOS • Safari • New York, USA</p>
                      </div>
                      <Badge variant="outline">3 days ago</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Sign out of all devices</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Organization Tab */}
          <TabsContent value="organization">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Organization Profile</CardTitle>
                  <CardDescription>
                    Update your organization information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-20 w-20 rounded-md bg-gradient-to-br from-kaam-purple to-kaam-vivid-purple flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">K</span>
                      </div>
                      <Button variant="outline" size="sm">Change Logo</Button>
                    </div>
                    
                    <div className="grid gap-4 flex-1">
                      <div className="grid gap-2">
                        <Label htmlFor="org-name">Organization Name</Label>
                        <Input id="org-name" defaultValue="KaamShaam Inc." />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" defaultValue="https://kaamshaam.com" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" defaultValue="Project management platform for modern teams" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>
                    Manage your billing details and invoices
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Current Plan</p>
                        <p className="text-sm text-muted-foreground">Business</p>
                      </div>
                      <Badge variant="outline">$49/month</Badge>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between">
                      <p className="text-sm">Next billing date</p>
                      <p className="text-sm">May 21, 2025</p>
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-sm">Payment method</p>
                      <p className="text-sm">Visa ending in 4242</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View Invoices</Button>
                  <Button variant="outline">Update Payment</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Danger Zone</CardTitle>
                  <CardDescription>
                    Irreversible and destructive actions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-destructive">
                  <div>
                    <p className="font-medium">Delete Organization</p>
                    <p className="text-sm">Permanently delete your organization and all associated data</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="destructive">Delete Organization</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
