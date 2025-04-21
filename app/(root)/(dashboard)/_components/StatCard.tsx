import React from "react";
import { cn } from "@/lib/utils";
import { 
  ArrowDown, 
  ArrowUp, 
  Calendar, 
  Check, 
  Clock, 
  MessageSquare, 
  Users 
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  iconClassName?: string;
}

const StatCard = ({ title, value, change, icon, trend, iconClassName }: StatCardProps) => {
  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        <div className={cn(
          "p-2 rounded-full",
          iconClassName || "bg-primary/10"
        )}>
          {icon}
        </div>
      </div>
      
      {trend && change !== undefined && (
        <div className="flex items-center gap-1 mt-3">
          {trend === "up" ? (
            <ArrowUp className="h-3 w-3 text-green-600" />
          ) : trend === "down" ? (
            <ArrowDown className="h-3 w-3 text-red-600" />
          ) : null}
          <span 
            className={cn(
              "text-xs font-medium",
              trend === "up" && "text-green-600",
              trend === "down" && "text-red-600",
              trend === "neutral" && "text-muted-foreground"
            )}
          >
            {change}% from last week
          </span>
        </div>
      )}
    </div>
  );
};

export function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Total Tasks"
        value="28"
        change={12}
        trend="up"
        icon={<Check className="h-5 w-5 text-kaam-purple" />}
        iconClassName="bg-kaam-purple/10"
      />
      
      <StatCard
        title="Completed"
        value="15"
        change={8}
        trend="up"
        icon={<Clock className="h-5 w-5 text-kaam-blue" />}
        iconClassName="bg-kaam-blue/10"
      />
      
      <StatCard
        title="Team Members"
        value="12"
        change={0}
        trend="neutral"
        icon={<Users className="h-5 w-5 text-kaam-orange" />}
        iconClassName="bg-kaam-orange/10"
      />
      
      <StatCard
        title="Messages"
        value="364"
        change={24}
        trend="up"
        icon={<MessageSquare className="h-5 w-5 text-green-600" />}
        iconClassName="bg-green-600/10"
      />
    </div>
  );
}
