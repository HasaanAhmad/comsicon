import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, Users, MessageSquare, Calendar, 
  ChevronLeft, ChevronRight, Settings, PieChart, 
  FileText, Bell, User
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  collapsed?: boolean;
}

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  href,
  collapsed = false
}: SidebarItemProps) => {
  const pathname = usePathname();
  
  // Check if current path matches or starts with the href
  const isActive = pathname === href || 
    (href !== '/dashboard' && pathname.startsWith(href));
  
  return (
    <Link 
      href={href}
      className={cn(
        "sidebar-item group",
        isActive && "active"
      )}
    >
      <Icon className="w-5 h-5" />
      {!collapsed && (
        <span className="transition-all duration-200">{label}</span>
      )}
    </Link>
  );
};

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div 
      className={cn(
        "h-screen fixed left-0 top-0 z-40 flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 border-r border-sidebar-border",
        collapsed ? "w-[70px]" : "w-[250px]",
        className
      )}
    >
      <div className="flex items-center p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-sidebar-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold">K</span>
            </div>
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={100} 
              height={32} 
              className="rounded-md"
            />
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 mx-auto rounded-md bg-gradient-to-br from-sidebar-primary to-accent flex items-center justify-center">
            <span className="text-white font-bold">K</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 py-4 overflow-y-auto">
        <div className="px-3 mb-2">
          {!collapsed && <h2 className="text-xs font-semibold text-muted-foreground mb-2 px-3">MAIN MENU</h2>}
        </div>
        <nav className="space-y-1 px-2">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            href="/dashboard"
            collapsed={collapsed}
          />
          <SidebarItem 
            icon={FileText} 
            label="Projects" 
            href="/dashboard/projects"
            collapsed={collapsed}
          />
          <SidebarItem 
            icon={MessageSquare} 
            label="Chat" 
            href="/dashboard/chat"
            collapsed={collapsed}
          />
          <SidebarItem 
            icon={Calendar} 
            label="Calendar" 
            href="/dashboard/calendar"
            collapsed={collapsed}
          />
          <SidebarItem 
            icon={PieChart} 
            label="Performance" 
            href="/dashboard/performance"
            collapsed={collapsed}
          />
        </nav>

        {!collapsed && <div className="px-3 pt-4 mt-4 border-t border-sidebar-border">
          <h2 className="text-xs font-semibold text-muted-foreground mb-2 px-3">TEAM</h2>
        </div>}
        <nav className="space-y-1 px-2">
          <SidebarItem 
            icon={Users} 
            label="Members" 
            href="/dashboard/members"
            collapsed={collapsed}
          />
          <SidebarItem 
            icon={Bell} 
            label="Notifications" 
            href="/dashboard/notifications"
            collapsed={collapsed}
          />
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            href="/dashboard/settings"
            collapsed={collapsed}
          />
        </nav>

        <div className="mt-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleCollapse}
            className="h-8 w-full flex justify-center"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="border-t border-sidebar-border p-4">
        <div className={cn(
          "flex items-center",
          collapsed ? "justify-center" : "space-x-3"
        )}>
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">Manager</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
