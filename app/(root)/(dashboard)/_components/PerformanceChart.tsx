'use client'
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const performanceData = [
  { day: 'Mon', completion: 65, engagement: 42, collaboration: 55 },
  { day: 'Tue', completion: 72, engagement: 58, collaboration: 60 },
  { day: 'Wed', completion: 80, engagement: 63, collaboration: 70 },
  { day: 'Thu', completion: 75, engagement: 70, collaboration: 68 },
  { day: 'Fri', completion: 85, engagement: 75, collaboration: 78 },
  { day: 'Sat', completion: 90, engagement: 80, collaboration: 82 },
  { day: 'Sun', completion: 95, engagement: 88, collaboration: 90 },
];

const taskDistributionData = [
  { name: 'To Do', value: 5, color: '#f59e0b' },
  { name: 'In Progress', value: 8, color: '#3b82f6' },
  { name: 'Completed', value: 15, color: '#10b981' },
];

const projectStatuses = [
  { name: 'Website Redesign', completed: 75 },
  { name: 'Mobile App', completed: 45 },
  { name: 'API Development', completed: 90 },
  { name: 'Database Migration', completed: 30 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border rounded-md shadow-sm">
        <p className="font-medium">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}%`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export function PerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Performance</CardTitle>
        <CardDescription>
          View team performance metrics for the current week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={performanceData}
            margin={{
              top: 5,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="day" />
            <YAxis unit="%" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="completion"
              name="Task Completion"
              stroke="#8b5cf6"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            <Line 
              type="monotone" 
              dataKey="engagement" 
              name="Engagement"
              stroke="#f97316" 
              strokeWidth={2} 
            />
            <Line 
              type="monotone" 
              dataKey="collaboration" 
              name="Collaboration"
              stroke="#33c3f0" 
              strokeWidth={2} 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function TaskDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Distribution</CardTitle>
        <CardDescription>
          Current status of all tasks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={taskDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {taskDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex items-center justify-center mt-4 space-x-8">
          {taskDistributionData.map((item) => (
            <div key={item.name} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: item.color }} 
              />
              <div className="flex flex-col">
                <span className="text-xs font-medium">{item.name}</span>
                <span className="text-sm">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProjectProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Progress</CardTitle>
        <CardDescription>
          Status of active projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={projectStatuses}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={false} />
            <XAxis type="number" domain={[0, 100]} unit="%" />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip />
            <Bar 
              dataKey="completed" 
              name="Completion Rate" 
              barSize={20} 
              radius={[0, 4, 4, 0]}
            >
              {projectStatuses.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={
                    entry.completed < 50 ? '#f97316' : 
                    entry.completed < 75 ? '#8b5cf6' : 
                    '#10b981'
                  } 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
