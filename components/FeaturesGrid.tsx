'use client'
import { motion } from "framer-motion";
import { BarChart, MessageSquare, Users, Check, Clock } from "lucide-react";
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: <Users className="h-8 w-8 text-[#7E69AB]" />,
    title: "Project & Task Management",
    desc: "Create projects, organize tasks with drag-and-drop boards, set priorities, and assign work to your team members.",
    delay: 0.05,
    color: "from-[#9b87f5]/20 to-[#7E69AB]/10"
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-[#9b87f5]" />,
    title: "Real-Time Chat",
    desc: "Collaborate in project channels, share files, and keep conversations organized without switching between apps.",
    delay: 0.15,
    color: "from-[#9b87f5]/10 to-[#33C3F0]/10"
  },
  {
    icon: <BarChart className="h-8 w-8 text-[#1EAEDB]" />,
    title: "Performance Tracking",
    desc: "Beautiful dashboards help managers track progress, task completion rates, and team performance metrics.",
    delay: 0.25,
    color: "from-[#33C3F0]/20 to-[#1EAEDB]/5"
  },
  {
    icon: <Check className="h-8 w-8 text-[#33C3F0]" />,
    title: "Custom Evaluations",
    desc: "Define your own success metrics. Measure quality, timeliness, and teamwork on your terms.",
    delay: 0.35,
    color: "from-[#d3e4fd]/50 to-[#33C3F0]/10"
  },
  {
    icon: <Clock className="h-8 w-8 text-[#7E69AB]" />,
    title: "Time Tracking",
    desc: "Monitor time spent on tasks, generate reports, and improve team productivity with detailed insights.",
    delay: 0.45,
    color: "from-[#e5deff]/50 to-[#7E69AB]/10"
  },
];

import React from 'react'

const FeaturesGrid = () => {
    return (
        <section className="container mx-auto pb-24 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-center text-[#1A1F2C] mb-4">
              Everything you need, <span className="text-[#9b87f5]">all in one place</span>
            </h2>
            <p className="text-[#403E43] text-lg max-w-2xl mx-auto">
              Stop switching between apps. Our platform combines task management, 
              communication, and performance tracking in a single seamless experience.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: f.delay }}
                viewport={{ once: true }}
              >
                <Card className="bg-white hover:shadow-xl transition-all duration-300 rounded-xl h-full border border-[#ede9f3] overflow-hidden">
                  <div className={`h-2 w-full bg-gradient-to-r ${f.color}`}></div>
                  <CardHeader className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-[#f3f2fd]">{f.icon}</div>
                    </div>
                    <CardTitle className="text-xl font-semibold">{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[#555] text-base">{f.desc}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      );
}

export default FeaturesGrid