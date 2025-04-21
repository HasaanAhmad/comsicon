
import React, { useState } from "react";
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
  active?: boolean;
  href?: string;
  onClick?: () => void;
}

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active = false, 
  href = "#",
  onClick
}: SidebarItemProps) => {
  return (
    <a 
      href={href} 
      onClick={onClick}
      className={cn(
        "sidebar-item group",
        active && "active"
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="transition-all duration-200">{label}</span>
    </a>
  );
};

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleItemClick = (label: string) => {
    setActiveItem(label);
  };

  return (
    <div 
      className={cn(
        "h-screen fixed left-0 top-0 z-40 flex flex-col bg-sidebar transition-all duration-300 border-r",
        collapsed ? "w-[70px]" : "w-[250px]",
        className
      )}
    >
      <div className="flex items-center p-4 border-b">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-kaam-purple to-kaam-vivid-purple flex items-center justify-center">
              <span className="text-white font-bold">K</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">KaamShaam</h1>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 mx-auto rounded-md bg-gradient-to-br from-kaam-purple to-kaam-vivid-purple flex items-center justify-center">
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
            label={collapsed ? "" : "Dashboard"} 
            active={activeItem === "Dashboard"}
            onClick={() => handleItemClick("Dashboard")}
          />
          <SidebarItem 
            icon={FileText} 
            label={collapsed ? "" : "Projects"} 
            active={activeItem === "Projects"}
            onClick={() => handleItemClick("Projects")}
          />
          <SidebarItem 
            icon={MessageSquare} 
            label={collapsed ? "" : "Chat"} 
            active={activeItem === "Chat"}
            onClick={() => handleItemClick("Chat")}
          />
          <SidebarItem 
            icon={Calendar} 
            label={collapsed ? "" : "Calendar"} 
            active={activeItem === "Calendar"}
            onClick={() => handleItemClick("Calendar")}
          />
          <SidebarItem 
            icon={PieChart} 
            label={collapsed ? "" : "Performance"} 
            active={activeItem === "Performance"}
            onClick={() => handleItemClick("Performance")}
          />
        </nav>

        {!collapsed && <div className="px-3 pt-4 mt-4 border-t">
          <h2 className="text-xs font-semibold text-muted-foreground mb-2 px-3">TEAM</h2>
        </div>}
        <nav className="space-y-1 px-2">
          <SidebarItem 
            icon={Users} 
            label={collapsed ? "" : "Members"} 
            active={activeItem === "Members"}
            onClick={() => handleItemClick("Members")}
          />
          <SidebarItem 
            icon={Bell} 
            label={collapsed ? "" : "Notifications"} 
            active={activeItem === "Notifications"}
            onClick={() => handleItemClick("Notifications")}
          />
          <SidebarItem 
            icon={Settings} 
            label={collapsed ? "" : "Settings"} 
            active={activeItem === "Settings"}
            onClick={() => handleItemClick("Settings")}
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

      <div className="border-t p-4">
        <div className={cn(
          "flex items-center",
          collapsed ? "justify-center" : "space-x-3"
        )}>
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
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
